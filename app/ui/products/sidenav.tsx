import { logoutAction } from "@/app/lib/actions/auth_actions";
import { auth } from "@/auth";
import Link from "next/link";

export default async function SideNav() {
  const session = await auth();

  return (
    <nav className="h-full w-full bg-gray-800 text-white">
      <ul className="space-y-4 p-4">

        <li>
          <Link 
            href="/dashboard"
            className="block rounded-md px-3 py-2 hover:bg-gray-700"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link 
            href="/dashboard/products"
            className="block rounded-md px-3 py-2 hover:bg-gray-700"
          >
            Produtos
          </Link>
        </li>

        <li>
          <Link 
            href="/orders"
            className="block rounded-md px-3 py-2 hover:bg-gray-700"
          >
            Orders
          </Link>
        </li>

        {session?.user ? (
          <>
            <span className="block px-3 py-2">
              Hola, {session.user.name} 👋
            </span>

            <form action={logoutAction}>
              <button className="block w-full text-left px-3 py-2 hover:bg-gray-700">
                Logout
              </button>
            </form>
          </>
        ) : (
          <li>
            <Link 
              href="/login"
              className="block rounded-md px-3 py-2 hover:bg-gray-700"
            >
              Login
            </Link>
          </li>
        )}

      </ul>
    </nav>
  );
}