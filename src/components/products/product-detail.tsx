"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, Shield, RotateCcw, Minus, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  shortDescription: string;
  fullDescription?: string;
  specifications: {
    diameter?: string;
    material?: string;
    noiseReduction?: string;
    weight?: string;
    dishwasherSafe?: boolean;
  };
  rating?: number;
  reviews?: number;
  featured?: boolean;
  usaMade?: boolean;
}

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch(`/api/products?category=${product.category}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRelatedProducts(data.filter((p: Product) => p.id !== product.id).slice(0, 4));
        }
      })
      .catch(() => {});
  }, [product.category, product.id]);

  const savings = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] || "",
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/products" className="inline-flex items-center gap-2 text-[#78716c] hover:text-[#292524] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-4">
          <motion.div key={selectedImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-square bg-[#f5f5f4] rounded-2xl overflow-hidden">
            {product.images[selectedImage] ? (
              <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#78716c]">No image</div>
            )}
            {savings > 0 && <div className="absolute top-4 left-4 bg-[#292524] text-[#fafaf9] px-4 py-2 rounded-full text-sm font-medium">Save {savings}%</div>}
          </motion.div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={cn("relative aspect-square bg-[#f5f5f4] rounded-lg overflow-hidden border-2 transition-all", selectedImage === index ? "border-[#292524] ring-2 ring-[#292524]/20" : "border-transparent hover:border-[#a8a29e]")}>
                  <Image src={image} alt={`${product.name} view ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              {product.usaMade && <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full" />Made in USA</span>}
              <span className="bg-[#f5f5f4] text-[#78716c] px-3 py-1 rounded-full text-xs font-medium">{product.category.replace("-", " ")}</span>
            </div>

            <h1 className="font-playfair text-3xl md:text-4xl font-medium mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-5 h-5", i < Math.floor(product.rating || 0) ? "fill-[#fbbf24] text-[#fbbf24]" : "text-[#d6d3d1]")} />
                ))}
              </div>
              <span className="font-medium">{product.rating || 0}</span>
              <span className="text-[#78716c]">({product.reviews || 0} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-semibold">{formatPrice(product.price)}</span>
              {product.comparePrice && (
                <>
                  <span className="text-lg text-[#78716c] line-through">{formatPrice(product.comparePrice)}</span>
                  <span className="text-green-600 font-medium text-sm">Save {formatPrice(Number(product.comparePrice) - product.price)}</span>
                </>
              )}
            </div>

            <p className="text-[#78716c] text-lg leading-relaxed mb-8">{product.shortDescription}</p>

            <div className="border-t border-b border-[#e7e5e4] py-6 mb-8">
              <h3 className="font-medium mb-4">Specifications</h3>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                {product.specifications.diameter && <div><dt className="text-[#78716c]">Diameter</dt><dd className="font-medium">{product.specifications.diameter}</dd></div>}
                {product.specifications.material && <div><dt className="text-[#78716c]">Material</dt><dd className="font-medium">{product.specifications.material}</dd></div>}
                {product.specifications.noiseReduction && <div><dt className="text-[#78716c]">Noise Reduction</dt><dd className="font-medium">{product.specifications.noiseReduction}</dd></div>}
                {product.specifications.weight && <div><dt className="text-[#78716c]">Weight</dt><dd className="font-medium">{product.specifications.weight}</dd></div>}
                <div><dt className="text-[#78716c]">Dishwasher Safe</dt><dd className="font-medium">{product.specifications.dishwasherSafe ? "Yes" : "No"}</dd></div>
              </dl>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-[#e7e5e4] rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-[#f5f5f4] transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-[#f5f5f4] transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={isAdding}>
                <AnimatePresence mode="wait">
                  {isAdding ? (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Added!</motion.span>
                  ) : (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Add to Cart</motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 text-sm"><Truck className="w-5 h-5 text-[#78716c]" /><span>Free US Shipping</span></div>
              <div className="flex items-center gap-3 text-sm"><Shield className="w-5 h-5 text-[#78716c]" /><span>5-Year Warranty</span></div>
              <div className="flex items-center gap-3 text-sm"><RotateCcw className="w-5 h-5 text-[#78716c]" /><span>30-Day Returns</span></div>
            </div>

            <div className="bg-[#f5f5f4] rounded-xl p-6">
              <h3 className="font-medium mb-3">Why This is the Best Value</h3>
              <ul className="space-y-2 text-sm text-[#78716c]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#292524] rounded-full" />Proprietary acoustic dampening technology (90% noise reduction)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#292524] rounded-full" />Premium high-fired ceramic composite construction</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#292524] rounded-full" />Direct-to-consumer pricing (40% below traditional brands)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#292524] rounded-full" />Crafted by skilled artisans in Ohio, USA</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#292524] rounded-full" />5-year warranty and 30-day satisfaction guarantee</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-24">
          <h2 className="font-playfair text-2xl md:text-3xl font-medium mb-8">Related Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, index) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -8 }} className="group">
                <Link href={`/products/${p.slug}`}>
                  <div className="relative bg-[#f5f5f4] rounded-2xl overflow-hidden aspect-square mb-4">
                    {p.images[0] ? <Image src={p.images[0]} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="w-full h-full flex items-center justify-center text-[#78716c]">No image</div>}
                  </div>
                  <h3 className="font-medium group-hover:text-[#78716c] transition-colors">{p.name}</h3>
                  <p className="text-[#78716c]">{formatPrice(p.price)}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
