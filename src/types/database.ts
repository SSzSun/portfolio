// Generated from the Supabase schema (supabase gen types), trimmed to what the app uses.
// Regenerate after schema changes: bunx supabase gen types typescript --project-id <ref>

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.18";
  };
  public: {
    Tables: {
      admins: {
        Row: { email: string };
        Insert: { email: string };
        Update: { email?: string };
        Relationships: [];
      };
      experiences: {
        Row: {
          company: string;
          created_at: string;
          description: string;
          id: string;
          is_visible: boolean;
          period_end: string | null;
          period_start: string;
          role: string;
          sort_order: number;
          tech_stack: string[];
          updated_at: string;
        };
        Insert: {
          company: string;
          created_at?: string;
          description?: string;
          id?: string;
          is_visible?: boolean;
          period_end?: string | null;
          period_start: string;
          role: string;
          sort_order?: number;
          tech_stack?: string[];
          updated_at?: string;
        };
        Update: {
          company?: string;
          created_at?: string;
          description?: string;
          id?: string;
          is_visible?: boolean;
          period_end?: string | null;
          period_start?: string;
          role?: string;
          sort_order?: number;
          tech_stack?: string[];
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          architecture: string;
          architecture_diagram: Json;
          created_at: string;
          demo_url: string | null;
          github_url: string | null;
          id: string;
          is_visible: boolean;
          metrics: Json;
          sort_order: number;
          summary: string;
          tech_stack: string[];
          title: string;
          updated_at: string;
        };
        Insert: {
          architecture?: string;
          architecture_diagram?: Json;
          created_at?: string;
          demo_url?: string | null;
          github_url?: string | null;
          id?: string;
          is_visible?: boolean;
          metrics?: Json;
          sort_order?: number;
          summary?: string;
          tech_stack?: string[];
          title: string;
          updated_at?: string;
        };
        Update: {
          architecture?: string;
          architecture_diagram?: Json;
          created_at?: string;
          demo_url?: string | null;
          github_url?: string | null;
          id?: string;
          is_visible?: boolean;
          metrics?: Json;
          sort_order?: number;
          summary?: string;
          tech_stack?: string[];
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_content: {
        Row: { key: string; value: string; updated_at: string };
        Insert: { key: string; value?: string; updated_at?: string };
        Update: { key?: string; value?: string; updated_at?: string };
        Relationships: [];
      };
      site_stats: {
        Row: { key: string; value: number };
        Insert: { key: string; value?: number };
        Update: { key?: string; value?: number };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      increment_visit: { Args: never; Returns: number };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

export type ExperienceRow = Database["public"]["Tables"]["experiences"]["Row"];
export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
