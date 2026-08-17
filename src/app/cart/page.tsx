import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { CartContent } from "@/components/cart/cart-content";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review your QuietWare cart. Premium noise-free dinnerware with free US shipping over $50.",
  alternates: {
    canonical: "https://quietwaredishes.com/cart",
  },
  openGraph: {
    url: "https://quietwaredishes.com/cart",
    title: "Shopping Cart",
    description:
      "Review your QuietWare cart. Premium noise-free dinnerware with free US shipping over $50.",
  },
};

export default function CartPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen pt-36 pb-16">
        <CartContent />
      </main>
      <Footer />
    </>
  );
}
