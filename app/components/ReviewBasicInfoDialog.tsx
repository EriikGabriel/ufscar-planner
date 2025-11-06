"use client"

import { AcademicHistory } from "@@types/setup"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Button } from "@ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@ui/input-group"
import { Toaster } from "@ui/sonner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip"
import {
  BookOpen,
  CalendarCheck2,
  CalendarClock,
  Fingerprint,
  PersonStanding,
  TrendingUp,
  UserCheck,
} from "lucide-react"
import { startTransition, useState } from "react"
import { toast } from "sonner"

interface ReviewBasicInfoDialogProps {
  setupData: AcademicHistory | null
  setSetupData: React.Dispatch<React.SetStateAction<AcademicHistory | null>>
}

export function ReviewBasicInfoDialog({
  setupData,
  setSetupData,
}: ReviewBasicInfoDialogProps) {
  const [open, setOpen] = useState(false)

  const entryDate = setupData?.admissionPeriod
    ? new Date(
        Number(setupData.admissionPeriod.split("/")[0]),
        setupData.admissionPeriod.split("/")[1] === "1" ? 0 : 6,
        1
      )
    : new Date()

  const limitDate = setupData?.limitPeriod
    ? new Date(
        Number(setupData.limitPeriod.split("/")[0]),
        setupData.limitPeriod.split("/")[1] === "1" ? 0 : 6,
        1
      )
    : new Date()

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

    console.log(setupData)

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
          <UserCheck className="mr-4" /> Informações Básicas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Informações Básica</DialogTitle>
          <DialogDescription>Informações e dados pessoais</DialogDescription>
        </DialogHeader>
        <section className="flex flex-col gap-5 border rounded-md p-5">
          <form className="flex flex-col gap-3" onSubmit={handleBasicInfoForm}>
            <InputGroup className="text-zinc-400">
              <InputGroupAddon className="p-2">
                <PersonStanding className="size-6" />
              </InputGroupAddon>
              <InputGroupInput
                name="student"
                placeholder="Nome do estudante"
                defaultValue={setupData?.student ?? ""}
                autoComplete="off"
                required
              />
            </InputGroup>

            <InputGroup className="text-zinc-400">
              <InputGroupAddon className="p-2">
                <BookOpen className="size-5" />
              </InputGroupAddon>
              <InputGroupInput
                name="course"
                placeholder="Nome do curso"
                defaultValue={setupData?.course ?? ""}
                autoComplete="off"
                required
              />
            </InputGroup>
            <div className="flex gap-5 text-zinc-400">
              <InputGroup>
                <Tooltip>
                  <TooltipTrigger>
                    <InputGroupAddon className="p-2">
                      <Fingerprint className="size-5" />
                    </InputGroupAddon>
                  </TooltipTrigger>
                  <TooltipContent>RA</TooltipContent>
                </Tooltip>
                <InputGroupInput
                  name="ra"
                  placeholder="RA"
                  defaultValue={setupData?.ra ?? ""}
                  autoComplete="off"
                  required
                />
              </InputGroup>

              <InputGroup>
                <Tooltip>
                  <TooltipTrigger>
                    <InputGroupAddon className="p-2">
                      <TrendingUp className="size-5" />
                    </InputGroupAddon>
                  </TooltipTrigger>
                  <TooltipContent>IRA</TooltipContent>
                </Tooltip>
                <InputGroupInput
                  name="ira"
                  placeholder="IRA"
                  defaultValue={setupData?.ira ?? ""}
                  autoComplete="off"
                  required
                />
              </InputGroup>
            </div>
            <div className="flex gap-5 text-zinc-400">
              <InputGroup>
                <Tooltip>
                  <TooltipTrigger>
                    <InputGroupAddon className="p-2">
                      <CalendarCheck2 className="size-5" />
                    </InputGroupAddon>
                  </TooltipTrigger>
                  <TooltipContent>Data de admissão</TooltipContent>
                </Tooltip>
                <InputGroupInput
                  name="admissionPeriod"
                  placeholder="Data de admissão"
                  defaultValue={`${entryDate.getFullYear()}/${
                    entryDate.getMonth() < 6 ? 1 : 2
                  }`}
                  autoComplete="off"
                  required
                />
              </InputGroup>

              <InputGroup>
                <Tooltip>
                  <TooltipTrigger>
                    <InputGroupAddon className="p-2">
                      <CalendarClock className="size-5" />
                    </InputGroupAddon>
                  </TooltipTrigger>
                  <TooltipContent>Data limite</TooltipContent>
                </Tooltip>
                <InputGroupInput
                  name="limitPeriod"
                  placeholder="Data limite"
                  defaultValue={`${limitDate.getFullYear()}/${
                    limitDate.getMonth() < 6 ? 1 : 2
                  }`}
                  autoComplete="off"
                  required
                />
              </InputGroup>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="default" onClick={() => {}}>
                Salvar alterações
              </Button>
            </div>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  )
}
