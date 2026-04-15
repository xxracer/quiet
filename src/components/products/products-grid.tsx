"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Filter } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  shortDescription: string;
  specifications: {
    diameter?: string;
    material?: string;
    noiseReduction?: string;
    weight?: string;
    dishwasherSafe?: boolean;
  };
  rating: number;
  reviews: number;
  featured: boolean;
  usaMade: boolean;
}

const categories = [
  { value: "all", label: "All Products" },
  { value: "dinner-plates", label: "Dinner Plates" },
  { value: "bowls", label: "Bowls" },
  { value: "side-plates", label: "Side Plates" },
  { value: "sets", label: "Sets" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const fallbackProducts: Product[] = [];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const savings = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative bg-[#f5f5f4] rounded-2xl overflow-hidden aspect-square mb-4">
          {product.images[0] ? (
            <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#78716c]">No image</div>
          )}
          {savings > 0 && <div className="absolute top-4 left-4 bg-[#292524] text-[#fafaf9] px-3 py-1 rounded-full text-xs font-medium">Save {savings}%</div>}
          {product.usaMade && <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full" />USA</div>}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="space-y-2">
          <span className="text-xs text-[#78716c] uppercase tracking-wide">{product.category.replace("-", " ")}</span>
          <h3 className="font-medium text-lg group-hover:text-[#78716c] transition-colors">{product.name}</h3>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating || 0) ? "fill-[#fbbf24] text-[#fbbf24]" : "text-[#d6d3d1]")} />
              ))}
            </div>
            <span className="text-xs text-[#78716c]">({product.reviews || 0})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">{formatPrice(product.price)}</span>
            {product.comparePrice && <span className="text-sm text-[#78716c] line-through">{formatPrice(product.comparePrice)}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setProducts(fallbackProducts);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [products, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-[#e7e5e4] rounded-2xl aspect-square mb-4" />
            <div className="h-4 bg-[#e7e5e4] rounded w-3/4 mb-2" />
            <div className="h-4 bg-[#e7e5e4] rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#e7e5e4]">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat.value} onClick={() => setSelectedCategory(cat.value)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-colors", selectedCategory === cat.value ? "bg-[#292524] text-[#fafaf9]" : "bg-[#f5f5f4] text-[#78716c] hover:bg-[#e7e5e4]")}>
              {cat.label}
            </button>
          ))}
        </div>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 bg-[#f5f5f4] rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#292524]">
          {sortOptions.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
        </select>
      </div>

      <motion.div key={selectedCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProducts.map((product, index) => (<ProductCard key={product.id} product={product} index={index} />))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#78716c] text-lg">No products found. Add products from the admin panel.</p>
        </div>
      )}
    </div>
  );
}
