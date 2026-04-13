import { Link } from "@tanstack/react-router";

const interests = [
  {
    title: "Personalised",
    subtitle: "Perfectly personalised",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=300&fit=crop",
    query: "personalized",
  },
  {
    title: "Hand Prints",
    subtitle: "Inspired prints",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&h=300&fit=crop",
    query: "art print",
  },
  {
    title: "Accessories",
    subtitle: "Curated picks",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop",
    query: "accessories",
  },
  {
    title: "Mythical & Mystical",
    subtitle: "Magical, mystical finds",
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=300&h=300&fit=crop",
    query: "candle",
  },
];

export function FeaturedInterests() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">
        Jump into featured interests
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {interests.map((item) => (
          <Link
            key={item.title}
            to="/search"
            search={{ q: item.query, category: "" }}
            className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3">
              <p className="text-sm font-bold text-background">{item.title}</p>
              <p className="text-xs text-background/80">{item.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
