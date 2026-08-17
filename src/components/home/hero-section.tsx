"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { defaultSiteContent, SiteContent } from "@/lib/site-content";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1489421234833-3e44ab2f5470?w=1600&h=900&fit=crop",
    alt: "QuietWare noise-free dinner plates on a calm dining table",
  },
  {
    image:
      "https://images.unsplash.com/photo-1764874299289-f07dd3015169?w=1600&h=900&fit=crop",
    alt: "Elegant quiet dinnerware set arranged for a peaceful meal",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=1600&h=900&fit=crop",
    alt: "Complete QuietWare dinnerware collection on a modern table",
  },
];

export function HeroSection() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setContent(data);
      })
      .catch(() => null);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const hero = content?.hero || defaultSiteContent.hero;

  return (
    <section className="relative min-h-[90dvh] flex items-center overflow-hidden bg-foreground" aria-label="Hero">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              fill
              priority={currentSlide === 0}
              loading={currentSlide === 0 ? "eager" : "lazy"}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-main py-32 md:py-40">
        <div className="max-w-2xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {hero.badge}
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight mb-8 text-pretty">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block"
            >
              {hero.title1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="block text-white/80"
            >
              {hero.title2}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="block"
            >
              {hero.title3}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed text-pretty"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href={hero.cta1Link}>
              <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90">
                {hero.cta1Text}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href={hero.cta2Link}>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white"
              >
                {hero.cta2Text}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 container-main">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-10 bg-white"
                    : "w-4 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
