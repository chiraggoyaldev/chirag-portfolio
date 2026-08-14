import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card. ImageResponse only supports flexbox and a subset of CSS
 * (no grid), and we deliberately avoid remote font fetching so the production
 * build never depends on a third-party request.
 */
export default function Image() {
  const dot = (color: string) => ({
    width: 16,
    height: 16,
    borderRadius: 999,
    background: color,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 20% 0%, #12291b 0%, transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 20,
            border: "1px solid #262626",
            background: "#101010",
            overflow: "hidden",
          }}
        >
          {/* window chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "20px 28px",
              borderBottom: "1px solid #1e1e1e",
              background: "#161616",
            }}
          >
            <div style={dot("#ff5f57")} />
            <div style={dot("#febc2e")} />
            <div style={dot("#28c840")} />
            <div
              style={{
                display: "flex",
                marginLeft: 14,
                fontSize: 20,
                color: "#5a5a5a",
                letterSpacing: 2,
              }}
            >
              {`~/${site.name.split(" ")[0].toLowerCase()} — zsh`}
            </div>
          </div>

          {/* body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "48px 56px 56px",
            }}
          >
            <div style={{ display: "flex", gap: 14, fontSize: 26 }}>
              <span style={{ color: "#4ade80" }}>$</span>
              <span style={{ color: "#8f8f8f" }}>whoami</span>
            </div>

            <div
              style={{
                fontSize: 82,
                fontWeight: 700,
                color: "#ededed",
                letterSpacing: -2,
                marginTop: 22,
              }}
            >
              {site.name}
            </div>

            <div style={{ fontSize: 36, color: "#4ade80", marginTop: 12 }}>
              {site.role}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 40,
                fontSize: 24,
                color: "#8f8f8f",
              }}
            >
              <div style={dot("#4ade80")} />
              {site.availability}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
