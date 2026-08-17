"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, Shield, BadgeCheck } from "lucide-react";
import { defaultSiteContent, SiteContent } from "@/lib/site-content";

const valueProps = [
  {
    icon: Volume2,
    title: "90% noise reduction",
    description:
      "Proprietary acoustic dampening core absorbs impact sound where it starts.",
  },
  {
    icon: Shield,
    title: "Built to last",
    description:
      "High-fired ceramic composite resists chips, cracks, and daily wear.",
  },
  {
    icon: BadgeCheck,
    title: "Made in Ohio, USA",
    description:
      "Crafted domestically with strict quality control and sustainable materials.",
  },
];

export function ValueProposition() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setContent(data);
      })
      .catch(() => null);
  }, []);

  const value = content?.valueProposition || defaultSiteContent.valueProposition;

  return (
    <section className="py-24 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src={value.imageUrl}
                alt="QuietWare premium noise-free dinner plates showing acoustic dampening design"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-background rounded-2xl shadow-xl p-6 max-w-[200px]"
            >
              <p className="text-4xl font-serif font-medium tabular-nums">
                90%
              </p>
              <p className="text-sm text-muted-foreground">Noise reduction vs. standard ceramic</p>
            </motion.div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-1 lg:order-2"
          >
            <span className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
              {value.badge}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mt-3 mb-6 tracking-tight text-pretty">
              {value.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg text-pretty">
              {value.description}
            </p>

            <div className="space-y-6 mb-10">
              {valueProps.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/about">
              <Button size="lg" className="group">
                Learn Our Story
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
