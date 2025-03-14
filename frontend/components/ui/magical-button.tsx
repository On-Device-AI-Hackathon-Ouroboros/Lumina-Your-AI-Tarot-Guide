"use client"

import type React from "react"

import { motion } from "framer-motion"
import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface MagicalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "outline"
}

export function MagicalButton({ children, className, variant = "default", ...props }: MagicalButtonProps) {
  return (
    <motion.button
      className={cn(
        "magical-button",
        variant === "outline" && "bg-transparent border-2 border-nova-purple text-nova-purple hover:bg-nova-purple/10",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.button>
  )
}

