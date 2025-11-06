import { Tables } from "@@types/supabase"
import { createClient } from "@lib/supabase/client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/alert-dialog"
import { toast } from "sonner"

interface DeleteDisciplineAlertProps {
  children: React.ReactNode
  name: string
  setDisciplinesData?: React.Dispatch<
    React.SetStateAction<Tables<"disciplines">[]>
  >
}

export function DeleteDisciplineAlert({
  children,
  name,
  setDisciplinesData,
}: DeleteDisciplineAlertProps) {
  const supabase = createClient()

  async function handleDeleteDiscipline() {
    if (setDisciplinesData) {
      setDisciplinesData((prev) =>
        prev.filter((discipline) => discipline.name !== name)
      )

      toast.success("Disciplina deletada com sucesso!", {
        position: "bottom-left",
      })

      return
    }

    const { status } = await supabase
      .from("disciplines")
      .delete()
      .eq("name", name)

    if (status === 204) location.reload()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar, a disciplina &quot;{name}&quot; será removida
            permanentemente. E esta ação não pode ser desfeita!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteDiscipline}>
            Sim, deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
