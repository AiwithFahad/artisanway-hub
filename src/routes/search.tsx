import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/home/ProductCard";
import { searchProducts, categories } from "@/lib/data";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) || "",
    category: (search.category as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "Search — Craftly" },
      { name: "description", content: "Search millions of unique items on Craftly." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, category: initialCategory } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [query, setQuery] = useState(q);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(
    () =>
      searchProducts(query, {
        category: selectedCategory || undefined,
        minPrice: priceRange[0] || undefined,
        maxPrice: priceRange[1] < 200 ? priceRange[1] : undefined,
        minRating: minRating || undefined,
        sort,
      }),
    [query, selectedCategory, priceRange, minRating, sort]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ search: { q: query, category: selectedCategory } });
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 200]);
    setMinRating(0);
    setSort("popular");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 w-full rounded-xl border border-input bg-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </form>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {results.length} result{results.length !== 1 ? "s" : ""}
          {query && <> for "<span className="font-medium text-foreground">{query}</span>"</>}
        </p>
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Filters sidebar */}
        <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Filters</h3>
              <button onClick={clearFilters} className="text-xs text-brand hover:underline">Clear all</button>
            </div>

            {/* Category */}
            <div className="mb-5">
              <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                    !selectedCategory ? "bg-brand/10 text-brand font-medium" : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                      selectedCategory === cat ? "bg-brand/10 text-brand font-medium" : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-5">
              <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price Range</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground"
                  placeholder="Min"
                />
                <span className="text-muted-foreground">—</span>
                <input
                  type="number"
                  min={0}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Minimum Rating</h4>
              <div className="flex gap-1">
                {[0, 3, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      minRating === r ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {r === 0 ? "Any" : `${r}+⭐`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results grid */}
        <div className="lg:col-span-3">
          {/* Active filters */}
          {(selectedCategory || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 200) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("")}><X className="h-3 w-3" /></button>
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                  {minRating}+ stars
                  <button onClick={() => setMinRating(0)}><X className="h-3 w-3" /></button>
                </span>
              )}
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
              <Search className="mb-4 h-12 w-12 text-muted-foreground/30" />
              <h2 className="text-xl font-bold text-foreground">No results found</h2>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
              <Button variant="brand-outline" size="sm" className="mt-4" onClick={clearFilters}>Clear filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
