import { ShoppingBag } from "lucide-react";

const footerLinks = {
  Shop: ["Gift cards", "Site map", "Help center", "Privacy settings"],
  Sell: ["Sell on Craftly", "Teams", "Forums", "Affiliates & Creators"],
  About: ["Careers", "Press", "Investors", "Policies", "Impact"],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand">
                <ShoppingBag className="h-3.5 w-3.5 text-brand-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Craftly</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your go-to marketplace for unique, handmade, and vintage treasures from creators worldwide.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Craftly, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
