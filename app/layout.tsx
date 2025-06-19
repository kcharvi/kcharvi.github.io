import "./globals.css";
import type { Metadata } from "next";
import { siteMetadata } from "app/data/siteMetadata";
import { Footer } from "./components/Footer";
import { BgGradient } from "./components/BgGradient";
import { cx } from "./lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Navbar from "app/components/Navbar";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  icons: {
    icon: "/favicon.ico",
    apple: "/ck_color_black_no_bg.svg",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: "/charvikusuma_overlay.png",
        width: 1280,
        height: 720,
        alt: siteMetadata.title,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`bg-bg-primary ${GeistMono.variable} ${GeistSans.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans md:max-w-7xl lg:mx-auto lg:flex-row">
        <main
          className={cx(
            "relative flex flex-1 flex-col overflow-x-hidden border-x border-border-primary/50",
          )}
        >
          <Navbar />
          <div className="grid flex-1 grid-cols-1 lg:grid-cols-[32px_1fr_32px]">
            <div className="hidden w-full border-r border-border-primary opacity-75 [background-image:linear-gradient(45deg,theme(colors.border-primary)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-primary)_50%,theme(colors.border-primary)_62.50%,transparent_62.50%,transparent_100%)] [background-size:5px_5px] lg:block"></div>
            <div className="relative col-span-1 px-3 lg:px-0">
              <BgGradient />
              {children}
            </div>
            <div className="hidden w-full border-l border-border-primary opacity-75 [background-image:linear-gradient(45deg,theme(colors.border-primary)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-primary)_50%,theme(colors.border-primary)_62.50%,transparent_62.50%,transparent_100%)] [background-size:5px_5px] lg:block"></div>
          </div>
          <Footer />
        </main>
        
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-585CBPX05B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-585CBPX05B');
          `}
        </Script>
      </body>
    </html>
  );
}
