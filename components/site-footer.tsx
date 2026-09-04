import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-charcoal text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-3xl">Slyde</p>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/70">
            End-to-end customized apparel — school uniforms, college wear,
            sports kits, and accessories.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link href="/shop" className="hover:text-primary-foreground">
                All products
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=school-uniforms"
                className="hover:text-primary-foreground"
              >
                School uniforms
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=sports"
                className="hover:text-primary-foreground"
              >
                Sports & PE
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=accessories"
                className="hover:text-primary-foreground"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase">POC note</p>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Client demo storefront. Checkout is simulated — no real payment is
            captured.
          </p>
        </div>
      </div>
    </footer>
  );
}
