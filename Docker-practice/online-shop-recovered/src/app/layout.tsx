import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sony Interior - Modern Furniture & Home Décor",
  description: "Discover sophisticated furniture designs and elegant home décor at Sony Interior. Transform your space with our curated collection of modern interior pieces.",
  keywords: ["furniture", "interior design", "home décor", "modern furniture", "sofas", "chairs", "tables"],
  authors: [{ name: "Sony Interior" }],
  openGraph: {
    title: "Sony Interior - Modern Furniture & Home Décor",
    description: "Discover sophisticated furniture designs and elegant home décor at Sony Interior.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1f25",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={inter.className}>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <ChatWidget/>
        <Footer/>
      </body>
    </html>
  );
}
