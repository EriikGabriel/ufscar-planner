import { createClient } from "@lib/supabase/server"
import { icons } from "lucide-react"
import { cookies } from "next/headers"
import { ActivitiesCard } from "./ActivitiesCard"

export async function ActivitiesSummary() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: activities } = await supabase
    .from("activities")
    .select()
    .order("id")

  // Merge Optatives 1 and Optatives 2 into a single activity
  activities?.forEach((activity, i) => {
    if (activity.name === "Optativas 1") {
      const optativa2 = activities.find((act) => act.name === "Optativas 2")

      if (optativa2) {
        activity.name = "Optativas"
        activity.required_hours += optativa2.required_hours
        activity.coursed_hours += optativa2.coursed_hours
      }
    }

    if (activity.name !== "Optativas 2") activity.id = i + 1
    else activities.splice(i, 1)
  })

  const colors = [
    "bg-blue-400/80",
    "bg-orange-400/80",
    "bg-green-400/80",
    "bg-purple-400/80",
    "bg-yellow-400/80",
  ]

  const iconsName = [
    "FileKey2",
    "FileClock",
    "FilePieChart",
    "FileBox",
    "FileBadge",
  ] as (keyof typeof icons)[]

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-5">
      {activities?.map(({ id, name, coursed_hours, required_hours }, i) => (
        <ActivitiesCard
          color={colors[i % colors.length]}
          Icon={icons[iconsName[i]]}
          quantity={coursed_hours}
          required={required_hours}
          className={`${i === activities.length - 1 && "col-span-2"}`}
          key={id}
        >
          {name !== "Obrigatória" && name !== "Optativa"
            ? "Atividades"
            : "Disciplinas"}
          <span className="font-semibold">{name}</span>
        </ActivitiesCard>
      ))}
    </div>
  )
}
