import type { Metadata } from "next";
import Script from "next/script";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevTools Box - 免费在线开发者工具箱",
  description: "免费在线开发者工具集合：JSON格式化、JSON转TypeScript、JSON对比、Base64编解码、URL编解码等实用工具",
  keywords: ["JSON格式化", "JSON转TS", "Base64", "开发者工具", "在线工具", "DevTools"],
  authors: [{ name: "DevTools Box" }],
  openGraph: {
    title: "DevTools Box - 免费在线开发者工具箱",
    description: "免费在线开发者工具集合：JSON格式化、JSON转TypeScript、JSON对比、Base64编解码等",
    type: "website",
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
        {/* Google AdSense - 替换 ca-pub-XXXXXXX 为你的发布商ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
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
