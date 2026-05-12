"use server";
import { auth } from "@/auth";
import { addToCart } from "@/app/lib/data";
import { removeFromCart } from "@/app/lib/data";
import { revalidatePath } from "next/cache";
import { updateCartItemQuantity } from "@/app/lib/data";

export async function addToCartAction(formData: FormData) {
  const productId = Number(formData.get("productId"));

  const session = await auth();
  const userId = Number(session?.user?.id);

  if (!productId) {
    throw new Error("Product ID inválido");
  }

  await addToCart(userId, productId);
}

export async function removeFromCartAction(formData: FormData) {
  const itemId = Number(formData.get("itemId"));

  if (!itemId) {
    throw new Error("Item ID inválido");
  }
  await removeFromCart(itemId);
  
  revalidatePath("/cart");

}

export async function updateCartItemQuantityAction(formData: FormData) {
  const itemId = Number(formData.get("itemId"));
  const change = Number(formData.get("change"));
  
  if (!itemId || !change) {
    throw new Error("Dados inválidos");
  }

  await updateCartItemQuantity(itemId, change);
  
  revalidatePath("/cart");
}