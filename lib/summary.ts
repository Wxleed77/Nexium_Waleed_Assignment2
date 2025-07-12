export function summarizeText(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []

  const scored = sentences
    .map((s) => ({ text: s.trim(), score: s.trim().split(" ").length }))
    .filter((s) => s.score > 5)
    .sort((a, b) => b.score - a.score)

  const topSentences = scored.slice(0, 3).map((s) => s.text)
  return topSentences.join(" ")
}
