import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder",
  description: "Free online Base64 encoder and decoder. Encode/decode text and images to Base64. Supports image to Base64 conversion. No data uploaded.",
  keywords: ["Base64 encoder", "Base64 decoder", "image to Base64", "Base64 converter", "Base64编码"],
  alternates: {
    canonical: "/base64",
  },
}

export default function Base64Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
