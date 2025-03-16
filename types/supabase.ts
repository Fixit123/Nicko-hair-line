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
      bookings: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          date: string
          time: string
          service: string
          message?: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          date: string
          time: string
          service: string
          message?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          date?: string
          time?: string
          service?: string
          message?: string
        }
      }
      messages: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          message: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          message: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          message?: string
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
  }
} 