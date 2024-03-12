import { getCookie } from "@helpers/store"
import { createClient } from "@lib/supabase/server"
import { BellIcon } from "lucide-react"
import { cookies } from "next/headers"
import { ProfileDropdown } from "./ProfileDropdown"

export async function Header() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const sigaAuth = (await getCookie("siga-auth"))?.value ?? ""

  const { data: student } = await supabase
    .from("students")
    .select()
    .eq(sigaAuth.length === 6 ? "ra" : "email", sigaAuth)
    .single()

  return (
    <header className="w-full h-[10%] border-b flex items-center justify-between px-14">
      <div className="flex gap-12 items-center justify-around">
        <h1 className="text-xl tracking-wider">
          {new Date().getHours() < 13 ? "Bom dia" : "Boa noite"},{" "}
          {student?.name.split(" ")[0]} 👋
        </h1>
      </div>
      <div className="flex items-center gap-8">
        <BellIcon size={24} />
        <ProfileDropdown />
      </div>
    </header>
  )
}
