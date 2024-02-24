"use client"

import { DisciplineType } from "@@types/database"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<DisciplineType>[] = [
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
    meta: { type: "badge" },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "conclusion_semester",
    header: "Semestre de conclusão",
  },
]
