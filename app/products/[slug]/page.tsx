import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductView } from "@/app/products/[slug]/product-view";
import { fetchProduct, fetchProducts } from "@/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.description };
}

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-6 text-sm text-muted-foreground sm:px-6">
        <Link href="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>
      <ProductView product={product} />
    </div>
  );
}
