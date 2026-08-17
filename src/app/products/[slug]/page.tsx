import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { ProductDetail } from "@/components/products/product-detail";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/seo/structured-data";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo-schema";
import { getProductBySlug } from "@/lib/storage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name}`,
    description: product.shortDescription,
    alternates: {
      canonical: `https://quietwaredishes.com/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name}`,
      description: product.shortDescription,
      url: `https://quietwaredishes.com/products/${product.slug}`,
      images: product.images[0]
        ? [
            {
              url: product.images[0],
              alt: product.name,
              width: 800,
              height: 800,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name}`,
      description: product.shortDescription,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://quietwaredishes.com" },
    { name: "Products", url: "https://quietwaredishes.com/products" },
    {
      name: product.name,
      url: `https://quietwaredishes.com/products/${product.slug}`,
    },
  ]);

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen pt-36 pb-16">
        <div className="container-main">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.name },
            ]}
          />
          <ProductDetail product={product} />
        </div>
      </main>
      <Footer />
      <StructuredData data={[productSchema, breadcrumbSchema]} />
    </>
  );
}
