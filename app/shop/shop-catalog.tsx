"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCategories, fetchProducts, queryKeys } from "@/lib/queries";
import type { Category, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ShopCatalog({
  initialProducts,
  initialCategories,
}: {
  initialProducts: Product[];
  initialCategories: Category[];
}) {
  const params = useSearchParams();
  const router = useRouter();
  const category = params.get("category") ?? "all";
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "featured";

  const productsQuery = useQuery({
    queryKey: queryKeys.products,
    queryFn: fetchProducts,
    initialData: initialProducts,
  });
  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories,
    queryFn: fetchCategories,
    initialData: initialCategories,
  });

  const products = productsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];

  let list = products.filter((p) => {
    const matchesCategory = category === "all" || p.category?.slug === category;
    const haystack = `${p.name} ${p.description} ${p.category?.name ?? ""}`.toLowerCase();
    const matchesQuery = !q || haystack.includes(q.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  if (sort === "price-asc") {
    list = [...list].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    list = [...list].sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    router.replace(`/shop?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
        Catalog
      </p>
      <h1 className="mt-2 font-heading text-5xl">Shop</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        School uniforms, sports kits, college apparel, and accessories from the
        Slyde catalogue.
      </p>

      <div className="mt-8 flex flex-col gap-4 border-y py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={category === "all"}
            onClick={() => setParam("category", "all")}
          >
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              active={category === c.slug}
              onClick={() => setParam("category", c.slug)}
            >
              {c.name}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Input
            value={q}
            onChange={(e) => setParam("q", e.target.value)}
            placeholder="Search"
            className="h-9 w-full rounded-full sm:w-48"
          />
          <Select
            value={sort}
            onValueChange={(value) => setParam("sort", String(value))}
          >
            <SelectTrigger className="h-9 min-w-40 rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price, low to high</SelectItem>
              <SelectItem value="price-desc">Price, high to low</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {productsQuery.isLoading
          ? "Loading…"
          : `${list.length} ${list.length === 1 ? "product" : "products"}`}
      </p>

      {productsQuery.isLoading ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse bg-secondary" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          No products match that filter.
        </p>
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-charcoal bg-charcoal text-primary-foreground"
          : "border-border bg-background hover:bg-secondary"
      )}
    >
      {children}
    </button>
  );
}
