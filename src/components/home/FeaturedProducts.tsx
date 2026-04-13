import { ProductCard } from "./ProductCard";
import { products } from "@/lib/data";
import { Link } from "@tanstack/react-router";

export function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl font-display">
            Trending Now
          </h2>
          <p className="mt-1 text-muted-foreground">
            The most-loved items by our community
          </p>
        </div>
        <Link
          to="/search"
          search={{ q: "", category: "" }}
          className="hidden text-sm font-semibold text-brand transition-colors hover:text-brand/80 sm:block"
        >
          See all →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              image: product.images[0],
              seller: product.seller.name,
            }}
          />
        ))}
      </div>
    </section>
  );
}
