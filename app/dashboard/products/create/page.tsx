

import { getProducts } from "@/app/lib/data";
import { getCategories } from "@/app/lib/data";

import  CreateProductForm  from "@/app/ui/products/create-product-forms";
export default async function ProductPage() {
  const products = await getProducts();
  const categories = await getCategories();
  return (
    <div className="flex min-h-screen bg-gray-100">
      

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6 flex flex-col">

     

        {/* ===== TOP GRID (FORM + PREVIEW) ===== */}
        

          {/* ==== FORM CARD ==== */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Criar Produto</h2>

            <CreateProductForm categories={categories} />
            
          </div>

       

        


      </main>
    </div>
  );
}