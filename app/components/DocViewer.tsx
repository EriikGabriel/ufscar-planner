"use client"

import { Tables } from "@@types/supabase"
import { createClient } from "@lib/supabase/client"
import { Button } from "@ui/button"
import { FileSearch } from "lucide-react"

interface DocViewerProps {
  extraType: "complementary" | "extension" | "internship"
  extra: Tables<"extras">
}

export function DocViewer({ extra, extraType }: DocViewerProps) {
  const supabase = createClient()

  async function handleShowDocs() {
    const { data: docs, error } = await supabase.storage
      .from("docs")
      .list(`extras/${extraType}/${extra.id}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      })

    if (error) {
      console.error(error)
      return
    }

    docs.forEach((doc) => {
      open(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/docs/extras/${extraType}/${extra.id}/${doc.name}`,
        "_blank"
      )?.focus()
    })
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="hover:text-green-400"
      onClick={handleShowDocs}
    >
      <FileSearch className="size-4" />
    </Button>
  )
}
