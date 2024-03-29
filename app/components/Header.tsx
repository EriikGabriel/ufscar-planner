import { getCookie } from "@helpers/store"
import { createClient } from "@lib/supabase/server"
import { BellIcon } from "lucide-react"
import { cookies } from "next/headers"
import { ProfileDropdown } from "./ProfileDropdown"
import { Button } from "./ui/button"

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
    <header className="w-full h-[10%] max-xl:py-5 border-b flex items-center justify-between px-14">
      <div className="flex gap-12 items-center justify-around">
        <h1 className="text-xl tracking-wider max-md:text-md max-sm:text-sm">
          {new Date().getHours() < 13
            ? "Bom dia"
            : new Date().getHours() <= 17
            ? "Boa tarde"
            : "Boa noite"}
          , {student?.name.split(" ")[0]} 👋
        </h1>
      </div>
      <div className="flex items-center gap-8">
        <Button variant="ghost" size="icon">
          <BellIcon className="max-md:hidden w-5 h-5" />
        </Button>
        <ProfileDropdown />
      </div>
    </header>
  )
}
