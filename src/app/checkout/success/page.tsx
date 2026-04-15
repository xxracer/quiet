"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Package, Truck, Shield } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-16 flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-4xl md:text-5xl font-medium mb-4"
          >
            Thank You!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[#78716c] text-lg mb-8"
          >
            Your order has been placed successfully. We&apos;ll send you an email
            confirmation with tracking information shortly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#f5f5f4] rounded-2xl p-8 mb-8"
          >
            <h2 className="font-medium mb-6">What happens next?</h2>
            <div className="space-y-6 text-left">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#fafaf9] rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-[#78716c]" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Order Processing</h3>
                  <p className="text-sm text-[#78716c]">
                    Your order will be carefully prepared and packaged within 1-2 business days.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#fafaf9] rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-[#78716c]" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Shipping</h3>
                  <p className="text-sm text-[#78716c]">
                    Standard shipping (3-5 business days) is free on your order. You&apos;ll receive a tracking number via email.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#fafaf9] rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#78716c]" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Warranty & Support</h3>
                  <p className="text-sm text-[#78716c]">
                    Your QuietWare products are backed by our 5-year warranty. Contact support anytime.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/products">
              <Button size="lg">Continue Shopping</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
