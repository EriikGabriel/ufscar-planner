import { getCookie } from "@helpers/store"
import { createClient } from "@lib/supabase/server"
import { SlotProps } from "@radix-ui/react-slot"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import { Separator } from "@ui/separator"
import { cookies } from "next/headers"
import { cn } from "../lib/utils"

export async function ProfileInfo({ className }: SlotProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const sigaAuth = (await getCookie("siga-auth"))?.value ?? ""

  const { data: student } = await supabase
    .from("students")
    .select()
    .eq(sigaAuth.length === 6 ? "ra" : "email", sigaAuth)
    .single()

  const { count: countDisciplines } = await supabase
    .from("disciplines")
    .select("*", { count: "exact" })
    .eq("status", "Studying")

  return (
    <div
      className={cn(
        "bg-zinc-900/70 flex items-center justify-between w-full h-20 p-5 rounded-md",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="rounded-md h-12 w-12">
          <AvatarImage src="https://github.com/EriikGabriel.png" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-medium text-lg max-2xl:text-sm">
            {student?.name}
          </h1>
          <p className="text-sm text-zinc-500">{student?.email}</p>
        </div>
      </div>
      <div className="flex items-end gap-1 flex-col max-md:hidden">
        <h2 className="font-light text-sm max-2xl:text-xs">
          Período: <span className="font-bold">{student?.semester}</span> / 9
        </h2>
        <Separator />
        <h2 className="font-light text-sm max-2xl:text-xs">
          Disciplinas atuais:{" "}
          <span className="font-bold">{countDisciplines}</span>
        </h2>
      </div>
    </div>
  )
}
