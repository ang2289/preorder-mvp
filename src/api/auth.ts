// src/api/auth.ts
import { supabase } from '../lib/supabaseClient'

export async function registerShop({ email, password, name, phone }: {
  email: string,
  password: string,
  name: string,
  phone?: string
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, phone }
    }
  })

  return { data, error }
}

export async function loginShop(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function getCurrentShop() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function logoutShop() {
  await supabase.auth.signOut()
}