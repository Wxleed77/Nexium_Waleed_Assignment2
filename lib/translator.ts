import { enToUr } from "@/lib/dictionary"

export function translateToUrdu(text: string): string {
  return (
    "📄 ترجمہ شدہ خلاصہ: " +
    text
      .split(" ")
      .map((word) => {
        const clean = word.toLowerCase().replace(/[.,!?]/g, "")
        return enToUr[clean] || word
      })
      .join(" ")
  )
}
