import { Suspense } from "react";
import { ShopCatalog } from "@/app/shop/shop-catalog";
import { fetchCategories, fetchProducts } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-20 text-sm text-muted-foreground">
          Loading catalog…
        </div>
      }
    >
      <ShopCatalog
        initialProducts={products}
        initialCategories={categories}
      />
    </Suspense>
  );
}
