import { createClient } from "@lib/supabase/server"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog"
import { cookies } from "next/headers"
import { SelectDisciplinesForm } from "./SelectDisciplinesForm"

interface SelectDisciplinesDialogProps {
  children: React.ReactNode
}

export async function SelectDisciplinesDialog({
  children,
}: SelectDisciplinesDialogProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: disciplines } = await supabase
    .from("disciplines")
    .select()
    .not("status", "in", '("Studying","Complete")')

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-1/2">
        <DialogHeader>
          <DialogTitle>Selecione a disciplina</DialogTitle>
          <DialogDescription>
            Selecione uma disciplina cadastrada para adicionar ao semestre
            corrente.
          </DialogDescription>
        </DialogHeader>
        <SelectDisciplinesForm
          disciplines={disciplines ?? []}
          selectUpdate="Studying"
        />
      </DialogContent>
    </Dialog>
  )
}
