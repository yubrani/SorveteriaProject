import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import type { UserInfo } from "@/app/lib/definitions";
import { authConfig } from "./auth.config";

// ✅ Validar env
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definida");
}

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET no está definido");
}

// ✅ conexión DB
const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });

// ✅ función segura
async function getUser(email: string): Promise<UserInfo | null> {
  try {
    const users = await sql<UserInfo[]>`
      SELECT * FROM users WHERE email = ${email}
    `;
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error("DB Error:", error);
    return null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  // 🔥 CLAVE PARA PRODUCCIÓN
  secret: process.env.AUTH_SECRET,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await getUser(email);

        // 🔥 evita crash
        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordsMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
 },
  // 🔥 IMPORTANTE (para roles y sesión estable)
 /* callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
}); */);