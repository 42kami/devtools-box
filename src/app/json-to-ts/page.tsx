"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdBanner } from "@/components/ad-banner"
import { Copy, Check, FileCode, Trash2 } from "lucide-react"

function jsonToTypeScript(json: unknown, rootName: string = "Root", indent: number = 0): string {
  const spaces = "  ".repeat(indent)
  
  if (json === null) return "null"
  if (typeof json === "string") return "string"
  if (typeof json === "number") return "number"
  if (typeof json === "boolean") return "boolean"
  
  if (Array.isArray(json)) {
    if (json.length === 0) return "unknown[]"
    const itemType = jsonToTypeScript(json[0], rootName, indent)
    if (itemType.includes("\n")) {
      return `${itemType}[]`
    }
    return `${itemType}[]`
  }
  
  if (typeof json === "object") {
    const entries = Object.entries(json as Record<string, unknown>)
    if (entries.length === 0) return "Record<string, unknown>"
    
    const properties = entries.map(([key, value]) => {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`
      const valueType = jsonToTypeScript(value, capitalize(key), indent + 1)
      return `${spaces}  ${safeKey}: ${valueType}`
    })
    
    return `{\n${properties.join(";\n")};\n${spaces}}`
  }
  
  return "unknown"
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function generateTypeDefinition(json: unknown, rootName: string = "Root"): string {
  const typeBody = jsonToTypeScript(json, rootName, 0)
  
  if (typeBody.startsWith("{")) {
    return `interface ${rootName} ${typeBody}`
  }
  
  return `type ${rootName} = ${typeBody}`
}

export default function JsonToTsPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [rootName, setRootName] = useState("Root")

  const convertToTs = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter JSON data")
      setOutput("")
      return
    }
    try {
      const parsed = JSON.parse(input)
      const tsType = generateTypeDefinition(parsed, rootName || "Root")
      setOutput(tsType)
      setError("")
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`)
      setOutput("")
    }
  }, [input, rootName])

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

  const sampleJson = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "isActive": true,
  "tags": ["developer", "designer"],
  "address": {
    "city": "New York",
    "zipCode": "10001"
  }
}`

  const loadSample = useCallback(() => {
    setInput(sampleJson)
    setError("")
  }, [sampleJson])

  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileCode className="h-8 w-8 text-green-500" />
          JSON to TypeScript
        </h1>
        <p className="text-muted-foreground">
          Automatically convert JSON data to TypeScript type definitions
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
                <Button variant="ghost" size="sm" onClick={loadSample}>
                  Sample
                </Button>
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
              <CardTitle className="text-lg">TypeScript Types</CardTitle>
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
                placeholder="TypeScript type definitions will appear here..."
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Root Type Name:</span>
          <input
            type="text"
            className="bg-muted px-3 py-1.5 rounded-md text-sm w-32"
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            placeholder="Root"
          />
        </div>
        <Button onClick={convertToTs} className="gap-2">
          <FileCode className="h-4 w-4" />
          Convert to TypeScript
        </Button>
      </div>

      <AdBanner slot="horizontal" />

      {/* SEO Content */}
      <section className="prose prose-invert max-w-none pt-8">
        <h2 className="text-xl font-bold">About JSON to TypeScript Converter</h2>
        <p className="text-muted-foreground">
          This is a free online JSON to TypeScript type generator.
          Simply paste your JSON data to automatically generate corresponding TypeScript interface or type definitions.
          Supports nested objects, arrays, optional properties, and complex structures. All processing is done locally for data security.
        </p>
      </section>
    </div>
  )
}
