import { Metadata } from "next"

export const metadata: Metadata = {
  title: "JSON Diff & Compare Tool",
  description: "Free online JSON diff tool. Compare two JSON objects and highlight differences. Supports deep nested comparison. No data uploaded.",
  keywords: ["JSON diff", "JSON compare", "JSON difference", "compare JSON online", "JSON对比"],
  alternates: {
    canonical: "/json-diff",
  },
}

export default function JsonDiffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
