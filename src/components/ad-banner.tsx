"use client"

import { useEffect } from "react"

interface AdBannerProps {
  slot?: "horizontal" | "vertical" | "square"
  adSlot?: string  // Google AdSense 广告单元ID
}

export function AdBanner({ slot = "horizontal", adSlot }: AdBannerProps) {
  const sizeConfig = {
    horizontal: { width: "100%", height: "90px" },
    vertical: { width: "160px", height: "600px" },
    square: { width: "300px", height: "250px" },
  }

  useEffect(() => {
    if (adSlot) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error("AdSense error:", e)
      }
    }
  }, [adSlot])

  // 如果没有配置广告单元ID，显示占位符
  if (!adSlot) {
    return (
      <div
        className={`${slot === "horizontal" ? "h-24 w-full" : slot === "vertical" ? "h-[600px] w-[160px]" : "h-[250px] w-[300px]"} bg-muted/50 rounded-lg border border-dashed border-muted-foreground/25 flex items-center justify-center`}
      >
        <div className="text-center text-muted-foreground text-sm">
          <p>广告位</p>
          <p className="text-xs">Ad Space</p>
        </div>
      </div>
    )
  }

  // 真正的 AdSense 广告
  return (
    <div className="ad-container">
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: sizeConfig[slot].width,
          height: sizeConfig[slot].height,
        }}
        data-ad-client="ca-pub-2590693054180835"
        data-ad-slot={adSlot}
        data-ad-format={slot === "horizontal" ? "horizontal" : "auto"}
        data-full-width-responsive="true"
      />
    </div>
  )
}
