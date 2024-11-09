import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tripcrop",
  description: "Tripcrop is an website made for selling spices and buying farming tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed z-50 w-full">
          <Navbar />
        </div>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
