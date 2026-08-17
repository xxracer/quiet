"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { defaultSiteContent, SiteContent } from "@/lib/site-content";

export function CTASection() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setContent(data);
      })
      .catch(() => null);
  }, []);

  const cta = content?.cta || defaultSiteContent.cta;

  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-white blur-3xl"
        />
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-[1.1] tracking-tight text-pretty">
              {cta.title}
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
              {cta.description}
            </p>

            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
            >
              <label htmlFor="cta-email" className="sr-only">Email address</label>
              <input
                id="cta-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-4 bg-primary-foreground text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Subscribe
              </Button>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cta.ctaLink}>
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group"
                >
                  {cta.ctaText}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/products?category=sets">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
                >
                  View Complete Sets
                </Button>
              </Link>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm text-primary-foreground/70"
            >
              30-day satisfaction guarantee · 5-year warranty · Free US shipping over $50
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
