export function summarizeText(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []

  // Filter very short sentences
  const filtered = sentences.filter(s => s.trim().split(" ").length > 6)

  return filtered.slice(0, 3).join(" ")
}
