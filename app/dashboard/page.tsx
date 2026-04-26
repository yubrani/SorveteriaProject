
import { getProducts } from "@/app/lib/data";
import Card from "@/app/ui/cards";
export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const products = await getProducts(); 

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Início
        </h1>
        <p className="text-gray-500">
          O que você vai pedir hoje? 🍔
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}

      </div>

    </div>
  );
}