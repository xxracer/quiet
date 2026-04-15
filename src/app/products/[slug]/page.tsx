import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { ProductDetail } from "@/components/products/product-detail";
import { getProductBySlug } from "@/lib/storage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | QuietWare Dishes`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | QuietWare Dishes`,
      description: product.shortDescription,
      images: product.images[0] ? [{ url: product.images[0], alt: product.name }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 text-center py-16">
            <h1 className="text-2xl font-playfair mb-4">Product Not Found</h1>
            <p className="text-[#78716c]">This product doesn't exist or has been removed.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-16">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}
