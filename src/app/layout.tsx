import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DevTools Box - Free Online Developer Tools",
    template: "%s | DevTools Box",
  },
  description: "Free online developer tools: JSON formatter, JSON to TypeScript, JSON diff, Base64 encoder/decoder, URL encoder. All processing happens locally - your data never leaves your browser.",
  keywords: ["JSON formatter", "JSON to TypeScript", "JSON diff", "Base64 encoder", "URL encoder", "developer tools", "online tools", "DevTools", "JSON格式化", "开发者工具"],
  authors: [{ name: "DevTools Box" }],
  creator: "DevTools Box",
  publisher: "DevTools Box",
  metadataBase: new URL("https://devtools-box-liart.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DevTools Box - Free Online Developer Tools",
    description: "Free online developer tools: JSON formatter, JSON to TypeScript, JSON diff, Base64, URL encoder. Privacy-first, no data uploaded.",
    url: "https://devtools-box-liart.vercel.app",
    siteName: "DevTools Box",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Box - Free Online Developer Tools",
    description: "Free online developer tools: JSON formatter, JSON to TypeScript, JSON diff, Base64, URL encoder.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // 添加 Google Search Console 验证码
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2590693054180835"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
