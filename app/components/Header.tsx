import { BellIcon } from "lucide-react"
import { ProfileDropdown } from "./ProfileDropdown"

export function Header() {
  return (
    <header className="w-full h-[10%] border-b flex items-center justify-between px-14">
      <div className="flex gap-12 items-center justify-around">
        <h1 className="text-xl tracking-wider">Boa noite, Erik 👋</h1>
      </div>
      <div className="flex items-center gap-8">
        <BellIcon size={24} />
        <ProfileDropdown />
      </div>
    </header>
  )
}
