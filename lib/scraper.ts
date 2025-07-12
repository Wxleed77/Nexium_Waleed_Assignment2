import axios from "axios"
import * as cheerio from "cheerio"

export async function scrapeTextFromURL(url: string): Promise<string> {
  const { data: html } = await axios.get(url)
  const $ = cheerio.load(html)

  const selectors = [
    "article",
    "main",
    ".post-content",
    ".blog-post",
    "#content",
  ]

  let content = ""

  for (const sel of selectors) {
    const selected = $(sel).text().trim()
    if (selected.length > 100) {
      content = selected
      break
    }
  }

  if (!content) content = $("body").text().trim()
  return content.replace(/\s+/g, " ")
}
