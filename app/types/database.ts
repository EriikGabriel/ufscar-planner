import { Database } from "./supabase"

export type DisciplineType = Database["public"]["Tables"]["disciplines"]["Row"]
