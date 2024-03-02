import { GeneralProfileSession } from "@components/GeneralProfileSession"
import { ProfileMenu } from "@components/ProfileMenu"
import { getCookie } from "@helpers/store"
import { createClient } from "@lib/supabase/server"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Profile({
  params: { profileSession },
}: {
  params: { profileSession?: string[] }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const userHash = await getCookie("siga-auth")

  if (!userHash) redirect("/")

  const session = profileSession?.[0]

  const { data: student } = await supabase
    .from("students")
    .select()
    .eq(userHash.value.length === 6 ? "ra" : "email", userHash.value)
    .single()

  const { data: disciplines } = await supabase.from("disciplines").select()

  return (
    <main className="w-dvw min-h-dvh flex flex-col gap-20 justify-center items-center">
      <div className="w-10/12 flex flex-col gap-5">
        <div className="flex gap-5">
          <Avatar className="rounded-md h-16 w-16">
            <AvatarImage src="https://github.com/EriikGabriel.png" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center gap-1">
            <h1 className="font-medium text-2xl">{student?.name}</h1>
            <p className="text-sm text-zinc-500">
              Gerencie as informações da conta, as disciplinas do semestre
              corrente e visualize os requisitos.
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <ProfileMenu session={profileSession?.[0]} />
          {!session && <GeneralProfileSession student={student!} />}
        </div>
      </div>
    </main>
  )
}
