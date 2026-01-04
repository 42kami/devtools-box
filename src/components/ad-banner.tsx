export function AdBanner({ slot = "horizontal" }: { slot?: "horizontal" | "vertical" | "square" }) {
  const sizeClasses = {
    horizontal: "h-24 w-full",
    vertical: "h-[600px] w-[160px]",
    square: "h-[250px] w-[300px]",
  }

  return (
    <div
      className={`${sizeClasses[slot]} bg-muted/50 rounded-lg border border-dashed border-muted-foreground/25 flex items-center justify-center`}
    >
      <div className="text-center text-muted-foreground text-sm">
        <p>广告位</p>
        <p className="text-xs">Ad Space</p>
      </div>
      {/* 
        实际接入 Google AdSense 时替换为:
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXX"
          data-ad-slot="XXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true">
        </ins>
      */}
    </div>
  )
}
