import { NextRequest, NextResponse } from "next/server"
import { scrapeTextFromURL } from "@/lib/scraper"
import { summarizeText } from "@/lib/summary"
import { translateToUrdu } from "@/lib/translator"
import { saveToSupabase } from "@/lib/supabase"
import { saveToMongo } from "@/lib/mongodb"

export async function POST(req: NextRequest) {
  try {
    const { url, method } = await req.json() as { url: string, method?: "api" | "dictionary" }

    if (!url) {
      return NextResponse.json({ error: "Missing URL" }, { status: 400 })
    }

    const fullText = await scrapeTextFromURL(url)

    if (!fullText || fullText.length < 30) {
      return NextResponse.json({ error: "Blog content too short or empty" }, { status: 400 })
    }

    const summary = summarizeText(fullText)
    const summaryUrdu = await translateToUrdu(summary, method || "dictionary")

    // Save to DBs
    await saveToSupabase(url, summary, summaryUrdu)
    await saveToMongo(url, fullText)

    return NextResponse.json({ summary, summaryUrdu })
  } catch (error) {
    console.error("Summarization failed:", error)
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 })
  }
}
