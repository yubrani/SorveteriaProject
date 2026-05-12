"use server";

import { signOut } from "@/auth";
import { signIn } from "@/auth";
export async function logoutAction() {
  await signOut({ redirectTo: "/login" }); // 🔥 redirige al login
}

