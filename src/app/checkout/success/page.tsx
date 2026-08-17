import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { CheckoutSuccessContent } from "@/components/checkout/checkout-success-content";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description:
    "Thank you for your order. Your QuietWare noise-free dinnerware is being prepared for shipment.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://quietwaredishes.com/checkout/success",
  },
  openGraph: {
    title: "Order Confirmed | QuietWare Dishes",
    description:
      "Thank you for your order. Your QuietWare noise-free dinnerware is being prepared for shipment.",
    url: "https://quietwaredishes.com/checkout/success",
  },
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen pt-24 pb-16 flex items-center">
        <CheckoutSuccessContent />
      </main>
      <Footer />
    </>
  );
}
