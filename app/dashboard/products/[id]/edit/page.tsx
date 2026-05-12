import { notFound } from "next/navigation";
import { getProductById } from "@/app/lib/data";
import EditProductForm from "@/app/ui/products/edit-product-form";
import { getCategories } from "@/app/lib/data";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 
  const categories = await getCategories();
  const numericId = Number(id);

  if (isNaN(numericId)) {
    notFound();
  }

  const product = await getProductById(numericId);

  if (!product) {
    notFound();
  }

     return <EditProductForm 
      product={product} 
      categories={categories} 
    />;
}