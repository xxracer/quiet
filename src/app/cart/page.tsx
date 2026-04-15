"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Star, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { cn, formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-medium mb-8">Your Cart</h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <ShoppingBag className="w-20 h-20 text-[#d6d3d1] mx-auto mb-6" />
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-[#78716c] mb-8">
                Discover our collection of noise-free dinnerware
              </p>
              <Link href="/products">
                <Button size="lg">Shop Now</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-6 p-6 bg-[#fafaf9] rounded-2xl border border-[#e7e5e4]"
                    >
                      <div className="w-32 h-32 bg-[#f5f5f4] rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-medium text-lg hover:text-[#78716c] transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-[#78716c] mt-1">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border border-[#e7e5e4] rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-[#f5f5f4] transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-[#f5f5f4] transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#ef4444] hover:bg-[#fef2f2] p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#f5f5f4] rounded-2xl p-6 sticky top-28"
                >
                  <h2 className="font-medium text-lg mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-[#78716c]">Subtotal</span>
                      <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78716c]">Shipping</span>
                      <span className="text-green-600 font-medium">
                        {getTotalPrice() >= 50 ? "Free" : formatPrice(8.99)}
                      </span>
                    </div>
                    <div className="border-t border-[#e7e5e4] pt-4 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-lg">
                        {formatPrice(
                          getTotalPrice() >= 50 ? getTotalPrice() : getTotalPrice() + 8.99
                        )}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  <p className="text-xs text-[#78716c] text-center mt-4">
                    Free shipping on orders over $50
                  </p>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
