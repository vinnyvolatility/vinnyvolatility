import Calendar from "@/components/Calendar";

export default function TradovatePage() {
  return (
    <Calendar
      title="Ackovate Trading"
      subtitle="Tradovate — Live MNQ Momentum Performance"
      dataUrl="/data/pnl_data_tradovate.json"
      startDate="2026-03-01"
    />
  );
}
