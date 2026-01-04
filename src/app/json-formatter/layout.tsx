import { Metadata } from "next"

export const metadata: Metadata = {
  title: "JSON Formatter & Validator",
  description: "Free online JSON formatter, beautifier, minifier and validator. Format, compress and validate JSON data with syntax highlighting. No data uploaded.",
  keywords: ["JSON formatter", "JSON beautifier", "JSON minifier", "JSON validator", "online JSON tool", "JSON格式化"],
  alternates: {
    canonical: "/json-formatter",
  },
}

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
