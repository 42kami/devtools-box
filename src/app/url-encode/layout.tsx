import { Metadata } from "next"

export const metadata: Metadata = {
  title: "URL Encoder & Decoder",
  description: "Free online URL encoder and decoder. Supports encodeURI and encodeURIComponent. Encode special characters for URLs. No data uploaded.",
  keywords: ["URL encoder", "URL decoder", "encodeURI", "encodeURIComponent", "URL encoding tool"],
  alternates: {
    canonical: "/url-encode",
  },
}

export default function UrlEncodeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
