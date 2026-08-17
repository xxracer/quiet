"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { defaultSiteContent, Testimonial } from "@/lib/site-content";

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    defaultSiteContent.testimonials
  );

  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.testimonials) setTestimonials(data.testimonials);
      })
      .catch(() => null);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mb-14"
        >
          <span className="text-sm text-background/60 uppercase tracking-widest font-medium">
            Customer stories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mt-3 mb-6 tracking-tight text-pretty">
            Loved by thousands of peaceful diners
          </h2>
          <p className="text-background/70 text-lg text-pretty">
            Join over 50,000 customers who replaced clatter with calm.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="bg-background/5 backdrop-blur-sm rounded-2xl p-8 border border-background/10"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-background/10">
                  <Image
                    src={
                      testimonial.imageUrl ||
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    }
                    alt={`Photo of ${testimonial.name}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-background/60">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "fill-star text-star"
                        : "text-background/20"
                    }`}
                  />
                ))}
              </div>

              <blockquote>
                <p className="text-background/80 leading-relaxed text-pretty">
                  “{testimonial.text}”
                </p>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
