"use client";

import { useActionState } from "react";
import { updateProduct } from "@/app/lib/actions/products_actions";
import { Category } from "@/app/lib/definitions";

type Props = {
  product: any;
  categories: Category[];
};

export default function EditProductForm({ product, categories }: Props) {
  const [state, formAction] = useActionState(updateProduct, {
    errors: {},
  });

  const labelStyles = "block text-sm font-medium text-gray-700";
  const inputStyles =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Product
      </h2>

      <form action={formAction} className="flex flex-col gap-5">
        
        <input type="hidden" name="id" value={product.id} />

        {/* NAME */}
        <div>
          <label className={labelStyles}>Name</label>
          <input
            name="name"
            defaultValue={product.name}
            className={inputStyles}
          />
          {state?.errors?.name && (
            <p className="text-red-500 text-sm">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className={labelStyles}>Description</label>
          <textarea
            name="description"
            defaultValue={product.description}
            rows={3}
            className={inputStyles}
          />
          {state?.errors?.description && (
            <p className="text-red-500 text-sm">
              {state.errors.description[0]}
            </p>
          )}
        </div>
        {/* CATEGORY */}  
       <div className="relative">
          <label className={labelStyles}>Categoria</label>
            <select
              name="category_id"
              className={inputStyles}
              defaultValue={product.category_id} 
              required
            >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {state.errors?.category_id && (
            <p className="text-red-500">
              {state.errors.category_id[0]}
            </p>
          )}
        </div>

        {/* PRICE */}
        <div>
          <label className={labelStyles}>Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={product.price}
            className={inputStyles}
          />
          {state?.errors?.price && (
            <p className="text-red-500 text-sm">
              {state.errors.price[0]}
            </p>
          )}
        </div>

        {/* IMAGE */}
        <div>
          <label className={labelStyles}>Image URL</label>
          <input
            name="imageUrl"
            defaultValue={product.image_url} // 👈 importante
            className={inputStyles}
          />
          {state?.errors?.imageUrl && (
            <p className="text-red-500 text-sm">
              {state.errors.imageUrl[0]}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Update Product
        </button>

        {/* GENERAL ERROR */}
        {state?.message && (
          <p className="text-red-500 text-center mt-2">
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}