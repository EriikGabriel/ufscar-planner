"use client"

import { Tables } from "@@types/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@lib/supabase/client"
import { cn } from "@lib/utils"
import { Button } from "@ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@ui/form"
import { Input } from "@ui/input"
import { Toaster } from "@ui/sonner"
import {
  BookOpen,
  CalendarCheck2,
  CalendarClock,
  Fingerprint,
  Mail,
  PersonStanding,
  TrendingUp,
  User,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const personalSchema = z.object({
  ra: z.string().length(6),
  ira: z.number().min(0).max(20000),
  name: z.string(),
  email: z.string().email(),
  course_name: z.string(),
  semester: z.number().min(1),
  entry_date: z.string(),
  limit_date: z.string(),
})

type PersonalSchemaType = z.infer<typeof personalSchema>

interface PersonalProfileSessionProps {
  student: Tables<"students">
}

export function PersonalProfileSession({
  student,
}: PersonalProfileSessionProps) {
  const entryDate = new Date(student.entry_date ?? "")
  const limitDate = new Date(student.limit_date ?? "")

  const form = useForm<PersonalSchemaType>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      name: student.name,
      email: student.email,
      course_name: student.course_name,
      ra: student.ra,
      semester: student.semester,
      ira: student.ira.at(-1),
      entry_date: `${entryDate.getFullYear()}/${
        entryDate.getMonth() < 6 ? 1 : 2
      }`,
      limit_date: `${limitDate.getFullYear()}/${
        limitDate.getMonth() < 6 ? 1 : 2
      }`,
    },
  })

  const supabase = createClient()

  async function handleUpdate(data: PersonalSchemaType) {
    const { status, error } = await supabase
      .from("students")
      .update({
        ...data,
        ira: student.ira,
        entry_date: String(student.entry_date),
        limit_date: String(student.limit_date),
      })
      .eq("ra", student.ra)

    if (status === 204) {
      toast("Dados atualizados com sucesso")
    } else {
      console.error(error)

      toast("Erro ao atualizar dados", {
        classNames: { toast: "group-[.toaster]:bg-red-500 " },
      })
    }
  }

  return (
    <div className="flex flex-col w-full gap-3">
      <h1 className="flex my-3 items-center gap-2">
        <User className="h-6 w-6 mr-3" /> Dados pessoais
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="bg-zinc-900/70 flex flex-col gap-5 p-5 border rounded-md"
        >
          <div className="flex w-full max-md:flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      left={
                        <PersonStanding
                          className={`h-4 w-5  ${
                            invalid ? "text-red-500" : "text-zinc-500"
                          }`}
                        />
                      }
                      right={<div className="h-4 w-4" />}
                      autoComplete="off"
                      classNameGroup={cn(
                        "w-full",
                        invalid &&
                          "border border-red-500 ring-2 ring-red-500/40"
                      )}
                      {...form.register("name")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>Email acadêmico</FormLabel>
                  <FormControl>
                    <Input
                      left={
                        <Mail
                          className={`h-4 w-5  ${
                            invalid ? "text-red-500" : "text-zinc-500"
                          }`}
                        />
                      }
                      right={<></>}
                      autoComplete="off"
                      type="email"
                      classNameGroup={cn(
                        "w-full",
                        invalid &&
                          "border border-red-500 ring-2 ring-red-500/40"
                      )}
                      disabled
                      {...form.register("email")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course_name"
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>Nome do curso</FormLabel>
                  <FormControl>
                    <Input
                      left={
                        <BookOpen
                          className={`h-4 w-5  ${
                            invalid ? "text-red-500" : "text-zinc-500"
                          }`}
                        />
                      }
                      right={<div className="h-4 w-4" />}
                      autoComplete="off"
                      classNameGroup={cn(
                        "w-full",
                        invalid &&
                          "border border-red-500 ring-2 ring-red-500/40"
                      )}
                      disabled
                      {...form.register("course_name")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full gap-3">
            <FormField
              control={form.control}
              name="ra"
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>RA</FormLabel>
                  <FormControl>
                    <Input
                      left={
                        <Fingerprint
                          className={`h-4 w-5  ${
                            invalid ? "text-red-500" : "text-zinc-500"
                          }`}
                        />
                      }
                      right={<div className="h-4 w-4" />}
                      autoComplete="off"
                      classNameGroup={cn(
                        invalid &&
                          "border border-red-500 ring-2 ring-red-500/40"
                      )}
                      type="number"
                      disabled
                      {...form.register("ra")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ira"
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>IRA</FormLabel>
                  <FormControl>
                    <Input
                      left={
                        <TrendingUp
                          className={`h-4 w-5  ${
                            invalid ? "text-red-500" : "text-zinc-500"
                          }`}
                        />
                      }
                      right={<div className="h-4 w-4" />}
                      autoComplete="off"
                      classNameGroup={cn(
                        invalid &&
                          "border border-red-500 ring-2 ring-red-500/40"
                      )}
                      type="number"
                      disabled
                      {...form.register("ira")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full gap-3">
            <FormField
              control={form.control}
              name="entry_date"
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>Data de admissão</FormLabel>
                  <FormControl>
                    <Input
                      left={
                        <CalendarCheck2
                          className={`h-4 w-5  ${
                            invalid ? "text-red-500" : "text-zinc-500"
                          }`}
                        />
                      }
                      right={<div className="h-4 w-4" />}
                      autoComplete="off"
                      classNameGroup={cn(
                        invalid &&
                          "border border-red-500 ring-2 ring-red-500/40"
                      )}
                      disabled
                      {...form.register("entry_date")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="limit_date"
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>Data limite</FormLabel>
                  <FormControl>
                    <Input
                      left={
                        <CalendarClock
                          className={`h-4 w-5  ${
                            invalid ? "text-red-500" : "text-zinc-500"
                          }`}
                        />
                      }
                      right={<div className="h-4 w-4" />}
                      autoComplete="off"
                      classNameGroup={cn(
                        invalid &&
                          "border border-red-500 ring-2 ring-red-500/40"
                      )}
                      disabled
                      {...form.register("limit_date")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            variant="ghost"
            type="submit"
            className="bg-red-500 hover:bg-red-500/70 w-1/5 self-end"
          >
            Salvar
          </Button>
        </form>

        <Toaster />
      </Form>
    </div>
  )
}
