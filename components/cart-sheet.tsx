"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { QuantityStepper } from "@/components/quantity-stepper";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  cartCount,
  cartSubtotal,
  shippingFor,
  useCartStore,
} from "@/lib/cart-store";
import { formatPrice, FREE_SHIPPING_AT } from "@/lib/money";

export function CartSheet() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const count = cartCount(items);
  const subtotal = cartSubtotal(items);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (!open ? closeCart() : undefined)}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl">Bag ({count})</SheetTitle>
          <SheetDescription>
            {count === 0
              ? "Your bag is empty."
              : "Review items, then continue to checkout."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {count === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <ShoppingBag className="size-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Nothing here yet. Start with a polo, blazer, or sports kit.
              </p>
              <Button
                nativeButton={false}
                render={<Link href="/shop" />}
                onClick={closeCart}
              >
                Shop the collection
              </Button>
            </div>
          ) : (
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-3 py-4">
                  <div className="relative size-20 shrink-0 overflow-hidden bg-secondary">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {item.variantName}
                        </p>
                      </div>
                      <p className="text-sm tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(qty) => setQuantity(item.variantId, qty)}
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeItem(item.variantId)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {count > 0 ? (
          <SheetFooter className="border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="tabular-nums">
                {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
            <Button
              size="lg"
              className="mt-2 w-full rounded-full"
              nativeButton={false}
              render={<Link href="/checkout" />}
              onClick={closeCart}
            >
              Checkout
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Complimentary shipping on orders over {formatPrice(FREE_SHIPPING_AT)}.
            </p>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
