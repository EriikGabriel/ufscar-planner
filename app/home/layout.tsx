import { Menu } from "@components/Menu"
import type { Metadata } from "next"
import { ProjectionContextProvider } from "../contexts/ProjectionContext"
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
    <ProjectionContextProvider>
      <Menu />
      {children}
    </ProjectionContextProvider>
  )
}
