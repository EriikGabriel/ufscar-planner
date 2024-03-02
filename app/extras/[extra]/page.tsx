import { DataList } from "@components/DataList"
import { getCookie } from "@helpers/store"
import { createClient } from "@lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Extras({
  params: { extra },
}: {
  params: { extra: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const userHash = await getCookie("siga-auth")

  if (!userHash) redirect("/")

  const titles = {
    complementary: "Complementares",
    extension: "Extensão",
    internship: "Estágio",
  }

  const { data: complementary } = await supabase
    .from("extras")
    .select()
    .eq(
      "activity_id",
      extra === "complementary" ? 4 : extra === "extension" ? 5 : 6
    )

  return (
    <main className="w-dvw min-h-dvh flex flex-col gap-20 justify-center items-center">
      <h1 className="text-lg font-light">
        Atividades {["extension", "internship"].includes(extra) && "de"}{" "}
        <span className="font-semibold">
          {titles[extra as "complementary" | "extension" | "internship"]}
        </span>
      </h1>
      <DataList data={complementary ?? []} />
    </main>
  )
}
