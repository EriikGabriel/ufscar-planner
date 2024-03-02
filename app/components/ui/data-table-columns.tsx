"use client"

import { Tables } from "@/app/types/supabase"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "./badge"

const statusColor: { [key: string]: string } = {
  Studying: "bg-yellow-500/50 border-yellow-500",
  "Not started": "bg-gray-500/50 border-gray-500",
  Pending: "bg-red-500/50 border-red-500",
  Complete: "bg-green-500/50 border-green-500",
}

export const mandatoryColumns: ColumnDef<Tables<"disciplines">>[] = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`w-24 flex justify-center ${
          statusColor[String(row.getValue("status"))]
        }`}
      >
        {row.getValue("status")}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "conclusion_semester",
    header: "Semestre de conclusão",
  },
]

export const optativeColumns: ColumnDef<Tables<"disciplines">>[] = [
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
        {row.getValue("status")}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "conclusion_semester",
    header: "Semestre de conclusão",
  },
]

export const allColumns: ColumnDef<Tables<"disciplines">>[] = [
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
        {row.getValue("status")}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "conclusion_semester",
    header: "Semestre de conclusão",
  },
]
