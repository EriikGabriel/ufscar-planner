"use client"

import { createClient } from "@lib/supabase/client"
import { Button } from "@ui/button"
import { X } from "lucide-react"

interface RemoveDisciplineButtonProps {
  name: string
}

export function RemoveDisciplineButton({ name }: RemoveDisciplineButtonProps) {
  const supabase = createClient()

  async function handleRemoveDiscipline() {
    const { error, status } = await supabase
      .from("disciplines")
      .update({ status: "Not started" })
      .eq("name", name)

    if (status === 204) location.reload()
  }

  return (
    <Button size="icon" variant="ghost" onClick={handleRemoveDiscipline}>
      <X className="h-4 w-4" />
    </Button>
  )
}
