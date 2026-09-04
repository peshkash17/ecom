"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { QuantityStepper } from "@/components/quantity-stepper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, FREE_SHIPPING_AT, unitPrice } from "@/lib/money";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function ProductView({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(product.heroImage);

  const variant = useMemo(
    () => product.variants.find((v) => v.id === variantId) ?? product.variants[0],
    [product.variants, variantId]
  );
  const price = unitPrice(product.price, variant?.priceDelta ?? 0);

  function addToBag() {
    if (!variant) return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        variantId: variant.id,
        variantName: variant.name,
        price,
        image: product.heroImage,
      },
      qty
    );
    toast.success("Added to bag", { description: `${product.name} · ${variant.name}` });
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative aspect-3/4 overflow-hidden bg-secondary">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        {product.gallery.length > 1 ? (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.gallery.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(src)}
                className={cn(
                  "relative aspect-square overflow-hidden border",
                  activeImage === src ? "border-charcoal" : "border-transparent"
                )}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="120px" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
          {product.category?.name}
        </p>
        <h1 className="mt-2 font-heading text-4xl sm:text-5xl">{product.name}</h1>
        <div className="mt-4 flex items-baseline gap-3">
          <p className="text-xl tabular-nums">{formatPrice(price)}</p>
          {product.compareAt ? (
            <p className="text-sm text-muted-foreground line-through tabular-nums">
              {formatPrice(product.compareAt)}
            </p>
          ) : null}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {product.variants.length > 0 ? (
          <div className="mt-8">
            <p className="text-sm font-medium">Option</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm",
                    v.id === variant?.id
                      ? "border-charcoal bg-charcoal text-primary-foreground"
                      : "border-border hover:bg-secondary"
                  )}
                >
                  {v.name}
                  {v.priceDelta ? ` · +${formatPrice(v.priceDelta)}` : ""}
                </button>
              ))}
            </div>
            {variant?.attributes.size ? (
              <p className="mt-2 text-xs text-muted-foreground">
                {variant.attributes.size}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <QuantityStepper value={qty} onChange={setQty} />
          <Button size="lg" className="min-w-48 rounded-full px-8" onClick={addToBag}>
            Add to bag
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {variant?.stock ?? 0} in stock · complimentary shipping over{" "}
          {formatPrice(FREE_SHIPPING_AT)}
        </p>

        <Accordion className="mt-10 border-t">
          <AccordionItem value="specs">
            <AccordionTrigger>Specifications</AccordionTrigger>
            <AccordionContent>
              <dl className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping</AccordionTrigger>
            <AccordionContent>
              <p>
                Complimentary shipping on orders over{" "}
                {formatPrice(FREE_SHIPPING_AT)}. Typical lead time 2–3 weeks for
                custom school kits after sample approval.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
