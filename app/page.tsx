"use client"

import BlogForm from "@/components/ui/BlogForm"
import { useState } from "react"
import { Languages, Loader2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"






export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState("")
  const [urduSummary, setUrduSummary] = useState("")
  const [method, setMethod] = useState<"api" | "dictionary">("dictionary")

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
    <main className="min-h-screen bg-gradient-to-tr from-[#0f172a] to-[#1e293b] text-white p-6 flex items-center justify-center">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl max-w-3xl w-full shadow-xl border border-white/20 transition-all duration-300 hover:scale-[1.01]">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Blog Summariser</h1>
          <Sparkles className="text-purple-400" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 text-white/80">
            <Languages className="w-5 h-5 text-cyan-400" />
            <span className="text-sm">Translation Method:</span>
          </label>

          <div className="relative inline-block w-16 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              checked={method === "api"}
              onChange={(e) => setMethod(e.target.checked ? "api" : "dictionary")}
              className="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer top-0 left-0 transition-transform duration-300 ease-in-out"
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-8 rounded-full bg-cyan-600 cursor-pointer"
            ></label>
          </div>
        </div>

        <BlogForm onSubmit={handleSubmit} />

        {loading && (
          <div className="mt-6 text-center flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" />
            <p>Summarizing and translating...</p>
          </div>
        )}

        {summary && (

         <motion.div
    className="mt-6 p-4 bg-white/5 rounded-xl border border-white/20 hover:bg-white/10"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
      <Languages className="text-cyan-400" /> English Summary
    </h2>
    <p className="text-white/90 leading-relaxed">{summary}</p>
  </motion.div>
        )}

        {urduSummary && (
           <motion.div
    className="mt-6 p-4 bg-white/5 rounded-xl border border-white/20 hover:bg-white/10"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 }}
  >
    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
      <Languages className="text-green-400" /> اردو خلاصہ
    </h2>
    <p className="text-white/90 urdu-text leading-loose">{urduSummary}</p>
  </motion.div>
        )}
      </div>
    </main>
  )
}
