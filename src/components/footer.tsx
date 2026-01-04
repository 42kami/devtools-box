import { Braces } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
        <div className="flex items-center space-x-2">
          <Braces className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            © 2026 DevTools Box. 免费在线开发者工具集合
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <a href="mailto:contact@example.com" className="hover:text-foreground transition-colors">
            联系我们
          </a>
          <span>·</span>
          <a href="/privacy" className="hover:text-foreground transition-colors">
            隐私政策
          </a>
        </div>
      </div>
    </footer>
  )
}
