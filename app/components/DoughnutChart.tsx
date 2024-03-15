"use client"

import { createClient } from "@lib/supabase/client"
import { ChartData } from "chart.js"
import { useEffect, useMemo, useState } from "react"
import { Doughnut } from "react-chartjs-2"

type DatasetType = ChartData<"doughnut">["datasets"][0]

export function DoughnutChart() {
  const [datasets, setDatasets] = useState<DatasetType[]>([])
  const [labels] = useState(["Concluído (%)", "Restante (%)"])

  const [generalPercentage, setGeneralPercentage] = useState(0)

  useEffect(() => {
    const supabase = createClient()

    const activitiesQuery = supabase.from("activities").select().order("id")

    Promise.all([activitiesQuery]).then(([activitiesRes]) => {
      const activities = activitiesRes.data

      if (!activities) return

      activities?.forEach((activity, i) => {
        if (activity.name === "Optativas 1") {
          const optativa2 = activities.find((act) => act.name === "Optativas 2")

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

      const newDatasets = Array.from({ length: activities.length }, (_, i) => {
        const relativePercentage =
          activities[i].coursed_hours / activities[i].required_hours
        const percentage = Number((relativePercentage * 100).toFixed(0))

        return {
          label: activities[i].name,
          data: [percentage, 100 - percentage],
          backgroundColor: colors[i],
        } as DatasetType
      })

      setDatasets(newDatasets)

      const totalPercentage = 100 * newDatasets.length

      const newGeneralPercentage =
        newDatasets.reduce((acc, dataset) => {
          return acc + dataset.data[0]
        }, 0) / totalPercentage

      setGeneralPercentage(newGeneralPercentage * 100)
    })
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
            legend: { position: "top" as const },
            title: {
              display: true,
              text: "Porcentagem de conclusão das atividades",
            },
          },
        }}
      />
      <div className="flex flex-col justify-center items-center gap-3 absolute bottom-5 left-1/2 -translate-x-1/2">
        <h1 className="text-4xl font-bold font-mono">
          {generalPercentage.toFixed(0)}%
        </h1>
        <p className="!font-light text-zinc-300 font-mono">Porcentagem Geral</p>
      </div>
    </div>
  )
}
