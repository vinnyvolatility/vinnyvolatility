import Calendar from "@/components/Calendar";
import PhotoStrip from "@/components/PhotoStrip";

export default function Home() {
  return (
    <>
      <Calendar
        title="Ackovate Trading"
        subtitle="Interactive Brokers — Live MNQ Momentum Performance"
        dataUrl="/data/pnl_data.json"
        startDate="2026-01-21"
        excludeStart="2026-01-26"
        excludeEnd="2026-02-10"
      />
      <PhotoStrip />
    </>
  );
}
