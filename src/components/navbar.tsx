"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Braces, 
  FileCode, 
  GitCompare, 
  Binary, 
  Link as LinkIcon,
  Menu,
  X,
  Github
} from "lucide-react"
import { useState } from "react"

const tools = [
  { name: "JSON 格式化", href: "/json-formatter", icon: Braces },
  { name: "JSON 转 TS", href: "/json-to-ts", icon: FileCode },
  { name: "JSON 对比", href: "/json-diff", icon: GitCompare },
  { name: "Base64", href: "/base64", icon: Binary },
  { name: "URL 编解码", href: "/url-encode", icon: LinkIcon },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Braces className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">DevTools Box</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 flex-1">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === tool.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tool.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-accent"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-auto p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-4 space-y-2">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === tool.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tool.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
