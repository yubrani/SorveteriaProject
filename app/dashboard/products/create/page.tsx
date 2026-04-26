

import { getProducts } from "@/app/lib/data";

import ProductList from "@/app/ui/products/product-list";
import  CreateProductForm  from "@/app/ui/products/create-product-forms";
export default async function ProductPage() {
  const products = await getProducts();
  return (
    <div className="flex min-h-screen bg-gray-100">
      

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6 flex flex-col gap-6">

        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Products Dashboard</h1>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
            + Add Product
          </button>
        </div>

        {/* ===== TOP GRID (FORM + PREVIEW) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ==== FORM CARD ==== */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Create Product</h2>

            <CreateProductForm />
            
          </div>

          {/* ==== PREVIEW CARD ==== */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Live Preview</h2>

            {/* 👇 PREVIEW DINAMICO DESPUES */}
            <div className="h-40 flex flex-col justify-center items-center text-gray-400 border border-dashed rounded-lg">
              <p>Product preview</p>
              <p className="text-sm">Name / Price / Description</p>
            </div>
          </div>

        </div>

        {/* ===== PRODUCT LIST ===== */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <main className="p-6">
        {products.map((product) => (
                <ProductList key={product.id} product={product} />
              ))}
    </main>
        </div>

      </main>
    </div>
  );
}