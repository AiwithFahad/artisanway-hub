import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrdersStore } from "@/lib/store";

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({
    orderId: (search.orderId as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Craftly" },
      { name: "description", content: "Your order has been placed successfully!" },
    ],
  }),
  component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
  const { orderId } = Route.useSearch();
  const order = useOrdersStore((s) => s.orders.find((o) => o.id === orderId));

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">Order not found</h1>
        <Button variant="brand" size="lg" className="mt-6" asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="animate-fade-up text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-10 w-10 text-success" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Order Confirmed! 🎉</h1>
        <p className="mt-2 text-muted-foreground">Thank you for your purchase. Your order has been placed successfully.</p>
        <p className="mt-1 text-sm font-mono text-brand font-semibold">Order ID: {order.id}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground flex items-center gap-2">
            <Package className="h-4 w-4" /> Items Ordered
          </h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img src={item.product.images[0]} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{item.product.title}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity} · ${item.product.price.toFixed(2)} each</p>
                </div>
                <p className="text-sm font-semibold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-3 text-base font-bold text-foreground">
            <span>Total</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Shipping To</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {order.shippingInfo.name}<br />
            {order.shippingInfo.address}<br />
            {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}<br />
            {order.shippingInfo.email}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Order Status</h3>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">
              Pending
            </span>
            <span className="text-xs text-muted-foreground">Estimated delivery: 5–7 business days</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="brand" size="lg" asChild>
          <Link to="/">
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/orders">View All Orders</Link>
        </Button>
      </div>
    </div>
  );
}
