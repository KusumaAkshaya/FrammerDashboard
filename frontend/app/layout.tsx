import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./componentNav/Navbar";
import ClientLayout from "./components/ClientLayout";// new file

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frammer Dashboard",
  description: "Content Production Analytics Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}
      >
        <Navbar />

        {/* CLIENT SIDE SPLIT LOGIC */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}