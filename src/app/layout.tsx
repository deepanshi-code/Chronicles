import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundGlow from "@/components/BackgroundGlow";
import GalaxyBackground from "@/components/GalaxyBackground";
import GrainOverlay from "@/components/GrainOverlay";
import PageTransition from "@/components/PageTransition";
import SectionRail from "@/components/SectionRail";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deepanshi Agarwal — Portfolio",
  description:
    "AI & ML enthusiast and B.Tech CSE student building full-stack and machine learning projects. Explore my projects, skills, and get in touch.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('theme')==='coral'){document.documentElement.setAttribute('data-theme','coral');}}catch(e){}})();",
          }}
        />
        <BackgroundGlow />
        <GalaxyBackground />
        <GrainOverlay />
        <SectionRail />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
