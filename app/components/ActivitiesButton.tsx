import { Button, ButtonProps } from "@ui/button"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface ActivitiesButtonProps extends ButtonProps {
  Icon: LucideIcon
  href?: string
  children: React.ReactNode
}

export function ActivitiesButton({
  children,
  className,
  href,
  Icon,
}: ActivitiesButtonProps) {
  return (
    <Button
      variant="secondary"
      className={`${className} h-20 w-48 px-5`}
      asChild
    >
      <Link href={href ?? ""}>
        <Icon className="mr-2 h-6 w-6" /> {children}
      </Link>
    </Button>
  )
}
