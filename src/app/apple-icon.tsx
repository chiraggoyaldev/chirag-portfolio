import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. Apple ignores SVG icons and does not apply rounding to
 * transparent PNGs, so this is a filled square matching `icon.svg`.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#4ade80",
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        {">_"}
      </div>
    ),
    size,
  );
}
