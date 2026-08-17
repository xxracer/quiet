"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    number: "01",
    title: "Acoustic Core",
    description: "Multi-layer dampening core absorbs clatter at the source.",
  },
  {
    number: "02",
    title: "Stack-Friendly Base",
    description: "Soft-contact base reduces stacking noise in cabinets.",
  },
  {
    number: "03",
    title: "Dishwasher Safe",
    description: "Premium glaze stands up to daily dishwasher cycles.",
  },
  {
    number: "04",
    title: "USA Crafted",
    description: "Shaped and finished in Ohio by skilled artisans.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square bg-secondary rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&h=900&fit=crop"
              alt="Annotated QuietWare plate showing acoustic core, stack-friendly base, glaze surface, and USA craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm text-muted-foreground uppercase tracking-widest font-medium"
            >
              Engineering
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl font-medium mt-3 mb-10 tracking-tight text-pretty"
            >
              What makes QuietWare different
            </motion.h2>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
                  className="flex gap-5"
                >
                  <span className="text-2xl font-serif text-muted-foreground/50 font-medium tabular-nums">
                    {feature.number}
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
