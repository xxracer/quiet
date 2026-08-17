"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
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
    "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary shadow-sm hover:shadow",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-border focus-visible:ring-muted-foreground",
    outline:
      "border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background focus-visible:ring-foreground",
    ghost:
      "bg-transparent text-foreground hover:bg-secondary focus-visible:ring-muted-foreground",
    dark:
      "bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-foreground shadow-sm hover:shadow",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm rounded-md",
    md: "h-11 px-6 text-base rounded-lg",
    lg: "h-14 px-8 text-lg rounded-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
