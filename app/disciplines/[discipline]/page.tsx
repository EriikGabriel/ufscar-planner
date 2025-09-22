import { getCookie } from "@helpers/store"
import { createClient } from "@lib/supabase/server"
import { DataTable } from "@ui/data-table"
import {
  conclusiveColumns,
  mandatoryColumns,
  optativeColumns,
} from "@ui/data-table-columns"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Disciplines({
  params: { discipline },
}: {
  params: { discipline: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const userHash = await getCookie("siga-auth")
  if (!userHash) redirect("/")

  // Defina os activity_id de acordo com seu schema
  let activityIds: number[] = []
  switch (discipline) {
    case "mandatory":
      activityIds = [1]
      break
    case "optative":
      activityIds = [2, 3]
      break
    case "conclusive":
      activityIds = [6]
      break
    default:
      redirect("/")
  }

  const { data: disciplines } = await supabase
    .from("disciplines")
    .select()
    .in("activity_id", activityIds)
    .order("status")
    .order("name")

  return (
    <main className="w-dvw min-h-dvh flex flex-col gap-20 justify-center items-center">
      <h1 className="text-lg font-light max-lg:mt-5">
        Disciplinas{" "}
        <span className="font-semibold">
          {discipline === "mandatory"
            ? "Obrigatórias"
            : discipline === "optative"
            ? "Optativas"
            : "Conclusivas"}
        </span>
      </h1>
      <DataTable
        data={disciplines ?? []}
        columns={
          discipline === "mandatory"
            ? mandatoryColumns
            : discipline === "optative"
            ? optativeColumns
            : conclusiveColumns
        }
        tools={{ registerButton: true }}
        showActivity={!["mandatory", "conclusive"].includes(discipline)}
        className="max-xl:w-10/12 max-lg:mb-5 max-md:w-11/12"
      />
    </main>
  )
}
