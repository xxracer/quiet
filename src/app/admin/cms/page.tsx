"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, X, Plus, ArrowLeft, Image as ImageIcon, Type, MessageSquare, Settings, Home, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { defaultSiteContent, SiteContent, Testimonial, FAQ } from "@/lib/site-content";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

type Tab = "hero" | "hero-images" | "featured" | "value" | "faq" | "testimonials" | "cta" | "footer" | "products";

export default function CMSPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/admin/login");
      return;
    }
    if (!isAdmin) {
      router.push("/admin/login?error=unauthorized");
      return;
    }
    fetchSiteContent();
    fetchHeroImages();
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

  const fetchSiteContent = async () => {
    try {
      const res = await fetch("/api/site-content");
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHeroImages = async () => {
    try {
      const res = await fetch("/api/hero-images?action=list");
      if (res.ok) {
        const data = await res.json();
        setHeroImages(data.images?.map((img: any) => img.url) || []);
      }
    } catch (error) {
      console.error("Failed to fetch hero images:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Changes saved successfully!" });
      } else {
        throw new Error("Save failed");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save changes" });
    } finally {
      setSaving(false);
    }
  };

  const addFAQ = () => {
    const newFAQ: FAQ = { id: `faq_${Date.now()}`, question: "", answer: "" };
    setContent({ ...content, faq: [...content.faq, newFAQ] });
  };

  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    const newFAQ = [...content.faq];
    newFAQ[index] = { ...newFAQ[index], [field]: value };
    setContent({ ...content, faq: newFAQ });
  };

  const removeFAQ = (index: number) => {
    setContent({ ...content, faq: content.faq.filter((_, i) => i !== index) });
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = { id: `test_${Date.now()}`, name: "", location: "", text: "", rating: 5, imageUrl: "" };
    setContent({ ...content, testimonials: [...content.testimonials, newTestimonial] });
  };

  const updateTestimonial = (index: number, field: keyof Testimonial, value: any) => {
    const newTestimonials = [...content.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setContent({ ...content, testimonials: newTestimonials });
  };

  const removeTestimonial = (index: number) => {
    setContent({ ...content, testimonials: content.testimonials.filter((_, i) => i !== index) });
  };

  const handleUploadHeroImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("action", "upload");

      const res = await fetch("/api/hero-images", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const newImages = [...heroImages, data.url];
        setHeroImages(newImages);
        setContent({
          ...content,
          hero: { ...content.hero, images: newImages },
        });
        setMessage({ type: "success", text: "Image uploaded successfully!" });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to upload image" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveHeroImage = async (index: number) => {
    const urlToRemove = heroImages[index];
    try {
      const filename = urlToRemove.split("/").pop();
      await fetch(`/api/hero-images?filename=${encodeURIComponent(`hero/${filename}`)}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to delete from blob:", error);
    }

    const newImages = heroImages.filter((_, i) => i !== index);
    setHeroImages(newImages);
    setContent({
      ...content,
      hero: { ...content.hero, images: newImages },
    });
  };

  const handleSetStaticHeroImage = (url: string) => {
    setContent({
      ...content,
      hero: { ...content.hero, staticImage: url, images: [] },
    });
  };

  const handleSetCarouselMode = () => {
    setContent({
      ...content,
      hero: { ...content.hero, staticImage: undefined, images: heroImages },
    });
  };

  const tabs = [
    { id: "hero", label: "Hero", icon: Home },
    { id: "hero-images", label: "Hero Images", icon: ImageIcon },
    { id: "featured", label: "Featured", icon: ImageIcon },
    { id: "value", label: "Value Prop", icon: Type },
    { id: "faq", label: "FAQ", icon: MessageSquare },
    { id: "testimonials", label: "Reviews", icon: MessageSquare },
    { id: "cta", label: "CTA", icon: Settings },
    { id: "footer", label: "Footer", icon: Settings },
    { id: "products", label: "Products", icon: Package },
  ] as const;

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
          <Link href="/admin" className="inline-flex items-center gap-2 text-[#78716c] hover:text-[#292524] mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-playfair text-3xl font-medium">Site Content Editor</h1>
          <p className="text-[#78716c]">Edit all homepage content</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeTab === tab.id ? "bg-[#292524] text-white" : "bg-[#f5f5f4] text-[#78716c] hover:bg-[#e7e5e4]"}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-[#e7e5e4] p-8"
      >
        {activeTab === "hero" && (
          <div className="space-y-6">
            <h2 className="font-medium text-lg">Hero Section</h2>
            <div className="mb-4 p-4 bg-[#f5f5f4] rounded-lg">
              <p className="text-sm text-[#78716c]">
                Configura las imágenes del hero en la pestaña <strong>"Hero Images"</strong>.
                Puedes usar un carousel con múltiples imágenes o una imagen estática.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Badge Text</label>
                <input type="text" value={content.hero.badge} onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title Line 1</label>
                <input type="text" value={content.hero.title1} onChange={(e) => setContent({ ...content, hero: { ...content.hero, title1: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title Line 2</label>
                <input type="text" value={content.hero.title2} onChange={(e) => setContent({ ...content, hero: { ...content.hero, title2: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title Line 3</label>
                <input type="text" value={content.hero.title3} onChange={(e) => setContent({ ...content, hero: { ...content.hero, title3: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea rows={3} value={content.hero.description} onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">CTA Button 1 Text</label>
                <input type="text" value={content.hero.cta1Text} onChange={(e) => setContent({ ...content, hero: { ...content.hero, cta1Text: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CTA Button 1 Link</label>
                <input type="text" value={content.hero.cta1Link} onChange={(e) => setContent({ ...content, hero: { ...content.hero, cta1Link: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CTA Button 2 Text</label>
                <input type="text" value={content.hero.cta2Text} onChange={(e) => setContent({ ...content, hero: { ...content.hero, cta2Text: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CTA Button 2 Link</label>
                <input type="text" value={content.hero.cta2Link} onChange={(e) => setContent({ ...content, hero: { ...content.hero, cta2Link: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hero Image URL</label>
              <input type="url" value={content.hero.imageUrl} onChange={(e) => setContent({ ...content, hero: { ...content.hero, imageUrl: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              {content.hero.imageUrl && <img src={content.hero.imageUrl} alt="Hero preview" className="mt-4 w-full max-w-md rounded-lg" />}
            </div>
          </div>
        )}

        {activeTab === "hero-images" && (
          <div className="space-y-6">
            <h2 className="font-medium text-lg">Hero Images</h2>
            <p className="text-sm text-[#78716c]">
              Sube imágenes para el hero. Puedes usar múltiples imágenes (carousel) o una sola imagen estática.
            </p>

            {/* Upload */}
            <div className="border border-[#e7e5e4] rounded-lg p-6">
              <label className="block text-sm font-medium mb-2">Subir nueva imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadHeroImage}
                disabled={uploading}
                className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]"
              />
              {uploading && (
                <div className="mt-2 text-sm text-[#78716c]">Subiendo imagen...</div>
              )}
            </div>

            {/* Mode selection */}
            <div className="border border-[#e7e5e4] rounded-lg p-6">
              <label className="block text-sm font-medium mb-3">Modo de visualización</label>
              <div className="flex gap-4">
                <button
                  onClick={handleSetCarouselMode}
                  className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                    content.hero.images && content.hero.images.length > 0 && !content.hero.staticImage
                      ? "border-[#292524] bg-[#f5f5f4]"
                      : "border-[#e7e5e4] hover:border-[#a8a29e]"
                  }`}
                >
                  <ImageIcon className="w-6 h-6 mb-2" />
                  <p className="font-medium">Carousel</p>
                  <p className="text-xs text-[#78716c]">Múltiples imágenes rotativas</p>
                </button>
                <button
                  onClick={() => content.hero.staticImage && handleSetStaticHeroImage(content.hero.staticImage!)}
                  className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                    content.hero.staticImage
                      ? "border-[#292524] bg-[#f5f5f4]"
                      : "border-[#e7e5e4] hover:border-[#a8a29e]"
                  }`}
                >
                  <Type className="w-6 h-6 mb-2" />
                  <p className="font-medium">Imagen Estática</p>
                  <p className="text-xs text-[#78716c]">Una sola imagen fija</p>
                </button>
              </div>
            </div>

            {/* Images list */}
            {heroImages.length > 0 && (
              <div className="border border-[#e7e5e4] rounded-lg p-6">
                <h3 className="font-medium mb-4">Imágenes subidas ({heroImages.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {heroImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt={`Hero ${index + 1}`} className="w-full aspect-video object-cover rounded-lg" />
                      <button
                        onClick={() => handleRemoveHeroImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSetStaticHeroImage(url)}
                        className="absolute bottom-2 right-2 p-1.5 bg-[#292524] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Usar como imagen estática"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {heroImages.length === 0 && (
              <div className="border border-[#e7e5e4] rounded-lg p-8 text-center">
                <ImageIcon className="w-12 h-12 text-[#78716c] mx-auto mb-4" />
                <p className="text-[#78716c]">No hay imágenes subidas. Sube una imagen para comenzar.</p>
              </div>
            )}

            {/* Preview */}
            {content.hero.staticImage && (
              <div className="border border-[#e7e5e4] rounded-lg p-6">
                <h3 className="font-medium mb-4">Vista previa (Imagen estática)</h3>
                <img src={content.hero.staticImage} alt="Static preview" className="w-full max-w-md rounded-lg" />
              </div>
            )}
          </div>
        )}

        {activeTab === "featured" && (
          <div className="space-y-6">
            <h2 className="font-medium text-lg">Featured Products Section</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input type="text" value={content.featuredProducts.title} onChange={(e) => setContent({ ...content, featuredProducts: { ...content.featuredProducts, title: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <textarea rows={2} value={content.featuredProducts.subtitle} onChange={(e) => setContent({ ...content, featuredProducts: { ...content.featuredProducts, subtitle: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CTA Button Text</label>
              <input type="text" value={content.featuredProducts.ctaText} onChange={(e) => setContent({ ...content, featuredProducts: { ...content.featuredProducts, ctaText: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
            <p className="text-sm text-[#78716c]">Note: Products are managed in the Products section.</p>
          </div>
        )}

        {activeTab === "value" && (
          <div className="space-y-6">
            <h2 className="font-medium text-lg">Value Proposition Section</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Badge</label>
              <input type="text" value={content.valueProposition.badge} onChange={(e) => setContent({ ...content, valueProposition: { ...content.valueProposition, badge: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input type="text" value={content.valueProposition.title} onChange={(e) => setContent({ ...content, valueProposition: { ...content.valueProposition, title: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea rows={4} value={content.valueProposition.description} onChange={(e) => setContent({ ...content, valueProposition: { ...content.valueProposition, description: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input type="url" value={content.valueProposition.imageUrl} onChange={(e) => setContent({ ...content, valueProposition: { ...content.valueProposition, imageUrl: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              {content.valueProposition.imageUrl && <img src={content.valueProposition.imageUrl} alt="Value prop preview" className="mt-4 w-full max-w-md rounded-lg" />}
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-lg">FAQ Section</h2>
              <Button onClick={addFAQ} size="sm"><Plus className="w-4 h-4 mr-2" />Add FAQ</Button>
            </div>
            {content.faq.map((faq, index) => (
              <div key={faq.id} className="border border-[#e7e5e4] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-sm">FAQ #{index + 1}</span>
                  <button onClick={() => removeFAQ(index)} className="text-red-500 hover:text-red-600"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#78716c] mb-1">Question</label>
                    <input type="text" value={faq.question} onChange={(e) => updateFAQ(index, "question", e.target.value)} className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#78716c] mb-1">Answer</label>
                    <textarea rows={3} value={faq.answer} onChange={(e) => updateFAQ(index, "answer", e.target.value)} className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-lg">Testimonials Section</h2>
              <Button onClick={addTestimonial} size="sm"><Plus className="w-4 h-4 mr-2" />Add Review</Button>
            </div>
            {content.testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="border border-[#e7e5e4] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-sm">Review #{index + 1}</span>
                  <button onClick={() => removeTestimonial(index)} className="text-red-500 hover:text-red-600"><X className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#78716c] mb-1">Name</label>
                    <input type="text" value={testimonial.name} onChange={(e) => updateTestimonial(index, "name", e.target.value)} className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#78716c] mb-1">Location</label>
                    <input type="text" value={testimonial.location} onChange={(e) => updateTestimonial(index, "location", e.target.value)} className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[#78716c] mb-1">Review Text</label>
                    <textarea rows={3} value={testimonial.text} onChange={(e) => updateTestimonial(index, "text", e.target.value)} className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#78716c] mb-1">Rating (1-5)</label>
                    <input type="number" min="1" max="5" value={testimonial.rating} onChange={(e) => updateTestimonial(index, "rating", parseInt(e.target.value))} className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#78716c] mb-1">Photo URL</label>
                    <input type="url" value={testimonial.imageUrl} onChange={(e) => updateTestimonial(index, "imageUrl", e.target.value)} className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "cta" && (
          <div className="space-y-6">
            <h2 className="font-medium text-lg">Call to Action Section</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input type="text" value={content.cta.title} onChange={(e) => setContent({ ...content, cta: { ...content.cta, title: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea rows={2} value={content.cta.description} onChange={(e) => setContent({ ...content, cta: { ...content.cta, description: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <input type="text" value={content.cta.ctaText} onChange={(e) => setContent({ ...content, cta: { ...content.cta, ctaText: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Button Link</label>
                <input type="text" value={content.cta.ctaLink} onChange={(e) => setContent({ ...content, cta: { ...content.cta, ctaLink: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "footer" && (
          <div className="space-y-6">
            <h2 className="font-medium text-lg">Footer</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea rows={3} value={content.footer.description} onChange={(e) => setContent({ ...content, footer: { ...content.footer, description: e.target.value } })} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292524]" />
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-lg">Product Management</h2>
                <p className="text-[#78716c] text-sm">Manage your products, edit details, or delete them</p>
              </div>
              <Link href="/admin/cms/products">
                <Button>
                  <Package className="w-4 h-4 mr-2" />
                  Manage Products
                </Button>
              </Link>
            </div>
            <div className="bg-[#f5f5f4] rounded-xl p-8 text-center">
              <Package className="w-12 h-12 text-[#78716c] mx-auto mb-4" />
              <p className="text-[#78716c]">Click "Manage Products" to view, edit, or delete products</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
