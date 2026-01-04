import { Metadata } from "next"

export const metadata: Metadata = {
  title: "JSON 对比工具 - DevTools Box",
  description: "免费在线 JSON 对比工具，快速找出两个 JSON 数据的差异，支持深层嵌套对比。",
  keywords: ["JSON对比", "JSON差异", "JSON比较", "在线JSON工具"],
}

export default function JsonDiffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
