"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  cartSubtotal,
  shippingFor,
  useCartStore,
} from "@/lib/cart-store";
import { formatPrice } from "@/lib/money";
import { createOrder } from "@/lib/queries";

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function formatCard(value: string) {
  return digits(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  const d = digits(value).slice(0, 4);
  if (d.length < 3) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const subtotal = cartSubtotal(items);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zip: "",
      country: "India",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
    onSubmit: async ({ value }) => {
      setFormError(null);
      setProcessing(true);
      await new Promise((r) => setTimeout(r, 1200));
      try {
        const order = await createOrder({
          email: value.email,
          customer: {
            firstName: value.firstName,
            lastName: value.lastName,
          },
          shipping: {
            address: value.address,
            city: value.city,
            zip: value.zip,
            country: value.country,
          },
          items,
          subtotal,
          shippingFee: shipping,
          total,
        });
        clear();
        router.push(`/order/${order.id}`);
      } catch {
        setFormError("Could not place the order. Try again.");
        setProcessing(false);
      }
    },
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-heading text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add a product before checking out.
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

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h1 className="font-heading text-4xl">Checkout</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Simulated payment — any 16-digit card number works.
        </p>

        <form
          className="mt-8 space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-[0.14em] uppercase">
              Contact
            </h2>
            <form.Field
              name="email"
              validators={{
                onSubmit: ({ value }) =>
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? "Enter a valid email"
                    : undefined,
              }}
            >
              {(field) => (
                <Field
                  label="Email"
                  error={field.state.meta.errors[0]}
                >
                  <Input
                    type="email"
                    autoComplete="email"
                    className="h-10"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-[0.14em] uppercase">
              Shipping
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field
                name="firstName"
                validators={{
                  onSubmit: ({ value }) =>
                    value.trim() ? undefined : "Required",
                }}
              >
                {(field) => (
                  <Field label="First name" error={field.state.meta.errors[0]}>
                    <Input
                      className="h-10"
                      autoComplete="given-name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field
                name="lastName"
                validators={{
                  onSubmit: ({ value }) =>
                    value.trim() ? undefined : "Required",
                }}
              >
                {(field) => (
                  <Field label="Last name" error={field.state.meta.errors[0]}>
                    <Input
                      className="h-10"
                      autoComplete="family-name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              </form.Field>
            </div>
            <form.Field
              name="address"
              validators={{
                onSubmit: ({ value }) =>
                  value.trim() ? undefined : "Required",
              }}
            >
              {(field) => (
                <Field label="Address" error={field.state.meta.errors[0]}>
                  <Input
                    className="h-10"
                    autoComplete="street-address"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <form.Field
                name="city"
                validators={{
                  onSubmit: ({ value }) =>
                    value.trim() ? undefined : "Required",
                }}
              >
                {(field) => (
                  <Field label="City" error={field.state.meta.errors[0]}>
                    <Input
                      className="h-10"
                      autoComplete="address-level2"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field
                name="zip"
                validators={{
                  onSubmit: ({ value }) =>
                    value.trim() ? undefined : "Required",
                }}
              >
                {(field) => (
                  <Field label="PIN" error={field.state.meta.errors[0]}>
                    <Input
                      className="h-10"
                      autoComplete="postal-code"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field name="country">
                {(field) => (
                  <Field label="Country">
                    <Input
                      className="h-10"
                      autoComplete="country-name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              </form.Field>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-[0.14em] uppercase">
              Payment
            </h2>
            <form.Field
              name="cardNumber"
              validators={{
                onSubmit: ({ value }) =>
                  digits(value).length === 16
                    ? undefined
                    : "Enter a 16-digit card number",
              }}
            >
              {(field) => (
                <Field label="Card number" error={field.state.meta.errors[0]}>
                  <Input
                    className="h-10"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="4242 4242 4242 4242"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(formatCard(e.target.value))
                    }
                  />
                </Field>
              )}
            </form.Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field
                name="expiry"
                validators={{
                  onSubmit: ({ value }) =>
                    /^\d{2}\/\d{2}$/.test(value)
                      ? undefined
                      : "Use MM/YY",
                }}
              >
                {(field) => (
                  <Field label="Expiry" error={field.state.meta.errors[0]}>
                    <Input
                      className="h-10"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(formatExpiry(e.target.value))
                      }
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field
                name="cvc"
                validators={{
                  onSubmit: ({ value }) =>
                    digits(value).length >= 3
                      ? undefined
                      : "Enter a 3-digit CVC",
                }}
              >
                {(field) => (
                  <Field label="CVC" error={field.state.meta.errors[0]}>
                    <Input
                      className="h-10"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(digits(e.target.value).slice(0, 4))
                      }
                    />
                  </Field>
                )}
              </form.Field>
            </div>
          </section>

          {formError ? (
            <p className="text-sm text-destructive">{formError}</p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full"
            disabled={processing}
          >
            {processing
              ? "Processing payment…"
              : `Pay ${formatPrice(total)}`}
          </Button>
        </form>
      </div>

      <aside className="h-fit border bg-card p-6 lg:sticky lg:top-24">
        <h2 className="text-sm font-medium tracking-[0.14em] uppercase">
          Order summary
        </h2>
        <ul className="mt-5 divide-y">
          {items.map((item) => (
            <li key={item.variantId} className="flex gap-3 py-4">
              <div className="relative size-16 shrink-0 overflow-hidden bg-secondary">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
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
        <div className="space-y-2 border-t pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="tabular-nums">
              {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
            </span>
          </div>
          <div className="flex justify-between pt-2 text-base font-medium">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: unknown;
  children: ReactNode;
}) {
  const message =
    typeof error === "string"
      ? error
      : error && typeof error === "object" && "message" in error
        ? String((error as { message: unknown }).message)
        : error
          ? String(error)
          : null;

  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {message ? <p className="text-xs text-destructive">{message}</p> : null}
    </div>
  );
}
