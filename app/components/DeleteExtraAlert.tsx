"use client"

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

interface DeleteExtraAlertProps {
  children: React.ReactNode
  name: string
}

export function DeleteExtraAlert({ children, name }: DeleteExtraAlertProps) {
  const supabase = createClient()

  async function handleDeleteExtra() {
    const { status, error } = await supabase
      .from("extras")
      .delete()
      .eq("name", name)

    if (error) console.error(error)

    if (status === 204) location.reload()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar, a atividade &quot;{name}&quot; será removida
            permanentemente. E esta ação não pode ser desfeita!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteExtra}>
            Sim, deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
