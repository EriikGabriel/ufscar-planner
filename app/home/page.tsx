import { ActivitiesMenu } from "@components/ActivitiesMenu"
import { ActivitiesSummary } from "@components/ActivitiesSummary"
import { ChartsTabs } from "@components/ChartsTabs"
import { CurrentDisciplines } from "@components/CurrentDisciplines"
import { Header } from "@components/Header"
import { ProfileInfo } from "@components/ProfileInfo"
import { getCookie } from "@helpers/store"
import { redirect } from "next/navigation"

export default async function Home() {
  const userHash = await getCookie("siga-auth")

  if (!userHash) redirect("/")

  return (
    <main className="w-dvw h-dvh">
      <Header />
      <div className="flex px-14 py-5 gap-5 h-[90%]">
        <section className="flex flex-col gap-5 w-8/12">
          <h1 className="font-medium text-lg">Atividades</h1>
          <ActivitiesMenu />
          <ChartsTabs />
        </section>
        <section className="flex flex-col gap-5 w-5/12">
          <h1 className="font-medium text-lg">Perfil do Estudante</h1>
          <ProfileInfo />
          <CurrentDisciplines />
          <ActivitiesSummary />
        </section>
      </div>
    </main>
  )
}
