import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

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
  const [liked, setLiked] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const imageUrl = product.image || (product.images && product.images[0]) || "";
  const sellerName = typeof product.seller === "string" ? product.seller : product.seller.name;

  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={imageUrl}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${liked ? "fill-brand text-brand" : "text-foreground"}`}
          />
        </button>
        {product.bestseller && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-brand px-2 py-0.5 text-xs font-semibold text-brand-foreground">
            Bestseller
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-xs text-muted-foreground">{sellerName}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-medium text-foreground leading-snug">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-border"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-success">
                {discount}% off
              </span>
            </>
          )}
        </div>

        {product.freeShipping && (
          <p className="mt-1.5 text-xs font-medium text-success">
            FREE shipping
          </p>
        )}
      </div>
    </Link>
  );
}
