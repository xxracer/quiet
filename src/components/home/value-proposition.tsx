"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, TrendingUp } from "lucide-react";
import { defaultSiteContent, SiteContent } from "@/lib/site-content";

const valueProps = [
  { icon: Zap, title: "Proprietary Technology", description: "Decades of acoustic engineering research power every plate we create" },
  { icon: Target, title: "Precision Crafted", description: "Each piece is meticulously formed and finished by skilled artisans in our Ohio workshop" },
  { icon: TrendingUp, title: "Unbeatable Value", description: "Premium quality at prices that don't break the bank — because peaceful dining should be accessible" },
];

export function ValueProposition() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data) setContent(data); })
      .catch(() => null);
  }, []);

  const value = content?.valueProposition || defaultSiteContent.valueProposition;

  return (
    <section className="py-24 bg-[#fafaf9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#78716c] uppercase tracking-widest text-sm">{value.badge}</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-medium mt-4 mb-6">{value.title}</h2>
            <p className="text-[#78716c] text-lg leading-relaxed mb-8">{value.description}</p>

            <div className="space-y-6 mb-8">
              {valueProps.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-[#292524] rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[#fafaf9]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-[#78716c]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/about">
              <Button className="group">
                Learn Our Story
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square bg-gradient-to-br from-[#f5f5f4] to-[#e7e5e4] rounded-3xl overflow-hidden">
              <img src={value.imageUrl} alt="QuietWare Premium Dinner Plates" className="w-full h-full object-cover" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6"
            >
              <p className="text-3xl font-playfair font-medium text-[#292524]">4.9/5</p>
              <p className="text-sm text-[#78716c]">Customer Rating</p>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#fbbf24] fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
