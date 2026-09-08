import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  IBM_Plex_Sans,
  Permanent_Marker,
} from "next/font/google";
import "./globals.css";
// Ships `html.lenis` height fixes and the `.lenis-stopped` overflow clip that
// makes lenis.stop() actually hold the page still.
import "lenis/dist/lenis.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { BookCallModal } from "@/components/BookCallModal";
import { SmoothScroll } from "@/components/SmoothScroll";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Marker face used only for the program card titles.
const marker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Delphi Education Hub — Personalized Online Tutoring",
  description:
    "Online tutoring and academic support services that help learners improve through teaching shaped around their needs and pace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${plex.variable} ${marker.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white text-ink">
        {/* Framer Motion server-renders its reveal targets at opacity:0 and
            animates them in on the client. Without JS that content would never
            appear, so force it visible when scripts do not run. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SmoothScroll>
          <NavBar />
          <main className="flex-1 pt-[var(--header-h)]">{children}</main>
          <Footer />
          <BookCallModal />
        </SmoothScroll>
      </body>
    </html>
  );
}
