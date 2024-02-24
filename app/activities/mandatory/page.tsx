import { createClient } from "@lib/supabase/server"
import { DataTable } from "@ui/data-table"
import { columns } from "@ui/data-table-columns"
import { cookies } from "next/headers"

export default async function Mandatory() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: disciplines } = await supabase
    .from("disciplines")
    .select()
    .eq("activity_id", 1)

  return (
    <main className="w-dvw min-h-dvh flex justify-center items-center">
      <DataTable data={disciplines ?? []} columns={columns} />
    </main>
  )
}
