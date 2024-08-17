"use client"

import { useProjectionContext } from "@contexts/ProjectionContext"
import { Toggle } from "@ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip"
import { Goal } from "lucide-react"

interface ToggleProjectionProps {}

export function ToggleProjection({}: ToggleProjectionProps) {
  const { projection, setProjection } = useProjectionContext()

  function changeToggleProjection(pressed: boolean) {
    localStorage.setItem("@ufscar-planner/projection", String(pressed))

    setProjection(pressed)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              size="sm"
              className="py-0 my-0"
              onPressedChange={changeToggleProjection}
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
