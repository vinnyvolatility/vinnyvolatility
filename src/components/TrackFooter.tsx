"use client";

export default function TrackFooter() {
  const tieCount = 120;
  const tieSpacing = 14;
  const totalWidth = tieCount * tieSpacing;

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        padding: "32px 0 20px",
        background: "linear-gradient(to bottom, var(--bg-primary), #eef0f4)",
      }}
    >
      {/* Railroad tracks - top-down view */}
      <svg
        viewBox={`0 0 ${totalWidth} 60`}
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "50px",
          display: "block",
        }}
      >
        {/* Cross ties (sleepers) */}
        {Array.from({ length: tieCount }, (_, i) => (
          <rect
            key={i}
            x={i * tieSpacing + 3}
            y={10}
            width={8}
            height={40}
            rx={1.5}
            fill="#c4b8a8"
            stroke="#b0a490"
            strokeWidth={0.8}
          />
        ))}

        {/* Left rail */}
        <rect x={0} y={18} width={totalWidth} height={5} rx={1.5} fill="#8a8a8a" />
        <rect x={0} y={19} width={totalWidth} height={1.5} fill="#a0a0a0" opacity={0.5} />

        {/* Right rail */}
        <rect x={0} y={37} width={totalWidth} height={5} rx={1.5} fill="#8a8a8a" />
        <rect x={0} y={38} width={totalWidth} height={1.5} fill="#a0a0a0" opacity={0.5} />
      </svg>

      {/* Footer text */}
      <div
        style={{
          textAlign: "center",
          marginTop: "12px",
          fontSize: "11px",
          fontWeight: 500,
          color: "var(--text-muted)",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        Ackovate Trading
      </div>
    </div>
  );
}
