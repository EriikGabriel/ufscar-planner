import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

const data = [
  {
    status: "pending",
    email: "m@example.com",
    amount: 100,
    id: "728ed52f",
  },
]

export default async function Mandatory() {
  return (
    <main className="w-dvw min-h-dvh flex justify-center items-center">
      {/* <DataTable data={data} columns={columns} /> */}
    </main>
  )
}
