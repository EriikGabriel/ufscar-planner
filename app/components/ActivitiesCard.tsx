import { LucideIcon } from "lucide-react"
import { cn } from "../lib/utils"

interface ActivitiesCardProps extends React.ComponentProps<"div"> {
  Icon: LucideIcon
  children: React.ReactNode
  color: string
  quantity: number
  required: number
  estimated?: number
}

export function ActivitiesCard({
  children,
  color,
  required,
  quantity,
  estimated,
  Icon,
  className,
}: ActivitiesCardProps) {
  const percentage = (quantity / required) * 100

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border h-fit rounded-md p-3",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <div className={cn("w-fit p-3 rounded-lg", color)}>
          <Icon className="text-zinc-950" size={24} />
        </div>
        <h2 className="text-sm flex text-end flex-col font-light">
          {children}
        </h2>
      </div>
      <p className="font-medium">{percentage.toFixed(0)}% completo</p>
      <small className="text-zinc-500">
        {quantity} de {required} horas. Faltam {required - quantity}.{" "}
        {estimated && `(Est. ${estimated} horas)`}
      </small>
    </div>
  )
}
