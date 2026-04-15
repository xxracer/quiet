"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

const categories = [
  { value: "dinner-plates", label: "Dinner Plates" },
  { value: "bowls", label: "Bowls" },
  { value: "side-plates", label: "Side Plates" },
  { value: "sets", label: "Sets" },
];

export default function NewProductPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    comparePrice: "",
    category: "dinner-plates" as const,
    shortDescription: "",
    fullDescription: "",
    diameter: "",
    material: "",
    noiseReduction: "",
    weight: "",
    dishwasherSafe: true,
    featured: false,
    usaMade: true,
  });

  useEffect(() => {
    if (!user) {
      router.push("/admin/login");
      return;
    }
    if (!isAdmin) {
      router.push("/admin/login?error=unauthorized");
      return;
    }
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("folder", "products");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formDataUpload });
      const data = await res.json();
      if (data.url) {
        setImages([...images, data.url]);
      } else {
        setMessage({ type: "error", text: "Upload failed" });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage({ type: "error", text: "Upload failed" });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
          images,
          specifications: {
            diameter: formData.diameter || undefined,
            material: formData.material,
            noiseReduction: formData.noiseReduction,
            weight: formData.weight,
            dishwasherSafe: formData.dishwasherSafe,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        setMessage({ type: "success", text: "Product saved successfully!" });
        setTimeout(() => router.push("/admin"), 1500);
      } else {
        const error = await res.json();
        setMessage({ type: "error", text: error.error || "Failed to save product" });
      }
    } catch (error: any) {
      console.error("Failed to create product:", error);
      if (error.name === "AbortError") {
        setMessage({ type: "error", text: "Request timed out. Please try again." });
      } else {
        setMessage({ type: "error", text: "Failed to save product" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/admin" className="inline-flex items-center gap-2 text-[#78716c] hover:text-[#292524] mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-[#e7e5e4] p-8"
      >
        <h1 className="font-playfair text-2xl font-medium mb-8">Add New Product</h1>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <input type="number" step="0.01" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Compare Price ($) <span className="text-[#78716c]">(optional)</span></label>
              <input type="number" step="0.01" value={formData.comparePrice} onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as any })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]">
                {categories.map((cat) => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Short Description</label>
            <textarea required rows={2} value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Full Description</label>
            <textarea required rows={4} value={formData.fullDescription} onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Images</label>
            <div className="flex flex-wrap gap-4 mb-4">
              {images.map((url, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <input
                type="url"
                placeholder="Paste image URL (e.g., from Unsplash)"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (imageUrlInput) {
                    setImages([...images, imageUrlInput]);
                    setImageUrlInput("");
                  }
                }}
              >
                Add URL
              </Button>
            </div>
            <div className="text-[#78716c] text-sm mb-4">or upload a file:</div>
            <label className="w-24 h-24 border-2 border-dashed border-[#e7e5e4] rounded-lg flex items-center justify-center cursor-pointer hover:border-[#292524] transition-colors">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Upload className="w-6 h-6 text-[#78716c]" />
            </label>
          </div>

          <div className="border-t border-[#e7e5e4] pt-6">
            <h3 className="font-medium mb-4">Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-[#78716c] mb-1">Diameter</label>
                <input type="text" placeholder='10.5"' value={formData.diameter} onChange={(e) => setFormData({ ...formData, diameter: e.target.value })} className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
              <div>
                <label className="block text-sm text-[#78716c] mb-1">Material</label>
                <input type="text" required placeholder="Ceramic composite" value={formData.material} onChange={(e) => setFormData({ ...formData, material: e.target.value })} className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
              <div>
                <label className="block text-sm text-[#78716c] mb-1">Noise Reduction</label>
                <input type="text" required placeholder="90% noise reduction" value={formData.noiseReduction} onChange={(e) => setFormData({ ...formData, noiseReduction: e.target.value })} className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-2 focus:ring-[#292524]" />
              </div>
              <div>
                <label className="block text-sm text-[#78716c] mb-1">Weight</label>
                <input type="text" required placeholder="18 oz" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2"><input type="checkbox" checked={formData.dishwasherSafe} onChange={(e) => setFormData({ ...formData, dishwasherSafe: e.target.checked })} className="w-4 h-4" /><span className="text-sm">Dishwasher Safe</span></label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4" /><span className="text-sm">Featured Product</span></label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={formData.usaMade} onChange={(e) => setFormData({ ...formData, usaMade: e.target.checked })} className="w-4 h-4" /><span className="text-sm">Made in USA</span></label>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-[#e7e5e4]">
            <Link href="/admin"><Button type="button" variant="outline">Cancel</Button></Link>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Product"}</Button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}
