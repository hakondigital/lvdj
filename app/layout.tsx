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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lvdj.vercel.app";
const SITE_NAME = "LV DJ";
const TITLE = "LV DJ — Sydney Open-Format DJ for Hire";
const DESCRIPTION =
  "Sydney-based open-format DJ. House, techno, hip-hop, throwbacks, current bangers. Booking 16ths, 17ths, 18ths, 21sts, formals, engagements, afters and club nights from $350.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · LV DJ",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Loukas V — LV DJ" }],
  creator: "LV DJ",
  publisher: "LV DJ",
  category: "Music",
  keywords: [
    "Sydney DJ",
    "DJ hire Sydney",
    "open-format DJ Sydney",
    "party DJ Sydney",
    "16th birthday DJ Sydney",
    "17th birthday DJ Sydney",
    "18th birthday DJ Sydney",
    "21st birthday DJ Sydney",
    "formal DJ Sydney",
    "engagement DJ Sydney",
    "wedding DJ Sydney",
    "club DJ Sydney",
    "house music DJ Sydney",
    "techno DJ Sydney",
    "LV DJ",
    "loukas DJ",
    "Loukas V",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LV DJ on the decks with a packed dancefloor in Sydney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
    creator: "@lv._.dj",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Schema.org LocalBusiness JSON-LD for SEO / rich-result eligibility.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "LV DJ",
  alternateName: "Loukas V",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  genre: ["House", "Techno", "Hip-Hop", "Open Format"],
  areaServed: {
    "@type": "City",
    name: "Sydney",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
  },
  sameAs: [
    "https://www.instagram.com/lv._.dj/",
    "https://www.instagram.com/loukas_.v._/",
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "AUD",
    lowPrice: "350",
    highPrice: "500",
    offerCount: "3",
  },
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
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="grain antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
