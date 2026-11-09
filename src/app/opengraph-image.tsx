import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "WriteWise: free, private writing and study tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = ["Word Counter", "Essay Goal Tracker", "Case Converter", "Text Compare"];

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
          padding: "72px 80px",
          background: "#F5F6FA",
          color: "#121A3D",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 12,
              background: "#121A3D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 32 32">
              <path d="M8.5 22.5 16 9.5l7.5 13" fill="none" stroke="#A39CFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>WriteWise</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, maxWidth: 980 }}>
            Free word counter and writing tools.
          </div>
          <div style={{ fontSize: 30, color: "#5C6483" }}>Counted in your browser. Nothing is uploaded.</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {chips.map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 4,
                background: "#ffffff",
                border: "2px solid #DCE0EC",
                fontSize: 24,
                fontWeight: 600,
                color: "#3B2FC4",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
