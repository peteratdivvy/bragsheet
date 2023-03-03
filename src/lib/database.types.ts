export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Brag: {
        Row: {
          bragSheetId: string | null
          content: string
          createdAt: string
          deleted: boolean
          id: string
          title: string
          updatedAt: string
          userId: string | null
        }
        Insert: {
          bragSheetId?: string | null
          content: string
          createdAt?: string
          deleted?: boolean
          id: string
          title: string
          updatedAt?: string
          userId?: string | null
        }
        Update: {
          bragSheetId?: string | null
          content?: string
          createdAt?: string
          deleted?: boolean
          id?: string
          title?: string
          updatedAt?: string
          userId?: string | null
        }
      }
      BragSheet: {
        Row: {
          createdAt: string
          deleted: boolean
          description: string
          id: string
          title: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          deleted?: boolean
          description: string
          id: string
          title: string
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          deleted?: boolean
          description?: string
          id?: string
          title?: string
          updatedAt?: string
          userId?: string
        }
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          updated_at: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
