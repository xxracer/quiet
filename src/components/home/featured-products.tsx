import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { getFeaturedProducts, getSiteContent } from "@/lib/storage";
import { defaultSiteContent } from "@/lib/site-content";

export async function FeaturedProducts() {
  const [allFeatured, siteContent] = await Promise.all([
    getFeaturedProducts(),
    getSiteContent(),
  ]);
  const featured = siteContent?.featuredProducts || defaultSiteContent.featuredProducts;

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
              Best Sellers
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mt-3 mb-4 tracking-tight text-pretty">
              {featured.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl text-pretty">
              {featured.subtitle}
            </p>
          </div>
          <Link href="/products" className="hidden md:block">
            <Button variant="outline" size="lg" className="group">
              {featured.ctaText}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {allFeatured.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
            {allFeatured.map((product, index) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  comparePrice: product.comparePrice,
                  images: product.images,
                  category: product.category,
                  usaMade: product.usaMade,
                }}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary/50 rounded-2xl">
            <p className="text-muted-foreground text-lg">
              No featured products yet. Add products from the admin panel.
            </p>
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/products">
            <Button variant="outline" size="lg" className="group">
              {featured.ctaText}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
