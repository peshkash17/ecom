import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { buttonVariants } from "@/components/ui/button";
import { fetchProducts } from "@/lib/queries";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const products = await fetchProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div>
      <section className="grid overflow-hidden bg-charcoal text-primary-foreground lg:grid-cols-2">
        <div className="relative isolate h-[56vh] w-full overflow-hidden bg-charcoal lg:h-[min(86vh,52rem)]">
          <Image
            src="/products/hero-uniforms.jpg"
            alt="Students wearing Slyde customized college apparel"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="flex min-h-[56vh] flex-col justify-center px-6 py-16 sm:px-10 lg:min-h-[min(86vh,52rem)] lg:px-14">
          <p className="text-xs tracking-[0.22em] uppercase">Slyde Apparel</p>
          <h1 className="mt-4 max-w-xl font-heading text-5xl leading-[0.95] sm:text-6xl">
            School uniforms, made to last.
          </h1>
          <p className="mt-5 max-w-md text-sm text-primary-foreground/85 sm:text-base">
            From fabric sourcing to final delivery — polos, shirts, blazers,
            sports kits, and accessories customized with your school crest.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className={cn(buttonVariants({ size: "lg" }), "rounded-none px-6")}
            >
              Shop the catalogue
            </Link>
            <Link
              href="/shop?category=school-uniforms"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-none border-primary-foreground/40 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              School uniforms
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Collections
            </p>
            <h2 className="mt-2 font-heading text-4xl">Industries we serve</h2>
          </div>
          <Link href="/shop" className="hidden text-sm underline-offset-4 hover:underline sm:block">
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/shop?category=school-uniforms",
              title: "School uniforms",
              copy: "Primary, high school, international, and preschool kits.",
              image: "/products/polo.png",
              fit: "contain",
            },
            {
              href: "/shop?category=sports",
              title: "Sports & PE",
              copy: "House tees, jerseys, and dry-fit kits for match day.",
              image: "/products/sports.png",
              fit: "contain",
            },
            {
              href: "/shop?category=college",
              title: "College apparel",
              copy: "Club tees, event shirts, and campus merch.",
              image: "/products/hero-uniforms.jpg",
              fit: "cover",
            },
          ].map((tile) => (
            <Link key={tile.href} href={tile.href} className="group relative block overflow-hidden">
              <div className="relative aspect-4/5 bg-secondary">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={cn(
                    "transition duration-500 group-hover:scale-[1.03]",
                    tile.fit === "contain"
                      ? "object-contain p-6"
                      : "object-cover object-center"
                  )}
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                  <h3 className="font-heading text-3xl">{tile.title}</h3>
                  <p className="mt-1 text-sm text-primary-foreground/80">{tile.copy}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="font-heading text-4xl">Featured from the catalogue</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              title: "Premium fabrics",
              copy: "Cotton pique, poplin, dry-fit polyester, and suiting — sourced for moisture-wicking, breathability, and a term of daily wear.",
            },
            {
              title: "Complete customization",
              copy: "Embroidery, sublimation, heat transfer, woven labels, and metal buttons. Every crest, house colour, and size run is yours.",
            },
            {
              title: "End-to-end manufacturing",
              copy: "Design, sampling, bulk production, quality checks, packing, and delivery — one partner from fabric to school gate.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-heading text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
