import { createClient } from "@lib/supabase/server"
import { cn } from "@lib/utils"
import { SlotProps } from "@radix-ui/react-slot"
import { icons } from "lucide-react"
import { cookies } from "next/headers"
import { ActivitiesCard } from "./ActivitiesCard"

export async function ActivitiesSummary({ className }: SlotProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: activities } = await supabase
    .from("activities")
    .select()
    .order("id")

  const { data: extra } = await supabase
    .from("extras")
    .select()
    .eq("validated", false)

  const { data: disciplines } = await supabase
    .from("disciplines")
    .select()
    .in("status", ["Studying", "Complete"])

  const estimatedHours: Record<number, number> = {}
  activities?.forEach((activity) => {
    estimatedHours[activity.id] = 0
  })

  extra?.forEach((activity) => {
    if (estimatedHours[activity.activity_id] === undefined)
      estimatedHours[activity.activity_id] = 0

    estimatedHours[activity.activity_id] += activity.hours
  })

  disciplines?.forEach((discipline) => {
    let act_id = discipline.activity_id

    // Merge
    if (act_id === 3) act_id = 2

    if (estimatedHours[act_id] === undefined) estimatedHours[act_id] = 0
    estimatedHours[act_id] += discipline.t_hours + discipline.p_hours
  })

  const finalActivities = [...(activities ?? [])]
  finalActivities.forEach((activity, i) => {
    if (activity.name === "Optativas 1") {
      const optativa2 = finalActivities.find((a) => a.name === "Optativas 2")
      if (optativa2) {
        activity.name = "Optativas"
        activity.required_hours += optativa2.required_hours
        activity.coursed_hours += optativa2.coursed_hours
      }
    }
    if (activity.name === "Optativas 2") finalActivities.splice(i, 1)
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
    <div
      className={cn(
        "grid grid-cols-2 grid-rows-3 max-xl:h-fit gap-5 max-2xl:gap-2 max-sm:grid-cols-1 max-sm:grid-rows-5 max-sm:gap-3",
        className
      )}
    >
      {finalActivities.map(({ id, name, coursed_hours, required_hours }, i) => (
        <ActivitiesCard
          color={colors[i % colors.length]}
          Icon={icons[iconsName[i]]}
          quantity={coursed_hours}
          required={required_hours}
          estimated={estimatedHours[id] ?? undefined}
          className={`${
            i === finalActivities.length - 1
              ? "col-span-2 max-sm:col-span-1"
              : ""
          }`}
          key={id}
          index={i}
        >
          <p className="max-xl:hidden max-sm:inline">
            {name !== "Obrigatória" && name !== "Optativa"
              ? "Atividades"
              : "Disciplinas"}
          </p>
          <span className="font-semibold max-xl:text-end">{name}</span>
        </ActivitiesCard>
      ))}
    </div>
  )
}
