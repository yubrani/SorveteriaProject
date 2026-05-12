import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import type { UserInfo } from "@/app/lib/definitions";
import { authConfig } from "./auth.config";

// ✅ Validar variables de entorno
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definida");
}

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET no está definido");
}

// ✅ Conexión a la DB
const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
});

// ✅ Obtener usuario por email
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

// ✅ Configuración de NextAuth
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
        // 1. Validar datos con Zod
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // 2. Buscar usuario en DB
        const user = await getUser(email);

        if (!user || !user.password) return null;

        // 3. Comparar password
        const passwordsMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordsMatch) return null;

        // 4. Retornar usuario (IMPORTANTE)
        return {
          id: Number(user.id),
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

  // 🔥 CLAVE: callbacks
 callbacks: {
  async jwt({ token, user }) {
    if (user) {
      return {
        ...token,
        id: user.id,
        role: user.role,
      };
    }
    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      const user = session.user as { id?: number; role?: string };
      user.id = token.id as number;
      user.role = token.role as string | undefined;
    }
    return session;
  },
},
});