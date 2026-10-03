/**
 * Original abstract hero illustration (server-rendered SVG, no JS).
 *
 * Concept: layered governance shield at the centre; the four practice
 * areas (Privacy, Security, Governance, Risk) as principal nodes; the
 * operating approach (Assess · Design · Implement · Support) as an outer
 * orbit; secure data paths flowing inward. Colours come from tokens, and
 * the flow animation stops under prefers-reduced-motion.
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

const shieldPath = "M16 2.75 27 6.6v8.15c0 6.6-4.55 11.6-11 14.5-6.45-2.9-11-7.9-11-14.5V6.6L16 2.75Z";
const shieldLayers = [
  { scale: 4.6, stroke: "var(--border-strong)", width: 1, dash: "2 5" },
  { scale: 3.6, stroke: "var(--border-accent)", width: 1 },
  { scale: 2.6, stroke: "url(#pi-metal)", width: 1.5 },
];

export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 560"
      role="img"
      aria-label="Abstract illustration: a layered governance shield connected to privacy, security, governance and risk, surrounded by the assess, design, implement and support cycle."
      className={className}
    >
      <defs>
        <linearGradient id="pi-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--palette-gold-300)" }} />
          <stop offset="50%" style={{ stopColor: "var(--palette-gold-500)" }} />
          <stop offset="100%" style={{ stopColor: "var(--palette-gold-700)" }} />
        </linearGradient>
        <radialGradient id="pi-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "var(--accent)", stopOpacity: 0.16 }} />
          <stop offset="100%" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Ambient glow */}
      <circle cx={C} cy={C} r={170} fill="url(#pi-glow)" />

      {/* Orbits */}
      <circle cx={C} cy={C} r={R_OUTER} fill="none" stroke="var(--border)" strokeWidth={1} />
      <circle cx={C} cy={C} r={R_PRINCIPAL} fill="none" stroke="var(--border)" strokeWidth={1} strokeDasharray="1 6" />
      <circle cx={C} cy={C} r={108} fill="none" stroke="var(--border)" strokeWidth={1} opacity={0.6} />

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
          const end = pt(70, p.deg);
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

      {/* Governance layers */}
      {shieldLayers.map((l) => (
        <g key={l.scale} transform={`translate(${C} ${C + 4}) scale(${l.scale}) translate(-16 -16)`}>
          <path
            d={shieldPath}
            fill="none"
            stroke={l.stroke}
            strokeWidth={l.width}
            strokeDasharray={l.dash}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}

      {/* Controls inside the shield: policy → process → evidence */}
      <g strokeLinecap="round">
        {[
          { y: C - 10, w: 30 },
          { y: C + 4, w: 44 },
          { y: C + 18, w: 22 },
        ].map((row, i) => (
          <g key={row.y}>
            <line x1={C - 22} y1={row.y} x2={C - 22 + row.w} y2={row.y} stroke="var(--muted-foreground)" strokeWidth={1.5} opacity={0.7} />
            <circle cx={C - 22 + row.w + 7} cy={row.y} r={2.5} fill={i === 1 ? "var(--accent)" : "var(--border-strong)"} />
          </g>
        ))}
      </g>

      {/* Secondary nodes */}
      {secondary.map((s) => (
        <circle key={s.deg} cx={s.x} cy={s.y} r={3} fill="var(--background)" stroke="var(--muted-foreground)" strokeWidth={1} />
      ))}

      {/* Principal nodes + labels */}
      {principal.map((p, i) => {
        const left = p.x < C;
        const top = p.y < C;
        return (
          <g key={p.label}>
            <circle
              cx={p.x}
              cy={p.y}
              r={14}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={1}
              className="animate-pulse-soft"
              style={{ animationDelay: `${i * 0.8}s` }}
            />
            <circle cx={p.x} cy={p.y} r={5} fill="var(--accent)" />
            <text
              x={p.x + (left ? -22 : 22)}
              y={p.y + (top ? -14 : 24)}
              textAnchor={left ? "end" : "start"}
              className="font-mono"
              fontSize={10.5}
              letterSpacing="0.14em"
              fill="var(--foreground)"
            >
              {p.label}
            </text>
          </g>
        );
      })}

      {/* Approach orbit chips */}
      {orbitLabels.map((o) => {
        const w = o.label.length * 7.4 + 20;
        return (
          <g key={o.label} transform={`translate(${o.x} ${o.y})`}>
            <rect x={-w / 2} y={-11} width={w} height={22} rx={11} fill="var(--background)" stroke="var(--border-strong)" />
            <text textAnchor="middle" y={3.6} className="font-mono" fontSize={9.5} letterSpacing="0.16em" fill="var(--muted-foreground)">
              {o.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
