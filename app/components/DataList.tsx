import { Tables } from "@@types/supabase"
import { Button } from "@ui/button"
import { ScrollArea } from "@ui/scroll-area"
import { Separator } from "@ui/separator"
import { addHours, formatDate } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import {
  BookPlusIcon,
  Box,
  Briefcase,
  Check,
  Pencil,
  PieChart,
  Trash2,
} from "lucide-react"
import { DeleteExtraAlert } from "./DeleteExtraAlert"
import { ExtraSheet } from "./ExtraSheet"
import { DocViewer } from "./docViewer"

interface DataListProps {
  data: Tables<"extras">[]
  type: "complementary" | "extension" | "internship"
}

export function DataList({ data, type }: DataListProps) {
  const icons = {
    4: <PieChart className="h-6 w-6 text-green-500" />,
    5: <Box className="h-6 w-6 text-purple-500" />,
    6: <Briefcase className="h-6 w-6 text-yellow-500" />,
  } as { [key: number]: JSX.Element }

  return (
    <div className="flex flex-col gap-5 w-1/2">
      <ExtraSheet extraType={type}>
        <Button className="self-end">
          <BookPlusIcon className="mr-2 h-4 w-4" /> Cadastrar
        </Button>
      </ExtraSheet>
      <ScrollArea className="flex flex-col gap-5 border rounded-md p-5  max-lg:w-10/12">
        {data.length ? (
          data.map((extra, i) => (
            <div key={i}>
              <div className="flex align-top gap-5 w-full">
                {icons[extra.activity_id ?? 4]}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between max-md:flex-col">
                    <h1 className="font-bold flex items-center justify-center gap-2">
                      {extra.name}{" "}
                      {extra.validated && <Check className="h-4 w-4" />}
                    </h1>
                    <p className="font-light text-sm">
                      <span className="font-medium">{extra.hours} horas</span> —{" "}
                      <span>
                        {formatDate(addHours(extra.conclusion_date, 12), "PP", {
                          locale: ptBR,
                        })}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-light max-sm:text-sm w-3/4">
                      {extra.description}
                    </p>
                    <div>
                      <DocViewer
                        extra={extra}
                        extraType={
                          extra.activity_id === 4
                            ? "complementary"
                            : extra.activity_id === 5
                            ? "extension"
                            : "internship"
                        }
                      />
                      <ExtraSheet
                        extra={{
                          ...extra,
                          conclusion_date: addHours(
                            extra.conclusion_date,
                            12
                          ).toString(),
                        }}
                        extraType={
                          extra.activity_id === 4
                            ? "complementary"
                            : extra.activity_id === 5
                            ? "extension"
                            : "internship"
                        }
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover:text-yellow-400"
                        >
                          <Pencil className="size-4" />
                        </Button>
                      </ExtraSheet>
                      <DeleteExtraAlert name={extra.name}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover:text-red-400"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </DeleteExtraAlert>
                    </div>
                  </div>
                </div>
              </div>
              {i + 1 < data.length && <Separator className="my-5" />}
            </div>
          ))
        ) : (
          <p className="text-center">Nenhuma atividade encontrada.</p>
        )}
      </ScrollArea>
    </div>
  )
}
