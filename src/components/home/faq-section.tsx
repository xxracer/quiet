"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { defaultSiteContent, FAQ } from "@/lib/site-content";

export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>(defaultSiteContent.faq);

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.faq) setFaqs(data.faq);
      })
      .catch(() => null);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-background" id="faq">
      <div className="container-main max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <span className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
            FAQ
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3 mb-4 tracking-tight text-pretty">
            Common questions
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Everything you need to know about QuietWare dinnerware
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="bg-secondary/40 rounded-xl overflow-hidden border border-border"
            >
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-6 list-none">
                  <span className="font-medium text-lg pr-4 text-pretty">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180 flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed text-pretty">
                  {faq.answer}
                </div>
              </details>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Link href="/contact">
            <Button variant="outline">Contact Support</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
