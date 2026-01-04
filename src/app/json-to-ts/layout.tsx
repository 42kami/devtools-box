import { Metadata } from "next"

export const metadata: Metadata = {
  title: "JSON to TypeScript Converter",
  description: "Free online JSON to TypeScript converter. Automatically generate TypeScript interfaces and types from JSON data. No data uploaded.",
  keywords: ["JSON to TypeScript", "JSON to TS", "TypeScript generator", "type generator", "JSON转TS"],
  alternates: {
    canonical: "/json-to-ts",
  },
}

export default function JsonToTsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
