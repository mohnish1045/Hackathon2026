import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Orbit | Academic planner", description: "Your intelligent academic planning space." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
