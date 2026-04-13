import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Heart, ShoppingBag, Truck, Shield, ChevronLeft, ChevronRight, Minus, Plus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById, getReviewsByProductId } from "@/lib/data";
import { useCartStore, useWishlistStore } from "@/lib/store";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const product = getProductById(params.productId);
    return {
      meta: [
        { title: product ? `${product.title} — Craftly` : "Product Not Found" },
        { name: "description", content: product?.description || "" },
        { property: "og:title", content: product?.title || "Product" },
        { property: "og:description", content: product?.description || "" },
      ],
    };
  },
  component: ProductDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground">Product not found</h1>
        <Link to="/" className="mt-4 inline-block text-brand hover:underline">Back to shop</Link>
      </div>
    </div>
  ),
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const product = getProductById(productId);
  const productReviews = product ? getReviewsByProductId(product.id) : [];
  const addItem = useCartStore((s) => s.addItem);
  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.isWished(productId));

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Product not found</h1>
          <Link to="/" className="mt-4 inline-block text-brand hover:underline">Back to shop</Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/search" search={{ q: "", category: product.category }} className="hover:text-foreground">{product.category}</Link>
        <span>/</span>
        <span className="text-foreground">{product.title.slice(0, 40)}...</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((i) => (i === 0 ? product.images.length - 1 : i - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur-sm hover:bg-background"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSelectedImage((i) => (i === product.images.length - 1 ? 0 : i + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur-sm hover:bg-background"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            {product.bestseller && (
              <span className="absolute left-3 top-3 rounded-md bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground">
                Bestseller
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square w-20 overflow-hidden rounded-xl border-2 transition-all ${
                  i === selectedImage ? "border-brand" : "border-border hover:border-brand/50"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Seller */}
          <div className="flex items-center gap-3">
            <img src={product.seller.avatar} alt={product.seller.name} className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-foreground">{product.seller.name}</p>
              <p className="text-xs text-muted-foreground">{product.seller.sales.toLocaleString()} sales · ⭐ {product.seller.rating}</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground leading-tight sm:text-3xl">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-border"}`} />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="rounded-md bg-success/10 px-2 py-0.5 text-sm font-semibold text-success">{discount}% off</span>
              </>
            )}
          </div>

          {/* Quantity */}
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Quantity</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-10 w-10 items-center justify-center text-foreground hover:bg-accent rounded-l-xl">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-10 w-12 items-center justify-center text-sm font-medium text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="flex h-10 w-10 items-center justify-center text-foreground hover:bg-accent rounded-r-xl">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">{product.stock} available</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="brand" size="xl" className="flex-1" onClick={handleAddToCart}>
              <ShoppingBag className="h-5 w-5" />
              {addedToCart ? "Added to cart! ✓" : "Add to cart"}
            </Button>
            <Button variant="outline" size="xl" onClick={() => wishlistToggle(product.id)}>
              <Heart className={`h-5 w-5 ${isWished ? "fill-brand text-brand" : ""}`} />
            </Button>
          </div>

          {/* Buy Now */}
          <Button
            variant="brand-outline"
            size="lg"
            className="w-full"
            onClick={() => {
              addItem(product, quantity);
              navigate({ to: "/checkout" });
            }}
          >
            Buy it now
          </Button>

          {/* Perks */}
          <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
            {product.freeShipping && (
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-4.5 w-4.5 text-success" />
                <span className="text-foreground"><span className="font-medium text-success">FREE shipping</span> on this item</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4.5 w-4.5 text-brand" />
              <span className="text-foreground">Craftly <span className="font-medium">purchase protection</span></span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Store className="h-4.5 w-4.5 text-muted-foreground" />
              <span className="text-foreground">Handmade by <span className="font-medium">{product.seller.name}</span></span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Reviews ({product.reviewCount.toLocaleString()})</h2>
        {productReviews.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {productReviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-3">
                  <img src={review.userAvatar} alt={review.userName} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{review.userName}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-warning text-warning" : "text-border"}`} />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet for this product.</p>
        )}
      </section>
    </div>
  );
}
