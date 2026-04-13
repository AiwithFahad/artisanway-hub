const categories = [
  { name: "Jewelry & Accessories", emoji: "💍", color: "from-pink-100 to-rose-50", count: "2.3M items" },
  { name: "Clothing & Shoes", emoji: "👗", color: "from-violet-100 to-purple-50", count: "1.8M items" },
  { name: "Home & Living", emoji: "🏡", color: "from-amber-100 to-orange-50", count: "3.1M items" },
  { name: "Art & Collectibles", emoji: "🎨", color: "from-cyan-100 to-teal-50", count: "890K items" },
  { name: "Craft Supplies", emoji: "✂️", color: "from-emerald-100 to-green-50", count: "1.2M items" },
  { name: "Digital Products", emoji: "📱", color: "from-blue-100 to-indigo-50", count: "670K items" },
  { name: "Weddings", emoji: "💒", color: "from-rose-100 to-pink-50", count: "1.5M items" },
  { name: "Vintage", emoji: "🕰️", color: "from-yellow-100 to-amber-50", count: "950K items" },
];

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl font-display">
          Shop by Category
        </h2>
        <p className="mt-2 text-muted-foreground">
          Browse our most popular categories
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
          >
            <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl ${cat.color}`}>
              {cat.emoji}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{cat.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{cat.count}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
