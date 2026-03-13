import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TrackFooter from "@/components/TrackFooter";

export const metadata: Metadata = {
  title: "Ackovate Trading | Algorithmic Futures",
  description: "Live algorithmic trading performance - MNQ Momentum Strategy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="main-content" style={{ paddingTop: "64px" }}>{children}</main>
        <TrackFooter />
      </body>
    </html>
  );
}
