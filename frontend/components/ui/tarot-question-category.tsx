"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export type TarotSpreadType = "general" | "love" | "career" | "choices" | "spiritual"

interface SpreadInfo {
  name: string
  description: string
  cardCount: number
  spreadName: string
}

export const spreadInfo: Record<TarotSpreadType, SpreadInfo> = {
  general: {
    name: "General Reading",
    description: "Past, Present, Future - understand your journey's timeline",
    cardCount: 3,
    spreadName: "Time Flow Spread",
  },
  love: {
    name: "Love & Relationships",
    description: "Explore the dynamics of your relationships and romantic connections",
    cardCount: 4,
    spreadName: "Lovers Pyramid",
  },
  career: {
    name: "Career & Wealth",
    description: "Insights into your professional path and financial prospects",
    cardCount: 5,
    spreadName: "Wealth Tree Spread",
  },
  choices: {
    name: "Life Choices",
    description: "Guidance when facing important decisions or crossroads",
    cardCount: 5,
    spreadName: "Two Paths Spread",
  },
  spiritual: {
    name: "Mind, Body & Spirit",
    description: "Explore your personal growth and spiritual development",
    cardCount: 4,
    spreadName: "Mind-Body-Spirit Spread",
  },
}

interface TarotQuestionCategoryProps {
  onSelectCategory: (category: TarotSpreadType) => void
}

export function TarotQuestionCategory({ onSelectCategory }: TarotQuestionCategoryProps) {
  const [hoveredCategory, setHoveredCategory] = useState<TarotSpreadType | null>(null)

  return (
    <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="mb-6 text-2xl font-bold text-center font-cinzel">What would you like to explore?</h2>

      <p className="mb-8 text-center font-parisienne text-xl">
        Choose a category for your tarot reading, and Nova will reveal the cards that illuminate your path.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {(Object.keys(spreadInfo) as TarotSpreadType[]).map((category) => (
          <motion.div
            key={category}
            className="relative p-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            onClick={() => onSelectCategory(category)}
            onHoverStart={() => setHoveredCategory(category)}
            onHoverEnd={() => setHoveredCategory(null)}
          >
            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-nova-purple/20 to-nova-blue/20"
              animate={{
                opacity: hoveredCategory === category ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative z-10">
              <h3 className="mb-2 text-xl font-bold font-cinzel text-nova-purple">{spreadInfo[category].name}</h3>

              <p className="mb-4 text-sm">{spreadInfo[category].description}</p>

              <div className="text-xs text-nova-purple/80 font-medium">
                {spreadInfo[category].cardCount} Card {spreadInfo[category].spreadName}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

