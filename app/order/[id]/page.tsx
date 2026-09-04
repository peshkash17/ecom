import type { Metadata } from "next";
import { OrderConfirmation } from "@/app/order/[id]/order-confirmation";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Order confirmation",
};

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  return <OrderConfirmation id={id} />;
}
