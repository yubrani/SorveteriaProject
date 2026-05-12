import { getOrders } from "@/app/lib/data";
import { auth } from "@/auth";
import { deleteOrderAction, updateOrderAction } from "@/app/lib/actions/orders_actions";
import Link from "next/link";

export default async function OrdersPage() {
  const session = await auth();
  const userId = Number(session?.user?.id);
  const orders = await getOrders(userId);

  return (
    <div className="max-w-2xl mx-auto p-4">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-red-500">
        🧾 Seus pedidos
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>Você ainda não tem pedidos 😢</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md p-4 border"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg">
                  Pedido #{order.id}
                </span>

                <span className="text-sm px-3 py-1 rounded-full bg-gray-100">
                  {order.status}
                </span>
              </div>

              {/* INFO */}
              <p className="text-gray-600">
                Total: <span className="font-bold">${order.total}</span>
              </p>

              <p className="text-sm text-gray-400">
                {new Date(order.created_at).toLocaleString()}
              </p>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-4">

                {/* VER DETALLE */}
                <Link
                  href={`/orders/${order.id}`}
                  className="text-red-500 font-medium hover:underline"
                >
                  Ver detalles →
                </Link>

                {/* BOTONES */}
                <div className="flex gap-3">

                  <form action={updateOrderAction}>
                    <input type="hidden" name="orderId" value={order.id} />
                    <button className="text-blue-500 text-sm hover:underline">
                      Actualizar
                    </button>
                  </form>

                  <form action={deleteOrderAction}>
                    <input type="hidden" name="orderId" value={order.id} />
                    <button className="text-red-500 text-sm hover:underline">
                      Cancelar
                    </button>
                  </form>

                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}