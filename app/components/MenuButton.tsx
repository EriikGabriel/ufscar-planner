"use client"

import { Button, ButtonProps } from "@ui/button"
import { icons } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../lib/utils"

interface MenuButtonProps extends ButtonProps {
  href?: string
  icon: keyof typeof icons
}

export function MenuButton({ icon, href }: MenuButtonProps) {
  const pathName = usePathname()
  const Icon = icons[icon]

  return (
    <Button
      asChild
      size="icon"
      variant="ghost"
      className={cn(
        "hover:bg-zinc-400/25 w-12 h-12 rounded-xl",

        pathName === href &&
          "bg-red-400/15 border border-red-500/25 hover:bg-red-400/25 before:content-[''] before:bg-red-700 before:h-12 before:w-1 before:absolute before:left-0 before:rounded-md"
      )}
    >
      <Link href={href ?? ""}>
        <Icon
          className={pathName === href ? "text-red-500" : "text-zinc-400"}
          size={24}
        />
      </Link>
    </Button>
  )
}
