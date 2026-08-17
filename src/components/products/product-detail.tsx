import Link from "next/link";
import { Star, Truck, Shield, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "./product-gallery";
import { AddToCart } from "./add-to-cart";
import { RelatedProducts } from "./related-products";
import { cn, formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  shortDescription: string;
  fullDescription?: string;
  specifications: {
    diameter?: string;
    material?: string;
    noiseReduction?: string;
    weight?: string;
    dishwasherSafe?: boolean;
  };
  rating?: number;
  reviews?: number;
  usaMade?: boolean;
  inStock?: boolean;
}

interface ProductDetailProps {
  product: Product;
}

const trustBadges = [
  { icon: Truck, label: "Free US shipping over $50" },
  { icon: Shield, label: "5-year warranty" },
  { icon: RotateCcw, label: "30-day returns" },
];

export function ProductDetail({ product }: ProductDetailProps) {
  const savings = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : 0;

  return (
    <div className="container-main">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <ProductGallery
          images={product.images}
          productName={product.name}
          badge={
            <>
              {savings > 0 && (
                <div className="absolute top-4 left-4 bg-sale text-white px-3 py-1.5 text-sm font-semibold uppercase tracking-wide">
                  Save {savings}%
                </div>
              )}
              {product.usaMade && !savings && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1.5 text-sm font-semibold uppercase tracking-wide">
                  USA Made
                </div>
              )}
            </>
          }
        />

        {/* Info */}
        <div className="lg:py-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {product.usaMade && (
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                Made in USA
              </span>
            )}
            <span className="bg-secondary text-muted-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              {product.category.replace("-", " ")}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-4 tracking-tight text-pretty">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < Math.floor(product.rating || 0)
                      ? "fill-star text-star"
                      : "text-border"
                  )}
                />
              ))}
            </div>
            <span className="font-medium tabular-nums">{product.rating || 0}</span>
            <span className="text-muted-foreground">({product.reviews || 0} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-semibold tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <>
                <span className="text-xl text-muted-foreground line-through tabular-nums">
                  {formatPrice(product.comparePrice)}
                </span>
                <span className="text-success font-medium text-sm">
                  Save {formatPrice(Number(product.comparePrice) - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-pretty">
            {product.shortDescription}
          </p>

          <div className="border-y border-border py-6 mb-8">
            <h3 className="font-semibold mb-4">Specifications</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
              {product.specifications.diameter && (
                <div>
                  <dt className="text-muted-foreground">Diameter</dt>
                  <dd className="font-medium">{product.specifications.diameter}</dd>
                </div>
              )}
              {product.specifications.material && (
                <div>
                  <dt className="text-muted-foreground">Material</dt>
                  <dd className="font-medium">{product.specifications.material}</dd>
                </div>
              )}
              {product.specifications.noiseReduction && (
                <div>
                  <dt className="text-muted-foreground">Noise Reduction</dt>
                  <dd className="font-medium">{product.specifications.noiseReduction}</dd>
                </div>
              )}
              {product.specifications.weight && (
                <div>
                  <dt className="text-muted-foreground">Weight</dt>
                  <dd className="font-medium">{product.specifications.weight}</dd>
                </div>
              )}
              <div>
                <dt className="text-muted-foreground">Dishwasher Safe</dt>
                <dd className="font-medium">
                  {product.specifications.dishwasherSafe ? "Yes" : "No"}
                </dd>
              </div>
            </dl>
          </div>

          <AddToCart
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              image: product.images[0] || "",
            }}
          />

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {trustBadges.map((badge) => (
              <li
                key={badge.label}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <badge.icon className="w-5 h-5 flex-shrink-0" />
                <span>{badge.label}</span>
              </li>
            ))}
          </ul>

          {product.fullDescription && (
            <div className="bg-secondary/30 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Why this is the best value</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {product.fullDescription}
              </p>
            </div>
          )}
        </div>
      </div>

      <RelatedProducts category={product.category} currentProductId={product.id} />
    </div>
  );
}
