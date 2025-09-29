import { cn } from "../lib/utils"

interface SectionSetupProps {
  icon: React.ReactNode
  title: string
  description: string
  active?: boolean
}

export function SectionSetup({
  icon,
  title,
  description,
  active = false,
}: SectionSetupProps) {
  return (
    <section
      className={cn(
        "flex gap-3 items-center justify-center p-3 w-full border-l-4 transition-all",
        active &&
          "border-red-500 bg-gradient-to-r from-red-500/20 to-transparent"
      )}
    >
      <div
        className={cn(
          "rounded flex items-center justify-center min-w-14 size-14 transition-all",
          active && "bg-red-500"
        )}
      >
        {icon}
      </div>
      <div className="w-full">
        <h2 className="text-lg">{title}</h2>
        <p className="font-light text-xs text-zinc-400">{description}</p>
      </div>
    </section>
  )
}
