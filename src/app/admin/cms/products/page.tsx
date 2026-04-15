"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  shortDescription: string;
  specifications: {
    diameter?: string;
    material?: string;
    noiseReduction?: string;
    weight?: string;
    dishwasherSafe?: boolean;
  };
  featured: boolean;
  usaMade: boolean;
}

export default function CMSProductsPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/admin/login");
      return;
    }
    if (!isAdmin) {
      router.push("/admin/login?error=unauthorized");
      return;
    }
    fetchProducts();
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#292524] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#78716c]">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featured: !currentFeatured }),
      });
      setProducts(products.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#292524] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#78716c]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/cms" className="inline-flex items-center gap-2 text-[#78716c] hover:text-[#292524] mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to CMS
          </Link>
          <h1 className="font-playfair text-3xl font-medium">Manage Products</h1>
          <p className="text-[#78716c]">Edit and manage your products</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e7e5e4] p-12 text-center">
          <ImageIcon className="w-12 h-12 text-[#d6d3d1] mx-auto mb-4" />
          <h2 className="font-medium text-lg mb-2">No products yet</h2>
          <p className="text-[#78716c] mb-6">Add your first product to start selling</p>
          <Link href="/admin/products/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e7e5e4] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f5f5f4]">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-[#78716c]">Product</th>
                <th className="text-left p-4 text-sm font-medium text-[#78716c]">Category</th>
                <th className="text-left p-4 text-sm font-medium text-[#78716c]">Price</th>
                <th className="text-left p-4 text-sm font-medium text-[#78716c]">Featured</th>
                <th className="text-left p-4 text-sm font-medium text-[#78716c]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-[#e7e5e4]">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#f5f5f4] rounded-lg overflow-hidden flex-shrink-0">
                        {product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#78716c]">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-[#78716c]">{product.shortDescription.slice(0, 50)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-[#78716c]">{product.category.replace("-", " ")}</td>
                  <td className="p-4">
                    <span className="font-medium">{formatPrice(product.price)}</span>
                    {product.comparePrice && <span className="text-sm text-[#78716c] line-through ml-2">{formatPrice(product.comparePrice)}</span>}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleFeatured(product.id, product.featured)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${product.featured ? "bg-green-100 text-green-600" : "bg-[#f5f5f4] text-[#78716c]"}`}
                    >
                      {product.featured ? "Featured" : "No"}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
