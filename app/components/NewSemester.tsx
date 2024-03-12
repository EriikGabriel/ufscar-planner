import { createClient } from "@lib/supabase/server"
import { DataTable } from "@ui/data-table"
import { newSemesterColumns } from "@ui/data-table-columns"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet"
import { cookies } from "next/headers"

interface NewSemesterProps {
  children: React.ReactNode
}

export async function NewSemester({ children }: NewSemesterProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: disciplines } = await supabase
    .from("disciplines")
    .select()
    .in("status", ["Not started", "Pending"])
    .order("status")

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Novo semestre</SheetTitle>
          <SheetDescription>
            Inicie um novo semestre e defina suas disciplinas.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5 mt-5 mb-10!">
          <DataTable
            data={disciplines ?? []}
            columns={newSemesterColumns}
            tools={{ selectButton: true }}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
