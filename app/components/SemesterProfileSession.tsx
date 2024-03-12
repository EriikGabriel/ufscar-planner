import { Tables } from "@@types/supabase"
import { createClient } from "@lib/supabase/server"
import { cn } from "@lib/utils"
import { Badge } from "@ui/badge"
import { ScrollArea } from "@ui/scroll-area"
import { LibraryBig, PlusCircle, TentTree } from "lucide-react"
import { cookies } from "next/headers"
import { z } from "zod"
import { RemoveDisciplineButton } from "./RemoveDisciplineButton"
import { SelectDisciplinesDialog } from "./SelectDisciplinesDialog"
import { Button } from "./ui/button"

const semesterSchema = z.object({
  ra: z.string().length(6),
  ira: z.number().min(0).max(20000),
  name: z.string(),
  email: z.string().email(),
  course_name: z.string(),
  semester: z.number().min(1),
  entry_date: z.string(),
  limit_date: z.string(),
})

type SemesterSchemaType = z.infer<typeof semesterSchema>

interface SemesterProfileSessionProps {
  student: Tables<"students">
}

export async function SemesterProfileSession({
  student,
}: SemesterProfileSessionProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: disciplines } = await supabase
    .from("disciplines")
    .select()
    .eq("status", "Studying")
    .order("activity_id")

  return (
    <div className="flex flex-col w-full gap-3">
      <h1 className="flex my-3 items-center gap-2">
        <LibraryBig className="h-6 w-6 mr-3" /> Semestre corrente
      </h1>
      <section className="bg-zinc-900/70 h-full flex flex-col gap-5 p-5 border rounded-md">
        {!!disciplines?.length ? (
          <>
            <ScrollArea className="p-3 flex">
              <ul className="flex flex-col gap-3">
                {disciplines?.map(({ id, name, activity_id }) => (
                  <li
                    key={id}
                    className={cn(
                      "flex justify-between items-center rounded border-l-4 pl-3",
                      activity_id == 1 ? "border-blue-500" : "border-orange-500"
                    )}
                  >
                    <h2 className="text-md font-medium">{name}</h2>
                    <div className="flex items-center h-full gap-5">
                      <Badge
                        variant="outline"
                        className={cn(
                          "w-24 h-full flex justify-center",
                          activity_id == 1
                            ? "bg-blue-500/20 border-blue-500 text-blue-500"
                            : "bg-orange-500/20 border-orange-500 text-orange-500"
                        )}
                      >
                        {activity_id == 1 ? "Obrigatória" : "Optativa"}
                      </Badge>
                      <RemoveDisciplineButton name={name} />
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <SelectDisciplinesDialog>
              <Button
                variant="outline"
                className="bg-transparent border-dashed py-5 border-red-500 hover:bg-red-500/20 text-red-500"
              >
                <PlusCircle className="h-4 w-4 mr-2 " /> Adicionar disciplina
              </Button>
            </SelectDisciplinesDialog>
          </>
        ) : (
          <div className="flex text-muted-foreground flex-col h-full justify-center items-center gap-3">
            <p className="text-lg text-center">
              Nenhuma disciplina sendo cursada. Período de férias.
            </p>
            <TentTree className="h-10 w-10" />
          </div>
        )}
      </section>
    </div>
  )
}
