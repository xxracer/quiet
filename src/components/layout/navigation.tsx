"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User } from "lucide-react";
import { CartDrawer } from "@/components/ui/cart-drawer";
import { AnnouncementBar } from "@/components/ui/announcement-bar";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Shop All" },
  { href: "/products?category=dinner-plates", label: "Dinner Plates" },
  { href: "/products?category=bowls", label: "Bowls" },
  { href: "/products?category=sets", label: "Sets" },
  { href: "/about", label: "About" },
];

function isActiveLink(pathname: string, href: string) {
  if (href === "/products") {
    return pathname === "/products" || pathname.startsWith("/products/");
  }
  return pathname === href.split("?")[0];
}

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <AnnouncementBar />

      <nav
        className={cn(
          "transition-all duration-300 border-b",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-border shadow-sm"
            : "bg-background border-transparent"
        )}
        aria-label="Main navigation"
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="QuietWare Dishes home">
              <motion.div
                whileHover={{ rotate: 3 }}
                className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center"
              >
                <span className="text-background font-bold text-lg font-serif">Q</span>
              </motion.div>
              <span className="font-serif text-2xl font-semibold tracking-tight">
                QuietWare
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors py-2 group",
                      isActiveLink(pathname, link.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-current={isActiveLink(pathname, link.href) ? "page" : undefined}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-0.5 bg-foreground transition-all",
                        isActiveLink(pathname, link.href) ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="p-2 hover:bg-secondary rounded-full transition-colors hidden sm:flex"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/admin/login"
                className="p-2 hover:bg-secondary rounded-full transition-colors hidden sm:flex"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
              <CartDrawer />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-full max-w-sm bg-background z-50 lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-9 h-9 bg-foreground rounded-lg flex items-center justify-center">
                    <span className="text-background font-bold text-base font-serif">Q</span>
                  </div>
                  <span className="font-serif text-xl font-semibold">QuietWare</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="p-6" aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block py-3 px-4 rounded-lg text-lg font-medium transition-colors",
                          isActiveLink(pathname, link.href)
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                        aria-current={isActiveLink(pathname, link.href) ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Free US shipping on orders over{" "}
                  <span className="font-semibold text-foreground">$50</span>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
