import { Menu } from "@components/Menu"
import { TooltipProvider } from "@ui/tooltip"
import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "UFSCar Planner",
  description: "Planejador de matérias e metas da UFSCar",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TooltipProvider>
      <Menu />
      {children}
    </TooltipProvider>
  )
}
