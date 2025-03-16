import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

// Create a single supabase client for the entire session
export const supabase = createClientComponentClient<Database>()

// Export the client directly to avoid multiple instances
export const createClient = () => supabase