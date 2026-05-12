"use server";
import { deleteOrder } from "@/app/lib/data";
import { revalidatePath } from "next/cache";
import { updateOrderStatus } from "@/app/lib/data";
export async function deleteOrderAction(formData: FormData) {
  const orderId = Number(formData.get("orderId"));
    if (!orderId) {
    throw new Error("Order ID inválido");
  }
  await deleteOrder(orderId);
  revalidatePath("/orders");
}

export async function updateOrderAction(formData: FormData) {
  const orderId = Number(formData.get("orderId"));
  

  

    
    revalidatePath("/orders/[orderId]" );
}