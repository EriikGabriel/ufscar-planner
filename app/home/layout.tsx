import { Menu } from "@components/Menu"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="pt-br">
      <body className={`${inter.className} flex`}>
        <Menu />
        {children}
      </body>
    </html>
  )
}
