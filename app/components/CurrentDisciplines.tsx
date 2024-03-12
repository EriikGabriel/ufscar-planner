import { createClient } from "@lib/supabase/server"
import { cn } from "@lib/utils"
import { ScrollAreaProps } from "@radix-ui/react-scroll-area"
import { Badge } from "@ui/badge"
import { ScrollArea } from "@ui/scroll-area"
import { TentTree } from "lucide-react"
import { cookies } from "next/headers"

export async function CurrentDisciplines({ className }: ScrollAreaProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: disciplines } = await supabase
    .from("disciplines")
    .select()
    .eq("status", "Studying")
    .order("activity_id")

  return (
    <ScrollArea
      className={cn("h-full w-full border rounded-md p-3", className)}
    >
      <ul className="flex flex-col justify-center h-full gap-3">
        {disciplines?.length! > 0 ? (
          disciplines?.map(({ id, name, activity_id }) => (
            <li
              key={id}
              className={cn(
                "flex justify-between rounded border-l-4 pl-3",
                activity_id == 1 ? "border-blue-500" : "border-orange-500"
              )}
            >
              <h2 className="text-md font-medium">{name}</h2>
              <Badge
                variant="outline"
                className={cn(
                  "w-24 flex justify-center",
                  activity_id == 1
                    ? "bg-blue-500/20 border-blue-500 text-blue-500"
                    : "bg-orange-500/20 border-orange-500 text-orange-500"
                )}
              >
                {activity_id == 1 ? "Obrigatória" : "Optativa"}
              </Badge>
            </li>
          ))
        ) : (
          <li className="flex text-muted-foreground flex-col h-full justify-center items-center gap-3">
            <p className="text-lg text-center">
              Nenhuma disciplina sendo cursada. Período de férias.
            </p>
            <TentTree className="h-10 w-10" />
          </li>
        )}
      </ul>
    </ScrollArea>
  )
}
