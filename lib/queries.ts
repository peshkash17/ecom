import {
  getLocalCategories,
  getLocalProduct,
  getLocalProducts,
  withCategories,
} from "@/lib/catalog";
import { getSupabase } from "@/lib/supabase/client";
import type { Category, Order, Product, ProductVariant } from "@/lib/types";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category_id: string;
  price: number;
  compare_at: number | null;
  hero_image: string;
  gallery: string[];
  specs: Record<string, string>;
  featured: boolean;
  category: Category | Category[] | null;
  variants: Array<{
    id: string;
    product_id: string;
    sku: string;
    name: string;
    price_delta: number;
    attributes: Record<string, string>;
    stock: number;
  }> | null;
};

function mapVariant(row: NonNullable<ProductRow["variants"]>[number]): ProductVariant {
  return {
    id: row.id,
    productId: row.product_id,
    sku: row.sku,
    name: row.name,
    priceDelta: Number(row.price_delta),
    attributes: row.attributes ?? {},
    stock: row.stock,
  };
}

function mapProduct(row: ProductRow): Product {
  const category = Array.isArray(row.category)
    ? row.category[0]
    : row.category ?? undefined;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    categoryId: row.category_id,
    price: Number(row.price),
    compareAt: row.compare_at === null ? null : Number(row.compare_at),
    heroImage: row.hero_image,
    gallery: row.gallery ?? [],
    specs: row.specs ?? {},
    featured: row.featured,
    category,
    variants: (row.variants ?? []).map(mapVariant),
  };
}

export async function fetchCategories(): Promise<Category[]> {
  const supabase = getSupabase();
  if (!supabase) return getLocalCategories();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort");

  if (error || !data?.length) return getLocalCategories();
  return data as Category[];
}

export async function fetchProducts(): Promise<Product[]> {
  const supabase = getSupabase();
  if (!supabase) return getLocalProducts();

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), variants:product_variants(*)")
    .order("name");

  if (error || !data?.length) return getLocalProducts();
  return withCategories((data as ProductRow[]).map(mapProduct));
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  const supabase = getSupabase();
  if (!supabase) return getLocalProduct(slug);

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), variants:product_variants(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return getLocalProduct(slug);
  return mapProduct(data as ProductRow);
}

export async function fetchOrder(id: string): Promise<Order | null> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      return {
        id: data.id,
        email: data.email,
        customer: data.customer,
        shipping: data.shipping,
        items: data.items,
        subtotal: Number(data.subtotal),
        shippingFee: Number(data.shipping_fee),
        total: Number(data.total),
        paymentStatus: data.payment_status,
        createdAt: data.created_at,
      };
    }
  }

  if (typeof window !== "undefined") {
    const raw = sessionStorage.getItem(`slyde-order:${id}`);
    if (raw) return JSON.parse(raw) as Order;
  }
  return null;
}

export async function createOrder(
  input: Omit<Order, "id" | "createdAt" | "paymentStatus">
): Promise<Order> {
  const order: Order = {
    ...input,
    id: crypto.randomUUID(),
    paymentStatus: "paid",
    createdAt: new Date().toISOString(),
  };

  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        email: order.email,
        customer: order.customer,
        shipping: order.shipping,
        items: order.items,
        subtotal: order.subtotal,
        shipping_fee: order.shippingFee,
        total: order.total,
        payment_status: "paid",
      })
      .select("id, created_at")
      .single();

    if (!error && data) {
      order.id = data.id;
      order.createdAt = data.created_at;
    }
  }

  if (typeof window !== "undefined") {
    sessionStorage.setItem(`slyde-order:${order.id}`, JSON.stringify(order));
  }

  return order;
}

export const queryKeys = {
  categories: ["categories"] as const,
  products: ["products"] as const,
  product: (slug: string) => ["product", slug] as const,
  order: (id: string) => ["order", id] as const,
};
