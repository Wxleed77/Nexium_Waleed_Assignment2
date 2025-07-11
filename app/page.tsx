"use client"

import BlogForm from "@/components/ui/BlogForm"
import { useState } from "react"

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState("")

  const handleSubmit = async (url: string) => {
    setLoading(true)
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    setSummary(data.summaryUrdu)
    setLoading(false)
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">📝 Blog Summariser</h1>
      <BlogForm onSubmit={handleSubmit} />
      {loading && <p className="mt-4">Summarizing...</p>}
      {summary && (
        <div className="mt-6 border rounded p-4 bg-muted">
          <h2 className="text-lg font-semibold">Urdu Summary:</h2>
          <p className="mt-2">{summary}</p>
        </div>
      )}
    </main>
  )
}
