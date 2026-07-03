import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const iconBase64 = readFileSync(
    join(process.cwd(), "app/apple-icon.png"),
  ).toString("base64");

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
        <img
          src={`data:image/png;base64,${iconBase64}`}
          alt=""
          width={96}
          height={96}
          style={{ borderRadius: 24, marginBottom: 32 }}
        />
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
