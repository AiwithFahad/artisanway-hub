import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-light/30 via-background to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--color-brand-light)_0%,transparent_50%)] opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light/40 px-4 py-1.5 text-sm font-medium text-brand">
            <Sparkles className="h-3.5 w-3.5" />
            Discover unique finds from independent creators
          </div>
          <h1 className="animate-fade-up text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-display text-balance" style={{ animationDelay: "0.1s" }}>
            Find things you'll{" "}
            <span className="text-brand">love.</span>
            {" "}Support makers who{" "}
            <span className="text-brand">care.</span>
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Shop millions of handmade, vintage, and one-of-a-kind items from talented artisans and sellers around the world.
          </p>
          <div className="animate-fade-up mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center" style={{ animationDelay: "0.3s" }}>
            <Button variant="brand" size="xl">
              Start Shopping
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="brand-outline" size="lg">
              Become a Seller
            </Button>
          </div>
          <div className="animate-fade-up mt-10 flex items-center justify-center gap-8 text-sm text-muted-foreground" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">2M+</p>
              <p>Active sellers</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">60M+</p>
              <p>Items listed</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">45M+</p>
              <p>Happy buyers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
