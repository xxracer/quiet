import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { ProductsGrid } from "@/components/products/products-grid";

export const metadata: Metadata = {
  title: "Shop All Products | QuietWare Dishes",
  description:
    "Browse our complete collection of noise-free dinnerware. Premium quiet plates, bowls, and sets. Free US shipping on orders over $50.",
};

export default function ProductsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-medium mb-4">
              All Products
            </h1>
            <p className="text-[#78716c] text-lg max-w-2xl">
              Discover our complete collection of noise-free dinnerware,
              engineered for peaceful dining without compromising on style or
              quality.
            </p>
          </div>
          <ProductsGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
