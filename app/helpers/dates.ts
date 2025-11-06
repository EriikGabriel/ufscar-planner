function setRegularFormationDate(entryDate: Date) {
  return new Date(
    entryDate.getFullYear() + 4,
    entryDate.getMonth() + 6,
    entryDate.getDate()
  )
}

function setFormationProspectDate(regularFormationDate: Date) {
  new Date(
    regularFormationDate.getFullYear() + 1,
    regularFormationDate.getMonth(),
    regularFormationDate.getDate()
  )
}

export function periodToDate(period: string) {
  const [year, semester] = period.split("/").map(Number)

  const month = semester === 1 ? 0 : 6

  return new Date(year, month, 1)
}

export { setFormationProspectDate, setRegularFormationDate }
