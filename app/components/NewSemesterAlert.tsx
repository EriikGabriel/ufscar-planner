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

interface NewSemesterAlertProps {
  children: React.ReactNode
  data: Tables<"disciplines">[]
}

export function NewSemesterAlert({ children, data }: NewSemesterAlertProps) {
  const supabase = createClient()

  async function handleNewSemester() {
    const userAuth = localStorage.getItem("@ufscar-planner/siga-auth") ?? ""
    const userField = userAuth.length === 6 ? "ra" : "email"

    const { data: student } = await supabase
      .from("students")
      .select()
      .eq(userField, userAuth)
      .single()

    await supabase
      .from("students")
      .update({ semester_completed: false, semester: student!.semester + 1 })
      .eq(userField, userAuth)

    const names = data.map((discipline) => discipline.name)

    const { status } = await supabase
      .from("disciplines")
      .update({ status: "Studying" })
      .in("name", names)

    if (status === 204) {
      location.reload()
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao prosseguir, você irá iniciar um{" "}
            <span className="text-red-500">novo semestre</span> e todas as
            disciplinas selecionadas serão marcadas como{" "}
            <span className="text-yellow-500">Cursando</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 text-sm">
          <ul>
            {data.map(
              (discipline, i) =>
                i < 5 && <li key={discipline.id}>➜ {discipline.name}</li>
            )}
          </ul>
          {data.length > 5 && (
            <small className="text-muted-foreground">
              ...e mais {data.length - 5} disciplina(s).
            </small>
          )}
        </div>
        <p className="text-sm italic">* Está ação não poderá ser desfeita!</p>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleNewSemester}>
            Sim, prosseguir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
