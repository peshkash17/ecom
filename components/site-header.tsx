"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartCount, useCartStore } from "@/lib/cart-store";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=school-uniforms", label: "Uniforms" },
  { href: "/shop?category=sports", label: "Sports" },
  { href: "/shop?category=college", label: "College" },
  { href: "/shop?category=accessories", label: "Accessories" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const count = cartCount(items);
  const [q, setQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
    setSearchOpen(false);
  }

  if (pathname.startsWith("/checkout") || pathname.startsWith("/order")) {
    return (
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-heading text-2xl tracking-tight">
            Slyde
          </Link>
          <Link href="/shop" className="text-sm underline-offset-4 hover:underline">
            Continue shopping
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md">
      <div className="bg-charcoal text-primary-foreground">
        <p className="px-4 py-2 text-center text-[11px] tracking-[0.18em] uppercase">
          Customized apparel · fabric to delivery
        </p>
      </div>
      <div className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
          <Link href="/" className="font-heading text-2xl tracking-tight">
            Slyde
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            {searchOpen ? (
              <form onSubmit={onSearch} className="hidden sm:block">
                <Input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search uniforms"
                  className="h-9 w-52 rounded-full"
                />
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                onClick={() => {
                  setSearchOpen(true);
                  router.push("/shop");
                }}
              >
                <Search />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open bag"
              className="relative"
              onClick={openCart}
            >
              <ShoppingBag />
              {count > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {count}
                </span>
              ) : null}
            </Button>
          </div>
        </div>
      </div>
      <CartSheet />
    </header>
  );
}
