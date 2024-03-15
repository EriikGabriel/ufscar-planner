"use client"

import { Tables } from "@@types/supabase"
import { ColumnDef } from "@tanstack/react-table"
import { Network, Pencil, Trash2 } from "lucide-react"
import { DeleteDisciplineAlert } from "../DeleteDisciplineAlert"
import { DisciplineSheet } from "../DisciplineSheet"
import { PrerequisitesDialog } from "../PrerequisitesDialog"
import { Badge } from "./badge"
import { Button } from "./button"
import { Checkbox } from "./checkbox"

const statusColor: { [key: string]: string } = {
  Studying: "bg-yellow-500/50 border-yellow-500",
  "Not started": "bg-gray-500/50 border-gray-500",
  Pending: "bg-red-500/50 border-red-500",
  Complete: "bg-green-500/50 border-green-500",
}

const statusMap: { [key: string]: string } = {
  "Not started": "Não iniciada",
  Studying: "Cursando",
  Complete: "Completa",
  Pending: "Pendente",
}

const activityMap: { [key: number]: string } = {
  1: "Obrigatória",
  2: "Optativa 1",
  3: "Optativa 2",
}

export const mandatoryColumns: ColumnDef<Tables<"disciplines">>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "profile",
    header: "Perfil",
  },
  {
    accessorKey: "t_hours",
    header: "Horas teóricas",
  },
  {
    accessorKey: "p_hours",
    header: "Horas práticas",
  },
  {
    accessorKey: "activity_id",
    header: "Tipo de optativa",
    cell: ({ row }) => (
      <Badge variant="outline" className="w-24 flex justify-center">
        {row.getValue("activity_id") === 2 ? "Optativa 1" : "Optativa 2"}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`w-24 flex justify-center ${
          statusColor[String(row.getValue("status"))]
        }`}
      >
        {statusMap[String(row.getValue("status"))]}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "prerequisites",
    header: "Pré-requisitos",
  },
  {
    accessorKey: "conclusion_semester",
    header: "Semestre de conclusão",
  },
  {
    accessorKey: "created_at",
    header: "Criada em",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex gap-3">
        <DisciplineSheet
          disciplineType="mandatory"
          discipline={{
            id: row.getValue("id"),
            name: row.getValue("name"),
            profile: row.getValue("profile"),
            t_hours: row.getValue("t_hours"),
            p_hours: row.getValue("p_hours"),
            activity_id: row.getValue("activity_id"),
            status: row.getValue("status"),
            prerequisites: row.getValue("prerequisites"),
            conclusion_semester: row.getValue("conclusion_semester"),
            created_at: row.getValue("created_at"),
          }}
        >
          <Button variant="ghost" size="icon" className="hover:text-yellow-400">
            <Pencil className="h-4 w-4" />
          </Button>
        </DisciplineSheet>
        <DeleteDisciplineAlert name={row.getValue("name")}>
          <Button variant="ghost" size="icon" className="hover:text-red-400">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DeleteDisciplineAlert>
      </div>
    ),
  },
]

export const optativeColumns: ColumnDef<Tables<"disciplines">>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "t_hours",
    header: "Horas teóricas",
  },
  {
    accessorKey: "p_hours",
    header: "Horas práticas",
  },
  {
    accessorKey: "activity_id",
    header: "Tipo de optativa",
    cell: ({ row }) => (
      <Badge variant="outline" className="w-24 flex justify-center">
        {row.getValue("activity_id") === 2 ? "Optativa 1" : "Optativa 2"}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`w-24 flex justify-center ${
          statusColor[String(row.getValue("status"))]
        }`}
      >
        {statusMap[String(row.getValue("status"))]}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "prerequisites",
    header: "Pré-requisitos",
  },
  {
    accessorKey: "conclusion_semester",
    header: "Semestre de conclusão",
  },
  {
    accessorKey: "created_at",
    header: "Criada em",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex gap-3">
        <DisciplineSheet
          disciplineType="optative"
          discipline={{
            id: row.getValue("id"),
            name: row.getValue("name"),
            profile: null,
            t_hours: row.getValue("t_hours"),
            p_hours: row.getValue("p_hours"),
            activity_id: row.getValue("activity_id"),
            status: row.getValue("status"),
            prerequisites: row.getValue("prerequisites"),
            conclusion_semester: row.getValue("conclusion_semester"),
            created_at: row.getValue("created_at"),
          }}
        >
          <Button variant="ghost" size="icon" className="hover:text-yellow-400">
            <Pencil className="h-4 w-4" />
          </Button>
        </DisciplineSheet>
        <DeleteDisciplineAlert name={row.getValue("name")}>
          <Button variant="ghost" size="icon" className="hover:text-red-400">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DeleteDisciplineAlert>
      </div>
    ),
  },
]

export const newSemesterColumns: ColumnDef<Tables<"disciplines">>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "profile",
    header: "Perfil",
  },
  {
    accessorKey: "t_hours",
    header: "Horas teóricas",
  },
  {
    accessorKey: "p_hours",
    header: "Horas práticas",
  },
  {
    accessorKey: "activity_id",
    header: "Tipo de atividade",
    cell: ({ row }) => (
      <Badge variant="outline" className="w-24 flex justify-center">
        {activityMap[Number(row.getValue("activity_id"))]}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`w-24 flex justify-center ${
          statusColor[String(row.getValue("status"))]
        }`}
      >
        {statusMap[String(row.getValue("status"))]}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "prerequisites",
    header: "Pré-requisitos",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) =>
      row.getValue("prerequisites") && (
        <div className="flex gap-3">
          <PrerequisitesDialog
            discipline={row.getValue("name")}
            prerequisites={row.getValue("prerequisites")}
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <Network className="h-4 w-4" />
            </Button>
          </PrerequisitesDialog>
        </div>
      ),
  },
]
