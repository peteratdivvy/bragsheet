export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Brag: {
        Row: {
          category: string;
          content: string;
          id: string;
          title: string;
          userId: string | null;
        };
        Insert: {
          category: string;
          content: string;
          id: string;
          title: string;
          userId?: string | null;
        };
        Update: {
          category?: string;
          content?: string;
          id?: string;
          title?: string;
          userId?: string | null;
        };
      };
      users: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          name?: string | null;
          updated_at: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
