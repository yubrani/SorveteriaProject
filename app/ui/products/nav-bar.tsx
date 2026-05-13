import Link from "next/link";
import {
  FaHome,
  FaUser,
  FaSearch,
  FaClipboardList,
  FaPencilAlt,
} from "react-icons/fa";

import { logoutAction } from "@/app/lib/actions/auth_actions";
import { auth } from "@/auth";

import SearchBar from "./searchbar";
import MobileSearch from "@/app/ui/products/mobille-search";

export default async function NavBar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-20 bg-white border-b border-slate-100 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 gap-4">
        
        {/* LEFT */}
        <div className="flex items-center gap-4 md:gap-6">
          
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition"
          >
            <FaHome className="w-4 h-4" />
            <span className="hidden md:block text-sm">
              Início
            </span>
          </Link>

          <Link
            href="/dashboard/orders"
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition"
          >
            <FaClipboardList className="w-4 h-4" />
            <span className="hidden md:block text-sm">
              Pedidos
            </span>
          </Link>

          {session?.user && (
            <Link
              href={`/dashboard/users/${session.user.id}/edit`}
              className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition"
            >
              <FaUser className="w-4 h-4" />

              <span className="hidden md:block text-sm">
                Perfil
              </span>
            </Link>
          )}
        </div>

        {/* SEARCH DESKTOP */}
        <div className="hidden md:flex items-center w-full max-w-md">
          <div className="flex items-center gap-2 w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition">
            
            <FaSearch className="text-slate-400 w-4 h-4" />

            <div className="w-full">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* SEARCH MOBILE */}
        <MobileSearch />

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {session?.user ? (
            <>
              {session.user.role === "admin" && (
                <Link
                  href="/dashboard/products"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  <FaPencilAlt className="w-4 h-4" />
                </Link>
              )}

              <span className="hidden md:block text-sm text-slate-500">
                Olá, {session.user.name} 👋
              </span>

              <form action={logoutAction}>
                <button className="text-sm px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                  Sair
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}