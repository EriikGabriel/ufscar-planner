import { LucideIcon } from "lucide-react"
import { cn } from "../lib/utils"

interface ActivitiesCardProps extends React.ComponentProps<"div"> {
  Icon: LucideIcon
  children: React.ReactNode
  color: string
  quantity: number
  required: number
  estimated?: number
  index?: number
}

export function ActivitiesCard({
  children,
  color,
  required,
  quantity,
  estimated,
  Icon,
  className,
  index: i,
}: ActivitiesCardProps) {
  const percentage = (quantity / required) * 100

  return (
    <div
      className={cn(
        "flex relative flex-col justify-between gap-3 max-xl:gap-3 border max-2xl:h-full rounded-md p-3",
        className
      )}
    >
      <div className="flex justify-between max-xl:justify-end items-center">
        <div
          className={cn(
            "w-fit max-xl:absolute max-xl:top-3 max-xl:left-3 p-3 max-2xl:p-2 max-xl:p-0 rounded-lg max-xl:bg-transparent",
            color
          )}
        >
          <Icon
            className={cn(
              "text-zinc-950 w-6",
              i === 0 && "max-xl:text-blue-500",
              i === 1 && "max-xl:text-orange-500",
              i === 2 && "max-xl:text-green-500",
              i === 3 && "max-xl:text-purple-500",
              i === 4 && "max-xl:text-yellow-500"
            )}
          />
        </div>
        <h2 className="text-sm flex text-end flex-col max-sm:flex-row max-xl:gap-2 font-light">
          {children}
        </h2>
      </div>
      <div className="max-xl:text-end">
        <p className="font-medium max-xl:text-sm">
          {percentage.toFixed(0)}% completo
        </p>
        <small className="text-zinc-500">
          {quantity} de {required} horas. Faltam {required - quantity}.{" "}
          <span className="max-2xl:hidden">
            {estimated && `(Est. ${estimated} horas)`}
          </span>
        </small>
      </div>
    </div>
  )
}
