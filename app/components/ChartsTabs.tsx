import { BarChartBigIcon, LineChartIcon, RainbowIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs"
import { BarChart } from "./BarChart"
import { DoughnutChart } from "./DoughnutChart"
import { LineChart } from "./LineChart"
import { ToggleProjection } from "./ToggleProjection"

export function ChartsTabs() {
  return (
    <Tabs defaultValue="line" className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="line">
            <LineChartIcon />
          </TabsTrigger>
          <TabsTrigger value="bar">
            <BarChartBigIcon />
          </TabsTrigger>
          <TabsTrigger value="doughnut">
            <RainbowIcon />
          </TabsTrigger>
        </TabsList>
        <ToggleProjection />
      </div>
      <TabsContent
        value="line"
        className="bg-zinc-800/20 p-2 py-3 border rounded-md"
      >
        <LineChart />
      </TabsContent>
      <TabsContent
        value="bar"
        className="bg-zinc-800/20 p-2 py-3 border rounded-md "
      >
        <BarChart />
      </TabsContent>
      <TabsContent
        value="doughnut"
        className="bg-zinc-800/20 p-2 py-3 border rounded-md "
      >
        <DoughnutChart />
      </TabsContent>
    </Tabs>
  )
}
