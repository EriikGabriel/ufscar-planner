import { Tables } from "@@types/supabase"
import {
  CheckCircledIcon,
  Cross2Icon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import {
  BookPlusIcon,
  CircleIcon,
  FileBadge,
  FileBox,
  FileClock,
  FileKey2,
  FilePieChart,
  ListChecks,
} from "lucide-react"
import { useParams } from "next/navigation"
import { AddDisciplineSheet } from "../AddDisciplineSheet"
import { NewSemesterAlert } from "../NewSemesterAlert"
import { Button } from "./button"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Input } from "./input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  tools?: {
    filters?: {
      status?: boolean
      activity?: boolean
    }
    registerButton?: boolean
    selectButton?: boolean
  }
}

export const statuses = [
  {
    value: "Not started",
    label: "Não iniciada",
    icon: CircleIcon,
  },
  {
    value: "Studying",
    label: "Cursando",
    icon: StopwatchIcon,
  },
  {
    value: "Complete",
    label: "Completa",
    icon: CheckCircledIcon,
  },
  {
    value: "Pending",
    label: "Pendente",
    icon: CrossCircledIcon,
  },
]

export const activities = [
  {
    value: 1,
    label: "Obrigatória",
    icon: FileKey2,
  },
  {
    value: 2,
    label: "Optativa 1",
    icon: FileClock,
  },
  {
    value: 3,
    label: "Optativa 2",
    icon: FileClock,
  },
  {
    value: 4,
    label: "Complementar",
    icon: FilePieChart,
  },
  {
    value: 5,
    label: "Extensão",
    icon: FileBox,
  },
  {
    value: 6,
    label: "Estágio",
    icon: FileBadge,
  },
]

export function DataTableToolbar<TData>({
  table,
  tools = {
    registerButton: false,
    selectButton: false,
  },
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const params = useParams()

  const discipline = params.discipline as "mandatory" | "optative"

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar disciplinas..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("activity_id") && (
          <DataTableFacetedFilter
            column={table.getColumn("activity_id")}
            title="Tipo de atividade"
            options={activities}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {tools.registerButton && (
        <AddDisciplineSheet discipline={discipline}>
          <Button size="sm">
            <BookPlusIcon className="mr-2 h-4 w-4" /> Cadastrar
          </Button>
        </AddDisciplineSheet>
      )}
      {tools.selectButton && (
        <NewSemesterAlert
          data={
            table
              .getFilteredSelectedRowModel()
              .rows.map((r) => r.original) as Tables<"disciplines">[]
          }
        >
          <Button
            size="sm"
            disabled={!!!table.getFilteredSelectedRowModel().rows.length}
          >
            <ListChecks className="mr-2 h-4 w-4" /> Concluir
          </Button>
        </NewSemesterAlert>
      )}
    </div>
  )
}
