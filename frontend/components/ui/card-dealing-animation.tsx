"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type TarotSpreadType, spreadInfo } from "./tarot-question-category"

interface CardDealingAnimationProps {
  onAnimationComplete: () => void
  cardCount: number
  spreadType: TarotSpreadType
}

export function CardDealingAnimation({ onAnimationComplete, cardCount, spreadType }: CardDealingAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  // Calculate how many cards to show in the animation (showing all 78 would be too much)
  const visibleCardCount = Math.min(cardCount, 30)

  // Get the number of cards needed for the selected spread
  const spreadCardCount = spreadInfo[spreadType].cardCount

  // Create an array of card positions
  const cardPositions = Array.from({ length: visibleCardCount }).map((_, i) => {
    // Calculate random positions across the screen
    const angle = Math.random() * Math.PI * 2 // Random angle in radians
    const distance = 30 + Math.random() * 50 // Random distance from center (percentage of viewport)

    // Convert polar coordinates to cartesian
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance

    // Random rotation
    const rotation = Math.random() * 360 - 180

    return { x, y, rotation, delay: i * 0.03 }
  })

  useEffect(() => {
    // Set a timeout to end the animation
    const timer = setTimeout(() => {
      setIsAnimating(false)
      setTimeout(onAnimationComplete, 500) // Give time for exit animations
    }, 2000)

    return () => clearTimeout(timer)
  }, [onAnimationComplete])

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Deck in the center */}
          <motion.div
            className="absolute w-32 h-48 rounded-lg bg-gradient-to-b from-nova-purple/80 to-nova-blue/80 border-2 border-white/30 shadow-lg"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-2 border-2 border-white/30 rounded-md flex items-center justify-center">
              <div className="w-16 h-24 border-2 border-white/50 rounded-md flex items-center justify-center">
                <motion.div
                  className="text-white/70 text-2xl"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  ✨
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Flying cards */}
          {cardPositions.map((pos, index) => (
            <motion.div
              key={index}
              className="absolute w-32 h-48 rounded-lg bg-gradient-to-b from-nova-purple/80 to-nova-blue/80 border-2 border-white/30 shadow-lg"
              initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
              animate={{
                x: `${pos.x}vw`,
                y: `${pos.y}vh`,
                rotate: pos.rotation,
                opacity: 1,
              }}
              transition={{
                duration: 1.2,
                delay: pos.delay,
                type: "spring",
                damping: 12,
              }}
            >
              <div className="absolute inset-2 border-2 border-white/30 rounded-md"></div>
            </motion.div>
          ))}

          {/* Spread type indicator */}
          <motion.div
            className="absolute bottom-10 left-0 right-0 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div className="inline-block px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full">
              <span className="text-white font-cinzel">
                {spreadInfo[spreadType].spreadName} • {spreadCardCount} Cards
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

