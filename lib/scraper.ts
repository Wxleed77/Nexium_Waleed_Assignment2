import axios from "axios"
import * as cheerio from "cheerio"



export async function scrapeTextFromURL(url: string): Promise<string> {
  const { data: html } = await axios.get(url)
  const $ = cheerio.load(html)

  // Try to find main content areas
  const selectors = [
    "article",              // most blogs
    "main",                 // some blogs use main tag
    ".post-content",        // common blog class
    ".blog-post",           // another common one
    "#content",             // fallback
  ]

  let content = ""

  for (const sel of selectors) {
    const selected = $(sel).text().trim()
    if (selected.length > 100) {
      content = selected
      break
    }
  }

  // Fallback to body
  if (!content) content = $("body").text().trim()

  return content.replace(/\s+/g, " ")
}

