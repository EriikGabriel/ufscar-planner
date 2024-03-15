"use client"

import { createClient } from "@lib/supabase/client"
import { Chart, ChartData, registerables } from "chart.js"
import { useEffect, useMemo, useState } from "react"
import { Line } from "react-chartjs-2"

type DatasetType = ChartData<"line">["datasets"][0]

export function LineChart() {
  const [labels, setLabels] = useState<string[]>([])
  const [datasets, setDatasets] = useState<DatasetType[]>([])

  Chart.register(...registerables)

  useEffect(() => {
    const sigaAuth = localStorage.getItem("@ufscar-planner/siga-auth") ?? ""
    const supabase = createClient()

    const studentQuery = supabase
      .from("students")
      .select()
      .eq(sigaAuth?.length === 6 ? "ra" : "email", sigaAuth)
      .single()

    const disciplinesQuery = supabase
      .from("disciplines")
      .select()
      .in("activity_id", [1, 2, 3])

    Promise.all([studentQuery, disciplinesQuery]).then(
      ([studentRes, disciplinesRes]) => {
        const student = studentRes.data
        const disciplines = disciplinesRes.data

        if (!student || !disciplines) return

        const periods = Array.from(
          {
            length: student.semester_completed
              ? student.semester
              : student.semester - 1,
          },
          (_, i) => `Período ${i + 1}`
        )
        setLabels(periods)

        const colors = [
          "rgb(53, 162, 235)",
          "rgb(222, 31, 200)",
          "rgb(222, 31, 31)",
        ]

        const newDatasets = Array.from({ length: 3 }, (_, i) => {
          const type = i === 0 ? "Obrigatórias" : `Optativas ${i}`
          const dataValues = Array.from({ length: periods.length }, () => 0)

          const filteredDisciplines = disciplines.filter(
            (d) => d.activity_id === i + 1 && d.conclusion_semester
          )

          filteredDisciplines.forEach((d) => {
            if (!d.conclusion_semester) return

            const index = d.conclusion_semester - 1
            dataValues[index]++
          })

          return {
            label: type,
            data: dataValues,
            borderColor: colors[i],
            backgroundColor: colors[i],
            cubicInterpolationMode: "monotone",
          } as DatasetType
        })

        setDatasets(newDatasets)
      }
    )
  }, [])

  const memoizedData = useMemo(() => ({ labels, datasets }), [labels, datasets])

  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Conclusão das disciplinas por período",
          },
        },
      }}
      data={memoizedData}
    />
  )
}
