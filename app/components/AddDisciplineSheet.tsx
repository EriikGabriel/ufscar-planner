"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@lib/supabase/client"
import { Button } from "@ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form"
import { Input } from "@ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

interface addDisciplineFormProps {
  children: React.ReactNode
  discipline: "mandatory" | "optative"
}

const disciplineSchema = z.object({
  name: z.string().min(1),
  profile: z.coerce.number().min(0),
  t_hours: z.coerce.number().min(0),
  p_hours: z.coerce.number().min(0),
  status: z.enum(["Studying", "Not started", "Pending", "Complete"]),
  activity_id: z.coerce.number(),
  conclusion_semester: z.coerce.number().min(0),
})

type DisciplineSchemaType = z.infer<typeof disciplineSchema>

export function AddDisciplineSheet({
  children,
  discipline,
}: addDisciplineFormProps) {
  const supabase = createClient()

  const form = useForm<DisciplineSchemaType>({
    resolver: zodResolver(disciplineSchema),
    defaultValues: {
      name: "",
      profile: discipline == "mandatory" ? 1 : 0,
      t_hours: 0,
      p_hours: 0,
      activity_id: discipline == "mandatory" ? 1 : 2,
      conclusion_semester: 0,
    },
  })

  async function handleAddDiscipline(data: DisciplineSchemaType) {
    const { status } = await supabase.from("disciplines").insert({
      ...data,
      profile: data.profile ? data.profile : null,
      conclusion_semester: data.conclusion_semester
        ? data.conclusion_semester
        : null,
    })

    if (status === 201) location.reload()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Cadastrar disciplina{" "}
            {discipline == "mandatory" ? "obrigatória" : "optativa"}
          </SheetTitle>
          <SheetDescription>
            Cadastre uma nova disciplina{" "}
            {discipline == "mandatory" ? "obrigatória" : "optativa"}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddDiscipline)}
            className="flex flex-col gap-5 py-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome da disciplina"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perfil</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" min={0} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {discipline === "optative" && (
              <FormField
                control={form.control}
                name="activity_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de optativa</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                        className="flex items-center gap-5"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="2" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Optativa 1
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="3" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Optativa 2
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="t_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horas Teóricas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="30"
                        min={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="p_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horas Práticas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="30"
                        min={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Studying">Studying</SelectItem>
                        <SelectItem value="Not started">Not started</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Complete">Complete</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("status") == "Complete" && (
              <FormField
                control={form.control}
                name="conclusion_semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semestre de Conclusão</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="3" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <SheetFooter>
              <Button type="submit">Cadastrar</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
