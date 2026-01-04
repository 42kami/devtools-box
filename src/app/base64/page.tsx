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
      setError("Please enter text to encode")
      setBase64Output("")
      return
    }
    try {
      const encoded = btoa(unescape(encodeURIComponent(textInput)))
      setBase64Output(encoded)
      setError("")
    } catch (e) {
      setError(`Encoding error: ${(e as Error).message}`)
      setBase64Output("")
    }
  }, [textInput])

  // Base64 to Text
  const decodeFromBase64 = useCallback(() => {
    if (!base64Input.trim()) {
      setError("Please enter Base64 string to decode")
      setTextOutput("")
      return
    }
    try {
      const decoded = decodeURIComponent(escape(atob(base64Input)))
      setTextOutput(decoded)
      setError("")
    } catch (e) {
      setError(`Decoding error: Invalid Base64 string`)
      setTextOutput("")
    }
  }, [base64Input])

  // Image to Base64
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size cannot exceed 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setImageBase64(result)
      setError("")
    }
    reader.onerror = () => {
      setError("Failed to read file")
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
      setError("Copy failed")
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
          Base64 Encoder/Decoder
        </h1>
        <p className="text-muted-foreground">
          Convert text and images to/from Base64
        </p>
      </div>

      <AdBanner slot="horizontal" />

      {/* Tab Buttons */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "text" ? "default" : "outline"}
          onClick={() => setActiveTab("text")}
        >
          Text Encode/Decode
        </Button>
        <Button
          variant={activeTab === "image" ? "default" : "outline"}
          onClick={() => setActiveTab("image")}
        >
          <Image className="h-4 w-4 mr-2" />
          Image to Base64
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
              <CardTitle className="text-lg">Text → Base64 (Encode)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                className="min-h-[120px] code-editor resize-none"
                placeholder="Enter text to encode..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={encodeToBase64}>Encode to Base64</Button>
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
              <CardTitle className="text-lg">Base64 → Text (Decode)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                className="min-h-[120px] code-editor resize-none"
                placeholder="Enter Base64 string..."
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={decodeFromBase64}>Decode to Text</Button>
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
            <CardTitle className="text-lg">Image → Base64</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Click or drag image here</p>
              <p className="text-xs text-muted-foreground mt-2">Supports JPG, PNG, GIF, WebP (max 5MB)</p>
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
                  Size: {(imageBase64.length / 1024).toFixed(2)} KB
                </p>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <AdBanner slot="horizontal" />

      {/* SEO Content */}
      <section className="prose prose-invert max-w-none pt-8">
        <h2 className="text-xl font-bold">About Base64 Encoder/Decoder</h2>
        <p className="text-muted-foreground">
          This is a free online Base64 encoding and decoding tool that supports converting text to/from Base64 strings
          and images to Base64 Data URLs. All processing is done locally in your browser - your data is never uploaded.
          Commonly used for API data transmission and embedding images.
        </p>
      </section>
    </div>
  )
}
