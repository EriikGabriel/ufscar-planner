import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu"
import { BellIcon } from "lucide-react"

export function Header() {
  return (
    <header className="w-full h-[10%] border-b flex items-center justify-between px-14">
      <div className="flex gap-12 items-center justify-around">
        <h1 className="text-xl tracking-wider">Boa noite, Erik 👋</h1>
      </div>
      <div className="flex items-center gap-8">
        <BellIcon size={24} />

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
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Preferências</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
