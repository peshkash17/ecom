"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FREE_SHIPPING_AT, SHIPPING_FEE } from "@/lib/money";
import type { CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      addItem: (item, quantity = 1) => {
        const existing = get().items.find((i) => i.variantId === item.variantId);
        const next = existing
          ? get().items.map((i) =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + quantity }
                : i
            )
          : [...get().items, { ...item, quantity }];
        set({ items: next, isOpen: true });
      },
      setQuantity: (variantId, quantity) => {
        if (quantity < 1) {
          set({ items: get().items.filter((i) => i.variantId !== variantId) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
        });
      },
      removeItem: (variantId) =>
        set({ items: get().items.filter((i) => i.variantId !== variantId) }),
      clear: () => set({ items: [] }),
    }),
    { name: "slyde-cart", skipHydration: true }
  )
);

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function shippingFor(subtotal: number) {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
}
