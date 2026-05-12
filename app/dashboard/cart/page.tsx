import { getCartItems } from "@/app/lib/data";
import { checkoutAction } from "@/app/lib/actions/checkout_actions";
import { removeFromCartAction } from "@/app/lib/actions/cart";
import { auth } from "@/auth";

export default async function CartPage() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const items = await getCartItems(userId);

  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-2xl mx-auto p-4">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-red-500">
        🛒 Seu carrinho
      </h1>

      {/* EMPTY */}
      {items.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>Seu carrinho está vazio 😢</p>
        </div>
      ) : (
        <>
          {/* ITEMS */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white rounded-2xl shadow-sm p-4 border"
              >
                {/* IMAGE */}
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />

                {/* INFO */}
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {item.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    ${item.price} cada
                  </p>

                  <p className="mt-1 text-sm">
                    Quantidade:{" "}
                    <span className="font-bold">
                      {item.quantity}
                    </span>
                  </p>

                  {/* REMOVE */}
                  <form action={removeFromCartAction}>
                    <input
                      type="hidden"
                      name="itemId"
                      value={item.id}
                    />
                    <button className="text-red-500 text-sm mt-2 hover:underline">
                      Remover
                    </button>
                  </form>
                </div>

                {/* SUBTOTAL */}
                <div className="flex flex-col justify-between items-end">
                  <span className="font-bold text-lg">
                    ${item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL CARD */}
          <div className="mt-6 bg-white border rounded-2xl p-5 shadow-md flex justify-between items-center">
            <span className="text-lg font-medium">
              Total
            </span>
            <span className="text-2xl font-bold text-red-500">
              ${total}
            </span>
          </div>

          {/* CHECKOUT BUTTON */}
          <form action={checkoutAction} className="mt-6">
            <button className="w-full bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-xl text-lg font-semibold shadow">
              Finalizar pedido 🚀
            </button>
          </form>
        </>
      )}
    </div>
  );
}