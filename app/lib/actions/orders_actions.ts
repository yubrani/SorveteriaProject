"use server";
import { deleteOrder } from "@/app/lib/data";
import { revalidatePath } from "next/cache";

export async function deleteOrderAction(formData: FormData) {
  const orderId = Number(formData.get("orderId"));
    if (!orderId) {
    throw new Error("Order ID inválido");
  }
  await deleteOrder(orderId);
  revalidatePath("/dashboard/orders");
}

export async function updateOrderAction(formData: FormData) {
  const orderId = Number(formData.get("orderId"));
  

  

    
    revalidatePath("/dashboard/orders/[orderId]" );
}