"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = getTotalPrice();
  const qualifiesForFreeShipping = subtotal >= 50;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="relative p-2 hover:bg-secondary rounded-full transition-colors"
        aria-label={`Open cart with ${itemCount} items`}
      >
        <ShoppingBag className="w-5 h-5" />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center tabular-nums"
          >
            {itemCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
              role="dialog"
              aria-label="Shopping cart"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-serif text-2xl font-semibold">Your Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-16 h-16 text-border mb-4" />
                    <p className="text-lg font-medium mb-2">Your cart is empty</p>
                    <p className="text-muted-foreground mb-6">
                      Discover our collection of noise-free dinnerware
                    </p>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 pb-6 border-b border-border"
                      >
                        <div className="w-24 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0 relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="font-medium hover:text-muted-foreground transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-muted-foreground text-sm mt-1 tabular-nums">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 hover:bg-secondary rounded transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium w-8 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 hover:bg-secondary rounded transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto text-sm text-muted-foreground hover:text-destructive transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold tabular-nums">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-border bg-secondary/30">
                  <div className="flex items-start gap-3 mb-4 text-sm">
                    <Truck className={cn(
                      "w-5 h-5 flex-shrink-0",
                      qualifiesForFreeShipping ? "text-success" : "text-muted-foreground"
                    )} />
                    <p className={cn(
                      qualifiesForFreeShipping ? "text-success" : "text-muted-foreground"
                    )}>
                      {qualifiesForFreeShipping
                        ? "Your order qualifies for free US shipping."
                        : `Add ${formatPrice(50 - subtotal)} more for free US shipping.`}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium tabular-nums">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={cn(
                        "font-medium tabular-nums",
                        qualifiesForFreeShipping && "text-success"
                      )}>
                        {qualifiesForFreeShipping ? "Free" : formatPrice(8.99)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-lg tabular-nums">
                        {formatPrice(
                          qualifiesForFreeShipping ? subtotal : subtotal + 8.99
                        )}
                      </span>
                    </div>
                  </div>
                  <Link href="/cart" onClick={() => setIsOpen(false)}>
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
