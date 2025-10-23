"use server"

import pdf from "@cedrugs/pdf-parse"
import { prerequisites } from "../helpers/prerequisites"

export async function getAcademicHistoryData(formData: FormData) {
  const file = formData.get("file") as File
  if (!file) throw new Error("No file uploaded")

  // Convert uploaded file to a Buffer and parse text
  const buffer = Buffer.from(await file.arrayBuffer())
  const parsed = await pdf(buffer)
  const text = parsed.text

  // console.log(text)

  // --- Basic info ---
  const studentMatch = text.match(/Aluno:\s*\d+\s*-\s*(.+)/)
  const raMatch = text.match(/Aluno:\s*(\d+)\s*-/)
  const courseMatch = text.match(/Curso:\s*(.+)/)
  const iraMatch = text.match(/ID:(\d+)/)
  const admissionPeriodMatch = text.match(/Período de Ingresso:\s*([\d/]+)/)
  const limitPeriodMatch = text.match(
    /PRAZO LIMITE PARA CONCLUSÃO DO CURSO:\s*([\d/]+)/
  )

  /**
   * 1. Capture each semester block.
   *    Matches things like:
   *    2022/1
   *    ...all courses...
   *    (stops right before the next yyyy/x or end of file)
   */
  const semesterBlocks = Array.from(
    text.matchAll(
      /(\d{4}\/\d)\s*Avaliaç.*?Resultado([\s\S]+?)(?=\d{4}\/\d|Total|Média|Resumo|PRAZO|$)/g
    )
  ).map((m) => ({
    semester: m[1],
    content: m[2],
  }))

  /**
   * 2. Inside each block, match every course line:
   *    CODE - NAME ... %STATUS
   *    We capture:
   *      1) code
   *      2) name (until we hit a pattern that precedes the status)
   *      3) status text after the percent sign
   */
  const courseRegex =
    /(\d{6,})\s*-\s*([\s\S]+?)(?=\s*-\s*[A-Z]{1,3})\s*-\s*([A-Z]{1,3}(?:\s*-\s*[A-Z]{1,3})*\s*\d+[.,]?\d*%?)\s*([^\r\n]+)/gu

  function parseHours(intermediate: string, name: string = "") {
    const clean = intermediate.replace(/\D/g, "") // remove tudo que não é dígito
    let index = 0

    const total = parseInt(clean.slice(index, index + 2), 10)
    index += 2

    let theoretical = parseInt(clean.slice(index, index + 1), 10)
    if (theoretical !== 0) {
      theoretical = parseInt(clean.slice(index, index + 2), 10)
      index += 2
    } else {
      index += 1
    }

    let practical = parseInt(clean.slice(index, index + 1), 10)
    if (practical !== 0) {
      practical = parseInt(clean.slice(index, index + 2), 10)
      index += 2
    } else {
      index += 1
    }

    return { total, theoretical, practical }
  }

  const prereqMap = new Map(
    prerequisites.map((p) => [
      p.name.toUpperCase(),
      { preRequisites: p.preRequisites, type: p.type, profile: p.profile },
    ])
  )

  const semesters = semesterBlocks.map((block, i) => {
    const courses = Array.from(block.content.matchAll(courseRegex), (m) => {
      const code = m[1].trim()
      const name = m[2].replace(/\s+/g, " ").trim()
      const intermediate = m[3].replace(/\s+/g, " ").trim()
      const status = m[4]
        .normalize("NFC")
        .replace(/\nH$/, "")
        .replace(/\s+/g, " ")
        .trim()

      const hours = parseHours(intermediate, name)

      const prereqInfo = prereqMap.get(name.toUpperCase()) || {
        preRequisites: [],
        type: "opt 2",
        profile: 2,
      }

      return {
        code,
        name,
        status,
        ...hours,
        preRequisites: prereqInfo.preRequisites,
        type: prereqInfo.type,
        profile: prereqInfo.profile,
        conclusionSemester: status.startsWith("AP") ? i + 1 : null,
      }
    })
    return { semester: block.semester, courses }
  })

  return {
    student: studentMatch?.[1]?.trim() ?? null,
    ra: raMatch?.[1]?.trim() ?? null,
    course: courseMatch?.[1]?.trim() ?? null,
    ira: Number(iraMatch?.[1]?.trim()) ?? null,
    admissionPeriod: admissionPeriodMatch?.[1]?.trim() ?? null,
    limitPeriod: limitPeriodMatch?.[1]?.trim() ?? null,
    semesters,
  }
}
