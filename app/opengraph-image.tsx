import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0f1e",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #22d3ee, #2563eb)",
            color: "white",
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          S
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, color: "white" }}>
          STEMSnapshots
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 16 }}>
          Educational apps for curious minds
        </div>
      </div>
    ),
    size,
  );
}
