import { Button } from "@ui/button"
import { ChevronRight, icons } from "lucide-react"
import Link from "next/link"
import { cn } from "../lib/utils"

interface ProfileMenuButtonProps {
  href?: string
  icon: keyof typeof icons
  children: React.ReactNode
  session: string | undefined
}

export function ProfileMenuButton({
  href,
  icon,
  session,
  children,
}: ProfileMenuButtonProps) {
  const Icon = icons[icon]

  const sessionIsActive = session === href?.split("/")[3]

  return (
    <Button
      asChild
      variant="ghost"
      size="lg"
      className={cn(
        "flex justify-between p-3 py-6  rounded-none",
        sessionIsActive && "border-l border-l-red-500"
      )}
    >
      <Link href={href ?? ""}>
        <div className="flex items-center">
          <Icon
            className={cn("w-6 h-6 mr-2", sessionIsActive && "text-red-500")}
          />{" "}
          {children}
        </div>
        <ChevronRight
          className={cn("w-4 h-4 ml-2", sessionIsActive && "text-red-500")}
        />
      </Link>
    </Button>
  )
}
