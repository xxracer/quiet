"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

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

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
  showCategory?: boolean;
}

export function ProductCard({
  product,
  index = 0,
  className,
  showCategory = true,
}: ProductCardProps) {
  const savings = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("group", className)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative bg-secondary rounded-xl overflow-hidden aspect-square mb-4">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={index < 3}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}

          {savings > 0 && (
            <div className="absolute top-3 left-3 bg-sale text-white px-2.5 py-1 text-xs font-semibold uppercase tracking-wide">
              Sale
            </div>
          )}

          {product.usaMade && !savings && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2.5 py-1 text-xs font-semibold uppercase tracking-wide">
              USA Made
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="space-y-1.5">
          {showCategory && (
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.category.replace("-", " ")}
            </span>
          )}
          <h3 className="font-medium text-base group-hover:text-muted-foreground transition-colors text-pretty">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3.5 h-3.5",
                    i < Math.floor(product.rating || 0)
                      ? "fill-star text-star"
                      : "text-border"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              ({product.reviews || 0})
            </span>
          </div>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-semibold text-base tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-muted-foreground line-through tabular-nums">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
