import { FirstSetup } from "@components/FirstSetup"
import { LoginForm } from "@components/LoginForm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Login() {
  const sigaAuth = cookies().get("siga-auth")
  const isFirstSetup = cookies().get("first-setup")?.value === "true"

  if (sigaAuth && !isFirstSetup) redirect("/home")

  return (
    <main className="w-dvw min-h-dvh flex justify-center items-center">
      {sigaAuth && isFirstSetup ? <FirstSetup /> : <LoginForm />}
    </main>
  )
}
