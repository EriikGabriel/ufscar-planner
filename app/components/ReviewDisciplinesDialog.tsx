"use client"

import { AcademicHistory } from "@@types/setup"
import { Tables } from "@@types/supabase"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Button } from "@ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog"
import { Toaster } from "@ui/sonner"
import { Book } from "lucide-react"
import { startTransition, useEffect, useState } from "react"
import { toast } from "sonner"
import { DataTable } from "./ui/data-table"
import { reviewDisciplinesColumns } from "./ui/data-table-columns"

interface ReviewDisciplinesDialogProps {
  setupData: AcademicHistory | null
  setSetupData: React.Dispatch<React.SetStateAction<AcademicHistory | null>>
  disciplines: Tables<"disciplines">[]
  setDisciplines: React.Dispatch<React.SetStateAction<Tables<"disciplines">[]>>
}

export function ReviewDisciplinesDialog({
  setupData,
  setSetupData,
  disciplines,
  setDisciplines,
}: ReviewDisciplinesDialogProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    setupData?.semesters.forEach((semester) => {
      semester.courses.forEach((discipline, i) => {
        if (disciplines == null) return

        const activityIdMap: Record<string, number> = {
          obr: 1,
          "opt 1": 2,
          "opt 2": 3,
          conc: 6,
        }

        const statusMap: Record<string, Tables<"disciplines">["status"]> = {
          APROVADO: "Complete",
          "REPROVADO POR NOTA": "Pending",
        }

        setDisciplines((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            student_id: setupData.ra,
            name: discipline.name,
            created_at: new Date().toISOString(),
            status: statusMap[discipline.status] || "Pending",
            activity_id: activityIdMap[discipline.type] || 3,
            profile: discipline.profile,
            conclusion_semester: discipline.conclusionSemester,
            p_hours: discipline.practical,
            t_hours: discipline.theoretical,
            prerequisites: discipline.preRequisites ?? [],
          },
        ])

        // Maintain only unique disciplines, keeping the one with "Complete" status if duplicates exist
        setDisciplines((prev) => {
          const uniqueDisciplines = new Map<string, Tables<"disciplines">>()
          prev.forEach((d) => {
            if (
              !uniqueDisciplines.has(d.name) ||
              (d.status === "Complete" &&
                uniqueDisciplines.get(d.name)?.status !== "Complete")
            ) {
              uniqueDisciplines.set(d.name, d)
            }
          })
          return Array.from(uniqueDisciplines.values())
        })
      })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function handleBasicInfoForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const student = String(formData.get("student") ?? "")
    const course = String(formData.get("course") ?? "")
    const ra = String(formData.get("ra") ?? "")
    const ira = Number(String(formData.get("ira") ?? setupData?.ira ?? 0))
    const admissionPeriod = String(formData.get("admissionPeriod") ?? "")
    const limitPeriod = String(formData.get("limitPeriod") ?? "")

    startTransition(() => {
      setSetupData((prev) => ({
        student,
        course,
        ra,
        ira,
        admissionPeriod,
        limitPeriod,
        semesters: prev?.semesters ?? [],
      }))
    })

    try {
      toast.success("Informações salvas com sucesso 🎉")
      setOpen(false)
    } catch (err) {
      toast.error("Erro ao salvar as informações 😢")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toaster />
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" type="button">
          <Book className="mr-4" /> Disciplinas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Disciplinas</DialogTitle>
          <DialogDescription>Disciplinas cadastradas</DialogDescription>
        </DialogHeader>
        <DataTable
          data={disciplines ?? []}
          columns={reviewDisciplinesColumns({
            setDisciplinesData: setDisciplines,
          })}
          tools={{ registerButton: true }}
          pageSize={7}
          showActivity={true}
          setReviewDisciplines={setDisciplines}
          className="max-xl:w-10/12 max-lg:mb-5 max-md:w-11/12 "
        />
      </DialogContent>
    </Dialog>
  )
}
