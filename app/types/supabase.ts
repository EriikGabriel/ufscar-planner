export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
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
          prerequisites: string[]
          profile: number | null
          status: Database["public"]["Enums"]["status"]
          student_id: string | null
          t_hours: number
        }
        Insert: {
          activity_id: number
          conclusion_semester?: number | null
          created_at?: string
          id?: number
          name: string
          p_hours: number
          prerequisites: string[]
          profile?: number | null
          status?: Database["public"]["Enums"]["status"]
          student_id?: string | null
          t_hours: number
        }
        Update: {
          activity_id?: number
          conclusion_semester?: number | null
          created_at?: string
          id?: number
          name?: string
          p_hours?: number
          prerequisites?: string[]
          profile?: number | null
          status?: Database["public"]["Enums"]["status"]
          student_id?: string | null
          t_hours?: number
        }
        Relationships: [
          {
            foreignKeyName: "disciplines_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disciplines_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["ra"]
          }
        ]
      }
      extras: {
        Row: {
          activity_id: number
          conclusion_date: string
          created_at: string
          description: string
          hours: number
          id: number
          name: string
          student_id: string | null
          validated: boolean
        }
        Insert: {
          activity_id: number
          conclusion_date: string
          created_at?: string
          description: string
          hours: number
          id?: number
          name: string
          student_id?: string | null
          validated?: boolean
        }
        Update: {
          activity_id?: number
          conclusion_date?: string
          created_at?: string
          description?: string
          hours?: number
          id?: number
          name?: string
          student_id?: string | null
          validated?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "extras_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "extras_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["ra"]
          }
        ]
      }
      refresh: {
        Row: {
          created_at: string
          id: number
          update_col: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          update_col?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          update_col?: number | null
        }
        Relationships: []
      }
      students: {
        Row: {
          course_name: string
          created_at: string
          email: string
          entry_date: string
          ira: number[]
          limit_date: string
          name: string
          ra: string
          semester: number
          semester_completed: boolean
        }
        Insert: {
          course_name: string
          created_at?: string
          email: string
          entry_date: string
          ira: number[]
          limit_date?: string
          name: string
          ra: string
          semester: number
          semester_completed?: boolean
        }
        Update: {
          course_name?: string
          created_at?: string
          email?: string
          entry_date?: string
          ira?: number[]
          limit_date?: string
          name?: string
          ra?: string
          semester?: number
          semester_completed?: boolean
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
      status: "Studying" | "Not started" | "Pending" | "Complete"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {
      status: ["Studying", "Not started", "Pending", "Complete"],
    },
  },
} as const
