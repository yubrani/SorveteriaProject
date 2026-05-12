"use client";

import { useActionState } from "react";
import { createProduct } from "../../lib/actions/products_actions";
import { Button } from "../button";

type Category = {
  id: number;
  name: string;
};

export default function CreateProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const [state, formAction] = useActionState(createProduct, {
    errors: {},
  });

  const labelStyles =
    "block text-sm font-medium text-slate-600 mb-1";

  const inputStyles =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none";

  return (
    <form action={formAction} className="flex justify-center">
      <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-100 shadow-lg p-8 space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-slate-800">
            Criar Produto
          </h2>
          <p className="text-sm text-slate-500">
            Adicione um novo produto ao catálogo
          </p>
        </div>

        {/* NAME */}
        <div>
          <label className={labelStyles}>Nome do produto</label>
          <input
            className={inputStyles}
            name="name"
            type="text"
            placeholder="Ex Sorvete de chocolate..."
            required
          />
          {state.errors?.name && (
            <p className="text-xs text-red-500 mt-1">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className={labelStyles}>Descrição</label>
          <input
            className={inputStyles}
            name="description"
            type="text"
            placeholder="Descrição do produto..."
            required
          />
          {state.errors?.description && (
            <p className="text-xs text-red-500 mt-1">
              {state.errors.description[0]}
            </p>
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <label className={labelStyles}>Categoria</label>
          <select
            name="category_id"
            className={inputStyles}
            required
            defaultValue=""
          >
            <option value="" disabled>
              Seleciona uma categoria
            </option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {state.errors?.category_id && (
            <p className="text-xs text-red-500 mt-1">
              {state.errors.category_id[0]}
            </p>
          )}
        </div>

        {/* PRICE */}
        <div>
          <label className={labelStyles}>Preço</label>
          <input
            className={inputStyles}
            name="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            required
          />
          {state.errors?.price && (
            <p className="text-xs text-red-500 mt-1">
              {state.errors.price[0]}
            </p>
          )}
        </div>

        {/* IMAGE */}
        <div>
          <label className={labelStyles}>URL da imagem</label>
          <input
            className={inputStyles}
            name="imageUrl"
            type="text"
            placeholder="https://..."
            required
          />
          {state.errors?.imageUrl && (
            <p className="text-xs text-red-500 mt-1">
              {state.errors.imageUrl[0]}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <div className="pt-2">
          <Button
            variant="primary"
            className="w-full py-2.5 text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition"
          >
            Criar produto
          </Button>
        </div>

      </div>
    </form>
  );
}