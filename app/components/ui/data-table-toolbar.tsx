import {
  CheckCircledIcon,
  Cross2Icon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BookPlusIcon,
  CircleIcon,
} from "lucide-react"
import { Button } from "./button"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Input } from "./input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export const statuses = [
  {
    value: "Not started",
    label: "Not started",
    icon: CircleIcon,
  },
  {
    value: "Studying",
    label: "Studying",
    icon: StopwatchIcon,
  },
  {
    value: "Complete",
    label: "Complete",
    icon: CheckCircledIcon,
  },
  {
    value: "Pending",
    label: "Pending",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

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
      <Button className="">
        <BookPlusIcon className="mr-2 h-4 w-4" /> Cadastrar
      </Button>
    </div>
  )
}
