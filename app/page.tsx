import { FirstSetup } from "@components/FirstSetup"
import { LoginForm } from "@components/LoginForm"
import { getCookie } from "@helpers/store"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Login() {
  const userHash = await getCookie("siga-auth")
  const isFirstSetup = cookies().get("first-setup")?.value === "true"

  if (userHash && !isFirstSetup) redirect("/home")

  return (
    <main className="w-dvw min-h-dvh flex justify-center items-center">
      {userHash && isFirstSetup ? <FirstSetup /> : <LoginForm />}
    </main>
  )
}
