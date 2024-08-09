"use client"

import { createClient } from "@lib/supabase/client"
import { ChartData } from "chart.js"
import { useEffect, useMemo, useState } from "react"
import { Doughnut } from "react-chartjs-2"

type DatasetType = ChartData<"doughnut">["datasets"][0]

export function DoughnutChart() {
  const [datasets, setDatasets] = useState<DatasetType[]>([])
  const [labels, setLabels] = useState(["Concluído (%)", "Restante (%)"])

  const [generalPercentage, setGeneralPercentage] = useState(0)

  useEffect(() => {
    const supabase = createClient()
    const projection =
      localStorage.getItem("@ufscar-planner/projection") === "true"

    const activitiesQuery = supabase.from("activities").select().order("id")
    const currentDisciplinesQuery = supabase
      .from("disciplines")
      .select()
      .eq("status", "Studying")
      .order("id")

    if (projection) {
      setLabels(["Concluído (%)", "Projeção (%)", "Restante (%)"])
    } else {
      setLabels(["Concluído (%)", "Restante (%)"])
    }

    Promise.all([activitiesQuery, currentDisciplinesQuery]).then(
      ([activitiesRes, disciplinesRes]) => {
        const activities = activitiesRes.data
        const disciplines = disciplinesRes.data

        if (!activities) return

        activities?.forEach((activity, i) => {
          if (activity.name === "Optativas 1") {
            const optativa2 = activities.find(
              (act) => act.name === "Optativas 2"
            )

            if (optativa2) {
              activity.name = "Optativas"
              activity.required_hours += optativa2.required_hours
              activity.coursed_hours += optativa2.coursed_hours
            }
          }

          if (activity.name !== "Optativas 2") activity.id = i + 1
          else activities.splice(i, 1)
        })

        const colors = [
          ["rgba(54, 162, 235)", "rgba(54, 162, 235, 0.2)"],
          ["rgba(249, 115, 22)", "rgba(249, 115, 22, 0.2)"],
          ["rgba(34, 197, 94)", "rgba(34, 197, 94, 0.2)"],
          ["rgba(168, 85, 247)", "rgba(168, 85, 247, 0.2)"],
          ["rgba(234, 179, 8)", "rgba(234, 179, 8, 0.2)"],
        ]

        const projectionColors = [
          [
            "rgba(54, 162, 235)",
            "rgba(54, 162, 235, 0.4)",
            "rgba(54, 162, 235, 0.2)",
          ],
          [
            "rgba(249, 115, 22)",
            "rgba(249, 115, 22, 0.4)",
            "rgba(249, 115, 22, 0.2)",
          ],
          [
            "rgba(34, 197, 94)",
            "rgba(34, 197, 94, 0.4)",
            "rgba(34, 197, 94, 0.2)",
          ],
          [
            "rgba(168, 85, 247)",
            "rgba(168, 85, 247, 0.4)",
            "rgba(168, 85, 247, 0.2)",
          ],
          [
            "rgba(234, 179, 8)",
            "rgba(234, 179, 8, 0.4)",
            "rgba(234, 179, 8, 0.2)",
          ],
        ]

        const newDatasets = Array.from(
          { length: activities.length },
          (_, i) => {
            const currentDisciplineHours = Array.from(
              { length: activities.length },
              () => 0
            )

            disciplines?.forEach((discipline) => {
              const act_id =
                discipline.activity_id === 3 ? 2 : discipline.activity_id
              currentDisciplineHours[act_id - 1] +=
                discipline.p_hours + discipline.t_hours
            })

            const relativePercentage =
              activities[i].coursed_hours / activities[i].required_hours

            const projectionRelativePercentage =
              (activities[i].coursed_hours + currentDisciplineHours[i]) /
              activities[i].required_hours

            const percentage = Number((relativePercentage * 100).toFixed(0))
            const projectionPercentage = Number(
              (projectionRelativePercentage * 100).toFixed(0)
            )

            const diffPercentage = projectionPercentage - percentage

            return {
              label: activities[i].name,
              data: projection
                ? [
                    percentage,
                    diffPercentage,
                    100 - percentage - diffPercentage,
                  ]
                : [percentage, 100 - percentage],
              backgroundColor: projection ? projectionColors[i] : colors[i],
              borderColor: (ctx) => {
                return ctx.dataIndex === 1 && projection
                  ? colors[i][0]
                  : "transparent"
              },
              borderWidth: 2,
              borderDash: [6],
            } as DatasetType
          }
        )

        setDatasets(newDatasets)

        const totalPercentage = 100 * newDatasets.length

        const newGeneralPercentage =
          newDatasets.reduce((acc, dataset) => {
            return acc + dataset.data[0] + (projection ? dataset.data[1] : 0)
          }, 0) / totalPercentage

        setGeneralPercentage(newGeneralPercentage * 100)
      }
    )
  }, [])

  const memoizedData = useMemo(() => ({ labels, datasets }), [labels, datasets])

  return (
    <div className="relative">
      <Doughnut
        data={memoizedData}
        options={{
          borderColor: "transparent",
          rotation: -90,
          circumference: 180,
          aspectRatio: 2,
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Porcentagem de conclusão das atividades",
            },
          },
        }}
      />
      <div className="flex flex-col justify-center items-center gap-3 absolute bottom-5 max-md:bottom-0 left-1/2 -translate-x-1/2">
        <h1 className="text-4xl font-bold font-mono max-md:text-xl">
          {generalPercentage.toFixed(0)}% {generalPercentage === 100 && "🎉"}
        </h1>
        <p className="!font-light text-zinc-300 font-mono max-md:text-xs">
          Porcentagem Geral
        </p>
      </div>
    </div>
  )
}
