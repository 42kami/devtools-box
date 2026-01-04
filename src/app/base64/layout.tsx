import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Base64 编解码 - DevTools Box",
  description: "免费在线 Base64 编解码工具，支持文本编解码和图片转 Base64。",
  keywords: ["Base64编码", "Base64解码", "图片转Base64", "在线Base64工具"],
}

export default function Base64Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
