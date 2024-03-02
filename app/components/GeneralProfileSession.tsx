import { CurrentDisciplines } from "@components/CurrentDisciplines"
import { Button } from "@ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip"
import {
  BookOpen,
  CalendarCheck2,
  CalendarClock,
  Fingerprint,
  LibraryBig,
  Mail,
  PersonStanding,
  TrendingUp,
  User,
} from "lucide-react"
import { Tables } from "../types/supabase"

interface GeneralProfileSessionProps {
  student: Tables<"students">
}

export function GeneralProfileSession({ student }: GeneralProfileSessionProps) {
  const entryDate = new Date(student.entry_date ?? "")
  const limitDate = new Date(student.limit_date ?? "")

  return (
    <div className="flex flex-col w-full gap-3">
      <section className="bg-zinc-900/70 flex flex-col gap-5 border rounded-md p-5">
        <div className="flex items-center gap-5">
          <User className="w-6 h-6" />
          <h2 className="font-semibold">Dados pessoais</h2>
          <Button variant="link" className="text-red-500">
            Alterar
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-5 text-zinc-400">
            <PersonStanding className="w-6 h-6" />
            <p>{student.name}</p>
          </div>
          <div className="flex gap-5 text-zinc-400">
            <Mail className="w-6 h-6" />
            <p>{student.email}</p>
          </div>
          <div className="flex gap-5 text-zinc-400">
            <BookOpen className="w-6 h-6" />
            <p>{student.course_name}</p>
          </div>
          <div className="flex gap-5 text-zinc-400">
            <Tooltip>
              <TooltipTrigger>
                <div className="flex gap-5">
                  <Fingerprint className="w-6 h-6" />
                  <p>{student.ra}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>RA</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <div className="flex gap-5">
                  <TrendingUp className="w-6 h-6" />
                  <p>{student.ira}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>IRA</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex gap-5 text-zinc-400">
            <Tooltip>
              <TooltipTrigger>
                <div className="flex gap-5">
                  <CalendarCheck2 className="w-6 h-6" />
                  <p>
                    {entryDate.getFullYear()}/{entryDate.getMonth() < 6 ? 1 : 2}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>Data de admissão</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex gap-5">
                  <CalendarClock className="w-6 h-6" />
                  <p>
                    {limitDate.getFullYear()}/{limitDate.getMonth() < 6 ? 1 : 2}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>Data limite</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900/70 flex flex-col gap-5 border rounded-md p-5">
        <div className="flex items-center gap-5">
          <LibraryBig className="w-6 h-6" />
          <h2 className="font-semibold">Semestre corrente</h2>
          <small>(Semestre atual: {student.semester})</small>
          <div className="flex gap-3">
            <Button variant="link" className="text-red-500 ">
              Alterar
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-green-500 text-green-500 hover:bg-green-500/20"
            >
              Concluir semestre
            </Button>
          </div>
        </div>

        <div className="flex gap-5">
          <CurrentDisciplines className="p-5 w-1/2" />
          {/* <DataTable
      data={disciplines ?? []}
      columns={allColumns}
      className="w-full"
    /> */}
        </div>
      </section>
    </div>
  )
}
