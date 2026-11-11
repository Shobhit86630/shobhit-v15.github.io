import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };


export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f0e0d",
          color: "#fff",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 36, background: "#faf7f3", color: "#151312", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 800 }}>
            {profile.monogram}
          </div>
          <div style={{ fontSize: 30, color: "#998f8f" }}>{profile.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 120, fontWeight: 800, lineHeight: 0.9, letterSpacing: -5 }}>
          <span>{profile.headline[0]}</span>
          <span style={{ color: "#3a3634" }}>{profile.headline[1]}</span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ height: 16, width: 160, borderRadius: 8, background: "#f46c38" }} />
          <div style={{ height: 16, width: 90, borderRadius: 8, background: "#c5ff41" }} />
        </div>
      </div>
    ),
    size,
  );
}
