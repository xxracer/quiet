"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Package, Plus, LogOut, ShoppingBag, Star, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, isAdmin, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/admin/login");
      return;
    }
    if (!isAdmin) {
      // Usuario logueado pero no es admin
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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-medium">Dashboard</h1>
          <p className="text-[#78716c]">Manage your product catalog</p>
        </div>
        <Button onClick={logOut} variant="outline">
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-[#e7e5e4]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f5f5f4] rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-[#292524]" />
            </div>
            <div>
              <p className="text-[#78716c] text-sm">Total Products</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-[#e7e5e4]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f5f5f4] rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-[#292524]" />
            </div>
            <div>
              <p className="text-[#78716c] text-sm">Orders</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-[#e7e5e4]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f5f5f4] rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-[#292524]" />
            </div>
            <div>
              <p className="text-[#78716c] text-sm">Reviews</p>
              <p className="text-2xl font-semibold">2,500+</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl border border-[#e7e5e4] mb-8">
        <div className="p-6 border-b border-[#e7e5e4] flex items-center justify-between">
          <h2 className="font-medium text-lg">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/cms" className="flex items-center gap-4 p-4 border border-[#e7e5e4] rounded-xl hover:bg-[#f5f5f4] transition-colors">
            <div className="w-12 h-12 bg-[#f5f5f4] rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-[#292524]" />
            </div>
            <div>
              <p className="font-medium">Edit Homepage</p>
              <p className="text-sm text-[#78716c]">Hero, images, FAQ, testimonials</p>
            </div>
          </Link>
          <Link href="/admin/products/new" className="flex items-center gap-4 p-4 border border-[#e7e5e4] rounded-xl hover:bg-[#f5f5f4] transition-colors">
            <div className="w-12 h-12 bg-[#f5f5f4] rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-[#292524]" />
            </div>
            <div>
              <p className="font-medium">Add Product</p>
              <p className="text-sm text-[#78716c]">Create a new product</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e7e5e4]">
        <div className="p-6 border-b border-[#e7e5e4] flex items-center justify-between">
          <h2 className="font-medium text-lg">Products</h2>
          <Link href="/admin/products/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f5f5f4]">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-[#78716c]">Product</th>
                <th className="text-left p-4 text-sm font-medium text-[#78716c]">Category</th>
                <th className="text-left p-4 text-sm font-medium text-[#78716c]">Price</th>
                <th className="text-left p-4 text-sm font-medium text-[#78716c]">Stock</th>
                <th className="text-left p-4 text-sm font-medium text-[#78716c]">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#e7e5e4]">
                <td className="p-4 text-[#78716c] text-sm">No products yet</td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
