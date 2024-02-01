"use client"

import { fetchSiga } from "@helpers/siga"
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
import { Toaster } from "@ui/sonner"
import {
  EyeIcon,
  EyeOffIcon,
  HashIcon,
  LockIcon,
  RotateCwIcon,
} from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { z } from "zod"
import { setCookie } from "../helpers/store"

const loginSchema = z.object({
  user: z.string().email().or(z.string().length(6)),
  password: z.string().min(6),
})

type LoginSchemaType = z.infer<typeof loginSchema>

export function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { user: "", password: "" },
  })
  const router = useRouter()
  const { get } = useSearchParams()

  const [isFetching, setIsFetching] = useState(false)

  function createQueryString(key: string, value: string) {
    const params = new URLSearchParams()
    params.set(key, value)

    return params.toString()
  }

  async function handleLogin({ user, password }: LoginSchemaType) {
    setIsFetching(true)

    const res = await fetchSiga(user, password)

    if (res.ok) {
      setCookie("siga-auth", user, { sameSite: "strict" })
    } else {
      toast("Erro ao fazer login. Verifique suas credenciais.", {
        classNames: { toast: "group-[.toaster]:bg-red-500 " },
      })

      setIsFetching(false)

      const formElement = document.querySelector("form") as HTMLFormElement

      formElement.classList.add("animate-shake")
      formElement.addEventListener("animationend", () => {
        formElement.classList.remove("animate-shake")
      })
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
                      onClick={() => {
                        const state = get("p") === "show" ? "hide" : "show"
                        router.push("?" + createQueryString("p", state))
                      }}
                    >
                      {get("p") === "hide" ? (
                        <EyeIcon className="h-4 w-4 text-zinc-500" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4 text-zinc-500" />
                      )}
                    </Button>
                  }
                  type={get("p") === "show" ? "text" : "password"}
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
        <Button type="submit" className="w-1/2" disabled={isFetching}>
          {isFetching && <RotateCwIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isFetching ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <Toaster />
    </Form>
  )
}
