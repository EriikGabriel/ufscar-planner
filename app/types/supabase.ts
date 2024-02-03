export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          coursed_hours: number
          created_at: string
          id: number
          name: string
          required_hours: number
        }
        Insert: {
          coursed_hours?: number
          created_at?: string
          id?: number
          name: string
          required_hours?: number
        }
        Update: {
          coursed_hours?: number
          created_at?: string
          id?: number
          name?: string
          required_hours?: number
        }
        Relationships: []
      }
      disciplines: {
        Row: {
          activity_id: number
          conclusion_semester: number | null
          created_at: string
          id: number
          name: string
          p_hours: number
          profile: number | null
          status: Database["public"]["Enums"]["status"]
          t_hours: number
        }
        Insert: {
          activity_id: number
          conclusion_semester?: number | null
          created_at?: string
          id?: number
          name: string
          p_hours: number
          profile?: number | null
          status?: Database["public"]["Enums"]["status"]
          t_hours: number
        }
        Update: {
          activity_id?: number
          conclusion_semester?: number | null
          created_at?: string
          id?: number
          name?: string
          p_hours?: number
          profile?: number | null
          status?: Database["public"]["Enums"]["status"]
          t_hours?: number
        }
        Relationships: [
          {
            foreignKeyName: "disciplines_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          }
        ]
      }
      extras: {
        Row: {
          activity_id: number | null
          created_at: string
          description: string
          id: number
          name: string
        }
        Insert: {
          activity_id?: number | null
          created_at?: string
          description: string
          id?: number
          name: string
        }
        Update: {
          activity_id?: number | null
          created_at?: string
          description?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "extras_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          }
        ]
      }
      students: {
        Row: {
          course_name: string
          created_at: string
          email: string
          entry_date: string
          ira: number
          limit_date: string
          name: string
          ra: string
          semester: number
        }
        Insert: {
          course_name: string
          created_at?: string
          email: string
          entry_date: string
          ira: number
          limit_date?: string
          name: string
          ra: string
          semester: number
        }
        Update: {
          course_name?: string
          created_at?: string
          email?: string
          entry_date?: string
          ira?: number
          limit_date?: string
          name?: string
          ra?: string
          semester?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      status: "studying" | "not started" | "pending" | "complete"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
