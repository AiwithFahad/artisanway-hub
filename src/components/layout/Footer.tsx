import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

const footerLinks = {
  Shop: ["Gift cards", "Craftly Registry", "Sitemap", "Craftly blog", "Craftly United Kingdom", "Craftly Germany", "Craftly Canada"],
  Sell: ["Sell on Craftly", "Teams", "Forums", "Affiliates & Creators"],
  About: ["Craftly, Inc.", "Policies", "Investors", "Careers", "Press", "Impact", "Legal imprint"],
  Help: ["Help Centre", "Privacy settings"],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Renewable energy badge */}
      <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Leaf className="h-4 w-4 text-success" />
        <span>Craftly is powered by 100% renewable electricity.</span>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-5">
            {/* Logo */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
              <Link to="/" className="text-2xl font-extrabold text-brand">Craftly</Link>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                Download the Craftly App
              </p>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="mb-3 text-sm font-bold text-foreground">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Craftly, Inc.</span>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-foreground hover:underline">Terms of Use</a>
            <a href="#" className="hover:text-foreground hover:underline">Privacy</a>
            <a href="#" className="hover:text-foreground hover:underline">Interest-based ads</a>
            <a href="#" className="hover:text-foreground hover:underline">Local Shops</a>
            <a href="#" className="hover:text-foreground hover:underline">Regions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
