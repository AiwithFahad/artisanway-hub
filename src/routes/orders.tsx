import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrdersStore } from "@/lib/store";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Your Orders — Craftly" },
      { name: "description", content: "View your order history." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const orders = useOrdersStore((s) => s.orders);

  if (orders.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <Package className="mb-4 h-16 w-16 text-muted-foreground/30" />
        <h1 className="text-2xl font-bold text-foreground">No orders yet</h1>
        <p className="mt-2 text-muted-foreground">Start shopping to see your orders here.</p>
        <Button variant="brand" size="lg" className="mt-6" asChild>
          <Link to="/">Browse items</Link>
        </Button>
      </div>
    );
  }

  const statusColors = {
    pending: "bg-warning/10 text-warning",
    shipped: "bg-brand/10 text-brand",
    delivered: "bg-success/10 text-success",
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <p className="text-sm font-mono font-semibold text-foreground">{order.id}</p>
                <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColors[order.status]}`}>
                  {order.status}
                </span>
                <span className="text-lg font-bold text-foreground">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {order.items.map((item) => (
                <Link key={item.product.id} to="/products/$productId" params={{ productId: item.product.id }} className="shrink-0">
                  <img src={item.product.images[0]} alt={item.product.title} className="h-16 w-16 rounded-lg object-cover" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
