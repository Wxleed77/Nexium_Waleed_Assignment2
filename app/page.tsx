"use client"


import BlogForm from "@/components/ui/BlogForm"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState("")
  const [urduSummary, setUrduSummary] = useState("")
  const [method, setMethod] = useState<"api" | "dictionary">("api")

  const handleSubmit = async (url: string) => {
    setLoading(true)
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, method }),
    })
    const data = await res.json()
    setSummary(data.summary)
    setUrduSummary(data.summaryUrdu)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-6 flex items-center justify-center">
      <div className="group backdrop-blur-xl bg-white/10 p-10 rounded-3xl max-w-3xl w-full shadow-2xl border border-white/30 hover:shadow-2xl transition-shadow duration-200">
        <h1 className="text-4xl font-extrabold text-center mb-6 drop-shadow-lg tracking-tight">📝 Blog Summariser</h1>

        <div className="flex justify-center mb-8 gap-4">
          <span className="text-lg font-medium">Translation Method:</span>
          <div className="flex gap-2 bg-white/10 rounded-full p-1 shadow-inner border border-white/20">
            <Button
              type="button"
              variant={method === "api" ? "secondary" : "ghost"}
              className={`rounded-full px-5 py-2 transition-all duration-150 ${method === "api" ? "ring-2 ring-white/40" : ""}`}
              onClick={() => setMethod("api")}
            >
              API
            </Button>
            <Button
              type="button"
              variant={method === "dictionary" ? "secondary" : "ghost"}
              className={`rounded-full px-5 py-2 transition-all duration-150 ${method === "dictionary" ? "ring-2 ring-white/40" : ""}`}
              onClick={() => setMethod("dictionary")}
            >
              Dictionary
            </Button>
          </div>
        </div>

        <BlogForm onSubmit={handleSubmit} />
        {loading && <p className="mt-8 text-center text-lg animate-pulse">⏳ Summarizing...</p>}

        {summary && (
          <div className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/30 shadow-lg backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-3 text-white/90">English Summary:</h2>
            <p className="text-white/90 leading-relaxed">{summary}</p>
          </div>
        )}

        {urduSummary && (
          <div className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/30 shadow-lg backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-3 text-white/90">اردو خلاصہ:</h2>
            <p className="text-white/90 urdu-text leading-relaxed">{urduSummary}</p>
          </div>
        )}
      </div>
    </main>
  )
}
