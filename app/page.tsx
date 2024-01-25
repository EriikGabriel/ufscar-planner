import { LoginForm } from "@components/LoginForm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Login() {
  const sigaAuth = cookies().get("siga-auth")

  if (sigaAuth) redirect("/home")

  return (
    <main className="w-dvw min-h-dvh flex justify-center items-center">
      <LoginForm />
    </main>
  )
}
