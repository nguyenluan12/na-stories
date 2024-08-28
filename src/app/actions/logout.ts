
"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { logout } from "~/lib/session"

export async function handleLogout() {
  console.log("Logout")
  cookies().delete('session')
  
  await logout()
  redirect('/login/signin')
  
}