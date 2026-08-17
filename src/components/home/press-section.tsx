"use client";

import { motion } from "framer-motion";

const pressLogos = [
  { name: "Forbes", initials: "F" },
  { name: "GQ", initials: "GQ" },
  { name: "Architectural Digest", initials: "AD" },
  { name: "Bon Appétit", initials: "BA" },
  { name: "The New York Times", initials: "NYT" },
];

export function PressSection() {
  return (
    <section className="py-16 md:py-20 bg-secondary/30 border-y border-border">
      <div className="container-main">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground uppercase tracking-widest font-medium mb-8"
        >
          As seen in
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {pressLogos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-center w-28 h-12 text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              <span className="font-serif text-2xl font-semibold tracking-tight">
                {logo.initials}
              </span>
              <span className="sr-only">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
