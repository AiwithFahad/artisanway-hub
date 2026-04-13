import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useWishlistStore } from "@/lib/store";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image?: string;
    images?: string[];
    rating: number;
    reviewCount: number;
    seller: string | { name: string };
    freeShipping?: boolean;
    bestseller?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const toggle = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.isWished(product.id));

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const imageUrl = product.image || (product.images && product.images[0]) || "";
  const sellerName = typeof product.seller === "string" ? product.seller : product.seller.name;

  return (
    <div className="group relative flex flex-col">
      {/* Image */}
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary"
      >
        <img
          src={imageUrl}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.bestseller && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-dark px-2.5 py-0.5 text-[10px] font-semibold text-brand-foreground uppercase tracking-wide">
            Bestseller
          </span>
        )}
        {discount > 0 && (
          <span className="absolute left-2 bottom-2 rounded-full bg-success px-2 py-0.5 text-[10px] font-bold text-success-foreground">
            {discount}% off
          </span>
        )}
      </Link>

      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); toggle(product.id); }}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background hover:scale-110 z-10"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${isWished ? "fill-brand text-brand" : "text-foreground"}`}
        />
      </button>

      {/* Info */}
      <div className="mt-2 flex flex-col gap-0.5">
        <Link to="/products/$productId" params={{ productId: product.id }}>
          <h3 className="line-clamp-2 text-sm font-medium text-foreground leading-snug hover:underline">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">{sellerName}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-foreground text-foreground" : "text-border"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-base font-bold text-foreground">
            USD {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              USD {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {product.freeShipping && (
          <p className="text-[11px] font-medium text-success">
            FREE shipping
          </p>
        )}
      </div>
    </div>
  );
}
