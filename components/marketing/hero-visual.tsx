import { MonogramArt, monogramViewBox } from "@/components/brand/logo";

/**
 * Original abstract hero illustration (server-rendered SVG, no JS).
 *
 * Concept: the PrivInfosec monogram at the centre; the four practice
 * areas (Privacy, Security, Governance, Risk) as principal nodes; the
 * operating approach (Assess · Design · Implement · Support) as an outer
 * orbit; quiet lines flowing inward. Colours come from tokens; the single
 * understated line animation stops under prefers-reduced-motion.
 */

const C = 280; // centre
const R_PRINCIPAL = 172;
const R_OUTER = 238;

const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (r: number, deg: number) => ({
  x: +(C + r * Math.cos(rad(deg))).toFixed(2),
  y: +(C + r * Math.sin(rad(deg))).toFixed(2),
});

const principal = [
  { label: "PRIVACY", deg: -135 },
  { label: "SECURITY", deg: -45 },
  { label: "GOVERNANCE", deg: 45 },
  { label: "RISK", deg: 135 },
].map((p) => ({ ...p, ...pt(R_PRINCIPAL, p.deg) }));

const orbitLabels = [
  { label: "ASSESS", deg: -90 },
  { label: "DESIGN", deg: 0 },
  { label: "IMPLEMENT", deg: 90 },
  { label: "SUPPORT", deg: 180 },
].map((o) => ({ ...o, ...pt(R_OUTER, o.deg) }));

const secondary = [-162, -114, -66, -18, 18, 66, 114, 162].map((deg) => ({ deg, ...pt(R_OUTER, deg) }));

// Each secondary node connects to its nearest principal node with a curve.
const nearestPrincipal = (deg: number) =>
  principal.reduce((best, p) => {
    const d = Math.abs(((deg - p.deg + 540) % 360) - 180);
    const bd = Math.abs(((deg - best.deg + 540) % 360) - 180);
    return d < bd ? p : best;
  });

export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 560"
      role="img"
      aria-label="Abstract illustration: the PrivInfosec monogram connected to privacy, security, governance and risk, surrounded by the assess, design, implement and support cycle."
      className={className}
    >
      {/* Orbits */}
      <circle cx={C} cy={C} r={R_OUTER} fill="none" stroke="var(--border)" strokeWidth={1} />
      <circle cx={C} cy={C} r={R_PRINCIPAL} fill="none" stroke="var(--border)" strokeWidth={1} strokeDasharray="1 6" />
      <circle cx={C} cy={C} r={92} fill="var(--background)" stroke="var(--border-accent)" strokeWidth={1} />

      {/* Cross hairs — regulatory grid */}
      <g stroke="var(--grid-line)" strokeWidth={1}>
        <line x1={C} y1={20} x2={C} y2={540} />
        <line x1={20} y1={C} x2={540} y2={C} />
      </g>

      {/* Secondary → principal data paths */}
      <g fill="none" strokeWidth={1}>
        {secondary.map((s) => {
          const p = nearestPrincipal(s.deg);
          const cx = +((s.x + p.x) / 2 + (C - (s.x + p.x) / 2) * 0.25).toFixed(2);
          const cy = +((s.y + p.y) / 2 + (C - (s.y + p.y) / 2) * 0.25).toFixed(2);
          return <path key={s.deg} d={`M${s.x} ${s.y} Q${cx} ${cy} ${p.x} ${p.y}`} stroke="var(--border-strong)" />;
        })}
      </g>

      {/* Principal → shield flows (animated) */}
      <g fill="none" strokeWidth={1.25} strokeLinecap="round">
        {principal.map((p, i) => {
          const end = pt(92, p.deg);
          return (
            <g key={p.label}>
              <line x1={p.x} y1={p.y} x2={end.x} y2={end.y} stroke="var(--border-accent)" />
              <line
                x1={p.x}
                y1={p.y}
                x2={end.x}
                y2={end.y}
                stroke="var(--accent)"
                className="animate-flow"
                style={{ animationDelay: `${i * -0.6}s` }}
              />
            </g>
          );
        })}
      </g>

      {/* Monogram */}
      <svg x={C - 38} y={C - 54} width={76} height={108} viewBox={monogramViewBox} color="var(--foreground)" aria-hidden="true">
        <MonogramArt />
      </svg>

      {/* Secondary nodes */}
      {secondary.map((s) => (
        <circle key={s.deg} cx={s.x} cy={s.y} r={3} fill="var(--background)" stroke="var(--muted-foreground)" strokeWidth={1} />
      ))}

      {/* Principal nodes + labels */}
      {principal.map((p) => {
        const left = p.x < C;
        const top = p.y < C;
        return (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r={12} fill="var(--background)" stroke="var(--border-accent)" strokeWidth={1} />
            <circle cx={p.x} cy={p.y} r={3.5} fill="var(--accent)" />
            <text
              x={p.x + (left ? -22 : 22)}
              y={p.y + (top ? -14 : 24)}
              textAnchor={left ? "end" : "start"}
              fontSize={11}
              fontWeight={600}
              letterSpacing="0.12em"
              fill="var(--foreground)"
            >
              {p.label}
            </text>
          </g>
        );
      })}

      {/* Approach orbit chips */}
      {orbitLabels.map((o) => {
        const w = o.label.length * 7.2 + 22;
        return (
          <g key={o.label} transform={`translate(${o.x} ${o.y})`}>
            <rect x={-w / 2} y={-11} width={w} height={22} rx={11} fill="var(--background)" stroke="var(--border-strong)" />
            <text textAnchor="middle" y={3.6} fontSize={9.5} fontWeight={600} letterSpacing="0.12em" fill="var(--muted-foreground)">
              {o.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
