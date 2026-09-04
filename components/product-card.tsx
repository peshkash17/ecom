import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice, unitPrice } from "@/lib/money";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const from = unitPrice(product.price, product.variants[0]?.priceDelta ?? 0);

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-3/4 overflow-hidden bg-secondary">
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
        />
        {product.featured ? (
          <Badge className="absolute top-3 left-3 rounded-sm">Featured</Badge>
        ) : null}
        {product.compareAt ? (
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 rounded-sm"
          >
            Sale
          </Badge>
        ) : null}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            {product.category?.name}
          </p>
          <h3 className="mt-1 text-sm font-medium">{product.name}</h3>
        </div>
        <p className="text-sm tabular-nums">
          {product.variants.length > 1 ? `From ${formatPrice(from)}` : formatPrice(from)}
        </p>
      </div>
    </Link>
  );
}
