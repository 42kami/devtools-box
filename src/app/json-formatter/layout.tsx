import { Metadata } from "next"

export const metadata: Metadata = {
  title: "JSON 格式化工具 - DevTools Box",
  description: "免费在线 JSON 格式化、压缩、验证工具。支持语法高亮、自定义缩进、一键复制下载。",
  keywords: ["JSON格式化", "JSON美化", "JSON压缩", "JSON验证", "在线JSON工具"],
}

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
