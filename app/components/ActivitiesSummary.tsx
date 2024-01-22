import {
  FileBadgeIcon,
  FileBoxIcon,
  FileClockIcon,
  FileKey2Icon,
  FilePieChartIcon,
} from "lucide-react"
import { ActivitiesCard } from "./ActivitiesCard"

export function ActivitiesSummary() {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-5">
      <ActivitiesCard
        color="bg-blue-400/80"
        Icon={FileKey2Icon}
        quantity={1290}
        required={1635}
      >
        Disciplinas <span className="font-semibold">Obrigatórias</span>
      </ActivitiesCard>
      <ActivitiesCard
        color="bg-orange-400/80"
        Icon={FileClockIcon}
        quantity={150}
        required={780 + 60}
      >
        Disciplinas <span className="font-semibold">Optativas</span>
      </ActivitiesCard>
      <ActivitiesCard
        color="bg-green-400/80"
        Icon={FilePieChartIcon}
        quantity={0}
        required={90}
      >
        Atividades <span className="font-semibold">Complementares</span>
      </ActivitiesCard>
      <ActivitiesCard
        color="bg-purple-400/80"
        Icon={FileBoxIcon}
        quantity={0}
        required={330}
      >
        Atividades de <span className="font-semibold">Extensão</span>
      </ActivitiesCard>
      <ActivitiesCard
        color="bg-yellow-400/80"
        Icon={FileBadgeIcon}
        quantity={0}
        required={360}
        className="col-span-2"
      >
        Atividades de <span className="font-semibold">Estágio</span>
      </ActivitiesCard>
    </div>
  )
}
