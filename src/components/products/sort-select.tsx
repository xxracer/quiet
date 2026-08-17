"use client";

import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface SortSelectProps {
  value: string;
  category?: string;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name-az", label: "Alphabetically, A-Z" },
];

export function SortSelect({ value, category }: SortSelectProps) {
  const router = useRouter();

  const handleChange = (sort: string) => {
    const params = new URLSearchParams();
    if (category && category !== "all") params.set("category", category);
    if (sort && sort !== "featured") params.set("sort", sort);
    const query = params.toString();
    router.push(query ? `/products?${query}` : "/products");
  };

  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">Sort by</label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none px-4 py-2.5 pr-10 bg-secondary rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-foreground cursor-pointer"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
    </div>
  );
}
