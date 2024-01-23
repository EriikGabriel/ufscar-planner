"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@lib/utils"
import { Button } from "@ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@ui/form"
import { Input } from "@ui/input"
import { EyeIcon, HashIcon, LockIcon } from "lucide-react"
import Image from "next/image"
import { forwardRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const loginSchema = z.object({
  user: z.string().email().or(z.string().length(6)),
  password: z.string().min(6),
})

const SIGA_URL = "https://sistemas.ufscar.br/sagui-api/siga/deferimento"

/** Resposta OK da API de deferimento do Sagui */
type SigaApiOk = {
  data: {}
}

/** Resposta de Erro da API de deferimento do Sagui */
type SigaApiError = {
  timestamp: number
  status: number
  error: string
  message: string
  path: string
}

/** Resposta que o siga pode retornar pela API */
type SigaResponse = SigaApiOk | SigaApiError

/** O motivo de erro que o Siga retornou */
export enum SigaErrorReason {
  /** O usuário não está autorizado ou suas credenciais são inválidas. */
  UNAUTHORIZED,

  /** Um erro desconhecido. */
  UNKNOWN,
}

/** Um erro do Siga, mapeado pelo planner */
export type SigaError = {
  ok: false
  error: SigaErrorReason
}

/** Um sucesso do Siga, incluindo as matérias do deferimento. */
export type SigaSuccess = {
  ok: true
}

export type SigaResult = SigaSuccess | SigaError

type loginSchemaType = z.infer<typeof loginSchema>

const LoginForm = forwardRef((props, ref) => {
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { user: "", password: "" },
  })

  async function handleLogin({ user, password }: loginSchemaType) {
    const headers = {
      Authorization:
        "Basic " + Buffer.from(`${user}:${password}`).toString("base64"),
      Accept: "application/json",
    }

    try {
      const res = await fetch(SIGA_URL, { headers, mode: "no-cors" })
      const data: SigaResponse = await res.json()

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="bg-zinc-900/50 flex flex-col gap-5 items-center p-5 border rounded-md"
      >
        <Image
          src="/logo.png"
          alt="UFSCar logo"
          width={55}
          height={55}
          className="w-auto h-auto"
          priority
        />
        <div>
          <h1 className="text-xl font-semibold tracking-wide">
            UFSCar Planner
          </h1>
          <small className="text-zinc-400">
            Entre com sua conta{" "}
            <a
              href="https://sistemas.ufscar.br/siga/"
              className="text-orange-500 hover:underline"
            >
              SIGA
            </a>
            .
          </small>
        </div>
        <FormField
          control={form.control}
          name="user"
          render={({ field, fieldState: { invalid } }) => (
            <FormItem>
              <FormControl>
                <Input
                  left={
                    <HashIcon
                      className={`h-4 w-5  ${
                        invalid ? "text-red-500" : "text-zinc-500"
                      }`}
                    />
                  }
                  right={<div className="h-4 w-4" />}
                  placeholder="Número UFSCar ou e-mail"
                  autoComplete="off"
                  classNameGroup={cn(
                    invalid && "border border-red-500 ring-2 ring-red-500/40"
                  )}
                  {...form.register("user")}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field, fieldState: { invalid } }) => (
            <FormItem>
              <FormControl>
                <Input
                  left={
                    <LockIcon
                      className={`h-4 w-4 ${
                        invalid ? "text-red-500" : "text-zinc-500"
                      }`}
                    />
                  }
                  right={
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-fit w-fit p-1"
                    >
                      <EyeIcon className="h-4 w-4 text-zinc-500" />
                    </Button>
                  }
                  type="password"
                  placeholder="Senha"
                  autoComplete="off"
                  classNameGroup={cn(
                    invalid && "border border-red-500 ring-2 ring-red-500/40"
                  )}
                  {...form.register("password")}
                  {...field}
                />
              </FormControl>
              <FormDescription>Mínimo 6 caracteres.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-1/2">
          Entrar
        </Button>
      </form>
    </Form>
  )
})
LoginForm.displayName = "LoginForm"

export { LoginForm }
