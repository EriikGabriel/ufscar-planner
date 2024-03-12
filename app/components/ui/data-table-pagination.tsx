import { Tables } from "@/app/types/supabase"
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "./button"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const getTotalHours = (activity_id: number) =>
    table.getFilteredSelectedRowModel().rows.reduce((acc, row) => {
      const rowData = row.original as Tables<"disciplines">
      return rowData.activity_id === activity_id
        ? acc + (rowData.t_hours + rowData.p_hours)
        : acc
    }, 0)

  const totalMandatoryHours = getTotalHours(1)
  const totalOptative1Hours = getTotalHours(2)
  const totalOptative2Hours = getTotalHours(3)

  return (
    <div className="flex items-center justify-end space-x-2">
      {!!table.getFilteredSelectedRowModel().rows.length && (
        <div className="flex flex-1 gap-3 text-sm text-muted-foreground">
          {!!totalMandatoryHours && (
            <span>{totalMandatoryHours}h obrigatórias</span>
          )}
          {!!totalOptative1Hours && (
            <span>{totalOptative1Hours}h optativas 1</span>
          )}
          {!!totalOptative2Hours && (
            <span>{totalOptative2Hours}h optativas 2</span>
          )}
          =
          <span>
            {totalMandatoryHours + totalOptative1Hours + totalOptative2Hours}h
            totais
          </span>
        </div>
      )}

      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Página{" "}
        {table.getTotalSize() > 0
          ? table.getState().pagination.pageIndex + 1
          : 0}{" "}
        de {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
