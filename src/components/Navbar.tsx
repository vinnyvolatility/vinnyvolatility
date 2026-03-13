"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "IBKR" },
  { href: "/tradovate", label: "Tradovate" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="nav-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        background: "var(--nav-bg)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 32px",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: "var(--text-secondary)",
          textDecoration: "none",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        Vinny Volatility
      </Link>

      <div className="nav-links" style={{ position: "absolute", right: "32px", display: "flex", gap: "4px" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                background: isActive ? "var(--accent-light)" : "transparent",
                border: isActive
                  ? "1px solid rgba(99, 102, 241, 0.2)"
                  : "1px solid transparent",
                transition: "all 0.15s ease",
                letterSpacing: "0.5px",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
