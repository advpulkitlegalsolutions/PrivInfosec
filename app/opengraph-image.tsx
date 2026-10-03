import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time. Colours mirror styles/tokens.css (ImageResponse cannot read CSS variables).
const INK = "#070707";
const GOLD = "#c99a3d";
const PAPER = "#f4f2ed";
const MUTED = "#918e88";

// Same artwork as the favicon (ink-on-dark variant of the monogram).
const markSrc = `data:image/svg+xml;base64,${readFileSync(join(process.cwd(), "public/brand/logo-mark.svg")).toString("base64")}`;

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
          <img src={markSrc} width={72} height={72} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>
              Priv<span style={{ color: GOLD }}>Infosec</span>
            </div>
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
