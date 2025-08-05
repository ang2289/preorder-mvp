// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pjpbfdowjclgjhszasub.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqcGJmZG93amNsZ2poc3phc3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MDE3MTQsImV4cCI6MjA2OTQ3NzcxNH0.r8KpTMJGHzI3ZCMYGHq0BQzHFhsU4rCjFIfa3LW4QSk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
