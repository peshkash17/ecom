export const FREE_SHIPPING_AT = 2000;
export const SHIPPING_FEE = 99;

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function unitPrice(base: number, delta: number) {
  return base + delta;
}
