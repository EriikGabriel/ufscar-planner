import { DataList } from "@/app/components/DataList"
import { createClient } from "@lib/supabase/server"
import { cookies } from "next/headers"

export default async function Extras({
  params: { extra },
}: {
  params: { extra: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

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
