import { MenuButton } from "./MenuButton"

export function Menu() {
  return (
    <nav className="relative min-h-dvh w-fit flex flex-col justify-center items-center gap-10 px-5 bg-zinc-900/50">
      <MenuButton href="/home" icon="LayoutGrid" />
      <MenuButton href="/activities/mandatory" icon="FileKey2" />
      <MenuButton href="/activities/optional" icon="FileClock" />
      <MenuButton href="/activities/complementary" icon="FilePieChart" />
      <MenuButton href="/activities/extension" icon="FileBox" />
      <MenuButton href="/activities/internship" icon="FileBadge" />
    </nav>
  )
}
