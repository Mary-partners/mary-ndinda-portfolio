import { ImageResponse } from "next/og";

export const alt = "The Management Capital Lab, a DBA research platform by Mary Ndinda";
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
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#B69A57", display: "flex" }} />
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 2, fontWeight: 700, color: "#B69A57" }}>
            THE MANAGEMENT CAPITAL LAB
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 60, fontWeight: 700, lineHeight: 1.12, maxWidth: 1000 }}>
            Do African SMEs need money first, or the capability to use it well?
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: "#c6d0dc", maxWidth: 940 }}>
            A living DBA research platform on management capital and SME growth.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#B69A57", fontWeight: 700 }}>Mary Ndinda</div>
          <div style={{ display: "flex", fontSize: 24, color: "#8fa0b4" }}>managementcapitallab.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
