import { Link } from "@tanstack/react-router";
import { Shield, Heart, Leaf } from "lucide-react";

export function PromoSection() {
  return (
    <>
      {/* What is Craftly section - Etsy style */}
      <section className="bg-etsy-cream">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-2">
            What is Craftly?
          </h2>
          <p className="text-sm text-muted-foreground mb-10">
            A community doing good
          </p>
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-etsy-beige">
                <Heart className="h-6 w-6 text-brand" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">A community doing good</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Craftly is a global marketplace where people come together to make, sell, buy, and collect unique items.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-etsy-beige">
                <Shield className="h-6 w-6 text-brand" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">Support independent creators</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                There's no Craftly warehouse – just millions of people selling the things they love.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-etsy-beige">
                <Leaf className="h-6 w-6 text-brand" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">Peace of mind</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your privacy is the highest priority. If something goes wrong with an order, we've got your back.
              </p>
            </div>
          </div>

          {/* Help center link */}
          <div className="mt-10 pt-8 border-t border-border max-w-lg mx-auto">
            <p className="text-sm text-muted-foreground mb-3">Have a question? Well, we've got some answers.</p>
            <Link
              to="/search"
              search={{ q: "", category: "" }}
              className="inline-flex items-center rounded-full border-2 border-foreground px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Go to Help Centre
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-etsy-beige">
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Yes! Send me exclusive offers, unique gift ideas, and personalised tips for shopping and selling on Craftly.
          </p>
          <form className="flex max-w-md mx-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-10 rounded-full border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none"
            />
            <button className="h-10 rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
