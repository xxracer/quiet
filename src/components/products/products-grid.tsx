import { getAllProducts } from "@/lib/storage";
import { ProductCard } from "@/components/ui/product-card";
import { SortSelect } from "./sort-select";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

interface ProductsGridProps {
  initialCategory?: string;
  initialSort?: string;
}

const categories = [
  { value: "all", label: "All Products" },
  { value: "dinner-plates", label: "Dinner Plates" },
  { value: "bowls", label: "Bowls" },
  { value: "side-plates", label: "Side Plates" },
  { value: "sets", label: "Sets" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name-az", label: "Alphabetically, A-Z" },
];

function buildHref(category: string, sort: string) {
  const params = new URLSearchParams();
  if (category && category !== "all") params.set("category", category);
  if (sort && sort !== "featured") params.set("sort", sort);
  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

export async function ProductsGrid({
  initialCategory = "all",
  initialSort = "featured",
}: ProductsGridProps) {
  const selectedCategory = categories.some((c) => c.value === initialCategory)
    ? initialCategory
    : "all";
  const sortBy = sortOptions.some((s) => s.value === initialSort)
    ? initialSort
    : "featured";

  const allProducts = await getAllProducts();

  let filtered = [...allProducts];
  if (selectedCategory !== "all") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  switch (sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => ((b as any).rating || 0) - ((a as any).rating || 0));
      break;
    case "name-az":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "featured":
    default:
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-10">
      {/* Desktop filters */}
      <aside className="hidden lg:block">
        <div className="sticky top-36 space-y-6">
          <h3 className="font-semibold text-sm uppercase tracking-wide">Filter</h3>
          <div>
            <h4 className="text-sm font-medium mb-3">Category</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.value}>
                  <a
                    href={buildHref(cat.value, sortBy)}
                    className={cn(
                      "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      selectedCategory === cat.value
                        ? "bg-foreground text-background font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <details className="lg:hidden group">
            <summary className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors cursor-pointer list-none">
              <SlidersHorizontal className="w-4 h-4" />
              Filter
              {selectedCategory !== "all" && (
                <span className="ml-1 w-2 h-2 rounded-full bg-primary" />
              )}
            </summary>
            <div className="mt-3 p-4 bg-secondary/30 rounded-lg">
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.value}>
                    <a
                      href={buildHref(cat.value, sortBy)}
                      className={cn(
                        "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedCategory === cat.value
                          ? "bg-foreground text-background font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {cat.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <p className="text-sm text-muted-foreground">
            {filtered.length}{" "}
            {filtered.length === 1 ? "product" : "products"}
          </p>

          <SortSelect value={sortBy} category={selectedCategory} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((product, index) => (
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
      </div>
    </div>
  );
}
