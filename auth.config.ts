import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      const isOnLogin = nextUrl.pathname.startsWith("/login");

      // 🔐 proteger dashboard
      if (isOnDashboard && !isLoggedIn) {
        return false;
      }

      // 🔥 CLAVE: evitar volver al login si ya estás logueado
      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;