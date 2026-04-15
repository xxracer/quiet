export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: "dinner-plates" | "bowls" | "side-plates" | "sets";
  shortDescription: string;
  fullDescription: string;
  specifications: {
    diameter?: string;
    material: string;
    noiseReduction: string;
    weight: string;
    dishwasherSafe: boolean;
  };
  rating: number;
  reviews: number;
  featured: boolean;
  usaMade: boolean;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Dinner Plate",
    slug: "premium-dinner-plate",
    price: 29.99,
    comparePrice: 39.99,
    images: [
      "https://images.unsplash.com/photo-1615366734858-5d8c6f328d6e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=800&fit=crop",
    ],
    category: "dinner-plates",
    shortDescription:
      "Our signature noise-free dinner plate with proprietary acoustic dampening core. Perfect for everyday elegant dining.",
    fullDescription:
      "The QuietWare Premium Dinner Plate represents years of acoustic engineering research. Each plate features our proprietary Sound-Absorb Core technology that reduces impact noise by up to 90% compared to traditional ceramic plates. Made from high-fired ceramic composite, these plates offer exceptional durability while maintaining an elegant, slim profile that complements any table setting.",
    specifications: {
      diameter: '10.5"',
      material: "High-fired ceramic composite with acoustic dampening core",
      noiseReduction: "90% noise reduction vs standard ceramic",
      weight: "18 oz",
      dishwasherSafe: true,
    },
    rating: 4.9,
    reviews: 847,
    featured: true,
    usaMade: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Silent Bowl Set",
    slug: "silent-bowl-set",
    price: 34.99,
    comparePrice: 44.99,
    images: [
      "https://images.unsplash.com/photo-1615485095808-5b46c6a80511?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800&h=800&fit=crop",
    ],
    category: "bowls",
    shortDescription:
      "Set of 4 quiet soup bowls with acoustic dampening. Ideal for soups, cereals, and salads.",
    fullDescription:
      "Enjoy your favorite soups, cereals, and salads in peace with our Silent Bowl Set. Each bowl in this 4-piece set features our proprietary acoustic dampening technology, reducing the clinking and clattering that comes with everyday use. The wide, shallow design is perfect for everything from morning cereal to evening soups, and is crafted from the same premium ceramic composite as our dinner plates.",
    specifications: {
      diameter: '6.5"',
      material: "High-fired ceramic composite with acoustic dampening core",
      noiseReduction: "85% noise reduction vs standard bowls",
      weight: "12 oz each",
      dishwasherSafe: true,
    },
    rating: 4.8,
    reviews: 623,
    featured: true,
    usaMade: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Acoustic Dinner Set",
    slug: "acoustic-dinner-set",
    price: 89.99,
    comparePrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-b2eac293ee23?w=800&h=800&fit=crop",
    ],
    category: "sets",
    shortDescription:
      "Complete 16-piece dinnerware set for 4. Includes dinner plates, soup bowls, and side plates.",
    fullDescription:
      "Our most popular complete set, the Acoustic Dinner Set includes everything you need for a quiet, elegant dining experience for four. This 16-piece set includes 4 dinner plates, 4 soup bowls, and 4 side plates, all featuring our proprietary acoustic dampening technology. Each piece is crafted in our Ohio workshop by skilled artisans using sustainable, non-toxic materials.",
    specifications: {
      material: "High-fired ceramic composite with acoustic dampening core",
      noiseReduction: "Up to 90% noise reduction",
      weight: "Varies by piece",
      dishwasherSafe: true,
    },
    rating: 4.9,
    reviews: 412,
    featured: true,
    usaMade: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Ceramic Side Plate",
    slug: "ceramic-side-plate",
    price: 19.99,
    comparePrice: 24.99,
    images: [
      "https://images.unsplash.com/photo-1598866644171-941f1c43e8da?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd5d?w=800&h=800&fit=crop",
    ],
    category: "side-plates",
    shortDescription:
      "Compact quiet side plate perfect for appetizers, desserts, and bread service.",
    fullDescription:
      "The perfect accompaniment to any meal, our Ceramic Side Plate brings QuietWare's signature silence to your appetizers, desserts, and bread service. Compact yet generously sized at 8 inches, these plates feature the same acoustic dampening technology as our larger dinner plates in a more intimate format.",
    specifications: {
      diameter: '8"',
      material: "High-fired ceramic composite with acoustic dampening core",
      noiseReduction: "85% noise reduction vs standard ceramic",
      weight: "10 oz",
      dishwasherSafe: true,
    },
    rating: 4.7,
    reviews: 534,
    featured: false,
    usaMade: true,
    inStock: true,
  },
  {
    id: "5",
    name: "Artisan Mug Set",
    slug: "artisan-mug-set",
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1577937927133-66ef1bb58357?w=800&h=800&fit=crop",
    ],
    category: "sets",
    shortDescription:
      "Set of 2 noise-reducing mugs with ergonomic design for hot and cold beverages.",
    fullDescription:
      "Start your mornings in peace with our Artisan Mug Set. These 12oz mugs feature an ergonomic design and our proprietary acoustic dampening technology that quiets the clinking of spoons and the sounds of your favorite beverages. Perfect for coffee, tea, hot chocolate, or any drink you enjoy in silence.",
    specifications: {
      material: "High-fired ceramic composite with acoustic dampening core",
      noiseReduction: "80% noise reduction vs standard mugs",
      weight: "14 oz each",
      dishwasherSafe: true,
    },
    rating: 4.8,
    reviews: 389,
    featured: false,
    usaMade: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Family Starter Set",
    slug: "family-starter-set",
    price: 149.99,
    comparePrice: 179.99,
    images: [
      "https://images.unsplash.com/photo-1507049941118-56166885465e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=800&fit=crop",
    ],
    category: "sets",
    shortDescription:
      "Complete 24-piece set for 6. The ultimate quiet dining experience for families.",
    fullDescription:
      "Our most comprehensive set, the Family Starter Set serves 6 people with a complete quiet dining experience. This 24-piece collection includes 6 dinner plates, 6 soup bowls, 6 side plates, and 6 mugs, all featuring QuietWare's proprietary acoustic dampening technology. Crafted by artisans in our Ohio workshop, each piece is built to last and backed by our 5-year warranty.",
    specifications: {
      material: "High-fired ceramic composite with acoustic dampening core",
      noiseReduction: "Up to 90% noise reduction across all pieces",
      weight: "Varies by piece",
      dishwasherSafe: true,
    },
    rating: 4.9,
    reviews: 267,
    featured: true,
    usaMade: true,
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
