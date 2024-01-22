"use client"

import { Chart, ChartData, registerables } from "chart.js"
import { Bar } from "react-chartjs-2"

export function BarChart() {
  Chart.register(...registerables)

  const labels = [
    "Período 1",
    "Período 2",
    "Período 3",
    "Período 4",
    "Período 5",
  ]

  const data = {
    labels,
    datasets: [
      {
        label: "Obrigatórias",
        data: [6, 5, 5, 6, 2],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235)",
        borderRadius: 5,
      },
      {
        label: "Optativas 1",
        data: [0, 0, 0, 0, 0],
        borderColor: "rgb(222, 31, 200)",
        backgroundColor: "rgba(222, 31, 200)",
        borderRadius: 5,
      },
      {
        label: "Optativas 2",
        data: [0, 1, 1, 0, 2],
        borderColor: "rgb(222, 31, 31)",
        backgroundColor: "rgba(222, 31, 31)",
        borderRadius: 5,
      },
    ],
  } as ChartData<"bar">

  type LineType = ChartData<"line", number[], string> & {
    cubicInterpolationMode: "monotone" | "default"
  }

  return (
    <Bar
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
      data={data}
    />
  )
}
