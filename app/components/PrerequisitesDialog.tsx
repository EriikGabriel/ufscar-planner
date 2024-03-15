/* eslint-disable react-hooks/exhaustive-deps */
import { createClient } from "@lib/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog"
import { useEffect, useState } from "react"
import { Edge, Node } from "reactflow"
import { DependenceTree } from "./DependenceTree"

import "reactflow/dist/style.css"

const position = { x: 0, y: 0 }

interface PrerequisitesDialogProps {
  children: React.ReactNode
  prerequisites: string[]
  discipline: string
}

export function PrerequisitesDialog({
  children,
  prerequisites,
  discipline,
}: PrerequisitesDialogProps) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: discipline, data: { label: discipline }, position },
    ...prerequisites.map((p) => ({
      id: p,
      data: { label: p },
      position,
    })),
  ])
  const [edges, setEdges] = useState<Edge[]>(
    prerequisites.map((p) => ({
      id: `${discipline}-${p}`,
      source: discipline,
      target: p,
    }))
  )

  const supabase = createClient()

  useEffect(() => {
    buildEdgesAndNodes(prerequisites)
  }, [])

  async function buildEdgesAndNodes(currentPrerequisites: string[]) {
    const { data: disciplines } = await supabase
      .from("disciplines")
      .select("prerequisites, name")
      .in("name", currentPrerequisites)

    disciplines?.forEach((d) => {
      setEdges((edges) => [
        ...edges,
        ...d.prerequisites.map((p) => ({
          id: `${d.name}-${p}`,
          source: d.name,
          target: p,
        })),
      ])

      setNodes((nodes) => [
        ...nodes,
        ...d.prerequisites.map((p) => ({
          id: p,
          data: { label: p },
          position,
        })),
      ])
    })

    const allPrerequisites = disciplines?.reduce<string[]>((acc, curr) => {
      return [...acc, ...curr.prerequisites]
    }, [])

    if (allPrerequisites?.length && allPrerequisites.length > 0)
      buildEdgesAndNodes(allPrerequisites)
    else {
      setEdges((edges) => {
        const seen = new Set()
        const uniqueEdges = edges.filter(({ id, source, target }) => {
          const key = id ? id : `${source}-${target}`
          return !seen.has(key) && seen.add(key)
        })

        return uniqueEdges
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-1/2">
        <DialogHeader>
          <DialogTitle>Pré-requisitos</DialogTitle>
          <DialogDescription>
            Visualize os pré-requisitos necessários para a disciplina{" "}
            {discipline}
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-96">
          <DependenceTree nodes={nodes} edges={edges} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
