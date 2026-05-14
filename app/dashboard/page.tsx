import { getProducts } from "@/app/lib/data";
import Link from "next/link";
import ProductList from "@/app/ui/products/product-list";
import { ShoppingCart } from "lucide-react";
import { getCategories } from "@/app/lib/data";
import CategoryCard from "@/app/ui/cards";
import Image from "next/image";
export default async function ProductPage({
  searchParams,
}: {
  searchParams: { category?: string; query?: string };
}) {
  const params = await searchParams;

  const categoryId = params?.category
    ? Number(params.category)
    : undefined;

  const categories = await getCategories();
  const query = params?.query || "";
  const products = await getProducts(categoryId, query);
  
  return (
    <div className="min-h-screen bg-gray-100">

      {/* ===== HEADER ===== */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <Image src="/urcaLogo.png" alt="Logo" width={60} height={60} />
        <h1 className="text-xl font-bold text-red-500">
          
          Sorvetería
        </h1>
        
        <div className="flex items-center gap-4">
        

          <Link
            href="/dashboard/cart"
            className="relative bg-white border p-2 rounded-full shadow hover:shadow-md transition"
          >
            <ShoppingCart className="text-gray-700" />
          </Link>
        </div>
      </header>

      {/* 🔥 BOTÓN TODAS */}
      <div className="px-6 pt-4">
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300">
            Todas
          </button>
        </Link>
      </div>

      {/* 🔥 CATEGORÍAS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {categories.map((cat) => {
          const isActive = cat.id === categoryId; // ✅ FIX

          return (
            <div
              key={cat.id}
              className={isActive ? "ring-4 ring-red-400 rounded-2xl" : ""}
            >
              {!query && <CategoryCard category={cat} />}
            </div>
          );
        })}
      </div>

      {/* ===== CONTENT ===== */}
      <main className="p-6 max-w-6xl mx-auto">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Nossos produtos
          </h2>
          <p className="text-gray-500 text-sm">
            Escolha seu preferido 🍨
          </p>
        </div>

        {/* 🔥 PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => ( 
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <ProductList product={product} />
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}