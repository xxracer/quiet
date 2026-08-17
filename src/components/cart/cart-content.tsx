"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, Minus, Plus, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { cn, formatPrice } from "@/lib/utils";

export function CartContent() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const subtotal = getTotalPrice();
  const qualifiesForFreeShipping = subtotal >= 50;
  const total = qualifiesForFreeShipping ? subtotal : subtotal + 8.99;

  return (
    <div className="container-main max-w-6xl">
      <h1 className="font-serif text-4xl md:text-5xl font-medium mb-8 tracking-tight">
        Your cart
      </h1>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-secondary/30 rounded-2xl"
        >
          <ShoppingBag className="w-16 h-16 text-border mx-auto mb-6" />
          <p className="text-xl font-medium mb-2">Your cart is empty</p>
          <p className="text-muted-foreground mb-8">
            Discover our collection of noise-free dinnerware
          </p>
          <Link href="/products">
            <Button size="lg">Shop now</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {items.reduce((acc, item) => acc + item.quantity, 0)} items
              </p>
              <button
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear cart
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-5 p-5 bg-secondary/30 rounded-xl border border-border"
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
                      className="font-medium hover:text-muted-foreground transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-muted-foreground text-sm mt-1 tabular-nums">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-secondary rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium w-8 text-center tabular-nums">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-secondary rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="font-semibold tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/30 rounded-2xl p-6 lg:sticky lg:top-36 border border-border"
          >
            <h2 className="font-serif text-2xl font-medium mb-6">Order summary</h2>

            <div className="flex items-start gap-3 mb-6 text-sm">
              <Truck
                className={cn(
                  "w-5 h-5 flex-shrink-0 mt-0.5",
                  qualifiesForFreeShipping ? "text-success" : "text-muted-foreground"
                )}
              />
              <p
                className={cn(
                  qualifiesForFreeShipping ? "text-success" : "text-muted-foreground"
                )}
              >
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
                <span
                  className={cn(
                    "font-medium tabular-nums",
                    qualifiesForFreeShipping && "text-success"
                  )}
                >
                  {qualifiesForFreeShipping ? "Free" : formatPrice(8.99)}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-lg tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            <Button className="w-full group" size="lg">
              Proceed to checkout
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Taxes calculated at checkout. Free returns within 30 days.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
