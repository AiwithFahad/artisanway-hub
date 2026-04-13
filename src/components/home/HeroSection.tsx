import { Link } from "@tanstack/react-router";

export function HeroSection() {
  return (
    <section className="bg-etsy-beige">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Main hero card */}
          <div className="relative overflow-hidden rounded-2xl bg-brand-dark p-8 sm:p-10 min-h-[220px] flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-foreground leading-tight max-w-xs">
              100 gifts to make<br />them smile
            </h1>
            <Link
              to="/search"
              search={{ q: "gift", category: "" }}
              className="mt-5 inline-flex w-fit items-center rounded-full bg-background px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-background/90 transition-colors"
            >
              Shop our favourites
            </Link>
          </div>

          {/* Secondary card */}
          <div className="relative overflow-hidden rounded-2xl bg-etsy-cream p-8 sm:p-10 min-h-[220px] flex flex-col justify-center">
            <p className="text-sm font-medium text-muted-foreground mb-1">Everything you need</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              for morning rituals
            </h2>
            <Link
              to="/search"
              search={{ q: "", category: "Home & Living" }}
              className="mt-5 inline-flex w-fit items-center text-sm font-semibold text-foreground underline underline-offset-4 hover:text-brand transition-colors"
            >
              Shop now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
