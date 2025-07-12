"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function BlogForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [url, setUrl] = useState("")

  return (
    <form
      className="flex gap-3 w-full max-w-xl mx-auto mt-4 bg-white/10 rounded-xl p-3 shadow-inner border border-white/20 backdrop-blur-md"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(url);
      }}
    >
      <Input
        placeholder="Enter blog URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 bg-white/20 border-none text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/40 rounded-lg px-4 py-2 shadow-sm"
      />
      <Button type="submit" className="rounded-lg px-6 py-2 font-semibold shadow-md bg-gradient-to-tr from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-150">
        Summarize
      </Button>
    </form>
  )
}
