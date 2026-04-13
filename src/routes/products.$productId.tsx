import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Heart, Truck, Shield, ChevronLeft, ChevronRight, Minus, Plus, Store, Flag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById, getReviewsByProductId, products } from "@/lib/data";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { ProductCard } from "@/components/home/ProductCard";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const product = getProductById(params.productId);
    return {
      meta: [
        { title: product ? `${product.title} — Craftly` : "Product Not Found" },
        { name: "description", content: product?.description || "" },
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
  const [showDetails, setShowDetails] = useState(true);
  const [showDelivery, setShowDelivery] = useState(true);

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

  // Related products from same seller or category
  const moreFromShop = products.filter((p) => p.seller.id === product.seller.id && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground hover:underline">Homepage</Link>
        <span>›</span>
        <Link to="/search" search={{ q: "", category: product.category }} className="hover:text-foreground hover:underline">{product.category}</Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Thumbnail column */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-2">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`aspect-square w-full overflow-hidden rounded-lg border-2 transition-all ${
                i === selectedImage ? "border-foreground" : "border-border hover:border-muted-foreground"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="lg:col-span-5">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((i) => (i === 0 ? product.images.length - 1 : i - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow hover:bg-background transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSelectedImage((i) => (i === product.images.length - 1 ? 0 : i + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow hover:bg-background transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            {/* Wishlist button */}
            <button
              onClick={() => wishlistToggle(product.id)}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow hover:bg-background transition-colors"
            >
              <Heart className={`h-5 w-5 ${isWished ? "fill-brand text-brand" : "text-foreground"}`} />
            </button>
          </div>
          {/* Mobile thumbnails */}
          <div className="flex gap-2 mt-3 lg:hidden overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  i === selectedImage ? "border-foreground" : "border-border"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          {/* Report link */}
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Flag className="h-3 w-3" />
            <span>Report this item to Craftly</span>
          </div>

          {/* Reviews Section */}
          <section className="mt-8 border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">
                All reviews ({product.reviewCount.toLocaleString()})
              </h3>
            </div>
            {productReviews.length > 0 ? (
              <div className="space-y-4">
                {productReviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-4 last:border-0">
                    <div className="mb-2 flex items-center gap-3">
                      <img src={review.userAvatar} alt={review.userName} className="h-8 w-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{review.userName}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-foreground text-foreground" : "text-border"}`} />
                          ))}
                          <span className="ml-2 text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review this item.</p>
            )}
          </section>

          {/* Seller info */}
          <section className="mt-8 border-t border-border pt-6">
            <div className="flex items-center gap-4">
              <img src={product.seller.avatar} alt={product.seller.name} className="h-14 w-14 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-bold text-foreground">{product.seller.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-foreground text-foreground" />
                    {product.seller.rating}
                  </span>
                  <span>·</span>
                  <span>{product.seller.sales.toLocaleString()} sales</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full border border-foreground px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-accent transition-colors">
                  Follow shop
                </button>
                <button className="rounded-full border border-foreground px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-accent transition-colors">
                  Message seller
                </button>
              </div>
            </div>
          </section>

          {/* More from this shop */}
          {moreFromShop.length > 0 && (
            <section className="mt-8 border-t border-border pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-foreground">More from this shop</h3>
                <span className="text-xs font-semibold text-brand hover:underline cursor-pointer">Visit shop</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {moreFromShop.map((p) => (
                  <ProductCard key={p.id} product={{ ...p, image: p.images[0], seller: p.seller.name }} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Product Info - Right column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Price */}
          <div>
            <span className="text-2xl font-bold text-foreground">USD {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">USD {product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-base font-medium text-foreground leading-snug">{product.title}</h1>

          {/* Seller link */}
          <div className="flex items-center gap-1 text-sm">
            <span className="text-foreground font-medium">{product.seller.name}</span>
            <div className="flex items-center ml-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.seller.rating) ? "fill-foreground text-foreground" : "text-border"}`} />
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <Button
            className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 text-base font-semibold"
            onClick={handleAddToCart}
          >
            {addedToCart ? "Added to basket ✓" : "Add to basket"}
          </Button>

          {/* Item details accordion */}
          <div className="border-t border-border pt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex w-full items-center justify-between py-2 text-sm font-bold text-foreground"
            >
              <span>Item details</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
            </button>
            {showDetails && (
              <div className="py-3 space-y-3 text-sm text-muted-foreground animate-fade-in">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-foreground">Highlights</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  <li className="flex items-center gap-2">
                    <Store className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    Handmade
                  </li>
                  {product.freeShipping && (
                    <li className="flex items-center gap-2">
                      <Truck className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      Free shipping
                    </li>
                  )}
                </ul>
                <p className="leading-relaxed">{product.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Delivery accordion */}
          <div className="border-t border-border pt-4">
            <button
              onClick={() => setShowDelivery(!showDelivery)}
              className="flex w-full items-center justify-between py-2 text-sm font-bold text-foreground"
            >
              <span>Delivery</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showDelivery ? "rotate-180" : ""}`} />
            </button>
            {showDelivery && (
              <div className="py-3 space-y-2 text-sm text-muted-foreground animate-fade-in">
                {product.freeShipping ? (
                  <p className="text-success font-medium">FREE shipping on this item</p>
                ) : (
                  <p>Shipping costs calculated at checkout</p>
                )}
                <p>Estimated delivery: 5-7 business days</p>
              </div>
            )}
          </div>

          {/* Did you know / Purchase protection */}
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-bold text-foreground mb-2">Did you know?</h4>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Craftly Purchase Protection</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Shop confidently on Craftly knowing if something goes wrong with an order, we've got your back for all eligible purchases.
                  </p>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full rounded-full border border-border py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
              View additional shop policies
            </button>
          </div>

          {/* Quantity & Buy now */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-foreground">Qty:</label>
              <div className="flex items-center rounded-full border border-border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-9 w-9 items-center justify-center hover:bg-accent rounded-l-full">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="flex h-9 w-10 items-center justify-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="flex h-9 w-9 items-center justify-center hover:bg-accent rounded-r-full">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="text-xs text-muted-foreground">{product.stock} available</span>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 rounded-full border-2 border-foreground text-foreground hover:bg-accent text-base font-semibold"
              onClick={() => {
                addItem(product, quantity);
                navigate({ to: "/checkout" });
              }}
            >
              Buy it now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
