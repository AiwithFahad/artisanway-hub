import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, Heart, User, Menu, LogOut, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCartStore, useAuthStore } from "@/lib/store";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const totalItems = useCartStore((s) => s.totalItems());
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q: searchQuery.trim(), category: "" } });
  };

  const navItems = [
    { label: "Holiday Gifts", category: "" },
    { label: "Home Favourites", category: "Home & Living" },
    { label: "Fashion Finds", category: "Clothing & Shoes" },
    { label: "Jewelry", category: "Jewelry & Accessories" },
    { label: "Vintage", category: "Vintage" },
    { label: "Registry", category: "Weddings" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      {/* Top Bar */}
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-3 sm:px-5 lg:px-6">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden flex items-center justify-center h-9 w-9 rounded-full hover:bg-accent"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center">
          <span className="text-[26px] font-extrabold tracking-tight text-brand font-display">
            Craftly
          </span>
        </Link>

        {/* Categories button - desktop */}
        <div className="hidden lg:flex">
          <Link
            to="/search"
            search={{ q: "", category: "" }}
            className="flex items-center gap-1 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Categories
            <ChevronDown className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative flex-1 hidden sm:block">
          <input
            type="text"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-[42px] w-full rounded-full border-2 border-foreground/80 bg-background pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-brand-foreground hover:opacity-90 transition-opacity"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {isAuthenticated ? (
            <Link
              to="/orders"
              className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-foreground hover:bg-accent transition-colors"
            >
              <User className="h-4 w-4" />
              <span className="hidden md:inline text-sm">{user?.name.split(" ")[0]}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-foreground hover:bg-accent transition-colors"
            >
              Sign in
            </Link>
          )}

          <Link
            to="/search"
            search={{ q: "", category: "" }}
            className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent transition-colors"
          >
            <Heart className="h-5 w-5 text-foreground" />
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated && (
            <button
              onClick={logout}
              className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4 text-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-border px-3 py-2 sm:hidden">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-full border-2 border-foreground/80 bg-background pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-brand-foreground"
          >
            <Search className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

      {/* Nav links - desktop */}
      <nav className="hidden lg:block border-t border-border">
        <div className="mx-auto max-w-[1400px] flex items-center justify-center gap-1 px-6 py-1.5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to="/search"
              search={{ q: "", category: item.category }}
              className="rounded-full px-4 py-1.5 text-[13px] font-medium text-foreground hover:bg-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="animate-slide-up border-t border-border bg-background px-4 py-3 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to="/search"
              search={{ q: "", category: item.category }}
              className="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-border pt-2">
            {isAuthenticated ? (
              <>
                <Link to="/orders" className="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                  My Orders
                </Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground hover:bg-accent">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="block w-full rounded-lg bg-brand px-3 py-2.5 text-center text-sm font-medium text-brand-foreground" onClick={() => setMobileMenuOpen(false)}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
