import type { Metadata } from "next";
import {
  Anton,
  Inter,
  JetBrains_Mono,
  Caveat,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ui/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import AmbientLayer from "@/components/ui/AmbientLayer";
import IntroOverlay from "@/components/ui/IntroOverlay";
import { CursorProvider } from "@/components/ui/cursor-context";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const script = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-script",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blackwood Reserve — Single Barrel Highland Whisky",
  description:
    "Twenty-five winters in oak. Five hundred bottles released. Bottled at the family estate above Loch Avon since 1887.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${script.variable} ${serif.variable}`}
    >
      <body className="font-body antialiased">
        <CursorProvider>
          <AmbientLayer />
          <LenisProvider>
            <main className="relative z-10">{children}</main>
          </LenisProvider>
          <CustomCursor />
          <IntroOverlay />
        </CursorProvider>
      </body>
    </html>
  );
}
