import { Metadata } from "next"

export const metadata: Metadata = {
  title: "URL 编解码 - DevTools Box",
  description: "免费在线 URL 编解码工具，支持 encodeURI 和 encodeURIComponent。",
  keywords: ["URL编码", "URL解码", "encodeURI", "encodeURIComponent", "在线URL工具"],
}

export default function UrlEncodeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
