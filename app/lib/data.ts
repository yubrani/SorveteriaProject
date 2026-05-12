import postgres from 'postgres';
import { Product } from './definitions';
import { Category } from './definitions';
import { cookies } from 'next/headers';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

/* =========================
   TYPES
========================= */
type DbProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
};

/* =========================
   MAPPER
========================= */
function mapProduct(row: DbProduct): Product {
  return {
    id: Number(row.id),
    name: row.name,
    description: row.description,
    price: Number(row.price),

    image_url: row.image_url,
    categoryId: row.category_id,
  };
}
/* =========================
   GET ALL PRODUCTS
========================= */
/* =========================
   GET ALL PRODUCTS
========================= */
export async function getProducts(
  categoryId?: number,
  query?: string
): Promise<Product[]> {

  let data: DbProduct[];

  // 🔥 PRIORIDAD A LA BÚSQUEDA
  if (query) {
    data = await sql<DbProduct[]>`
      SELECT id, name, description, price, image_url, category_id
      FROM products
      WHERE name ILIKE ${'%' + query + '%'}
    `;

    return data.map(mapProduct);
  }

  // 🔥 LUEGO CATEGORÍA
  if (categoryId) {
    data = await sql<DbProduct[]>`
      SELECT id, name, description, price, image_url, category_id
      FROM products
      WHERE category_id = ${categoryId}
    `;

    return data.map(mapProduct);
  }

  // 🔥 TODOS
  data = await sql<DbProduct[]>`
    SELECT id, name, description, price, image_url, category_id
    FROM products
  `;

  return data.map(mapProduct);
}
/* =========================
   GET PRODUCT BY ID
========================= */
export async function getProductById(id: number): Promise<Product | null> {
  try { 
    const data = await sql<DbProduct[]>`
      SELECT id, name, description, price, image_url, category_id
      FROM products 
      WHERE id = ${id}
      LIMIT 1
    `;

    if (data.length === 0) return null;

    return mapProduct(data[0]);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product.");
  }
}


/* =========================
   SEARCH PRODUCTS
========================= */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const data = await sql<DbProduct[]>`
      SELECT id, name, description, price, image_url, category_id
      FROM products
      WHERE name ILIKE ${'%' + query + '%'}
    `;

    return data.map(mapProduct);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to search products.");
  }
}


/* 🔥 Obtener o crear carrito */
export async function getOrCreateCart(userId: number) {
  const cart = await sql`
    SELECT id FROM carts WHERE user_id = ${userId} LIMIT 1
  `;

  if (cart.length > 0) {
    return cart[0];
  }

  const newCart = await sql`
    INSERT INTO carts (user_id)
    VALUES (${userId})
    RETURNING id
  `;

  return newCart[0];
}

/* 🔥 Agregar producto al carrito */
export async function addToCart(userId: number, productId: number) {
  const cart = await getOrCreateCart(userId);
  const cartId = cart.id;

  const existingItem = await sql`
    SELECT id FROM cart_items
    WHERE cart_id = ${cartId} AND product_id = ${productId}
    LIMIT 1
  `;

  if (existingItem.length > 0) {
    await sql`
      UPDATE cart_items
      SET quantity = quantity + 1
      WHERE id = ${existingItem[0].id}
    `;
  } else {
    await sql`
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES (${cartId}, ${productId}, 1)
    `;
  }
}

/* 🔥 Obtener items del carrito */
export async function getCartItems(userId: number) {
  const cart = await getOrCreateCart(userId);

  const items = await sql`
    SELECT 
      cart_items.id,
      cart_items.quantity,
      products.id as product_id,
      products.name,
      products.price,
      products.image_url
    FROM cart_items
    JOIN products ON cart_items.product_id = products.id
    WHERE cart_items.cart_id = ${cart.id}
  `;

  return items;
}

/* 🔥 Eliminar item */
export async function removeFromCart(cartItemId: number) {
  await sql`
    DELETE FROM cart_items
    WHERE id = ${cartItemId}
  `;
}

/* 🔥 Actualizar cantidad */
export async function updateCartItemQuantity(itemId: number, change: number) {
  const item = await sql`
    SELECT quantity FROM cart_items
    WHERE id = ${itemId}
  `;

  if (item.length === 0) return;

  const newQuantity = item[0].quantity + change;

  if (newQuantity <= 0) {
    await sql`
      DELETE FROM cart_items
      WHERE id = ${itemId}
    `;
  } else {
    await sql`
      UPDATE cart_items
      SET quantity = ${newQuantity}
      WHERE id = ${itemId}
    `;
  }
}
/* ORDERS */
export async function getOrders(userId: number) {
  const orders = await sql`
    SELECT id, total, status, created_at
    FROM orders
    WHERE user_id = ${userId}
  `;
  return orders;
}
export async function getOrderById(orderId: number, userId: number) {
  const orderResult = await sql`
    SELECT * FROM orders 
    WHERE id = ${orderId} AND user_id = ${userId}
  `;

  if (orderResult.length === 0) return null;

  const itemsResult = await sql`
    SELECT 
      oi.quantity,
      oi.price,
      p.name,
      p.image_url
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ${orderId}
  `;

  return {
    order: orderResult[0],
    items: itemsResult,
  };
}

export async function updateOrderStatus(orderId: number, status: string) {
  await sql`
    UPDATE orders
    SET status = ${status}
    WHERE id = ${orderId}
  `;
}

export async function deleteOrder(orderId: number) {
  await sql`
    DELETE FROM orders
    WHERE id = ${orderId}
  `;
}
export async function getCategories(): Promise<Category[]> {
  const categories = await sql<Category[]>`
    SELECT id, name, image_url FROM categories
    ORDER BY name ASC;
  `;

  return categories ?? [];
}
export async function getCategoryById(id: number): Promise<Category | null> {
  const category = await sql<Category[]>`
    SELECT id, name, image_url FROM categories
    WHERE id = ${id}
    LIMIT 1;
  `;
  return category[0] || null;
}


export async function getCurrentUser() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;

  if (!userId) return null;

  try {
    const user = await sql`
      SELECT id, name, email, role
      FROM users
      WHERE id = ${userId}
    `;

    return user[0];

  } catch (error) {
    console.error("Error fetching current user:", error);

    return null;
  }
}