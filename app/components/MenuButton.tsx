"use client"

import { Button, ButtonProps } from "@ui/button"
import { icons } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { deleteCookie } from "../helpers/store"
import { cn } from "../lib/utils"

interface MenuButtonProps extends ButtonProps {
  href?: string
  icon: keyof typeof icons
  exitAction?: boolean
  ariaLabel?: string // Adiciona propriedade para rótulo acessível
}

export function MenuButton({
  icon,
  href,
  exitAction,
  ariaLabel,
  ...rest
}: MenuButtonProps) {
  const pathName = usePathname()
  const router = useRouter()
  const Icon = icons[icon]

  const buttonClasses = cn(
    "hover:bg-zinc-400/25 w-12 h-12 rounded-xl",
    pathName.includes(href!) &&
      "bg-red-400/15 border border-red-500/25 hover:bg-red-400/25 before:content-[''] before:bg-red-700 before:h-12 before:w-1 before:absolute before:left-0 before:rounded-md"
  )

  const handleClick = async () => {
    if (!exitAction) return

    try {
      await deleteCookie("siga-auth")
      router.push("/")
    } catch (error) {
      console.error("Error performing logout:", error)
    }
  }

  return (
    <Button
      {...rest}
      aria-label={ariaLabel || (exitAction ? "Sair" : "Menu Item")}
      asChild={!exitAction}
      size="icon"
      variant="ghost"
      className={buttonClasses}
      onClick={handleClick}
    >
      {exitAction ? (
        <Icon className="text-zinc-400" size={24} />
      ) : (
        <Link href={href ?? ""}>
          <Icon
            className={
              pathName.includes(href!) ? "text-red-500" : "text-zinc-400"
            }
            size={24}
          />
        </Link>
      )}
    </Button>
  )
}
