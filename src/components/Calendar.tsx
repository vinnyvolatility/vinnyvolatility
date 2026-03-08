"use client";

import { useEffect, useState } from "react";
import StatBox from "./StatBox";

interface DayData {
  pnl: number;
  trades: number;
  wins: number;
  losses: number;
}

type PnlData = Record<string, DayData>;

interface CalendarProps {
  title: string;
  subtitle: string;
  dataUrl: string;
  startDate: string;
  excludeStart?: string;
  excludeEnd?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_HEADERS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function formatPnl(pnl: number): string {
  const sign = pnl >= 0 ? "+" : "";
  return `${sign}$${Math.round(pnl).toLocaleString()}`;
}

function formatPnlExact(pnl: number): string {
  const sign = pnl >= 0 ? "+" : "";
  return `${sign}$${pnl.toFixed(2)}`;
}

function getMonthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export default function Calendar({
  title,
  subtitle,
  dataUrl,
  startDate,
  excludeStart,
  excludeEnd,
}: CalendarProps) {
  const [data, setData] = useState<PnlData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(dataUrl)
      .then((r) => r.json())
      .then((d: PnlData) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dataUrl]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0", color: "var(--text-muted)" }}>
        Loading...
      </div>
    );
  }

  // Filter data
  const filteredData: PnlData = {};
  const exStart = excludeStart ? new Date(excludeStart) : null;
  const exEnd = excludeEnd ? new Date(excludeEnd) : null;
  const start = new Date(startDate);

  for (const [dateStr, dayData] of Object.entries(data)) {
    const d = new Date(dateStr);
    if (d < start) continue;
    if (exStart && exEnd && d >= exStart && d <= exEnd) continue;
    filteredData[dateStr] = dayData;
  }

  // Compute stats
  const days = Object.entries(filteredData);
  const totalPnl = days.reduce((s, [, d]) => s + d.pnl, 0);
  const totalTrades = days.reduce((s, [, d]) => s + d.trades, 0);
  const totalWins = days.reduce((s, [, d]) => s + d.wins, 0);
  const totalLosses = days.reduce((s, [, d]) => s + d.losses, 0);
  const winningDays = days.filter(([, d]) => d.pnl > 0).length;
  const losingDays = days.filter(([, d]) => d.pnl < 0).length;
  const tradingDays = days.length;
  const dayWinRate = tradingDays > 0 ? ((winningDays / tradingDays) * 100).toFixed(0) : "0";
  const tradeWinRate = totalTrades > 0 ? ((totalWins / totalTrades) * 100).toFixed(0) : "0";
  const avgDaily = tradingDays > 0 ? totalPnl / tradingDays : 0;

  const pnlValues = days.map(([, d]) => d.pnl);
  const bestDay = pnlValues.length > 0 ? Math.max(...pnlValues) : 0;
  const worstDay = pnlValues.length > 0 ? Math.min(...pnlValues) : 0;
  const bestDate = days.find(([, d]) => d.pnl === bestDay)?.[0] || "";
  const worstDate = days.find(([, d]) => d.pnl === worstDay)?.[0] || "";

  // Group by month
  const months: Map<string, { year: number; month: number; days: Map<number, DayData> }> = new Map();
  for (const [dateStr, dayData] of Object.entries(filteredData)) {
    const d = new Date(dateStr);
    const key = getMonthKey(d.getFullYear(), d.getMonth());
    if (!months.has(key)) {
      months.set(key, { year: d.getFullYear(), month: d.getMonth(), days: new Map() });
    }
    months.get(key)!.days.set(d.getDate(), dayData);
  }

  // Also include months between start and latest date even if no data
  const sortedDates = Object.keys(filteredData).sort();
  if (sortedDates.length > 0) {
    const firstDate = new Date(startDate);
    const lastDate = new Date(sortedDates[sortedDates.length - 1]);
    const cur = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
    while (cur <= lastDate) {
      const key = getMonthKey(cur.getFullYear(), cur.getMonth());
      if (!months.has(key)) {
        months.set(key, { year: cur.getFullYear(), month: cur.getMonth(), days: new Map() });
      }
      cur.setMonth(cur.getMonth() + 1);
    }
  }

  const sortedMonths = [...months.entries()].sort(([a], [b]) => a.localeCompare(b));

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 800,
            margin: "0 0 6px 0",
            letterSpacing: "-1px",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>{subtitle}</p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "36px",
        }}
      >
        <StatBox
          label="Total P&L"
          value={formatPnlExact(totalPnl)}
          detail={`${tradingDays} trading days`}
          highlight
          positive={totalPnl >= 0}
        />
        <StatBox
          label="Day Win Rate"
          value={`${dayWinRate}%`}
          detail={`${winningDays}W / ${losingDays}L`}
        />
        <StatBox
          label="Trade Win Rate"
          value={`${tradeWinRate}%`}
          detail={`${totalWins}W / ${totalLosses}L of ${totalTrades}`}
        />
        <StatBox
          label="Avg Daily"
          value={formatPnlExact(avgDaily)}
          positive={avgDaily >= 0}
        />
        <StatBox
          label="Best Day"
          value={formatPnlExact(bestDay)}
          detail={bestDate}
          positive
        />
        <StatBox
          label="Worst Day"
          value={formatPnlExact(worstDay)}
          detail={worstDate}
          positive={false}
        />
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: "20px",
        }}
      >
        {sortedMonths.map(([key, monthData]) => (
          <MonthCard key={key} {...monthData} filteredData={filteredData} excludeStart={exStart} excludeEnd={exEnd} />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          fontSize: "12px",
          color: "var(--text-muted)",
        }}
      >
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </div>
    </div>
  );
}

function MonthCard({
  year,
  month,
  days,
  filteredData,
  excludeStart,
  excludeEnd,
}: {
  year: number;
  month: number;
  days: Map<number, DayData>;
  filteredData: PnlData;
  excludeStart: Date | null;
  excludeEnd: Date | null;
}) {
  const monthPnl = [...days.values()].reduce((s, d) => s + d.pnl, 0);

  // Build calendar grid (Mon-Fri only)
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();

  // Day of week: 0=Sun, adjust so Mon=0
  const startDow = (firstDay.getDay() + 6) % 7; // Mon=0, Tue=1, ..., Sun=6

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(5).fill(null); // Mon-Fri

  // Fill initial blanks
  let dayNum = 1;
  let dow = startDow;

  while (dayNum <= totalDays) {
    if (dow < 5) {
      // Weekday
      week[dow] = dayNum;
    }
    dow++;
    if (dow >= 7) {
      weeks.push(week);
      week = Array(5).fill(null);
      dow = 0;
    }
    dayNum++;
  }
  // Push last week if it has data
  if (week.some((d) => d !== null)) {
    weeks.push(week);
  }

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Month Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          borderBottom: "1px solid var(--border-light)",
          background: "var(--bg-primary)",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--text-primary)" }}>
          {MONTH_NAMES[month]} {year}
        </span>
        <span
          style={{
            fontWeight: 700,
            fontSize: "14px",
            color: monthPnl >= 0 ? "var(--green-text)" : "var(--red-text)",
          }}
        >
          {formatPnl(monthPnl)}
        </span>
      </div>

      {/* Day Headers */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            {DAY_HEADERS.map((d) => (
              <th
                key={d}
                style={{
                  padding: "10px 0",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  textAlign: "center",
                }}
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((w, wi) => (
            <tr key={wi}>
              {w.map((dayNum, di) => {
                if (dayNum === null) {
                  return <td key={di} style={{ padding: "4px" }} />;
                }

                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                const dateObj = new Date(dateStr);
                const isExcluded =
                  excludeStart && excludeEnd && dateObj >= excludeStart && dateObj <= excludeEnd;
                const dayData = days.get(dayNum);

                let bgColor = "transparent";
                let borderColor = "transparent";
                let pnlColor = "var(--text-muted)";
                let pnlText = "";

                if (isExcluded) {
                  bgColor = "var(--zero-bg)";
                } else if (dayData) {
                  if (dayData.pnl > 0) {
                    bgColor = "var(--green-bg)";
                    borderColor = "var(--green-border)";
                    pnlColor = "var(--green-text)";
                  } else if (dayData.pnl < 0) {
                    bgColor = "var(--red-bg)";
                    borderColor = "var(--red-border)";
                    pnlColor = "var(--red-text)";
                  } else {
                    bgColor = "var(--zero-bg)";
                    borderColor = "var(--zero-border)";
                  }
                  pnlText = formatPnl(dayData.pnl);
                }

                return (
                  <td key={di} style={{ padding: "3px" }}>
                    <div
                      style={{
                        background: bgColor,
                        border: dayData ? `1px solid ${borderColor}` : "1px solid transparent",
                        borderRadius: "8px",
                        padding: "6px 4px",
                        height: "68px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.1s ease, box-shadow 0.1s ease",
                        cursor: dayData ? "default" : "auto",
                      }}
                      onMouseEnter={(e) => {
                        if (dayData) {
                          e.currentTarget.style.transform = "scale(1.04)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "0 4px" }}>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: dayData ? "var(--text-secondary)" : "var(--text-muted)",
                          }}
                        >
                          {dayNum}
                        </span>
                        {dayData && (
                          <span style={{ fontSize: "9px", fontWeight: 500, color: "var(--text-muted)" }}>
                            {dayData.trades}t
                          </span>
                        )}
                      </div>
                      {pnlText && (
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: pnlColor,
                            marginTop: "4px",
                          }}
                        >
                          {pnlText}
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
