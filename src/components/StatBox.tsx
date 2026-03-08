interface StatBoxProps {
  label: string;
  value: string;
  detail?: string;
  highlight?: boolean;
  positive?: boolean;
}

export default function StatBox({ label, value, detail, highlight, positive }: StatBoxProps) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: highlight
          ? "2px solid var(--accent)"
          : "1px solid var(--border)",
        borderRadius: "12px",
        padding: "20px",
        flex: "1 1 160px",
        minWidth: "140px",
        boxShadow: highlight
          ? "0 0 20px var(--accent-glow)"
          : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "8px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: highlight ? "28px" : "22px",
          fontWeight: 700,
          color:
            positive === undefined
              ? "var(--text-primary)"
              : positive
              ? "var(--green-text)"
              : "var(--red-text)",
          letterSpacing: "-0.5px",
        }}
      >
        {value}
      </div>
      {detail && (
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            marginTop: "4px",
          }}
        >
          {detail}
        </div>
      )}
    </div>
  );
}
