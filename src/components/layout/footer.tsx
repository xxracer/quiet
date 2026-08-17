"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Truck, Shield, RotateCcw, Leaf } from "lucide-react";

const footerLinks = {
  shop: [
    { href: "/products", label: "All Products" },
    { href: "/products?category=dinner-plates", label: "Dinner Plates" },
    { href: "/products?category=bowls", label: "Bowls" },
    { href: "/products?category=side-plates", label: "Side Plates" },
    { href: "/products?category=sets", label: "Sets" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns" },
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/warranty", label: "5-Year Warranty" },
    { href: "/satisfaction-guarantee", label: "Satisfaction Guarantee" },
  ],
};

const trustBadges = [
  { icon: Truck, label: "Free US shipping over $50" },
  { icon: Shield, label: "5-year warranty" },
  { icon: RotateCcw, label: "30-day returns" },
  { icon: Leaf, label: "Made with sustainable materials" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/quietwaredishes",
    label: "Facebook",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/quietwaredishes",
    label: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/channel/UCMjxPrOzEhZM6f1as6bpFBw",
    label: "YouTube",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/justin-szilagyi-020b771b1",
    label: "LinkedIn",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-foreground text-background">
      {/* Trust bar */}
      <div className="border-b border-background/10">
        <div className="container-main py-5">
          <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {trustBadges.map((badge) => (
              <li key={badge.label} className="flex items-center gap-2 text-sm">
                <badge.icon className="w-4 h-4 text-background/70" />
                <span>{badge.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="container-main py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-medium mb-3">
              Join the Quiet Dining movement
            </h3>
            <p className="text-background/70 max-w-md">
              Get early access to new collections, exclusive offers, and tips for a quieter kitchen.
            </p>
          </div>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
          >
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-background/10">
        <div className="container-main py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4" aria-label="QuietWare Dishes home">
                <div className="w-9 h-9 bg-background rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-bold text-base font-serif">Q</span>
                </div>
                <span className="font-serif text-xl font-semibold">QuietWare</span>
              </Link>
              <p className="text-sm text-background/70 leading-relaxed mb-6">
                Premium noise-free dinnerware engineered for peaceful dining. Made with care in the USA.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 bg-background/10 hover:bg-background/20 rounded-full transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} QuietWare Dishes. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-background/60">
            <Link href="/privacy" className="hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-background transition-colors">
              Terms of Service
            </Link>
            <Link href="/shipping" className="hover:text-background transition-colors">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
