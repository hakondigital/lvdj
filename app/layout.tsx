import type { Metadata, Viewport } from "next";
import { Anton, Bebas_Neue, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lvdj.com.au"),
  title: {
    default: "LV DJ — Sydney's Loudest Bad Decision",
    template: "%s · LV DJ",
  },
  description:
    "LV DJ — Sydney-based DJ for parties, 16ths, 17ths, 18ths, 21sts, afters and club nights. Book the Gold, Silver, or Bronze package.",
  keywords: [
    "Sydney DJ",
    "party DJ Sydney",
    "16th DJ Sydney",
    "18th DJ Sydney",
    "21st DJ Sydney",
    "wedding DJ Sydney",
    "LV DJ",
    "loukas dj",
  ],
  openGraph: {
    title: "LV DJ — Sydney's Loudest Bad Decision",
    description:
      "I make YOUR bad decisions sound better. Sydney DJ for parties, afters, and club nights.",
    type: "website",
    locale: "en_AU",
    siteName: "LV DJ",
  },
  twitter: {
    card: "summary_large_image",
    title: "LV DJ",
    description: "Sydney DJ. Book a night.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bebas.variable} ${space.variable} ${mono.variable}`}
    >
      <body className="grain antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
