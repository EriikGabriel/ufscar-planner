"use client"

import { Toggle } from "@ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip"
import { Goal } from "lucide-react"
import { useEffect, useState } from "react"

interface ToggleProjectionProps {}

export function ToggleProjection(props: ToggleProjectionProps) {
  const [projection, setProjection] = useState<boolean>()

  function changeToggleProjection(pressed: boolean) {
    localStorage.setItem("@ufscar-planner/projection", String(pressed))
    setProjection(pressed)
  }

  useEffect(() => {
    const projection = localStorage.getItem("@ufscar-planner/projection")
    setProjection(projection === "true")
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              size="sm"
              className="py-0 my-0"
              onPressedChange={changeToggleProjection}
              onClick={() => location.reload()}
              pressed={projection}
            >
              <Goal className="w-4 h-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ver projeção</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
