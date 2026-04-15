"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none-disabled";

  const variants = {
    primary:
      "bg-[#292524] text-[#fafaf9] hover:bg-[#1c1917] focus-visible:ring-[#292524]",
    secondary:
      "bg-[#f5f5f4] text-[#292524] hover:bg-[#e7e5e4] focus-visible:ring-[#78716c]",
    outline:
      "border-2 border-[#292524] bg-transparent hover:bg-[#292524] hover:text-[#fafaf9]",
    ghost:
      "bg-transparent hover:bg-[#f5f5f4] text-[#292524]",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm rounded-md",
    md: "h-11 px-6 text-base rounded-lg",
    lg: "h-14 px-8 text-lg rounded-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
