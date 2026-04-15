import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ValueProposition } from "@/components/home/value-proposition";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FAQSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "QuietWare Dishes | Noise-Free Premium Dinnerware for US Homes",
  description:
    "Discover QuietWare premium noise-free plates and dinnerware. Engineered with acoustic dampening technology for peaceful dining. The #1 quality-price choice in the USA.",
};

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <ValueProposition />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
