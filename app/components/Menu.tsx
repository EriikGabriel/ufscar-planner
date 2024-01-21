import { Button } from "@ui/button"
import {
  FileBoxIcon,
  FileClockIcon,
  FileKey2Icon,
  FilePieChartIcon,
  LayoutGridIcon,
} from "lucide-react"

export function Menu() {
  return (
    <nav className="relative min-h-dvh w-fit flex flex-col justify-center items-center gap-10 px-5 bg-zinc-900/50">
      <Button
        size="icon"
        className="bg-red-400/15 border border-red-500/25 hover:bg-red-400/25 w-12 h-12 rounded-xl before:content-[''] before:bg-red-700 before:h-12 before:w-1 before:absolute before:left-0 before:rounded-md"
      >
        <LayoutGridIcon size={24} className="text-red-600" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="hover:bg-zinc-400/25 w-12 h-12 rounded-xl"
      >
        <FileKey2Icon size={24} className="text-zinc-400" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="hover:bg-zinc-400/25 w-12 h-12 rounded-xl"
      >
        <FileClockIcon size={24} className="text-zinc-400" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="hover:bg-zinc-400/25 w-12 h-12 rounded-xl"
      >
        <FilePieChartIcon size={24} className="text-zinc-400" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="hover:bg-zinc-400/25 w-12 h-12 rounded-xl"
      >
        <FileBoxIcon size={24} className="text-zinc-400" />
      </Button>
    </nav>
  )
}
