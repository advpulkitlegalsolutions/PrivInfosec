import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time. Colours mirror styles/tokens.css (ImageResponse cannot read CSS variables).
const INK = "#0b0e11";
const GOLD = "#c9a45c";
const PAPER = "#f5f3ed";
const MUTED = "#aaa69c";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: 80,
          color: PAPER,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <path d="M16 2.75 27 6.6v8.15c0 6.6-4.55 11.6-11 14.5-6.45-2.9-11-7.9-11-14.5V6.6L16 2.75Z" stroke={GOLD} strokeWidth="1.5" />
            <path d="M12.75 22.5V9.75h4.6a3.65 3.65 0 0 1 0 7.3h-4.6" stroke={PAPER} strokeWidth="1.75" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 700 }}>PrivInfosec</div>
            <div style={{ fontSize: 14, letterSpacing: 8, color: MUTED }}>CONSULTING</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 20, letterSpacing: 4, color: GOLD }}>PRIVACY · INFORMATION SECURITY · GOVERNANCE · RISK</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, marginTop: 24, maxWidth: 950 }}>{siteConfig.heroProposition}</div>
        </div>
        <div style={{ display: "flex", height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
      </div>
    ),
    size,
  );
}
