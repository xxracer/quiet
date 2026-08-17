"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";

interface AddToCartProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
  };
}

export function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({ ...product, quantity });
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center border border-border rounded-lg bg-secondary/30">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="p-3.5 hover:bg-secondary transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 text-center font-medium tabular-nums">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="p-3.5 hover:bg-secondary transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <Button
        size="lg"
        className="flex-1"
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        <AnimatePresence mode="wait">
          {isAdding ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="inline-flex items-center gap-2"
            >
              <Check className="w-5 h-5" /> Added to cart
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              Add to Cart
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}
