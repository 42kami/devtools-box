"use client"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdBanner } from "@/components/ad-banner"
import { Copy, Check, Binary, Trash2, Upload, Image } from "lucide-react"

export default function Base64Page() {
  const [textInput, setTextInput] = useState("")
  const [base64Output, setBase64Output] = useState("")
  const [base64Input, setBase64Input] = useState("")
  const [textOutput, setTextOutput] = useState("")
  const [imageBase64, setImageBase64] = useState("")
  const [error, setError] = useState("")
  const [copiedEncode, setCopiedEncode] = useState(false)
  const [copiedDecode, setCopiedDecode] = useState(false)
  const [copiedImage, setCopiedImage] = useState(false)
  const [activeTab, setActiveTab] = useState<"text" | "image">("text")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Text to Base64
  const encodeToBase64 = useCallback(() => {
    if (!textInput.trim()) {
      setError("请输入要编码的文本")
      setBase64Output("")
      return
    }
    try {
      const encoded = btoa(unescape(encodeURIComponent(textInput)))
      setBase64Output(encoded)
      setError("")
    } catch (e) {
      setError(`编码错误: ${(e as Error).message}`)
      setBase64Output("")
    }
  }, [textInput])

  // Base64 to Text
  const decodeFromBase64 = useCallback(() => {
    if (!base64Input.trim()) {
      setError("请输入要解码的 Base64 字符串")
      setTextOutput("")
      return
    }
    try {
      const decoded = decodeURIComponent(escape(atob(base64Input)))
      setTextOutput(decoded)
      setError("")
    } catch (e) {
      setError(`解码错误: 无效的 Base64 字符串`)
      setTextOutput("")
    }
  }, [base64Input])

  // Image to Base64
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("请选择图片文件")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("图片大小不能超过 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setImageBase64(result)
      setError("")
    }
    reader.onerror = () => {
      setError("读取文件失败")
    }
    reader.readAsDataURL(file)
  }, [])

  const copyToClipboard = useCallback(async (text: string, type: "encode" | "decode" | "image") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "encode") {
        setCopiedEncode(true)
        setTimeout(() => setCopiedEncode(false), 2000)
      } else if (type === "decode") {
        setCopiedDecode(true)
        setTimeout(() => setCopiedDecode(false), 2000)
      } else {
        setCopiedImage(true)
        setTimeout(() => setCopiedImage(false), 2000)
      }
    } catch {
      setError("复制失败")
    }
  }, [])

  const clearAll = useCallback(() => {
    setTextInput("")
    setBase64Output("")
    setBase64Input("")
    setTextOutput("")
    setImageBase64("")
    setError("")
  }, [])

  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Binary className="h-8 w-8 text-purple-500" />
          Base64 编解码
        </h1>
        <p className="text-muted-foreground">
          文本与 Base64 互转，支持图片转 Base64
        </p>
      </div>

      <AdBanner slot="horizontal" />

      {/* Tab Buttons */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "text" ? "default" : "outline"}
          onClick={() => setActiveTab("text")}
        >
          文本编解码
        </Button>
        <Button
          variant={activeTab === "image" ? "default" : "outline"}
          onClick={() => setActiveTab("image")}
        >
          <Image className="h-4 w-4 mr-2" />
          图片转 Base64
        </Button>
        <Button variant="ghost" size="sm" onClick={clearAll} className="ml-auto">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20">
          {error}
        </div>
      )}

      {activeTab === "text" ? (
        <div className="space-y-6">
          {/* Encode Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">文本 → Base64（编码）</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                className="min-h-[120px] code-editor resize-none"
                placeholder="输入要编码的文本..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={encodeToBase64}>编码为 Base64</Button>
              </div>
              {base64Output && (
                <div className="relative">
                  <Textarea
                    className="min-h-[120px] code-editor resize-none pr-12"
                    value={base64Output}
                    readOnly
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(base64Output, "encode")}
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
              <CardTitle className="text-lg">Base64 → 文本（解码）</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                className="min-h-[120px] code-editor resize-none"
                placeholder="输入 Base64 字符串..."
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={decodeFromBase64}>解码为文本</Button>
              </div>
              {textOutput && (
                <div className="relative">
                  <Textarea
                    className="min-h-[120px] code-editor resize-none pr-12"
                    value={textOutput}
                    readOnly
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(textOutput, "decode")}
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
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">图片 → Base64</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">点击或拖拽图片到此处</p>
              <p className="text-xs text-muted-foreground mt-2">支持 JPG, PNG, GIF, WebP（最大 5MB）</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {imageBase64 && (
              <>
                <div className="flex justify-center">
                  <img
                    src={imageBase64}
                    alt="Preview"
                    className="max-w-full max-h-[200px] rounded-md"
                  />
                </div>
                <div className="relative">
                  <Textarea
                    className="min-h-[150px] code-editor resize-none pr-12 text-xs"
                    value={imageBase64}
                    readOnly
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(imageBase64, "image")}
                  >
                    {copiedImage ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  大小: {(imageBase64.length / 1024).toFixed(2)} KB
                </p>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <AdBanner slot="horizontal" />

      {/* SEO Content */}
      <section className="prose prose-invert max-w-none pt-8">
        <h2 className="text-xl font-bold">Base64 编解码工具说明</h2>
        <p className="text-muted-foreground">
          这是一个免费的在线 Base64 编解码工具，支持文本与 Base64 字符串的互相转换，
          以及图片转 Base64 Data URL。所有处理在浏览器本地完成，您的数据不会被上传，完全安全。
          常用于 API 数据传输、内嵌图片等场景。
        </p>
      </section>
    </div>
  )
}
