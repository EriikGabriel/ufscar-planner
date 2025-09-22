import { MenuButton } from "./MenuButton"

export function Menu() {
  return (
    <nav className="relative max-xl:fixed max-xl:-left-20 max-xl:hover:left-0 min-h-dvh w-fit flex flex-col justify-between items-center px-5 pb-10 pt-48 bg-zinc-900/50 max-xl:bg-zinc-900 z-10">
      <div className="flex flex-col gap-10">
        <MenuButton href="/home" icon="LayoutGrid" />
        <MenuButton href="/disciplines/mandatory" icon="FileKey2" />
        <MenuButton href="/disciplines/optative" icon="FileClock" />
        <MenuButton href="/extras/complementary" icon="FilePieChart" />
        <MenuButton href="/extras/extension" icon="FileBox" />
        <MenuButton href="/disciplines/conclusive" icon="FileBadge" />
      </div>

      <div className="flex flex-col gap-5">
        <MenuButton href="/user/profile" icon="UserRound" />
        <MenuButton className="hover:text-red-500" icon="DoorOpen" exitAction />
      </div>
    </nav>
  )
}
