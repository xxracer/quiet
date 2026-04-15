"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { defaultSiteContent, Testimonial } from "@/lib/site-content";

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultSiteContent.testimonials);

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data?.testimonials) setTestimonials(data.testimonials); })
      .catch(() => null);
  }, []);

  return (
    <section className="py-24 bg-[#292524] text-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#a8a29e] uppercase tracking-widest text-sm">Testimonials</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-medium mt-4 mb-4">Loved by Thousands</h2>
          <p className="text-[#a8a29e] text-lg max-w-2xl mx-auto">Join over 50,000 happy customers who chose QuietWare for peaceful dining</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-[#fafaf9]/5 backdrop-blur-sm rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#fafaf9]/10" />
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#fafaf9]/20">
                  <Image src={testimonial.imageUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"} alt={testimonial.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-[#a8a29e]">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? "fill-[#fbbf24] text-[#fbbf24]" : "text-[#fafaf9]/20"}`} />
                ))}
              </div>
              <p className="text-[#d6d3d1] leading-relaxed">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 text-center"
        >
          <div>
            <p className="font-playfair text-4xl font-medium">50,000+</p>
            <p className="text-[#a8a29e] text-sm">Happy Customers</p>
          </div>
          <div>
            <p className="font-playfair text-4xl font-medium">4.9/5</p>
            <p className="text-[#a8a29e] text-sm">Average Rating</p>
          </div>
          <div>
            <p className="font-playfair text-4xl font-medium">2M+</p>
            <p className="text-[#a8a29e] text-sm">Plates Sold</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
