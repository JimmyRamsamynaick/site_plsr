"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LuxuryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "gold";
  icon?: ReactNode;
}

export const LuxuryButton = ({
  children,
  onClick,
  className,
  variant = "primary",
  icon,
}: LuxuryButtonProps) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-red-900 border-transparent",
    outline: "bg-transparent text-white border-white/20 hover:border-primary/50 hover:bg-primary/10",
    gold: "bg-transparent text-gold border-gold/30 hover:border-gold hover:bg-gold/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative px-8 py-3 rounded-full font-sans font-medium transition-all duration-300 border flex items-center justify-center gap-2 group",
        variants[variant],
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
      
      {/* Glow effect on hover */}
      <div className={cn(
        "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10",
        variant === "primary" ? "bg-primary/30" : variant === "gold" ? "bg-gold/20" : "bg-white/10"
      )} />
    </motion.button>
  );
};
