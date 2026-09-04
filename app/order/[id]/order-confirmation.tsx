"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/money";
import { fetchOrder, queryKeys } from "@/lib/queries";

export function OrderConfirmation({ id }: { id: string }) {
  const { data: order, isLoading } = useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => fetchOrder(id),
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center text-sm text-muted-foreground">
        Loading order…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-heading text-4xl">Order not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This confirmation is only available in this browser session for the
          demo, unless Supabase is connected.
        </p>
        <Button
          className="mt-8 rounded-full"
          nativeButton={false}
          render={<Link href="/shop" />}
        >
          Back to shop
        </Button>
      </div>
    );
  }

  const shortId = order.id.slice(0, 8).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="size-6" />
      </div>
      <p className="mt-6 text-xs tracking-[0.18em] text-muted-foreground uppercase">
        Order {shortId}
      </p>
      <h1 className="mt-2 font-heading text-5xl">Thank you</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Paid — demo mode. No real charge was made. A confirmation would be
        emailed to {order.email}.
      </p>

      <div className="mt-10 border">
        <div className="border-b px-5 py-4">
          <p className="text-sm font-medium">
            {order.customer.firstName} {order.customer.lastName}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {order.shipping.address}, {order.shipping.city} {order.shipping.zip}
            <br />
            {order.shipping.country}
          </p>
        </div>
        <ul className="divide-y">
          {order.items.map((item) => (
            <li key={item.variantId} className="flex gap-3 px-5 py-4">
              <div className="relative size-14 shrink-0 overflow-hidden bg-secondary">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.variantName} · Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm tabular-nums">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <div className="space-y-1 border-t px-5 py-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="tabular-nums">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="tabular-nums">
              {order.shippingFee === 0
                ? "Complimentary"
                : formatPrice(order.shippingFee)}
            </span>
          </div>
          <div className="flex justify-between pt-2 text-base font-medium">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          className="rounded-full"
          nativeButton={false}
          render={<Link href="/shop" />}
        >
          Continue shopping
        </Button>
        <Button
          variant="outline"
          className="rounded-full"
          nativeButton={false}
          render={<Link href="/" />}
        >
          Home
        </Button>
      </div>
    </div>
  );
}
