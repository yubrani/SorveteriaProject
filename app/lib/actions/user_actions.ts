'use server';

import { z } from "zod";
import postgres from "postgres";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { State } from "@/app/lib/definitions";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const sql = postgres(process.env.DATABASE_URL!);

/* =========================
   ZOD SCHEMA
========================= */

const FormSchema = z
  .object({
    
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Email must be a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
    role: z.enum(["admin", "customer"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });



/* =========================
   CREATE USER ACTION
========================= */

export async function createUser(
  _prevState: State,
  formData: FormData
): Promise<State> {

  try {
    const validateFields = FormSchema.safeParse({
  name: formData.get("name"),
  email: formData.get("email"),
  password: formData.get("password"),
  confirmPassword: formData.get("confirmPassword"),
  role: formData.get("role"),
});

    if (!validateFields.success) {
      const errors = validateFields.error.flatten().fieldErrors;
      return { errors, message: null };
    }

    const userData = validateFields.data;

    /* =========================
       CHECK IF EMAIL EXISTS
    ========================= */
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${userData.email}
    `;

    if (existingUser.length > 0) {
      return {
        errors: { email: ["Email already exists"] },
        message: null,
      };
    }

    /* =========================
       FORMAT NAME
    ========================= */
    const formattedName =
      userData.name.charAt(0).toUpperCase() +
      userData.name.slice(1).toLowerCase();

    /* =========================
       HASH PASSWORD
    ========================= */
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    /* =========================
       INSERT USER
    ========================= */
    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (
        ${formattedName},
        ${userData.email},
        ${hashedPassword},
        ${userData.role}
      )
    `;

    /* =========================
       REDIRECT AFTER SUCCESS
    ========================= */
    redirect("/login");

  } catch (error: unknown) {

    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error
        ? (error as { code?: string }).code
        : undefined;

    if (code === "23505") {
      return {
        errors: { email: ["Email already exists"] },
        message: null,
      };
    }

    return {
      errors: {},
      message: "An unexpected error occurred",
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard", 
    });

    return undefined;

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }

    throw error;
  }
}