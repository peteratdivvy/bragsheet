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
          action: string;
          bragSheetId: string | null;
          id: string;
          result: string;
          situation: string;
          title: string;
          userId: string | null;
        };
        Insert: {
          action: string;
          bragSheetId?: string | null;
          id: string;
          result: string;
          situation: string;
          title: string;
          userId?: string | null;
        };
        Update: {
          action?: string;
          bragSheetId?: string | null;
          id?: string;
          result?: string;
          situation?: string;
          title?: string;
          userId?: string | null;
        };
      };
      BragSheet: {
        Row: {
          id: string;
          title: string;
          userId: string;
        };
        Insert: {
          id: string;
          title: string;
          userId: string;
        };
        Update: {
          id?: string;
          title?: string;
          userId?: string;
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
