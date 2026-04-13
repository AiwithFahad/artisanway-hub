import { Button } from "@/components/ui/button";
import { Store, Shield, Truck } from "lucide-react";

export function PromoSection() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl font-display">
            Why shop on Craftly?
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Store,
              title: "Support independent creators",
              desc: "Every purchase directly supports an independent artisan or small business.",
            },
            {
              icon: Shield,
              title: "Purchase protection",
              desc: "Shop with confidence knowing every order is covered by our buyer guarantee.",
            },
            {
              icon: Truck,
              title: "Free shipping on many items",
              desc: "Millions of items ship free worldwide. Look for the free shipping badge.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm border border-border"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light/50">
                <item.icon className="h-6 w-6 text-brand" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand to-brand/80 p-8 text-center sm:p-12">
          <h3 className="text-2xl font-bold text-brand-foreground sm:text-3xl font-display">
            Start selling today
          </h3>
          <p className="mx-auto mt-3 max-w-md text-brand-foreground/80">
            Join millions of sellers and turn your passion into a thriving business. It only takes a few minutes.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="mt-6 border-brand-foreground/30 bg-brand-foreground text-brand hover:bg-brand-foreground/90"
          >
            Open your shop
          </Button>
        </div>
      </div>
    </section>
  );
}
