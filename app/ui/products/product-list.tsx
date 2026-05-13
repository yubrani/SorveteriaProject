"use client";

import { Product } from "@/app/lib/definitions";
import { addToCartAction } from "@/app/lib/actions/cart";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export default function ProductList({ product }: Props) {
  return (
    <form action={addToCartAction}>
      <input type="hidden" name="productId" value={product.id} />

      <button
        type="submit"
        onClick={() =>
          toast.success(`${product.name} añadido al carrito`)
        }
        className="w-full text-left bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col max-w-sm cursor-pointer hover:scale-[1.02]"
      >
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-24 sm:h-28 object-cover"
          />
        )}

        <div className="p-2 md:p-3 flex flex-col gap-1 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h2>

          <p className="text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center mt-auto gap-2">
            <span className="text-red-500 font-bold text-sm">
              ${product.price}
            </span>
          </div>
        </div>
      </button>
    </form>
  );
}