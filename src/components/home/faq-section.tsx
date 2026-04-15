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
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data?.faq) setFaqs(data.faq); })
      .catch(() => null);
  }, []);

  return (
    <section className="py-24 bg-[#f5f5f4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#78716c] uppercase tracking-widest text-sm">FAQ</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-medium mt-4 mb-4">Common Questions</h2>
          <p className="text-[#78716c] text-lg">Everything you need to know about QuietWare dinnerware</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#fafaf9] rounded-xl overflow-hidden"
            >
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-6">
                  <span className="font-medium text-lg pr-4">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-[#78716c] transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-[#78716c] leading-relaxed">
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
          className="mt-12 text-center"
        >
          <p className="text-[#78716c] mb-4">Still have questions?</p>
          <Link href="/contact">
            <Button variant="outline">Contact Support</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
