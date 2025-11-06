"use client"

import { AcademicHistory } from "@@types/setup"
import { cn } from "@lib/utils"
import { Button } from "@ui/button"
import { FileUpload } from "@ui/file-upload"
import { TooltipProvider } from "@ui/tooltip"
import { BookOpenCheck, FileDown, FilePenLine, Loader2 } from "lucide-react"
import { useState, useTransition } from "react"
import { getAcademicHistoryData } from "../actions/parse"
import { ReviewBasicInfoDialog } from "./ReviewBasicInfoDialog"
import { ReviewDisciplinesDialog } from "./ReviewDisciplinesDialog"
import { SectionSetup } from "./SectionSetup"

interface FirstSetupProps {}

const steps = [
  {
    title: "Importar Histórico Completo",
    description:
      "Importe as informações do seu histórico completo para o planner.",
    icon: <FileDown className="size-7 text-white" />,
  },
  {
    title: "Ajustar Informações",
    description:
      "Se necessário ajuste as informações importadas para refletir corretamente os seus dados letivos.",
    icon: <FilePenLine className="size-7 text-white" />,
  },
  {
    title: "Revisar Dados",
    description:
      "Confira se os dados finais do curso estão corretos e atualizados de acordo com o seu histórico.",
    icon: <BookOpenCheck className="size-7 text-white" />,
  },
]

export function FirstSetup({}: FirstSetupProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [files, setFiles] = useState<File[]>([])
  const [isPending, startTransition] = useTransition()
  const [setupData, setSetupData] = useState<AcademicHistory | null>(null)

  function validateStep(): boolean {
    if (isPending) return false

    switch (currentStep) {
      case 0:
        return files.length > 0
      default:
        return true
    }
  }

  function handlePreviousStep() {
    setCurrentStep((prev) => {
      const newStep = prev - 1
      if (newStep === 0) {
        setFiles([])
      }
      return newStep >= 0 ? newStep : prev
    })
  }

  function handleNextStep(form: HTMLFormElement) {
    const formData = new FormData(form)

    switch (currentStep) {
      case 0:
        handleProcessHistory(formData)
        break
      default:
        break
    }

    if (currentStep + 1 < steps.length) setCurrentStep((prev) => prev + 1)
  }

  function handleFileUpload(files: File[]) {
    setFiles(files)
  }

  function handleProcessHistory(formData: FormData) {
    startTransition(async () => {
      const data = await getAcademicHistoryData(formData)
      setSetupData(data)
    })
  }

  return (
    <TooltipProvider>
      <div className="bg-zinc-900/50 flex flex-col gap-8 items-center p-5 py-8 border rounded-md w-4/6 h-3/4">
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-2xl font-bold tracking-wide">Primeiros passos</h1>
          <p className="font-light text-sm text-zinc-400">
            Seja bem vindo! Complete os passos iniciais para começar a utilizar
            o UFSCar Planner.
          </p>
        </div>
        <div className="flex w-full h-full">
          <form className="w-1/2 h-full flex flex-col items-center justify-center">
            <section className="h-full w-full flex flex-col items-center justify-center px-2">
              {currentStep === 0 && (
                <FileUpload
                  onFilesChange={handleFileUpload}
                  accept={"application/pdf"}
                />
              )}
              {currentStep === 1 && (
                <div className="flex flex-col gap-5 items-center">
                  <h1 className="text-lg">
                    Escolha a informação que deseja visualizar/editar
                  </h1>
                  <div className="flex flex-col gap-3 w-full">
                    <ReviewBasicInfoDialog
                      setupData={setupData}
                      setSetupData={setSetupData}
                    />
                    <ReviewDisciplinesDialog
                      setupData={setupData}
                      setSetupData={setSetupData}
                    />
                  </div>
                </div>
              )}
            </section>

            <div className="flex items-center justify-between py-5 w-full">
              <Button
                type="button"
                className={cn(
                  currentStep === 0 && "invisible pointer-events-none"
                )}
                onClick={handlePreviousStep}
              >
                Anterior
              </Button>
              <Button
                type="button"
                onClick={(e) =>
                  handleNextStep(e.currentTarget.closest("form")!)
                }
                className={cn(
                  currentStep + 1 === steps.length &&
                    "bg-red-500 text-white hover:bg-red-500/80"
                )}
                disabled={!validateStep()}
              >
                {isPending && <Loader2 className="animate-spin size-5 mr-2" />}
                {currentStep + 1 === steps.length ? "Concluir" : "Próximo"}
              </Button>
            </div>
          </form>
          <div className="w-1/2 h-full flex flex-col items-center justify-center">
            <div className="flex flex-col w-full">
              {steps.map((step, i) => (
                <SectionSetup
                  key={i}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  active={i === currentStep}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
