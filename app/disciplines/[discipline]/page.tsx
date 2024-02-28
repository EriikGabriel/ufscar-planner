import { createClient } from "@lib/supabase/server"
import { DataTable } from "@ui/data-table"
import { mandatoryColumns, optativeColumns } from "@ui/data-table-columns"
import { cookies } from "next/headers"

export default async function Disciplines({
  params: { discipline },
}: {
  params: { discipline: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: disciplines } = await supabase
    .from("disciplines")
    .select()
    .in("activity_id", discipline === "mandatory" ? [1] : [2, 3])
    .order("status")

  return (
    <main className="w-dvw min-h-dvh flex flex-col gap-20 justify-center items-center">
      <h1 className="text-lg font-light">
        Disciplinas{" "}
        <span className="font-semibold">
          {discipline === "mandatory" ? "Obrigatórias" : "Optativas"}
        </span>
      </h1>
      <DataTable
        data={disciplines ?? []}
        columns={
          discipline === "mandatory" ? mandatoryColumns : optativeColumns
        }
      />
    </main>
  )
}
