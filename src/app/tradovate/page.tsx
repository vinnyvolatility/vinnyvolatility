import Calendar from "@/components/Calendar";

export default function TradovatePage() {
  return (
    <Calendar
      title="MNQ Momentum Strategy"
      subtitle="Tradovate — Live Trading Performance"
      dataUrl="/data/pnl_data_tradovate.json"
      startDate="2026-03-01"
    />
  );
}
