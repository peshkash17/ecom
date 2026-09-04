export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  sort: number;
};

export type ProductVariant = {
  id: string;
  productId: string;
  sku: string;
  name: string;
  priceDelta: number;
  attributes: Record<string, string>;
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  compareAt: number | null;
  heroImage: string;
  gallery: string[];
  specs: Record<string, string>;
  featured: boolean;
  category?: Category;
  variants: ProductVariant[];
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  variantId: string;
  variantName: string;
  price: number;
  image: string;
  quantity: number;
};

export type OrderItem = CartItem;

export type OrderCustomer = {
  firstName: string;
  lastName: string;
};

export type OrderShipping = {
  address: string;
  city: string;
  zip: string;
  country: string;
};

export type Order = {
  id: string;
  email: string;
  customer: OrderCustomer;
  shipping: OrderShipping;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentStatus: "paid" | "pending";
  createdAt: string;
};
