import { Button, ButtonProps } from "@ui/button"
import { LucideIcon } from "lucide-react"

interface ActivitiesButtonProps extends ButtonProps {
  Icon: LucideIcon
  children: React.ReactNode
}

export function ActivitiesButton({
  children,
  className,
  Icon,
}: ActivitiesButtonProps) {
  return (
    <Button variant="secondary" className={`${className} h-20 w-48 px-5`}>
      <Icon className="mr-2 h-6 w-6" /> {children}
    </Button>
  )
}
