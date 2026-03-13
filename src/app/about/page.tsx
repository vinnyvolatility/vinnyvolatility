"use client";

const PHOTOS = [
  { src: "/photos/dog-sunset.jpeg", alt: "Beach sunset" },
  { src: "/photos/dog-railroad.jpeg", alt: "Railroad adventure" },
  { src: "/photos/marina-view.jpeg", alt: "Marina" },
  { src: "/photos/dog-beach-frisbee.jpeg", alt: "Beach vibes" },
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 24px" }}>
      {/* Hero Section */}
      <div
        className="about-hero"
        style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "48px",
          height: "360px",
        }}
      >
        <img
          src="/photos/dog-sunset.jpeg"
          alt="Beach sunset"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 65%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "40px 36px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          }}
        >
          <h1
            className="about-hero-title"
            style={{
              fontSize: "40px",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 8px 0",
              letterSpacing: "-1.5px",
            }}
          >
            Ackovate Trading
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.8)",
              margin: 0,
            }}
          >
            Algorithmic Futures Trading
          </p>
        </div>
      </div>

      {/* About Text */}
      <div style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "16px",
            letterSpacing: "-0.5px",
          }}
        >
          About
        </h2>
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
            marginBottom: "16px",
            maxWidth: "700px",
          }}
        >
          Fully automated algorithmic trading system specializing in MNQ
          (Micro E-mini Nasdaq-100) momentum strategies. Every trade is
          generated and executed by code — no manual intervention, no
          emotions, just data-driven decisions.
        </p>
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
            maxWidth: "700px",
          }}
        >
          The system monitors real-time market data, identifies momentum
          setups using technical indicators, and manages positions with
          dynamic EMA-based exits and multi-tier stop losses.
        </p>
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
            maxWidth: "700px",
            marginTop: "16px",
          }}
        >
          Minnesota Wild 2026 Stanley Cup Champions.
        </p>
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
            maxWidth: "700px",
            marginTop: "16px",
          }}
        >
          Adam is gay
        </p>
      </div>

      {/* Stats Cards */}
      <div
        className="about-stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "48px",
        }}
      >
        {[
          { label: "Strategy", value: "Momentum" },
          { label: "Instrument", value: "MNQ Futures" },
          { label: "Execution", value: "Fully Automated" },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
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
              {item.label}
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Photo Gallery */}
      <h2
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "20px",
          letterSpacing: "-0.5px",
        }}
      >
        Gallery
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "12px",
          marginBottom: "60px",
        }}
      >
        {PHOTOS.slice(1).map((photo) => (
          <div
            key={photo.src}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              aspectRatio: "4/3",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
              e.currentTarget.style.transition = "all 0.2s ease";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
