export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    sales: number;
  };
  stock: number;
  freeShipping: boolean;
  bestseller: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Handmade Ceramic Mug with Minimalist Geometric Pattern",
    description: "Beautifully crafted ceramic mug featuring a unique geometric pattern. Each mug is hand-thrown on a pottery wheel and individually glazed, making every piece one of a kind. Perfect for your morning coffee or tea. Microwave and dishwasher safe. Holds approximately 12oz.",
    price: 28.99,
    originalPrice: 38.99,
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&h=800&fit=crop",
    ],
    category: "Home & Living",
    tags: ["ceramic", "mug", "handmade", "kitchen"],
    rating: 4.8,
    reviewCount: 2341,
    seller: { id: "s1", name: "CeramicStudio", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", rating: 4.9, sales: 15420 },
    stock: 23,
    freeShipping: true,
    bestseller: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Sterling Silver Moon Phase Necklace - Handcrafted",
    description: "A stunning sterling silver necklace featuring the phases of the moon. Handcrafted with attention to every detail. The chain is 18 inches long with a 2-inch extender. Comes in a beautiful gift box, perfect for any occasion.",
    price: 45.00,
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1515562141589-67f0d569b41e?w=800&h=800&fit=crop",
    ],
    category: "Jewelry & Accessories",
    tags: ["silver", "necklace", "moon", "handcrafted"],
    rating: 4.9,
    reviewCount: 5890,
    seller: { id: "s2", name: "LunarJewels", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", rating: 5.0, sales: 28900 },
    stock: 15,
    freeShipping: true,
    bestseller: false,
    createdAt: "2024-02-10",
  },
  {
    id: "3",
    title: "Hand-Poured Soy Candle Set - Lavender & Vanilla",
    description: "Set of 3 hand-poured soy candles in calming lavender and vanilla scents. Made with 100% natural soy wax and premium fragrance oils. Each candle burns for approximately 40 hours. Comes in reusable glass jars.",
    price: 24.50,
    originalPrice: 32.00,
    images: [
      "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=800&fit=crop",
    ],
    category: "Home & Living",
    tags: ["candle", "soy", "lavender", "vanilla"],
    rating: 4.7,
    reviewCount: 1205,
    seller: { id: "s3", name: "WickAndWonder", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", rating: 4.8, sales: 8900 },
    stock: 45,
    freeShipping: false,
    bestseller: true,
    createdAt: "2024-03-05",
  },
  {
    id: "4",
    title: "Macramé Wall Hanging - Boho Home Décor",
    description: "Beautiful handmade macramé wall hanging that adds a bohemian touch to any room. Made with 100% natural cotton cord. Measures approximately 24 inches wide and 36 inches long. Mounted on a natural driftwood piece.",
    price: 67.00,
    images: [
      "https://images.unsplash.com/photo-1622127922040-13cab637ee78?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&h=800&fit=crop",
    ],
    category: "Home & Living",
    tags: ["macrame", "wall-hanging", "boho", "decor"],
    rating: 4.6,
    reviewCount: 890,
    seller: { id: "s4", name: "KnottyCreations", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop", rating: 4.7, sales: 5600 },
    stock: 8,
    freeShipping: true,
    bestseller: false,
    createdAt: "2024-01-20",
  },
  {
    id: "5",
    title: "Personalized Leather Journal - Embossed Name",
    description: "Premium leather journal with personalized embossing. Features 200 pages of acid-free paper, a bookmark ribbon, and an elastic closure. Available in multiple leather colors. Perfect gift for writers and journalers.",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=800&fit=crop",
    ],
    category: "Art & Collectibles",
    tags: ["leather", "journal", "personalized", "gift"],
    rating: 4.9,
    reviewCount: 3421,
    seller: { id: "s5", name: "LeatherLore", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop", rating: 4.9, sales: 19200 },
    stock: 30,
    freeShipping: true,
    bestseller: true,
    createdAt: "2024-02-28",
  },
  {
    id: "6",
    title: "Watercolor Art Print - Abstract Mountain Landscape",
    description: "Beautiful watercolor art print featuring an abstract mountain landscape. Printed on premium archival paper with vibrant, fade-resistant inks. Available in multiple sizes. Unframed.",
    price: 22.00,
    originalPrice: 30.00,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=800&fit=crop",
    ],
    category: "Art & Collectibles",
    tags: ["art", "print", "watercolor", "landscape"],
    rating: 4.5,
    reviewCount: 678,
    seller: { id: "s6", name: "ArtByMila", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", rating: 4.6, sales: 4300 },
    stock: 100,
    freeShipping: false,
    bestseller: false,
    createdAt: "2024-03-15",
  },
  {
    id: "7",
    title: "Hand-Knit Chunky Wool Blanket - Cozy Home Throw",
    description: "Ultra-cozy hand-knit blanket made from premium merino wool. The chunky knit design adds texture and warmth to any room. Measures 50x60 inches. Machine washable on gentle cycle.",
    price: 89.00,
    images: [
      "https://images.unsplash.com/photo-1580301762395-21ce25571ec3?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop",
    ],
    category: "Home & Living",
    tags: ["blanket", "wool", "knit", "cozy"],
    rating: 4.8,
    reviewCount: 2100,
    seller: { id: "s7", name: "WoolWonders", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop", rating: 4.8, sales: 11300 },
    stock: 12,
    freeShipping: true,
    bestseller: false,
    createdAt: "2024-01-08",
  },
  {
    id: "8",
    title: "Dried Flower Bouquet - Natural Home Arrangement",
    description: "Stunning dried flower bouquet featuring a mix of pampas grass, eucalyptus, and assorted dried blooms. Lasts for years with minimal care. Perfect for home décor, weddings, or as a thoughtful gift.",
    price: 35.50,
    originalPrice: 45.00,
    images: [
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&h=800&fit=crop",
    ],
    category: "Home & Living",
    tags: ["flowers", "dried", "bouquet", "decor"],
    rating: 4.7,
    reviewCount: 1543,
    seller: { id: "s8", name: "BloomNaturals", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop", rating: 4.7, sales: 7800 },
    stock: 20,
    freeShipping: true,
    bestseller: true,
    createdAt: "2024-02-14",
  },
  {
    id: "9",
    title: "Handwoven Rattan Storage Basket Set",
    description: "Set of 3 handwoven rattan baskets perfect for organizing your home. Each basket features sturdy handles and a natural finish. Great for storing blankets, toys, plants, or laundry.",
    price: 54.99,
    images: [
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=800&fit=crop",
    ],
    category: "Home & Living",
    tags: ["rattan", "basket", "storage", "organization"],
    rating: 4.6,
    reviewCount: 920,
    seller: { id: "s4", name: "KnottyCreations", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop", rating: 4.7, sales: 5600 },
    stock: 18,
    freeShipping: true,
    bestseller: false,
    createdAt: "2024-03-01",
  },
  {
    id: "10",
    title: "Custom Wooden Name Sign - Nursery Décor",
    description: "Beautiful custom wooden name sign perfect for nurseries and kids' rooms. Made from premium birch plywood with precision laser cutting. Available in multiple fonts and finishes. Includes hanging hardware.",
    price: 32.00,
    originalPrice: 42.00,
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=800&h=800&fit=crop",
    ],
    category: "Weddings",
    tags: ["custom", "wooden", "sign", "nursery"],
    rating: 4.8,
    reviewCount: 1876,
    seller: { id: "s9", name: "WoodCraftCo", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", rating: 4.9, sales: 13400 },
    stock: 50,
    freeShipping: false,
    bestseller: true,
    createdAt: "2024-01-25",
  },
  {
    id: "11",
    title: "Vintage-Style Linen Apron - Chef's Collection",
    description: "Classic vintage-style apron made from premium European linen. Features adjustable neck strap, large front pocket, and long ties. Pre-washed for softness. Perfect for cooking enthusiasts and professionals.",
    price: 38.00,
    images: [
      "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&h=800&fit=crop",
    ],
    category: "Clothing & Shoes",
    tags: ["linen", "apron", "vintage", "kitchen"],
    rating: 4.7,
    reviewCount: 645,
    seller: { id: "s10", name: "LinenHouse", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop", rating: 4.8, sales: 6200 },
    stock: 35,
    freeShipping: true,
    bestseller: false,
    createdAt: "2024-02-20",
  },
  {
    id: "12",
    title: "Digital Download - Minimalist Planner Bundle 2024",
    description: "Complete digital planner bundle with monthly, weekly, and daily layouts. Includes habit tracker, goal setting pages, budget planner, and meal prep sheets. Compatible with iPad and tablet apps like GoodNotes.",
    price: 12.99,
    originalPrice: 19.99,
    images: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=800&fit=crop",
    ],
    category: "Digital Products",
    tags: ["digital", "planner", "printable", "organization"],
    rating: 4.9,
    reviewCount: 4520,
    seller: { id: "s11", name: "PlannerPro", avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=80&h=80&fit=crop", rating: 4.9, sales: 45000 },
    stock: 999,
    freeShipping: true,
    bestseller: true,
    createdAt: "2024-01-01",
  },
];

export const reviews: Review[] = [
  { id: "r1", productId: "1", userId: "u1", userName: "Sarah M.", userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop", rating: 5, comment: "Absolutely love this mug! The glaze is stunning and it feels great in my hands. Perfect size for my morning latte.", createdAt: "2024-03-20" },
  { id: "r2", productId: "1", userId: "u2", userName: "James K.", userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", rating: 5, comment: "Bought two as gifts and kept one for myself. The geometric pattern is even more beautiful in person.", createdAt: "2024-03-15" },
  { id: "r3", productId: "1", userId: "u3", userName: "Emily R.", userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop", rating: 4, comment: "Beautiful craftsmanship. Slightly smaller than I expected but still love it!", createdAt: "2024-03-10" },
  { id: "r4", productId: "2", userId: "u4", userName: "Olivia P.", userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop", rating: 5, comment: "This necklace is breathtaking. The moon phases are so delicate and detailed. Got so many compliments!", createdAt: "2024-03-18" },
  { id: "r5", productId: "2", userId: "u5", userName: "Noah T.", userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop", rating: 5, comment: "Bought this for my wife's birthday and she absolutely adores it. Beautiful packaging too.", createdAt: "2024-03-12" },
  { id: "r6", productId: "5", userId: "u1", userName: "Sarah M.", userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop", rating: 5, comment: "The leather quality is exceptional. The embossing came out perfectly. Already planning to order more as gifts.", createdAt: "2024-03-22" },
  { id: "r7", productId: "3", userId: "u6", userName: "Ava L.", userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop", rating: 4, comment: "The lavender scent is heavenly. Burns evenly and the throw is wonderful. Will definitely reorder.", createdAt: "2024-03-08" },
  { id: "r8", productId: "7", userId: "u7", userName: "Liam C.", userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop", rating: 5, comment: "This blanket is incredibly soft and warm. The chunky knit adds so much character to our living room.", createdAt: "2024-03-19" },
];

export const categories = [
  "Jewelry & Accessories",
  "Clothing & Shoes",
  "Home & Living",
  "Art & Collectibles",
  "Craft Supplies",
  "Digital Products",
  "Weddings",
  "Vintage",
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function searchProducts(query: string, filters?: { category?: string; minPrice?: number; maxPrice?: number; minRating?: number; sort?: string }): Product[] {
  let results = [...products];

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (filters?.category) {
    results = results.filter((p) => p.category === filters.category);
  }
  if (filters?.minPrice !== undefined) {
    results = results.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters?.maxPrice !== undefined) {
    results = results.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters?.minRating !== undefined) {
    results = results.filter((p) => p.rating >= filters.minRating!);
  }

  switch (filters?.sort) {
    case "price-low":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      results.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case "popular":
      results.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    default:
      break;
  }

  return results;
}
