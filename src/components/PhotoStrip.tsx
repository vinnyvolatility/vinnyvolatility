"use client";

export default function PhotoStrip() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px 48px" }}>
      <div
        className="photo-strip-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
          alignItems: "start",
        }}
      >
        {/* Marina - landscape */}
        <div
          className="photo-strip-item"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src="/photos/marina-boats.jpeg"
            alt="Marina"
            style={{
              width: "100%",
              display: "block",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
        </div>

        {/* Finley with blue water bowl */}
        <div
          className="photo-strip-item"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src="/photos/dog-beach-bowl.jpeg"
            alt="Finley at the beach"
            style={{
              width: "100%",
              display: "block",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
        </div>

        {/* Lighthouse */}
        <div
          className="photo-strip-item"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src="/photos/lighthouse.jpeg"
            alt="Lighthouse"
            style={{
              width: "100%",
              display: "block",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
        </div>
      </div>
    </div>
  );
}
