"use client"

import { deleteCookie } from "@helpers/store"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function ProfileDropdown() {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/EriikGabriel.png" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="user/profile">
          <DropdownMenuItem>Perfil</DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="text-red-600"
          onClick={async () => {
            await deleteCookie("siga-auth")
            await deleteCookie("first-setup")

            router.push("/")
          }}
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
