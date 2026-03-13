interface StatBoxProps {
  label: string;
  value: string;
  detail?: string;
  highlight?: boolean;
  positive?: boolean;
  hideOnMobile?: boolean;
}

export default function StatBox({ label, value, detail, highlight, positive, hideOnMobile }: StatBoxProps) {
  return (
    <div
      className={`stat-box${hideOnMobile ? " stat-box-hide-mobile" : ""}`}
      style={{
        background: "var(--bg-card)",
        border: highlight
          ? "1.5px solid var(--accent)"
          : "1px solid var(--border)",
        borderRadius: "6px",
        padding: "8px 10px",
        boxShadow: highlight
          ? "0 0 12px var(--accent-glow)"
          : "none",
      }}
    >
      <div
        style={{
          fontSize: "9px",
          fontWeight: 600,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.3px",
          marginBottom: "2px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: highlight ? "15px" : "13px",
          fontWeight: 700,
          color:
            positive === undefined
              ? "var(--text-primary)"
              : positive
              ? "var(--green-text)"
              : "var(--red-text)",
          letterSpacing: "-0.3px",
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
      {detail && (
        <div
          style={{
            fontSize: "9px",
            color: "var(--text-muted)",
            marginTop: "1px",
          }}
        >
          {detail}
        </div>
      )}
    </div>
  );
}
