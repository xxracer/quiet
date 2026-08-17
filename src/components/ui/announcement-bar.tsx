"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

interface AnnouncementBarProps {
  message?: string;
  link?: string;
  linkText?: string;
}

export function AnnouncementBar({
  message = "Free US shipping on orders over $50",
  link = "/products",
  linkText = "Shop now",
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="bg-primary text-primary-foreground relative z-50"
    >
      <div className="container-main flex items-center justify-center gap-3 py-2.5 text-center text-sm font-medium">
        <span>{message}</span>
        {link && (
          <Link
            href={link}
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:no-underline"
          >
            {linkText}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
