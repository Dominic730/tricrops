import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

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
  title: "Tripcrops",
  description: "Sell your spices directly to us on Tripcrops with free pickup. We make it easy to sell your fresh spices, and you can also purchase a wide range of agricultural tools to support your farming needs. Join us today and take your farming business to the next level!",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <div className="flex md:hidden justify-center gap-5 pt-5">
          <Link href="/buy">
            <Button variant="link" className="text-lg font-bold">Buy</Button>
          </Link>
          <Link href="/sell">
            <Button variant="link" className="text-lg font-bold">Sell</Button>
          </Link>
        </div>
        
        <main>{children}</main>
      </body>
    </html>
  );
}
