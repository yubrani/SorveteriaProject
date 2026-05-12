import { Product } from "@/app/lib/definitions";
import { UpdateProductsButton, DeleteProductButton } from "../button";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { addToCartAction } from "@/app/lib/actions/cart";

type Props = {
  product: Product;
};

export default function ProductList({ product }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col max-w-sm">

      {/* Imagen MÁS PEQUEÑA */}
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-24 sm:h-28 object-cover"
        />
      )}

      {/* Contenido MÁS COMPACTO */}
      <div className="p-2 md:p-3 flex flex-col gap-1 flex-1">

        {/* Nombre */}
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h2>

        {/* Descripción */}
        <p className="text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Precio + botón */}
        <div className="flex justify-between items-center mt-auto gap-2">

          <span className="text-red-500 font-bold text-sm">
            ${product.price}
          </span>

          <form action={addToCartAction}>
            <input type="hidden" name="productId" value={product.id} />

            <button className="bg-red-500 text-white px-2 py-1 rounded-full text-xs hover:bg-red-600 transition">
              Agregar
            </button>
          </form>

        </div>

        {/* Acciones admin */}
        <div className="flex justify-end gap-2 mt-1 text-gray-400">

          <UpdateProductsButton>
            <Link href={`/dashboard/products/${product.id}/edit`}>
              <FaPencilAlt className="w-3 h-3 hover:text-blue-500 transition" />
            </Link>
          </UpdateProductsButton>

          <DeleteProductButton id={product.id}>
            <FaTrash className="w-3 h-3 hover:text-red-500 transition" />
          </DeleteProductButton>

        </div>

      </div>
    </div>
  );
}