import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import { Separator } from "@ui/separator"

export function ProfileInfo() {
  return (
    <div className="bg-zinc-900/70 flex items-center justify-between w-full h-20 px-5 rounded-md">
      <div className="flex gap-3">
        <Avatar className="rounded-md h-12 w-12">
          <AvatarImage src="https://github.com/EriikGabriel.png" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-medium text-lg">Erik Gabriel</h1>
          <p className="text-sm text-zinc-500">
            erik.silva@estudante.ufscar.br
          </p>
        </div>
      </div>
      <div className="flex items-end gap-1 flex-col">
        <h2 className="font-light text-sm">
          Período: <span className="font-bold">6</span> / 9
        </h2>
        <Separator />
        <h2 className="font-light text-sm">
          Disciplinas atuais: <span className="font-bold">5</span>
        </h2>
      </div>
    </div>
  )
}
