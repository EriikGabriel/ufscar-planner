"use client"

import { Tables } from "@@types/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@lib/supabase/client"
import { cn } from "@lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "@ui/button"
import { Calendar } from "@ui/calendar"
import { Checkbox } from "@ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form"
import { Input } from "@ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet"
import { Textarea } from "@ui/textarea"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { FileText } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { DropzoneOptions } from "react-dropzone"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./ui/file-uploader"

interface ExtraSheetProps {
  children: React.ReactNode
  extra?: Tables<"extras">
  extraType?: "complementary" | "extension" | "internship"
}

const extraSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  activity_id: z.coerce.number(),
  hours: z.coerce.number().min(0),
  conclusion_date: z.date(),
  validated: z.boolean(),
})

type ExtraSchemaType = z.infer<typeof extraSchema>
type MetadataType = {
  eTag: string
  size: number
  mimetype: string
  cacheControl: string
  lastModified: string
  contentLength: number
  httpStatusCode: number
}

export function ExtraSheet({ children, extra, extraType }: ExtraSheetProps) {
  const [files, setFiles] = useState<File[] | null>([])

  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
      "application/pdf": [".pdf"],
    },
    multiple: true,
    maxFiles: 3,
    maxSize: 10 * 1024 * 1024,
  } satisfies DropzoneOptions

  const supabase = createClient()

  const form = useForm<ExtraSchemaType>({
    resolver: zodResolver(extraSchema),
    defaultValues: {
      name: extra?.name ?? "",
      description: extra?.description ?? "",
      activity_id: extra?.activity_id ?? 4,
      hours: extra?.hours ?? 0,
      conclusion_date: new Date(extra?.conclusion_date ?? new Date()),
      validated: extra?.validated ?? false,
    },
  })

  async function handleAddExtra(data: ExtraSchemaType) {
    const { status, data: dt } = await supabase
      .from("extras")
      .insert({
        name: data.name,
        description: data.description,
        activity_id:
          extraType === "complementary" ? 4 : extraType === "extension" ? 5 : 6,
        hours: data.hours,
        conclusion_date: data.conclusion_date.toISOString(),
        validated: data.validated,
      })
      .select()

    files?.forEach(async (file) => {
      const { error } = await supabase.storage
        .from("docs")
        .upload(
          `extras/${extraType}/${dt?.at(-1)?.id}/${file.name.replaceAll(
            /\s/g,
            ""
          )}`,
          file
        )

      if (error) console.error(error)
    })

    if (status === 201) location.reload()
  }

  async function handleEditExtra(data: ExtraSchemaType) {
    const { status } = await supabase
      .from("extras")
      .update({
        name: data.name,
        description: data.description,
        activity_id: data.activity_id,
        hours: data.hours,
        conclusion_date: data.conclusion_date.toISOString(),
        validated: data.validated,
      })
      .eq("id", extra?.id ?? -1)

    const { data: docsList } = await supabase.storage
      .from("docs")
      .list(`extras/${extraType}/${extra?.id}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      })

    if (docsList?.length) {
      const { error } = await supabase.storage
        .from("docs")
        .remove(
          docsList?.map(
            (doc) => `extras/${extraType}/${extra?.id}/${doc.name}`
          ) ?? []
        )

      if (error) console.error(error)
    }

    files?.forEach(async (file) => {
      const { error } = await supabase.storage
        .from("docs")
        .upload(
          `extras/${extraType}/${extra?.id}/${file.name.replaceAll(/\s/g, "")}`,
          file
        )

      if (error) console.error(error)
    })

    if (status === 204) location.reload()
  }

  async function handleGetDocs(open: boolean) {
    if (extra && open) {
      const { data, error } = await supabase.storage
        .from("docs")
        .list(`extras/${extraType}/${extra.id}`, {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        })

      if (error) console.error(error)

      setFiles(
        data?.map((file) => {
          const metadata = file.metadata as MetadataType
          return new File([new Blob()], file.name, {
            type: metadata.mimetype,
            lastModified: new Date(metadata.lastModified).getTime(),
          })
        }) ?? []
      )
    }
  }

  return (
    <Sheet onOpenChange={(open) => handleGetDocs(open)}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {!extra ? "Cadastrar" : "Editar"} atividade{" "}
            {extraType === "complementary"
              ? "complementar"
              : extraType === "extension"
              ? "de extensão"
              : "de estágio"}
          </SheetTitle>
          <SheetDescription>
            {!extra ? "Cadastre" : "Edite"} uma atividade{" "}
            {extraType === "complementary"
              ? "complementar"
              : extraType === "extension"
              ? "de extensão"
              : "de estágio"}
            {!extra ? " nova" : " existente"}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              extra === undefined ? handleAddExtra : handleEditExtra
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
                      placeholder={extra ? extra.name : "Nome da atividade"}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="resize-none"
                      placeholder="Descrição da atividade"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={extra ? String(extra.hours) : "0"}
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
                name="conclusion_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de conclusão</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: ptBR })
                              ) : (
                                <span>Escolha uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            locale={ptBR}
                            defaultMonth={new Date(field.value)}
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel className="h-5 !m-0 flex items-center">
                Documento
              </FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={setFiles}
                  dropzoneOptions={dropzone}
                >
                  <FileInput>
                    <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
                      <p className="text-gray-400 text-sm text-center">
                        Arraste o certificado ou documento comprobatório...
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent className="flex items-center flex-row gap-2">
                    {files?.map((file, i) => (
                      <FileUploaderItem
                        itemName={file.name}
                        key={i}
                        index={i}
                        className="size-20 p-0 rounded-md overflow-hidden"
                        aria-roledescription={`file ${i + 1} containing ${
                          file.name
                        }`}
                      >
                        {file.type.includes("image") ? (
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            height={80}
                            width={80}
                            className="size-20 p-0"
                          />
                        ) : (
                          <div className="flex flex-col justify-center items-center gap-1 w-full h-full">
                            <FileText className="size-10 p-0" />
                            <small className="text-xs truncate w-full px-1.5">
                              {file.name} ({file.size / 1024} KB)
                            </small>
                          </div>
                        )}
                      </FileUploaderItem>
                    ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>

              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="validated"
              render={({ field }) => (
                <FormItem className="flex leading-none items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormLabel className="h-5 !m-0 flex items-center">
                    Atividade validada
                  </FormLabel>

                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type="submit">{!extra ? "Cadastrar" : "Concluir"}</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
