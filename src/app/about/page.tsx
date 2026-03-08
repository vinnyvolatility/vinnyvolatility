export default function AboutPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: 800,
          letterSpacing: "-1px",
          marginBottom: "16px",
          color: "var(--text-primary)",
        }}
      >
        About
      </h1>
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.7,
          color: "var(--text-secondary)",
          marginBottom: "24px",
        }}
      >
        Algorithmic futures trader specializing in MNQ (Micro E-mini Nasdaq-100) momentum strategies.
        All trades are fully automated and executed in real-time.
      </p>
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "24px",
          color: "var(--text-muted)",
          fontSize: "14px",
        }}
      >
        More content coming soon — photos, strategy details, and trading philosophy.
      </div>
    </div>
  );
}
