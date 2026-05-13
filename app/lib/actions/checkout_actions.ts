"use server";

import { sql } from "@/app/lib/db";
import { auth } from "@/auth";
import { getOrCreateCart } from "@/app/lib/data";
import { redirect } from "next/navigation";

export async function checkoutAction() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  const userId = Number(session.user.id);

  // 🔥 usar tu función correcta
  const cart = await getOrCreateCart(userId);
  
  // 🔥 obtener items del carrito
  const cartItems = await sql`
    SELECT ci.product_id, ci.quantity, p.price
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = ${cart.id}
  `;
 
  if (cartItems.length === 0) {
    throw new Error("Carrinho vazio");
  }

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
    
  );

  // 🧾 crear orden
  const orderResult = await sql`
    INSERT INTO orders (user_id, total)
    VALUES (${userId}, ${total})
    RETURNING id
  `;
  
  const orderId = orderResult[0].id;

  // 📦 guardar items
  for (const item of cartItems) {
    await sql`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (${orderId}, ${item.product_id}, ${item.quantity}, ${item.price})
    `;
  }

  await sql`
    DELETE FROM cart_items
    WHERE cart_id = ${cart.id}
  `;

  redirect("/dashboard/orders");
}