"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useCartStore } from "@/lib/cart-store";

function CartHydration() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      <CartHydration />
      {children}
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
