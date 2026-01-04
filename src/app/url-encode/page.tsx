"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdBanner } from "@/components/ad-banner"
import { Copy, Check, Link, Trash2 } from "lucide-react"

export default function UrlEncodePage() {
  const [textInput, setTextInput] = useState("")
  const [encodedOutput, setEncodedOutput] = useState("")
  const [encodedInput, setEncodedInput] = useState("")
  const [decodedOutput, setDecodedOutput] = useState("")
  const [error, setError] = useState("")
  const [copiedEncode, setCopiedEncode] = useState(false)
  const [copiedDecode, setCopiedDecode] = useState(false)
  const [encodeType, setEncodeType] = useState<"uri" | "component">("component")

  // Encode URL
  const encodeUrl = useCallback(() => {
    if (!textInput.trim()) {
      setError("请输入要编码的文本")
      setEncodedOutput("")
      return
    }
    try {
      const encoded =
        encodeType === "uri"
          ? encodeURI(textInput)
          : encodeURIComponent(textInput)
      setEncodedOutput(encoded)
      setError("")
    } catch (e) {
      setError(`编码错误: ${(e as Error).message}`)
      setEncodedOutput("")
    }
  }, [textInput, encodeType])

  // Decode URL
  const decodeUrl = useCallback(() => {
    if (!encodedInput.trim()) {
      setError("请输入要解码的 URL 编码字符串")
      setDecodedOutput("")
      return
    }
    try {
      const decoded =
        encodeType === "uri"
          ? decodeURI(encodedInput)
          : decodeURIComponent(encodedInput)
      setDecodedOutput(decoded)
      setError("")
    } catch (e) {
      setError(`解码错误: 无效的 URL 编码字符串`)
      setDecodedOutput("")
    }
  }, [encodedInput, encodeType])

  const copyToClipboard = useCallback(
    async (text: string, type: "encode" | "decode") => {
      try {
        await navigator.clipboard.writeText(text)
        if (type === "encode") {
          setCopiedEncode(true)
          setTimeout(() => setCopiedEncode(false), 2000)
        } else {
          setCopiedDecode(true)
          setTimeout(() => setCopiedDecode(false), 2000)
        }
      } catch {
        setError("复制失败")
      }
    },
    []
  )

  const clearAll = useCallback(() => {
    setTextInput("")
    setEncodedOutput("")
    setEncodedInput("")
    setDecodedOutput("")
    setError("")
  }, [])

  const sampleText = "https://example.com/搜索?q=你好&lang=中文"

  const loadSample = useCallback(() => {
    setTextInput(sampleText)
    setError("")
  }, [sampleText])

  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Link className="h-8 w-8 text-pink-500" />
          URL 编解码
        </h1>
        <p className="text-muted-foreground">
          URL 编码（encodeURI / encodeURIComponent）与解码
        </p>
      </div>

      <AdBanner slot="horizontal" />

      {/* Encode Type Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">编码类型:</span>
        <div className="flex gap-2">
          <Button
            variant={encodeType === "component" ? "default" : "outline"}
            size="sm"
            onClick={() => setEncodeType("component")}
          >
            encodeURIComponent
          </Button>
          <Button
            variant={encodeType === "uri" ? "default" : "outline"}
            size="sm"
            onClick={() => setEncodeType("uri")}
          >
            encodeURI
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={clearAll} className="ml-auto">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
        <strong>区别说明：</strong>
        <ul className="mt-1 space-y-1">
          <li>• <code className="bg-muted px-1 rounded">encodeURIComponent</code>: 编码所有特殊字符，适用于编码 URL 参数值</li>
          <li>• <code className="bg-muted px-1 rounded">encodeURI</code>: 保留 URL 结构字符（如 :/?#），适用于编码完整 URL</li>
        </ul>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Encode Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">文本 → URL 编码</CardTitle>
              <Button variant="ghost" size="sm" onClick={loadSample}>
                示例
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              className="min-h-[120px] code-editor resize-none"
              placeholder="输入要编码的文本或 URL..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={encodeUrl}>编码</Button>
            </div>
            {encodedOutput && (
              <div className="relative">
                <Textarea
                  className="min-h-[120px] code-editor resize-none pr-12"
                  value={encodedOutput}
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(encodedOutput, "encode")}
                >
                  {copiedEncode ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Decode Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">URL 编码 → 文本</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              className="min-h-[120px] code-editor resize-none"
              placeholder="输入 URL 编码字符串..."
              value={encodedInput}
              onChange={(e) => setEncodedInput(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={decodeUrl}>解码</Button>
            </div>
            {decodedOutput && (
              <div className="relative">
                <Textarea
                  className="min-h-[120px] code-editor resize-none pr-12"
                  value={decodedOutput}
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(decodedOutput, "decode")}
                >
                  {copiedDecode ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AdBanner slot="horizontal" />

      {/* SEO Content */}
      <section className="prose prose-invert max-w-none pt-8">
        <h2 className="text-xl font-bold">URL 编解码工具说明</h2>
        <p className="text-muted-foreground">
          这是一个免费的在线 URL 编解码工具，支持 encodeURI 和 encodeURIComponent 两种编码方式。
          可以将中文、特殊字符转换为 URL 安全的编码格式，也可以将 URL 编码还原为原始文本。
          所有处理在浏览器本地完成，数据安全有保障。
        </p>
      </section>
    </div>
  )
}
