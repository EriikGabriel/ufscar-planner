"use client"

import { createClient } from "@lib/supabase/client"
import { Chart, ChartData, registerables } from "chart.js"
import { useEffect, useMemo, useState } from "react"
import { Line } from "react-chartjs-2"
import { useProjectionContext } from "../contexts/ProjectionContext"

type DatasetType = ChartData<"line">["datasets"][0]

export function LineChart() {
  const [labels, setLabels] = useState<string[]>([])
  const [datasets, setDatasets] = useState<DatasetType[]>([])

  const { projection } = useProjectionContext()

  Chart.register(...registerables)

  useEffect(() => {
    const sigaAuth = localStorage.getItem("@ufscar-planner/siga-auth") ?? ""
    const projection =
      localStorage.getItem("@ufscar-planner/projection") === "true"
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
            length:
              student.semester_completed || projection
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
            (d) =>
              d.activity_id === i + 1 &&
              (!projection ? d.conclusion_semester : true)
          )

          filteredDisciplines.forEach((d) => {
            if (
              !d.conclusion_semester &&
              (!projection || d.status !== "Studying")
            ) {
              return
            }

            const index =
              d.status === "Studying" && projection
                ? student.semester - 1
                : d.conclusion_semester! - 1

            dataValues[index]++
          })

          return {
            label: type,
            data: dataValues,
            segment: {
              borderDash: (cfx) =>
                cfx.p1DataIndex === student.semester - 1 ? [5] : undefined,
            },
            borderColor: colors[i],
            backgroundColor: colors[i],
            cubicInterpolationMode: "monotone",
          } as DatasetType
        })

        setDatasets(newDatasets)
      }
    )
  }, [projection])

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
