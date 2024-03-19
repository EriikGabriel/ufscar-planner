import { Tables } from "@@types/supabase"
import { ScrollArea } from "@ui/scroll-area"
import { Separator } from "@ui/separator"
import { Box, Briefcase, PieChart } from "lucide-react"

interface DataListProps {
  data: Tables<"extras">[]
}

export function DataList({ data }: DataListProps) {
  const icons = {
    4: <PieChart className="h-6 w-6 text-green-500" />,
    5: <Box className="h-6 w-6 text-purple-500" />,
    6: <Briefcase className="h-6 w-6 text-yellow-500" />,
  } as { [key: number]: JSX.Element }

  return (
    <ScrollArea className="flex flex-col gap-5 border rounded-md p-5 w-1/2 max-lg:w-10/12">
      {data.length ? (
        data.map(
          ({ name, description, hours, conclusion_date, activity_id }, i) => (
            <div key={i}>
              <div className="flex align-top gap-5 w-full">
                {icons[activity_id ?? 4]}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between max-md:flex-col">
                    <h1 className="font-bold">{name}</h1>
                    <p className="font-light text-sm">
                      <span className="font-medium">{hours} horas</span> —{" "}
                      <span>{conclusion_date}</span>
                    </p>
                  </div>
                  <p className="font-light max-sm:text-sm">{description}</p>
                </div>
              </div>
              {i + 1 < data.length && <Separator className="my-5" />}
            </div>
          )
        )
      ) : (
        <p className="text-center">Nenhuma atividade encontrada.</p>
      )}
    </ScrollArea>
  )
}
