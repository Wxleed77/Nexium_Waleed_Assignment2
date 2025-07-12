import { enToUr } from "@/lib/dictionary"

async function callLibre(body: { [key: string]: string }, url: string): Promise<string> {

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  const data = await res.json()
  return data.translatedText
}

export async function translateToUrdu(
  text: string,
  method: "dictionary" | "api" = "api"
): Promise<string> {
  if (method === "api") {
    const body = {
      q: text,
      source: "en",
      target: "ur",
      format: "text",
    }

    try {
      const translated = await callLibre(body, "https://libretranslate.de/translate")
      return "📄 ترجمہ شدہ خلاصہ: " + translated
    } catch (err1) {
      console.warn("LibreTranslate.de failed, trying fallback API...", err1)
      try {
        const translated = await callLibre(body, "https://translate.argosopentech.com/translate")
        return "📄 ترجمہ شدہ خلاصہ: " + translated
      } catch (err2) {
        console.error("Both translation APIs failed:", err2)
        return translateFallback(text)
      }
    }
  }

  return translateFallback(text)
}

function translateFallback(text: string): string {
  return (
    "📄 ترجمہ شدہ خلاصہ (ڈکشنری): " +
    text
      .split(" ")
      .map((word) => {
        const clean = word.toLowerCase().replace(/[.,!?]/g, "")
        return enToUr[clean] || word
      })
      .join(" ")
  )
}
