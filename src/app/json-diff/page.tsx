"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdBanner } from "@/components/ad-banner"
import { GitCompare, Trash2 } from "lucide-react"

interface DiffResult {
  type: "added" | "removed" | "changed" | "unchanged"
  path: string
  oldValue?: unknown
  newValue?: unknown
}

function compareJson(
  obj1: unknown,
  obj2: unknown,
  path: string = ""
): DiffResult[] {
  const results: DiffResult[] = []

  // Handle null/undefined
  if (obj1 === null || obj1 === undefined) {
    if (obj2 !== null && obj2 !== undefined) {
      results.push({ type: "added", path: path || "root", newValue: obj2 })
    }
    return results
  }

  if (obj2 === null || obj2 === undefined) {
    results.push({ type: "removed", path: path || "root", oldValue: obj1 })
    return results
  }

  // Handle different types
  if (typeof obj1 !== typeof obj2) {
    results.push({
      type: "changed",
      path: path || "root",
      oldValue: obj1,
      newValue: obj2,
    })
    return results
  }

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    const maxLength = Math.max(obj1.length, obj2.length)
    for (let i = 0; i < maxLength; i++) {
      const itemPath = path ? `${path}[${i}]` : `[${i}]`
      if (i >= obj1.length) {
        results.push({ type: "added", path: itemPath, newValue: obj2[i] })
      } else if (i >= obj2.length) {
        results.push({ type: "removed", path: itemPath, oldValue: obj1[i] })
      } else {
        results.push(...compareJson(obj1[i], obj2[i], itemPath))
      }
    }
    return results
  }

  // Handle objects
  if (typeof obj1 === "object" && typeof obj2 === "object") {
    const allKeys = new Set([
      ...Object.keys(obj1 as object),
      ...Object.keys(obj2 as object),
    ])

    for (const key of allKeys) {
      const keyPath = path ? `${path}.${key}` : key
      const val1 = (obj1 as Record<string, unknown>)[key]
      const val2 = (obj2 as Record<string, unknown>)[key]

      if (!(key in (obj1 as object))) {
        results.push({ type: "added", path: keyPath, newValue: val2 })
      } else if (!(key in (obj2 as object))) {
        results.push({ type: "removed", path: keyPath, oldValue: val1 })
      } else {
        results.push(...compareJson(val1, val2, keyPath))
      }
    }
    return results
  }

  // Handle primitives
  if (obj1 !== obj2) {
    results.push({
      type: "changed",
      path: path || "root",
      oldValue: obj1,
      newValue: obj2,
    })
  }

  return results
}

function formatValue(value: unknown): string {
  if (typeof value === "string") return `"${value}"`
  if (value === null) return "null"
  if (typeof value === "object") return JSON.stringify(value)
  return String(value)
}

export default function JsonDiffPage() {
  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [diffResults, setDiffResults] = useState<DiffResult[]>([])
  const [error, setError] = useState("")

  const compareJsons = useCallback(() => {
    if (!input1.trim() || !input2.trim()) {
      setError("Please enter two JSON objects to compare")
      setDiffResults([])
      return
    }

    try {
      const json1 = JSON.parse(input1)
      const json2 = JSON.parse(input2)
      const results = compareJson(json1, json2)
      setDiffResults(results)
      setError("")
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`)
      setDiffResults([])
    }
  }, [input1, input2])

  const clearAll = useCallback(() => {
    setInput1("")
    setInput2("")
    setDiffResults([])
    setError("")
  }, [])

  const sampleJson1 = `{
  "name": "John",
  "age": 25,
  "city": "New York",
  "hobbies": ["reading", "coding"]
}`

  const sampleJson2 = `{
  "name": "John",
  "age": 26,
  "country": "USA",
  "hobbies": ["reading", "gaming"]
}`

  const loadSample = useCallback(() => {
    setInput1(sampleJson1)
    setInput2(sampleJson2)
    setError("")
  }, [sampleJson1, sampleJson2])

  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GitCompare className="h-8 w-8 text-orange-500" />
          JSON Diff Tool
        </h1>
        <p className="text-muted-foreground">
          Compare two JSON objects and highlight added, removed, and modified content
        </p>
      </div>

      <AdBanner slot="horizontal" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input 1 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">JSON 1 (Original)</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={loadSample}>
                  Sample
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[300px] code-editor resize-none"
              placeholder="Enter original JSON..."
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {/* Input 2 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">JSON 2 (New)</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[300px] code-editor resize-none"
              placeholder="Enter new JSON..."
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              spellCheck={false}
            />
          </CardContent>
        </Card>
      </div>

      {/* Compare Button */}
      <div className="flex justify-center">
        <Button onClick={compareJsons} size="lg" className="gap-2">
          <GitCompare className="h-5 w-5" />
          Compare
        </Button>
      </div>

      {/* Results */}
      {error && (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20">
          {error}
        </div>
      )}

      {diffResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {diffResults.map((diff, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md font-mono text-sm ${
                    diff.type === "added"
                      ? "bg-green-500/10 border border-green-500/30"
                      : diff.type === "removed"
                      ? "bg-red-500/10 border border-red-500/30"
                      : "bg-yellow-500/10 border border-yellow-500/30"
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      diff.type === "added"
                        ? "text-green-500"
                        : diff.type === "removed"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {diff.type === "added"
                      ? "+ Added"
                      : diff.type === "removed"
                      ? "- Removed"
                      : "~ Changed"}
                  </span>
                  <span className="text-muted-foreground ml-2">{diff.path}</span>
                  {diff.type === "changed" && (
                    <div className="mt-2 text-xs">
                      <div className="text-red-400">
                        Old: {formatValue(diff.oldValue)}
                      </div>
                      <div className="text-green-400">
                        New: {formatValue(diff.newValue)}
                      </div>
                    </div>
                  )}
                  {diff.type === "added" && (
                    <div className="mt-1 text-xs text-green-400">
                      Value: {formatValue(diff.newValue)}
                    </div>
                  )}
                  {diff.type === "removed" && (
                    <div className="mt-1 text-xs text-red-400">
                      Value: {formatValue(diff.oldValue)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {diffResults.length === 0 && !error && input1 && input2 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Click "Compare" to see differences
          </CardContent>
        </Card>
      )}

      <AdBanner slot="horizontal" />

      {/* SEO Content */}
      <section className="prose prose-invert max-w-none pt-8">
        <h2 className="text-xl font-bold">About JSON Diff Tool</h2>
        <p className="text-muted-foreground">
          This is a free online JSON comparison tool that helps you quickly find differences between two JSON objects.
          Supports deep comparison of nested objects and arrays, clearly showing added, removed, and modified fields.
          All processing is done locally in your browser - your data is completely secure.
        </p>
      </section>
    </div>
  )
}
