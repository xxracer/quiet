"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, Award, Leaf } from "lucide-react";
import { defaultSiteContent, SiteContent } from "@/lib/site-content";
import { HeroCarousel } from "@/components/home/hero-carousel";

const trustBadges = [
  { icon: Shield, title: "Noise Reduction Certified", description: "Lab-tested acoustic dampening technology" },
  { icon: Truck, title: "Free US Shipping", description: "On orders over $50 within 48 contiguous states" },
  { icon: Award, title: "5-Year Warranty", description: "We stand behind our quality" },
  { icon: Leaf, title: "Eco-Friendly Materials", description: "Sustainable and non-toxic production" },
];

export function HeroSection() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data) setContent(data); })
      .catch(() => null);
  }, []);

  const hero = content?.hero || defaultSiteContent.hero;
  const heroImages = hero.images || [];
  const staticHeroImage = hero.staticImage;
  const hasImages = heroImages.length > 0 || staticHeroImage;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fafaf9] to-[#f5f5f4]">
      {/* Hero Background Images/Carousel */}
      {hasImages && (
        <div className="absolute inset-0 z-0">
          <HeroCarousel images={heroImages} staticImage={staticHeroImage} />
        </div>
      )}

      {/* Decorative gradients (only if no images) */}
      {!hasImages && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#e7e5e4]/50 to-transparent blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#d6d3d1]/30 to-transparent blur-3xl"
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f5f4] rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#78716c]">{hero.badge}</span>
          </motion.div>

          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tight mb-8">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="block">{hero.title1}</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="block text-[#78716c]">{hero.title2}</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="block">{hero.title3}</motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-[#78716c] mb-12 leading-relaxed"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href={hero.cta1Link}>
              <Button size="lg" className="group">
                {hero.cta1Text}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href={hero.cta2Link}>
              <Button variant="outline" size="lg">{hero.cta2Text}</Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-[#fafaf9]/50 backdrop-blur-sm rounded-2xl"
            >
              <badge.icon className="w-8 h-8 text-[#292524] mb-3" />
              <h3 className="font-medium text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-[#78716c]">{badge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#a8a29e] rounded-full flex justify-center pt-2"
        >
          <motion.div animate={{ height: [8, 16, 8] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 bg-[#a8a29e] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
