import { Metadata } from "next"

export const metadata: Metadata = {
  title: "JSON 转 TypeScript - DevTools Box",
  description: "免费在线 JSON 转 TypeScript 类型生成器。自动将 JSON 数据转换为 TS interface 或 type 定义。",
  keywords: ["JSON转TS", "JSON转TypeScript", "类型生成器", "TypeScript工具"],
}

export default function JsonToTsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
