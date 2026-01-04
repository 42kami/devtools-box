"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdBanner } from "@/components/ad-banner"
import { Copy, Check, Braces, Minimize2, Download, Trash2 } from "lucide-react"

export default function JsonFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setError("请输入 JSON 数据")
      setOutput("")
      return
    }
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
      setError("")
    } catch (e) {
      setError(`JSON 格式错误: ${(e as Error).message}`)
      setOutput("")
    }
  }, [input, indentSize])

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setError("请输入 JSON 数据")
      setOutput("")
      return
    }
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError("")
    } catch (e) {
      setError(`JSON 格式错误: ${(e as Error).message}`)
      setOutput("")
    }
  }, [input])

  const copyToClipboard = useCallback(async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError("复制失败")
    }
  }, [output])

  const downloadJson = useCallback(() => {
    if (!output) return
    const blob = new Blob([output], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.json"
    a.click()
    URL.revokeObjectURL(url)
  }, [output])

  const clearAll = useCallback(() => {
    setInput("")
    setOutput("")
    setError("")
  }, [])

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInput(text)
    } catch {
      setError("粘贴失败，请手动粘贴")
    }
  }, [])

  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Braces className="h-8 w-8 text-blue-500" />
          JSON 格式化工具
        </h1>
        <p className="text-muted-foreground">
          在线格式化、压缩、验证 JSON 数据，支持语法高亮显示
        </p>
      </div>

      <AdBanner slot="horizontal" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">输入 JSON</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handlePaste}>
                  粘贴
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[400px] code-editor resize-none"
              placeholder='{"name": "张三", "age": 25}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">输出结果</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  disabled={!output}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={downloadJson}
                  disabled={!output}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="min-h-[400px] p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20">
                {error}
              </div>
            ) : (
              <Textarea
                className="min-h-[400px] code-editor resize-none"
                value={output}
                readOnly
                placeholder="格式化后的 JSON 将显示在这里..."
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">缩进:</span>
          <select
            className="bg-muted px-3 py-1.5 rounded-md text-sm"
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
          >
            <option value={2}>2 空格</option>
            <option value={4}>4 空格</option>
            <option value={1}>Tab</option>
          </select>
        </div>
        <Button onClick={formatJson} className="gap-2">
          <Braces className="h-4 w-4" />
          格式化
        </Button>
        <Button variant="secondary" onClick={minifyJson} className="gap-2">
          <Minimize2 className="h-4 w-4" />
          压缩
        </Button>
      </div>

      <AdBanner slot="horizontal" />

      {/* SEO Content */}
      <section className="prose prose-invert max-w-none pt-8">
        <h2 className="text-xl font-bold">JSON 格式化工具说明</h2>
        <p className="text-muted-foreground">
          这是一个免费的在线 JSON 格式化工具，可以帮助您美化、压缩和验证 JSON 数据。
          所有处理都在浏览器本地完成，您的数据不会被上传到服务器，完全安全。
          支持自定义缩进大小，一键复制和下载格式化后的 JSON 文件。
        </p>
      </section>
    </div>
  )
}
