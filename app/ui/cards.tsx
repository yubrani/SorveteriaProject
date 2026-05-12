import { Product } from "@/app/lib/definitions";
import Link from "next/link";

type Props = {
  product: Product;
};

type Category = {
  id: number;
  name: string;
  image_url: string;
};

export function Card({ product }: Props) {
  return (
    <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md transition">

      <h2 className="text-sm md:text-lg font-bold text-gray-800 line-clamp-1">
        {product.name}
      </h2>

      <p className="text-xs md:text-sm text-gray-500 line-clamp-2 mt-1">
        {product.description}
      </p>

      <span className="text-green-600 font-semibold text-sm md:text-base mt-2 block">
        ${product.price}
      </span>

    </div>
  );
}
export default function CategoryCard({
  category,
}: {
  category: Category;
}) {
  return (
    <Link href={`/dashboard?category=${category.id}`}>
      <div className="group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">

        {/* Imagen MÁS PEQUEÑA */}
        <div className="w-full h-20 sm:h-24 md:h-28 overflow-hidden">

          <img
            src={category.image_url}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />

        </div>

        {/* Nombre MÁS COMPACTO */}
        <div className="p-2 md:p-3 text-center">

          <p className="text-xs md:text-sm font-semibold text-gray-800 group-hover:text-red-500 transition line-clamp-1">

            {category.name}

          </p>

        </div>

      </div>
    </Link>
  );
}