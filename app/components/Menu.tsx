import { MenuButton } from "./MenuButton"

export function Menu() {
  return (
    <nav className="relative min-h-dvh w-fit flex flex-col justify-center items-center gap-10 px-5 bg-zinc-900/50">
      <MenuButton href="/home" icon="LayoutGrid" />
      <MenuButton href="/disciplines/mandatory" icon="FileKey2" />
      <MenuButton href="/disciplines/optative" icon="FileClock" />
      <MenuButton href="/extras/complementary" icon="FilePieChart" />
      <MenuButton href="/extras/extension" icon="FileBox" />
      <MenuButton href="/extras/internship" icon="FileBadge" />
    </nav>
  )
}
