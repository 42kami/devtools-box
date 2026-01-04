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
      setError("Please enter text to encode")
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
      setError(`Encoding error: ${(e as Error).message}`)
      setEncodedOutput("")
    }
  }, [textInput, encodeType])

  // Decode URL
  const decodeUrl = useCallback(() => {
    if (!encodedInput.trim()) {
      setError("Please enter URL encoded string to decode")
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
      setError(`Decoding error: Invalid URL encoded string`)
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
        setError("Copy failed")
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

  const sampleText = "https://example.com/search?q=hello world&lang=en"

  const loadSample = useCallback(() => {
    setTextInput(sampleText)
    setError("")
  }, [sampleText])

  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Link className="h-8 w-8 text-pink-500" />
          URL Encoder/Decoder
        </h1>
        <p className="text-muted-foreground">
          URL encoding (encodeURI / encodeURIComponent) and decoding
        </p>
      </div>

      <AdBanner slot="horizontal" />

      {/* Encode Type Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Encoding Type:</span>
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
        <strong>Difference:</strong>
        <ul className="mt-1 space-y-1">
          <li>• <code className="bg-muted px-1 rounded">encodeURIComponent</code>: Encodes all special characters, use for URL parameter values</li>
          <li>• <code className="bg-muted px-1 rounded">encodeURI</code>: Preserves URL structure characters (:/?#), use for complete URLs</li>
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
              <CardTitle className="text-lg">Text → URL Encoded</CardTitle>
              <Button variant="ghost" size="sm" onClick={loadSample}>
                Sample
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              className="min-h-[120px] code-editor resize-none"
              placeholder="Enter text or URL to encode..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={encodeUrl}>Encode</Button>
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
            <CardTitle className="text-lg">URL Encoded → Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              className="min-h-[120px] code-editor resize-none"
              placeholder="Enter URL encoded string..."
              value={encodedInput}
              onChange={(e) => setEncodedInput(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={decodeUrl}>Decode</Button>
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
        <h2 className="text-xl font-bold">About URL Encoder/Decoder</h2>
        <p className="text-muted-foreground">
          This is a free online URL encoding and decoding tool that supports both encodeURI and encodeURIComponent methods.
          Convert special characters to URL-safe encoded format, or decode URL-encoded strings back to original text.
          All processing is done locally in your browser - your data is secure.
        </p>
      </section>
    </div>
  )
}
