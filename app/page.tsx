"use client"

import { useState } from "react"
import BlogForm from "@/components/ui/BlogForm"
import { Loader2, Sparkle, ServerCog, Bot } from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState("")
  const [urduSummary, setUrduSummary] = useState("")
  const [method, setMethod] = useState<"api" | "dictionary">("dictionary")

  const handleSubmit = async (url: string) => {
    setLoading(true)
    setSummary("")
    setUrduSummary("")

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, method }),
      })
      const data = await res.json()
      setSummary(data.summary)
      setUrduSummary(data.summaryUrdu)
    } catch (e) {
      console.error("Something went wrong:", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#312e81] to-[#1e293b] text-white p-6 flex items-center justify-center relative overflow-hidden">
      {/* Decorative blurred gradients */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl z-0"></div>
      <motion.div
        className="relative z-10 backdrop-blur-2xl bg-white/10 p-10 rounded-3xl max-w-2xl w-full shadow-2xl border border-white/30"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkle className="text-purple-400 w-8 h-8 drop-shadow-lg animate-spin-slow" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-xl">
              Blog Summariser
            </h1>
          </div>
          <p className="text-white/80 text-lg font-medium text-center max-w-lg">
            Instantly summarize any blog post and get an Urdu translation. Powered by AI, designed for clarity.
          </p>
        </div>

        {/* Toggle with Labels */}
        <div className="flex items-center justify-between mb-10">
          <label className="flex items-center gap-2 text-white/80 font-medium">
            <ServerCog className="w-5 h-5 text-cyan-400" />
            <span className="text-base">Translation Method:</span>
          </label>
          <div className="flex items-center gap-4">
            {/* Dictionary Label */}
            <div className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full transition-colors ${method === "dictionary" ? "bg-white/30 text-white shadow" : "text-white/60"}`}>
              <Bot className="w-4 h-4" />
              <span>Dictionary</span>
            </div>
            {/* Toggle */}
            <label className="relative inline-flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={method === "api"}
                onChange={(e) => setMethod(e.target.checked ? "api" : "dictionary")}
              />
              <span className="w-16 h-9 flex items-center bg-gradient-to-r from-cyan-500/40 to-purple-500/40 rounded-full p-1 duration-300 border-2 border-white/20 shadow-inner group-hover:from-cyan-400/60 group-hover:to-purple-400/60"></span>
              <span
                className="absolute left-1 top-1 h-7 w-7 bg-white rounded-full shadow-md transform duration-300 peer-checked:translate-x-7"
              />
            </label>
            {/* API Label */}
            <div className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full transition-colors ${method === "api" ? "bg-white/30 text-white shadow" : "text-white/60"}`}>
              <ServerCog className="w-4 h-4" />
              <span>API</span>
            </div>
          </div>
        </div>

        {/* Disclaimer for Dictionary mode */}
        {method === "dictionary" && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-yellow-100/10 border border-yellow-400/30 text-yellow-200 text-sm font-medium shadow">
            <span className="font-bold">Disclaimer:</span> The summary and translation shown below are simulated using static logic and a JavaScript dictionary. They do not represent real AI-generated content.
          </div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <BlogForm onSubmit={handleSubmit} />
        </motion.div>

        {/* Divider */}
        <div className="my-8 border-t border-white/20" />

        {/* Loader */}
        {loading && (
          <div className="mt-8 text-center flex items-center justify-center gap-3">
            <Loader2 className="animate-spin text-cyan-400 w-6 h-6" />
            <p className="text-lg font-semibold tracking-wide">Summarizing and translating...</p>
          </div>
        )}

        {/* Animated summary card */}
        {(summary || urduSummary) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 mt-8"
          >
            {summary && (
              <div className="relative group p-1 rounded-2xl bg-gradient-to-r from-cyan-400/40 via-purple-400/40 to-pink-400/40 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-white/20">
                <div className="bg-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <ServerCog className="text-cyan-400" /> English Summary
                  </h2>
                  <p className="text-white/90 leading-relaxed text-base">{summary}</p>
                </div>
              </div>
            )}
            {urduSummary && (
              <div className="relative group p-1 rounded-2xl bg-gradient-to-r from-green-400/40 via-cyan-400/40 to-purple-400/40 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-white/20">
                <div className="bg-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Bot className="text-green-400" /> اردو خلاصہ
                  </h2>
                  <p className="text-white/90 urdu-text leading-loose text-base text-right" dir="rtl">{urduSummary}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
      <style jsx global>{`
        .urdu-text {
          font-family: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', 'Segoe UI', serif;
          font-size: 1.1rem;
        }
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
      `}</style>
    </main>
  )
}