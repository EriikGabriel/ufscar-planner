import { BarChartBigIcon, LineChartIcon, RainbowIcon } from "lucide-react"

import { BarChart } from "./BarChart"
import { DoughnutChart } from "./DoughnutChart"
import { LineChart } from "./LineChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export function ChartsTabs() {
  return (
    <Tabs defaultValue="line" className="w-full">
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
      <TabsContent
        value="line"
        className="bg-zinc-800/20 p-2 py-3 border rounded-md"
      >
        <LineChart />
      </TabsContent>
      <TabsContent
        value="bar"
        className="bg-zinc-800/20 p-2 py-3 border rounded-md"
      >
        <BarChart />
      </TabsContent>
      <TabsContent
        value="doughnut"
        className="bg-zinc-800/20 p-2 py-3 border rounded-md"
      >
        <DoughnutChart />
      </TabsContent>
    </Tabs>
  )
}
