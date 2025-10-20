import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

const supabaseUrl = 'https://izzxcxxxebohkabxvybi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6enhjeHh4ZWJvaGthYnh2eWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4ODA1NTQsImV4cCI6MjA3NjQ1NjU1NH0.TTGlpMEq3ED8vkRxf1oDinTAjLXkVj3HnkYKbZGaoxY'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)