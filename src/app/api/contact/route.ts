import { Resend } from "resend";
import { site } from "@/lib/content";

/**
 * Contact form endpoint.
 *
 * Environment variables (set these in Vercel → Project → Settings → Environment
 * Variables, never in the repo):
 *
 *   RESEND_API_KEY     required. From resend.com/api-keys.
 *   CONTACT_TO_EMAIL   optional. Defaults to the address in content.ts.
 *   CONTACT_FROM_EMAIL optional. Defaults to Resend's shared test sender.
 *
 * Note on the default sender: `onboarding@resend.dev` may only deliver to the
 * address that owns the Resend account. That is fine here, because this form
 * only ever mails the site owner — but the Resend account must be registered
 * with CONTACT_TO_EMAIL or delivery is rejected. Verifying a real domain lifts
 * the restriction and improves deliverability.
 */

const MAX = { name: 100, email: 200, message: 5000 } as const;
const MIN_MESSAGE = 10;

// Best-effort rate limit. Serverless instances do not share memory, so this
// throttles a burst from one instance rather than guaranteeing a global cap.
// It is a speed bump for casual abuse, not a security control; the honeypot
// and Resend's own quota are the real backstops.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function bad(error: string, status = 400) {
  return Response.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Misconfiguration, not a user error — say so plainly in the log but keep
    // the response generic.
    console.error("[contact] RESEND_API_KEY is not set");
    return bad("Email is not configured yet. Please use the address above.", 503);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return bad("Too many messages. Please try again in a minute.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad("Malformed request.");
  }

  const {
    name = "",
    email = "",
    message = "",
    company = "",
  } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a hidden field no human fills in. Report success so a bot gets
  // no signal that it was caught.
  if (typeof company === "string" && company.trim() !== "") {
    return Response.json({ ok: true });
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return bad("Malformed request.");
  }

  const clean = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  if (!clean.name || clean.name.length > MAX.name) {
    return bad("Please enter your name.");
  }
  if (!isEmail(clean.email) || clean.email.length > MAX.email) {
    return bad("Please enter a valid email address.");
  }
  if (clean.message.length < MIN_MESSAGE) {
    return bad(`Please write at least ${MIN_MESSAGE} characters.`);
  }
  if (clean.message.length > MAX.message) {
    return bad("That message is too long.");
  }

  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio <${from}>`,
      to,
      // Replying in a mail client goes straight back to the sender.
      replyTo: `${clean.name} <${clean.email}>`,
      subject: `Portfolio enquiry from ${clean.name}`,
      text: [
        `From: ${clean.name} <${clean.email}>`,
        `IP:   ${ip}`,
        "",
        clean.message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return bad("Could not send that. Please email me directly.", 502);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return bad("Could not send that. Please email me directly.", 502);
  }
}
