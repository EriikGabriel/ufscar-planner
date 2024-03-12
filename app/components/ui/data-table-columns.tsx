"use client"

import { Tables } from "@@types/supabase"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "./badge"
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
        {statusMap[String(row.getValue("status"))]}
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
        {statusMap[String(row.getValue("status"))]}
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
    cell: ({ row }) =>
      row.getValue("activity_id") !== 1 && (
        <Badge variant="outline" className="w-24 flex justify-center">
          {row.getValue("activity_id") === 2 && "Optativa 1"}
          {row.getValue("activity_id") === 3 && "Optativa 2"}
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
    accessorKey: "conclusion_semester",
    header: "Semestre de conclusão",
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
]
