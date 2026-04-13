import { Link } from "@tanstack/react-router";

const categories = [
  { name: "Necklaces", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=200&h=200&fit=crop", category: "Jewelry & Accessories" },
  { name: "Sewing patterns", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop", category: "Craft Supplies" },
  { name: "Home and living", image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=200&h=200&fit=crop", category: "Home & Living" },
  { name: "Wall Decor", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop", category: "Art & Collectibles" },
  { name: "Women's Jewelry", image: "https://images.unsplash.com/photo-1515562141589-67f0d569b41e?w=200&h=200&fit=crop", category: "Jewelry & Accessories" },
  { name: "Stationery", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&h=200&fit=crop", category: "Digital Products" },
];

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">
        Shop our most-loved categories
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to="/search"
            search={{ q: "", category: cat.category }}
            className="group flex shrink-0 flex-col items-center gap-2.5"
          >
            <div className="h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] overflow-hidden rounded-full border-2 border-transparent transition-all group-hover:border-brand group-hover:shadow-lg">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <span className="text-xs sm:text-sm font-medium text-foreground text-center max-w-[100px]">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
