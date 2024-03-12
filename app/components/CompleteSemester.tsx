import { createClient } from "@lib/supabase/server"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet"
import { cookies } from "next/headers"
import { SelectDisciplinesForm } from "./SelectDisciplinesForm"

interface CompleteSemesterProps {
  children: React.ReactNode
}

export async function CompleteSemester({ children }: CompleteSemesterProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: disciplines } = await supabase
    .from("disciplines")
    .select()
    .eq("status", "Studying")
    .order("activity_id")

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Concluir semestre</SheetTitle>
          <SheetDescription>
            Conclua o semestre corrente e inicie um novo semestre.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5 mt-5 mb-10!">
          <div>
            <p>Selecione as disciplinas das quais você passou:</p>
            <small className="text-muted-foreground">
              * As disciplinas não selecionadas serão marcadas como
              dependências.
            </small>
          </div>
          <SelectDisciplinesForm
            disciplines={disciplines ?? []}
            selectUpdate="Complete"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
