import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, User, Menu, LogOut } from "lucide-react";
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
    if (searchQuery.trim()) {
      navigate({ to: "/search", search: { q: searchQuery.trim(), category: "" } });
    }
  };

  const categoryItems = [
    { label: "Jewelry", category: "Jewelry & Accessories" },
    { label: "Clothing", category: "Clothing & Shoes" },
    { label: "Home & Living", category: "Home & Living" },
    { label: "Art", category: "Art & Collectibles" },
    { label: "Gifts", category: "Weddings" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
            <ShoppingBag className="h-4.5 w-4.5 text-brand-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground font-display">
            Craftly
          </span>
        </Link>

        {/* Categories nav - desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {categoryItems.map((cat) => (
            <Link
              key={cat.label}
              to="/search"
              search={{ q: "", category: cat.category }}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative mx-auto hidden max-w-md flex-1 sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-input bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-brand focus:bg-background focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
            <Link to="/search" search={{ q: "", category: "" }}>
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </Button>
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
                <Link to="/orders">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="ml-1 hidden gap-1.5 text-xs sm:flex" onClick={logout}>
                <LogOut className="h-3.5 w-3.5" />
                {user?.name.split(" ")[0]}
              </Button>
            </>
          ) : (
            <Button variant="brand" size="sm" className="ml-2 hidden sm:flex" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-border px-4 py-2 sm:hidden">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </form>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="animate-slide-up border-t border-border bg-background px-4 py-3 lg:hidden">
          {categoryItems.map((cat) => (
            <Link
              key={cat.label}
              to="/search"
              search={{ q: "", category: cat.category }}
              className="block w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <Link
              to="/login"
              className="mt-2 block w-full rounded-md bg-brand px-3 py-2 text-center text-sm font-medium text-brand-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
