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
      setError("Please enter JSON data")
      setOutput("")
      return
    }
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
      setError("")
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`)
      setOutput("")
    }
  }, [input, indentSize])

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter JSON data")
      setOutput("")
      return
    }
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError("")
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`)
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
      setError("Copy failed")
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
      setError("Paste failed, please paste manually")
    }
  }, [])

  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Braces className="h-8 w-8 text-blue-500" />
          JSON Formatter
        </h1>
        <p className="text-muted-foreground">
          Format, minify, and validate JSON data online with syntax highlighting
        </p>
      </div>

      <AdBanner slot="horizontal" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Input JSON</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handlePaste}>
                  Paste
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
              placeholder='{"name": "John", "age": 25}'
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
              <CardTitle className="text-lg">Output</CardTitle>
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
                placeholder="Formatted JSON will appear here..."
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Indent:</span>
          <select
            className="bg-muted px-3 py-1.5 rounded-md text-sm"
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
            <option value={1}>Tab</option>
          </select>
        </div>
        <Button onClick={formatJson} className="gap-2">
          <Braces className="h-4 w-4" />
          Format
        </Button>
        <Button variant="secondary" onClick={minifyJson} className="gap-2">
          <Minimize2 className="h-4 w-4" />
          Minify
        </Button>
      </div>

      <AdBanner slot="horizontal" />

      {/* SEO Content */}
      <section className="prose prose-invert max-w-none pt-8">
        <h2 className="text-xl font-bold">About JSON Formatter</h2>
        <p className="text-muted-foreground">
          This is a free online JSON formatter tool that helps you beautify, minify, and validate JSON data.
          All processing is done locally in your browser - your data is never uploaded to any server.
          Supports customizable indentation, one-click copy, and download of formatted JSON files.
        </p>
      </section>
    </div>
  )
}
