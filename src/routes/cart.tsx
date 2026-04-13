import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Craftly" },
      { name: "description", content: "View and manage items in your shopping cart." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/30" />
        <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Discover unique items from independent creators.</p>
        <Button variant="brand" size="lg" className="mt-6" asChild>
          <Link to="/">Start shopping</Link>
        </Button>
      </div>
    );
  }

  const shipping = totalPrice >= 35 ? 0 : 5.99;
  const orderTotal = totalPrice + shipping;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 rounded-xl border border-border bg-card p-4">
              <Link to="/products/$productId" params={{ productId: item.product.id }} className="shrink-0">
                <img src={item.product.images[0]} alt={item.product.title} className="h-24 w-24 rounded-lg object-cover sm:h-28 sm:w-28" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{item.product.seller.name}</p>
                    <Link to="/products/$productId" params={{ productId: item.product.id }} className="text-sm font-medium text-foreground hover:text-brand leading-snug">
                      {item.product.title}
                    </Link>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-lg border border-border">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center hover:bg-accent rounded-l-lg">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="flex h-8 w-8 items-center justify-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center hover:bg-accent rounded-r-lg">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-foreground">{shipping === 0 ? <span className="text-success">FREE</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">Free shipping on orders $35+</p>
              )}
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button variant="brand" size="lg" className="mt-6 w-full" onClick={() => navigate({ to: "/checkout" })}>
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="mt-2 w-full text-muted-foreground" asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
