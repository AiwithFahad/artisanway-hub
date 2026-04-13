import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoSection } from "@/components/home/PromoSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Craftly — Handmade, Vintage & Unique Goods Marketplace" },
      {
        name: "description",
        content:
          "Shop millions of handmade, vintage, and one-of-a-kind items from independent creators worldwide. Find unique gifts, home décor, jewelry, and more.",
      },
      { property: "og:title", content: "Craftly — Discover Unique Handmade Goods" },
      {
        property: "og:description",
        content:
          "Shop millions of handmade, vintage, and one-of-a-kind items from independent creators worldwide.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <PromoSection />
    </main>
  );
}
