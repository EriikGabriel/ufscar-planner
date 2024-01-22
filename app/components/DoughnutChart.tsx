import { ChartData } from "chart.js"
import { Doughnut } from "react-chartjs-2"

export function DoughnutChart() {
  const labels = ["Concluído (%)", "Restante (%)"]

  const data = {
    labels,
    datasets: [
      {
        label: "Obrigatórias",
        data: [79, 100 - 79],
        backgroundColor: ["rgba(54, 162, 235)", "rgba(54, 162, 235, 0.2)"],
      },
      {
        label: "Optativas",
        data: [18, 100 - 18],
        backgroundColor: ["rgba(249, 115, 22)", "rgba(249, 115, 22, 0.2)"],
      },
      {
        label: "Complementares",
        data: [0, 100 - 0],
        backgroundColor: ["rgba(34, 197, 94)", "rgba(34, 197, 94, 0.2)"],
      },
      {
        label: "Extensão",
        data: [0, 100 - 0],
        backgroundColor: ["rgba(168, 85, 247)", "rgba(168, 85, 247, 0.2)"],
      },
      {
        label: "Estágio",
        data: [0, 100 - 0],
        backgroundColor: ["rgba(234, 179, 8)", "rgba(234, 179, 8, 0.2)"],
      },
    ],
  } as ChartData<"doughnut">

  const generalPercentage = ((79 + 18) / (100 * 5)) * 100

  return (
    <div className="relative">
      <Doughnut
        data={data}
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
      <div className="flex flex-col justify-center items-center gap-3 absolute bottom-5 left-1/2 -translate-x-1/2">
        <h1 className="text-4xl font-bold font-mono">
          {generalPercentage.toFixed(0)}%
        </h1>
        <p className="!font-light text-zinc-300 font-mono">Porcentagem Geral</p>
      </div>
    </div>
  )
}
