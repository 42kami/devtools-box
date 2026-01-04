"use client"

import { useEffect } from "react"

// 广告单元ID - devtools-banner
const AD_SLOT_ID = "9559612971"

export function AdBanner({ slot = "horizontal" }: { slot?: "horizontal" | "vertical" | "square" }) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error("AdSense error:", e)
    }
  }, [])

  return (
    <div className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2590693054180835"
        data-ad-slot={AD_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
