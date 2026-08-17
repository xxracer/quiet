"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: React.ReactNode;
}

export function ProductGallery({ images, productName, badge }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {hasImages ? (
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={images[selectedImage]}
                alt={`${productName} - product image ${selectedImage + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </AnimatePresence>
        {badge}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square bg-secondary rounded-xl overflow-hidden border-2 transition-all",
                selectedImage === index
                  ? "border-foreground"
                  : "border-transparent hover:border-border"
              )}
              aria-label={`View ${productName} image ${index + 1}`}
              aria-current={selectedImage === index ? "true" : undefined}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
