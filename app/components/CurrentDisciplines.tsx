import { createClient } from "@lib/supabase/server"
import { Badge } from "@ui/badge"
import { ScrollArea } from "@ui/scroll-area"
import { cookies } from "next/headers"
import { cn } from "../lib/utils"

export async function CurrentDisciplines() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: disciplines } = await supabase
    .from("disciplines")
    .select()
    .eq("status", "studying")

  return (
    <ScrollArea className="h-full border rounded-md p-3">
      <ul className="flex flex-col gap-3">
        {disciplines?.map(({ id, name, activity_id }) => (
          <li
            key={id}
            className={cn(
              "flex justify-between rounded border-l-4 px-3",
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
        ))}
      </ul>
    </ScrollArea>
  )
}
