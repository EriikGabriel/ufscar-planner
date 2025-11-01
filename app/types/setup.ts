export type AcademicHistory = {
  student: string | null
  ra: string | null
  course: string | null
  ira: number
  admissionPeriod: string | null
  limitPeriod: string | null
  semesters: {
    semester: string
    courses: {
      preRequisites: string[] | undefined
      type: string
      profile: number
      conclusionSemester: number | null
      total: number
      theoretical: number
      practical: number
      code: string
      name: string
      status: string
    }[]
  }[]
}
