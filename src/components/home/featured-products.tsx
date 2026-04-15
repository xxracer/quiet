"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { defaultSiteContent, SiteContent } from "@/lib/site-content";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  rating?: number;
  reviews?: number;
  featured?: boolean;
}

const emptyProducts: Product[] = [];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const savings = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="space-y-2">
          <span className="text-xs text-[#78716c] uppercase tracking-wide">{product.category.replace("-", " ")}</span>
          <h3 className="font-medium text-lg group-hover:text-[#78716c] transition-colors">{product.name}</h3>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "fill-[#fbbf24] text-[#fbbf24]" : "text-[#d6d3d1]"}`} />
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

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(emptyProducts);
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data) setContent(data); })
      .catch(() => null);

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setProducts(data); })
      .catch(() => {});
  }, []);

  const featured = content?.featuredProducts || defaultSiteContent.featuredProducts;
  const displayProducts = products.length > 0 ? products.slice(0, 4) : emptyProducts;

  return (
    <section className="py-24 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-medium mb-4">{featured.title}</h2>
          <p className="text-[#78716c] text-lg max-w-2xl mx-auto">{featured.subtitle}</p>
        </motion.div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {displayProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#78716c] text-lg">No featured products yet. Add products from the admin panel.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <Button variant="outline" size="lg" className="group">
              {featured.ctaText}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
