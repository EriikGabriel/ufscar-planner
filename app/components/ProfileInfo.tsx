import { getCookie } from "@helpers/store"
import { createClient } from "@lib/supabase/server"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import { Separator } from "@ui/separator"
import { cookies } from "next/headers"

export async function ProfileInfo() {
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
    .eq("status", "studying")

  return (
    <div className="bg-zinc-900/70 flex items-center justify-between w-full h-20 p-5 rounded-md">
      <div className="flex gap-3">
        <Avatar className="rounded-md h-12 w-12">
          <AvatarImage src="https://github.com/EriikGabriel.png" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-medium text-lg">{student?.name}</h1>
          <p className="text-sm text-zinc-500">{student?.email}</p>
        </div>
      </div>
      <div className="flex items-end gap-1 flex-col">
        <h2 className="font-light text-sm">
          Período: <span className="font-bold">{student?.semester}</span> / 9
        </h2>
        <Separator />
        <h2 className="font-light text-sm">
          Disciplinas atuais:{" "}
          <span className="font-bold">{countDisciplines}</span>
        </h2>
      </div>
    </div>
  )
}
