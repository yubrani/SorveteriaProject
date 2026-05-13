import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import type { UserInfo } from "@/app/lib/definitions";
import { authConfig } from "./auth.config";

// ✅ DB check
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definida");
}

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET no está definido");
}

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
});

// ✅ Get user
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

        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordsMatch) return null;

        // ✅ IMPORTANT: id must be string
        return {
          id: user.id.toString(), // 🔥 FIX PRINCIPAL
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

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string, // 🔥 string consistente
          role: token.role as string,
        };
      }
      return session;
    },
  },
});