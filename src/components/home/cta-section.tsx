"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { defaultSiteContent, SiteContent } from "@/lib/site-content";

export function CTASection() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data) setContent(data); })
      .catch(() => null);
  }, []);

  const cta = content?.cta || defaultSiteContent.cta;

  return (
    <section className="py-24 bg-gradient-to-br from-[#292524] to-[#1c1917] text-[#fafaf9] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
            {cta.title}
          </h2>
          <p className="text-[#a8a29e] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={cta.ctaLink}>
              <Button size="lg" className="bg-[#fafaf9] text-[#292524] hover:bg-[#e7e5e4] group">
                {cta.ctaText}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/products?category=sets">
              <Button variant="ghost" size="lg" className="text-[#fafaf9] hover:bg-[#fafaf9]/10">
                View Complete Sets
              </Button>
            </Link>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-[#78716c]"
          >
            30-day satisfaction guarantee · 5-year warranty · Free US shipping
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
