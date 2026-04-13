import { ProductCard } from "./ProductCard";
import { products } from "@/lib/data";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.bestseller).concat(products.filter((p) => !p.bestseller)).slice(0, 8);
  const deals = products.filter((p) => p.originalPrice).slice(0, 5);

  return (
    <>
      {/* Deals section */}
      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">Today's big deals</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Items on sale right now</p>
          </div>
          <Link
            to="/search"
            search={{ q: "", category: "" }}
            className="text-sm font-semibold text-brand hover:underline"
          >
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {deals.map((product) => (
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

      {/* Featured / trending */}
      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">Trending Now</h2>
            <p className="text-sm text-muted-foreground mt-0.5">The most-loved items by our community</p>
          </div>
          <Link
            to="/search"
            search={{ q: "", category: "" }}
            className="text-sm font-semibold text-brand hover:underline"
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
    </>
  );
}
