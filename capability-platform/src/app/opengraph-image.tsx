import { ImageResponse } from "next/og";

export const alt = "Management Capital Lab, measure your management capability";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#10253F",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#B69A57",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 2, fontWeight: 700, color: "#B69A57" }}>
            MANAGEMENT CAPITAL LAB
          </div>
        </div>

        {/* middle: headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 700, lineHeight: 1.1, maxWidth: 940 }}>
            Measure your management capability
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 32, color: "#c6d0dc", maxWidth: 900 }}>
            A free, confidential founder diagnostic. Get your score and a clear 90-day plan.
          </div>
        </div>

        {/* bottom: cta + url */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              background: "#B69A57",
              color: "#10253F",
              fontSize: 26,
              fontWeight: 700,
              padding: "16px 30px",
              borderRadius: 12,
            }}
          >
            Take the diagnostic
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8fa0b4" }}>managementcapitallab.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
