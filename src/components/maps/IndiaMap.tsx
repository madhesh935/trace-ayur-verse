// Stylized supply chain / India map SVG component (no external map library)
export function IndiaMap({ markers = [] as { lat: number; lng: number; label?: string; tone?: string }[] }) {
  // Project lat/lng (India bounds approx) onto an 800x900 viewBox
  const project = (lat: number, lng: number) => {
    const x = ((lng - 68) / (97 - 68)) * 800;
    const y = ((37 - lat) / (37 - 8)) * 900;
    return { x, y };
  };

  return (
    <div className="relative w-full aspect-[8/9] rounded-xl overflow-hidden border border-border bg-gradient-to-br from-emerald/5 via-background to-leaf/10">
      <svg viewBox="0 0 800 900" className="w-full h-full">
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.6" fill="oklch(0.32 0.07 155 / 0.25)" />
          </pattern>
          <radialGradient id="pulse" cx="50%" cy="50%">
            <stop offset="0%" stopColor="oklch(0.68 0.17 155 / 0.6)" />
            <stop offset="100%" stopColor="oklch(0.68 0.17 155 / 0)" />
          </radialGradient>
        </defs>
        <rect width="800" height="900" fill="url(#dots)" />
        {/* Stylized India landmass outline */}
        <path
          d="M280 80 L380 70 L460 110 L520 95 L560 140 L600 180 L640 240 L660 320 L640 400 L600 470 L560 540 L500 610 L450 690 L400 760 L360 810 L320 830 L290 800 L260 740 L220 680 L190 600 L170 520 L150 440 L160 360 L180 290 L210 220 L240 150 Z"
          fill="oklch(0.96 0.02 130)"
          stroke="oklch(0.32 0.07 155 / 0.4)"
          strokeWidth="2"
        />
        {/* Markers */}
        {markers.map((m, i) => {
          const { x, y } = project(m.lat, m.lng);
          const color = m.tone === "warn" ? "oklch(0.78 0.16 65)" : m.tone === "danger" ? "oklch(0.58 0.22 25)" : "oklch(0.55 0.15 155)";
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="20" fill="url(#pulse)">
                <animate attributeName="r" values="14;28;14" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r="5" fill={color} stroke="white" strokeWidth="2" />
              {m.label && (
                <text x={x + 10} y={y - 8} fontSize="11" fontWeight="600" fill="oklch(0.22 0.04 155)">
                  {m.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-3 left-3 bg-card/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 border border-border">
        <span className="size-2 rounded-full bg-emerald animate-pulse" /> Live GPS · India
      </div>
    </div>
  );
}
