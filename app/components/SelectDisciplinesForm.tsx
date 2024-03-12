"use client"

import { Tables } from "@@types/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@lib/supabase/client"
import { cn } from "@lib/utils"
import { Badge } from "@ui/badge"
import { Button } from "@ui/button"
import { Checkbox } from "@ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@ui/form"
import { ScrollArea } from "@ui/scroll-area"
import { useForm } from "react-hook-form"
import { z } from "zod"

const disciplinesSelectSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      totalHours: z.number(),
    })
  ),
})

type DisciplinesSelectSchemaType = z.infer<typeof disciplinesSelectSchema>

interface SelectDisciplinesFormProps {
  disciplines: Tables<"disciplines">[]
  selectUpdate: "Studying" | "Complete"
}

export function SelectDisciplinesForm({
  disciplines,
  selectUpdate,
}: SelectDisciplinesFormProps) {
  const supabase = createClient()

  const form = useForm<DisciplinesSelectSchemaType>({
    resolver: zodResolver(disciplinesSelectSchema),
    defaultValues: {
      items: [],
    },
  })

  async function handleSelect({ items }: DisciplinesSelectSchemaType) {
    const userAuth = localStorage.getItem("@ufscar-planner/siga-auth") ?? ""

    const { data: student } = await supabase
      .from("students")
      .select()
      .eq(userAuth.length === 6 ? "ra" : "email", userAuth)
      .single()

    const names = items.map((item) => item.name)
    const dependencies = disciplines
      .filter((item) => !names.includes(item.name))
      .map((item) => item.name)

    const calculateTotalHours = (activityId: number) =>
      items.reduce((acc, item) => {
        const discipline = disciplines.find(
          (d) => d.name === item.name && d.activity_id === activityId
        )
        return discipline ? acc + item.totalHours : acc
      }, 0)

    for (let i = 1; i <= 3; i++) {
      const { data: activity } = await supabase
        .from("activities")
        .select()
        .eq("id", i)
        .single()

      await supabase
        .from("activities")
        .update({
          coursed_hours: activity!.coursed_hours + calculateTotalHours(i),
        })
        .eq("id", i)
    }

    const { status: statusComplete } = await supabase
      .from("disciplines")
      .update({
        status: selectUpdate,
        conclusion_semester:
          selectUpdate === "Complete" ? student?.semester : null,
      })
      .in("name", names)

    const { status: statusDependencies } = await supabase
      .from("disciplines")
      .update({ status: "Pending" })
      .in("name", dependencies)

    await supabase
      .from("students")
      .update({ semester_completed: true })
      .eq(userAuth.length === 6 ? "ra" : "email", userAuth)

    if (statusComplete === 204 && statusDependencies == 204) location.reload()
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-10"
        onSubmit={form.handleSubmit(handleSelect)}
      >
        <ScrollArea className="h-60 pr-6">
          <ul className="flex flex-col gap-3">
            {disciplines?.map(({ id, name, activity_id, p_hours, t_hours }) => (
              <li
                key={id}
                className={cn(
                  "flex justify-between items-center rounded border-l-4 pl-3",
                  activity_id == 1 ? "border-blue-500" : "border-orange-500"
                )}
              >
                <FormField
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.some(
                              (value) => value.name === name
                            )}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    {
                                      name,
                                      totalHours: t_hours + p_hours,
                                    },
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value.name !== name
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-md font-medium">
                          {name}
                        </FormLabel>
                      </div>
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
                      </div>
                    </FormItem>
                  )}
                />
              </li>
            ))}
          </ul>
        </ScrollArea>
        <Button className="w-fit px-8 self-end">Concluir</Button>
      </form>
    </Form>
  )
}
