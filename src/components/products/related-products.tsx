"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/product-card";

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
  usaMade?: boolean;
}

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`/api/products?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRelatedProducts(
            data.filter((p: Product) => p.id !== currentProductId).slice(0, 3)
          );
        }
      })
      .catch(() => {});
  }, [category, currentProductId]);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-20 md:mt-28">
      <h2 className="font-serif text-2xl md:text-3xl font-medium mb-8">
        Related products
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {relatedProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
