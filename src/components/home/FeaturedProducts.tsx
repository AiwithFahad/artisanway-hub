import { ProductCard } from "./ProductCard";

const featuredProducts = [
  {
    id: "1",
    title: "Handmade Ceramic Mug with Minimalist Geometric Pattern",
    price: 28.99,
    originalPrice: 38.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 2341,
    seller: "CeramicStudio",
    freeShipping: true,
    bestseller: true,
  },
  {
    id: "2",
    title: "Sterling Silver Moon Phase Necklace - Handcrafted",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 5890,
    seller: "LunarJewels",
    freeShipping: true,
  },
  {
    id: "3",
    title: "Hand-Poured Soy Candle Set - Lavender & Vanilla",
    price: 24.50,
    originalPrice: 32.00,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 1205,
    seller: "WickAndWonder",
    freeShipping: false,
    bestseller: true,
  },
  {
    id: "4",
    title: "Macramé Wall Hanging - Boho Home Décor",
    price: 67.00,
    image: "https://images.unsplash.com/photo-1622127922040-13cab637ee78?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 890,
    seller: "KnottyCreations",
    freeShipping: true,
  },
  {
    id: "5",
    title: "Personalized Leather Journal - Embossed Name",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 3421,
    seller: "LeatherLore",
    freeShipping: true,
    bestseller: true,
  },
  {
    id: "6",
    title: "Watercolor Art Print - Abstract Mountain Landscape",
    price: 22.00,
    originalPrice: 30.00,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 678,
    seller: "ArtByMila",
    freeShipping: false,
  },
  {
    id: "7",
    title: "Hand-Knit Chunky Wool Blanket - Cozy Home Throw",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1580301762395-21ce25571ec3?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 2100,
    seller: "WoolWonders",
    freeShipping: true,
  },
  {
    id: "8",
    title: "Dried Flower Bouquet - Natural Home Arrangement",
    price: 35.50,
    originalPrice: 45.00,
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 1543,
    seller: "BloomNaturals",
    freeShipping: true,
    bestseller: true,
  },
];

export function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl font-display">
            Trending Now
          </h2>
          <p className="mt-1 text-muted-foreground">
            The most-loved items by our community
          </p>
        </div>
        <button className="hidden text-sm font-semibold text-brand transition-colors hover:text-brand/80 sm:block">
          See all →
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
