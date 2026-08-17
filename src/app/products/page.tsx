import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { ProductsGrid } from "@/components/products/products-grid";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/seo/structured-data";
import { generateCollectionPageSchema } from "@/lib/seo-schema";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop All Noise-Free Dinnerware",
  description:
    "Browse our complete collection of noise-free dinnerware. Premium quiet plates, bowls, side plates, and sets. Made in the USA with free shipping over $50.",
  alternates: {
    canonical: "https://quietwaredishes.com/products",
  },
  openGraph: {
    url: "https://quietwaredishes.com/products",
    title: "Shop All Noise-Free Dinnerware",
    description:
      "Browse our complete collection of noise-free dinnerware. Premium quiet plates, bowls, and sets made in the USA.",
    images: ["/og-image.jpg"],
  },
};

const collectionSchema = generateCollectionPageSchema(
  "Noise-Free Dinnerware Collection",
  "Browse all QuietWare noise-free plates, bowls, side plates, and dinnerware sets.",
  products
);

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, sort } = await searchParams;
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen pt-36 pb-16">
        <div className="container-main">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "All Products" },
            ]}
          />

          <div className="mb-10">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 text-pretty">
              Products
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
              Discover our complete collection of noise-free dinnerware, engineered
              for peaceful dining without compromising on style or quality.
            </p>
          </div>

          <ProductsGrid initialCategory={category} initialSort={sort} />
        </div>
      </main>
      <Footer />
      <StructuredData data={collectionSchema} />
    </>
  );
}
