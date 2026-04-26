import { Product } from "@/app/lib/definitions";
import { UpdateProductsButton } from "../button";
import { DeleteProductButton } from "../button";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Link from "next/link";

type Props = {
  product: Product;
};

export default function ProductList({ product }: Props) {
  return (
    <div className="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
      
      {/* Info izquierda */}
      <div className="flex flex-col">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg mb-2"
          />
        )}
        <h2 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-1">
          {product.description}
        </p>
      </div>

      {/* Precio derecha */}
      <div className="text-green-600 font-bold text-lg">
        ${product.price}
      </div>
      <div className="flex flex-col">
      <UpdateProductsButton >
        <Link href={`/dashboard/products/${product.id}/edit`}><FaPencilAlt /></Link>
      </UpdateProductsButton>
      <DeleteProductButton id={product.id}>
        <FaTrash />
      </DeleteProductButton>
      </div>
    </div>
  
  );
}