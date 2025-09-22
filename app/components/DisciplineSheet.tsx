"use client"

import { Tables } from "@@types/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@lib/supabase/client"
import { Button } from "@ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form"
import { Input } from "@ui/input"
import { MultiSelect, OptionType } from "@ui/multi-select"
import { RadioGroup, RadioGroupItem } from "@ui/radio-group"
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
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface DisciplineSheetProps {
  children: React.ReactNode
  disciplineType: "mandatory" | "optative" | "conclusive"
  discipline?: Tables<"disciplines">
}

const disciplineSchema = z.object({
  name: z.string().min(1),
  profile: z.coerce.number().min(0),
  t_hours: z.coerce.number().min(0),
  p_hours: z.coerce.number().min(0),
  status: z.enum(["Studying", "Not started", "Pending", "Complete"]),
  activity_id: z.coerce.number(),
  conclusion_semester: z.coerce.number().min(0),
  prerequisites: z.array(z.string()),
})

type DisciplineSchemaType = z.infer<typeof disciplineSchema>

export function DisciplineSheet({
  children,
  disciplineType,
  discipline,
}: DisciplineSheetProps) {
  const [options, setOptions] = useState<OptionType[]>([])
  const [selected, setSelected] = useState<OptionType[]>(
    discipline?.prerequisites.map((p) => ({
      label: p,
      value: p,
    })) ?? []
  )

  const supabase = createClient()

  const form = useForm<DisciplineSchemaType>({
    resolver: zodResolver(disciplineSchema),
    defaultValues: {
      name: discipline?.name ?? "",
      profile: discipline?.profile ?? 0,
      t_hours: discipline?.t_hours ?? 0,
      p_hours: discipline?.p_hours ?? 0,
      activity_id:
        disciplineType === "mandatory"
          ? 1
          : disciplineType === "optative"
          ? discipline?.activity_id ?? 2
          : 6,
      status: discipline?.status,
      conclusion_semester: discipline?.conclusion_semester ?? 0,
      prerequisites: discipline?.prerequisites ?? [],
    },
  })

  async function handleAddDiscipline(data: DisciplineSchemaType) {
    const { status } = await supabase.from("disciplines").insert({
      ...data,
      prerequisites: selected.map((p) => p.value),
      profile: data.profile ? data.profile : null,
      conclusion_semester:
        data.conclusion_semester && form.watch("status") === "Complete"
          ? data.conclusion_semester
          : null,
    })

    if (status === 201) location.reload()
  }

  async function handleEditDiscipline(data: DisciplineSchemaType) {
    const { status } = await supabase
      .from("disciplines")
      .update({
        name: data.name,
        activity_id: data.activity_id,
        t_hours: data.t_hours,
        p_hours: data.p_hours,
        status: data.status,
        profile: data.profile ? data.profile : null,
        prerequisites: selected.map((p) => p.value),
        conclusion_semester:
          data.conclusion_semester && form.watch("status") === "Complete"
            ? data.conclusion_semester
            : null,
      })
      .eq("id", discipline?.id ?? -1)

    if (status === 204) location.reload()
  }

  async function handleChangeDisciplineSheet(open: boolean) {
    if (!open) return

    const { data: disciplines } = await supabase
      .from("disciplines")
      .select()
      .neq("name", discipline?.name)

    setOptions(
      disciplines?.map((d) => ({
        label: d.name,
        value: d.name,
      })) ?? []
    )
  }

  return (
    <Sheet onOpenChange={handleChangeDisciplineSheet}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {!discipline ? "Cadastrar" : "Editar"} disciplina{" "}
            {disciplineType === "mandatory"
              ? "obrigatória"
              : disciplineType === "optative"
              ? "optativa"
              : "conclusiva"}
          </SheetTitle>
          <SheetDescription>
            {!discipline ? "Cadastre" : "Edite"} uma disciplina{" "}
            {disciplineType === "mandatory"
              ? "obrigatória"
              : disciplineType === "optative"
              ? "optativa"
              : "conclusiva"}
            {!discipline ? " nova" : " existente"}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              discipline === undefined
                ? handleAddDiscipline
                : handleEditDiscipline
            )}
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
                      placeholder={
                        discipline ? discipline.name : "Nome da disciplina"
                      }
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {disciplineType === "mandatory" && (
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
            )}
            {disciplineType === "optative" && (
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
                      <Input type="number" min={0} {...field} />
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
                      <Input type="number" min={0} {...field} />
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
                        <SelectItem value="Studying">Cursando</SelectItem>
                        <SelectItem value="Not started">
                          Não iniciada
                        </SelectItem>
                        <SelectItem value="Pending">Pendente</SelectItem>
                        <SelectItem value="Complete">Completa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("status") === "Complete" && (
              <FormField
                control={form.control}
                name="conclusion_semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semestre de Conclusão</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="prerequisites"
              render={() => (
                <FormItem>
                  <FormLabel>Pré-requisitos</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={options}
                      placeholder="Selecione os pré-requisitos..."
                      selected={selected}
                      setSelected={setSelected}
                      creatable
                    />
                  </FormControl>
                  <FormDescription>
                    Deixe vazio caso não haja pré-requisitos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type="submit">
                {!discipline ? "Cadastrar" : "Concluir"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
