import { getOrderById } from "@/app/lib/data";

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { order, items } = await getOrderById(Number(params.id));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Orden #{order.id}
      </h1>

      <p>Total: ${order.total}</p>
      <p>Estado: {order.status}</p>

      <h2 className="mt-6 font-semibold">Productos</h2>

      <div className="space-y-3 mt-2">
        {items.map((item, i) => (
          <div key={i} className="border p-3 rounded">
            <p>{item.name}</p>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}