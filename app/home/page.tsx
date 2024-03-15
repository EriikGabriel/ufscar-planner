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
    <main className="w-dvw h-dvh max-xl:h-full">
      <Header />
      <div className="flex px-14 max-2xl:px-5 py-5 gap-5 h-[90%] max-xl:h-full">
        <section className="flex flex-col gap-5 w-8/12 max-xl:w-full">
          <h1 className="font-medium text-lg max-lg:hidden">Atividades</h1>
          <ActivitiesMenu />
          <div className="xl:hidden max-xl:flex max-lg:flex-col-reverse gap-2 max-lg:gap-5 h-fit">
            <ActivitiesSummary className="w-full" />
            <CurrentDisciplines />
            <ProfileInfo className="max-xl:hidden max-lg:flex" />
          </div>
          <ChartsTabs />
        </section>
        <section className="flex flex-col gap-5 w-5/12 max-xl:hidden">
          <h1 className="font-medium text-lg">Perfil do Estudante</h1>
          <ProfileInfo />
          <CurrentDisciplines />
          <ActivitiesSummary className="max-xl:hidden" />
        </section>
      </div>
    </main>
  )
}
