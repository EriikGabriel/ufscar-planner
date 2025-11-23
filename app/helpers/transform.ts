import { titleCase } from "title-case"

const exceptions = [
  "de",
  "da",
  "do",
  "das",
  "dos",
  "e",
  "em",
  "com",
  "para",
  "por",
  "a",
  "à",
  "o",
  "as",
  "os",
  "no",
  "na",
  "nos",
  "nas",
  "ao",
  "aos",
  "às",
]

export function normalizeTitleString(str: string) {
  str = str.normalize("NFC")

  let formatted = titleCase(str.toLowerCase()).normalize("NFC")

  const regex = new RegExp(`\\b(${exceptions.join("|")})\\b`, "gi")
  formatted = formatted.replace(regex, (match) => match.toLowerCase())
  formatted = formatted.replace(/À/g, "à")

  return formatted
}
