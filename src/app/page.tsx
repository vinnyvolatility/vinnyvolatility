import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <Calendar
      title="MNQ Momentum Strategy"
      subtitle="Interactive Brokers — Live Trading Performance"
      dataUrl="/data/pnl_data.json"
      startDate="2026-01-21"
      excludeStart="2026-01-26"
      excludeEnd="2026-02-10"
    />
  );
}
