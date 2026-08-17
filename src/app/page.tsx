import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ValueProposition } from "@/components/home/value-proposition";
import { FeaturesSection } from "@/components/home/features-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PressSection } from "@/components/home/press-section";
import { FAQSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";
import { StructuredData } from "@/components/seo/structured-data";
import { generateFAQSchema } from "@/lib/seo-schema";
import { defaultSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "QuietWare Dishes | Premium Noise-Free Dinnerware Made in USA",
  description:
    "Shop QuietWare premium noise-free plates, bowls, and dinnerware sets. Engineered in Ohio with acoustic dampening technology for peaceful dining. Free US shipping over $50.",
  alternates: {
    canonical: "https://quietwaredishes.com",
  },
  openGraph: {
    url: "https://quietwaredishes.com",
    title: "QuietWare Dishes | Premium Noise-Free Dinnerware Made in USA",
    description:
      "Premium noise-free dinnerware engineered in Ohio. The quietest way to dine, backed by a 5-year warranty and 30-day guarantee.",
  },
};

const faqSchema = generateFAQSchema(defaultSiteContent.faq);

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <FeaturedProducts />
        <ValueProposition />
        <FeaturesSection />
        <TestimonialsSection />
        <PressSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <StructuredData data={faqSchema} />
    </>
  );
}
