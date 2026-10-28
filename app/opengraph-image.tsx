import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#080a0d",
          color: "#f4f6f8",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 22, color: "#a3e635", letterSpacing: 4 }}>
          PORTFOLIO
        </div>
        <div>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ marginTop: 16, fontSize: 28, color: "#94a3b8" }}>
            Full-stack · AI applications · VIT Pune
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#3b82f6" }}>{profile.headline}</div>
      </div>
    ),
    { ...size },
  );
}
