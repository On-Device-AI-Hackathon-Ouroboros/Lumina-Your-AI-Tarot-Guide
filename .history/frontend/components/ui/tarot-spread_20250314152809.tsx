"use client"

import { motion } from "framer-motion"
import { TarotCard } from "./tarot-card"
import { type TarotSpreadType, spreadInfo } from "./tarot-question-category"

interface TarotSpreadProps {
  spreadType: TarotSpreadType
  selectedCardIds: number[]
  isRevealingCards: boolean
  shuffledDeck: Array<{
    id: number
    name: string
    meaning: string
    image?: string
  }>
  onCardSelect: (cardId: number) => void
}

export function TarotSpread({
  spreadType,
  selectedCardIds,
  isRevealingCards,
  shuffledDeck,
  onCardSelect,
}: TarotSpreadProps) {
  const cardCount = spreadInfo[spreadType].cardCount

  // Get positions for each spread type
  const getPositions = () => {
    switch (spreadType) {
      case "general": // Time Flow - 3 cards in a row
        return [
          { x: -140, y: 0, rotation: 0 },
          { x: 0, y: 0, rotation: 0 },
          { x: 140, y: 0, rotation: 0 },
        ]

      case "love": // Lovers Pyramid - 4 cards in a pyramid
        return [
          { x: -70, y: 60, rotation: 0 },
          { x: 70, y: 60, rotation: 0 },
          { x: 0, y: -20, rotation: 0 },
          { x: 0, y: -100, rotation: 0 },
        ]

      case "career": // Wealth Tree - 5 cards in a tree shape
        return [
          { x: 0, y: 100, rotation: 0 }, // Trunk
          { x: -140, y: 0, rotation: -5 }, // Left branch
          { x: 140, y: 0, rotation: 5 }, // Right branch
          { x: -70, y: -80, rotation: -10 }, // Left leaf
          { x: 70, y: -80, rotation: 10 }, // Right leaf
        ]

      case "choices": // Two Paths - 5 cards in a V shape
        return [
          { x: 0, y: 0, rotation: 0 }, // Center
          { x: -80, y: 80, rotation: -15 }, // Left path 1
          { x: -160, y: 160, rotation: -30 }, // Left path 2
          { x: 80, y: 80, rotation: 15 }, // Right path 1
          { x: 160, y: 160, rotation: 30 }, // Right path 2
        ]

      case "spiritual": // Mind-Body-Spirit - 4 cards in a cross
        return [
          { x: 0, y: -100, rotation: 0 }, // Mind (top)
          { x: 0, y: 100, rotation: 0 }, // Body (bottom)
          { x: -100, y: 0, rotation: 0 }, // Spirit (left)
          { x: 100, y: 0, rotation: 0 }, // Integration (right)
        ]

      default:
        return Array(cardCount)
          .fill(0)
          .map((_, i) => ({
            x: (i - (cardCount - 1) / 2) * 100,
            y: 0,
            rotation: 0,
          }))
    }
  }

  const positions = getPositions()

  // If we have selected cards, show them in the spread positions
  if (selectedCardIds.length > 0) {
    return (
      <motion.div
        className="relative w-full h-[400px] mb-8 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {selectedCardIds.map((cardId, index) => {
          if (index >= positions.length) return null
          const card = shuffledDeck.find((c) => c.id === cardId)!
          return (
            <TarotCard
              key={cardId}
              card={card}
              isSelected={true}
              isRevealed={isRevealingCards}
              onClick={() => {}}
              position={positions[index]}
            />
          )
        })}
      </motion.div>
    )
  }

  // Otherwise, show empty positions for the spread
  return (
    <motion.div
      className="relative w-full h-[400px] mb-8 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {positions.map((position, index) => (
        <motion.div
          key={index}
          className="absolute w-32 h-48 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
            top: "50%",
            left: "50%",
            marginTop: "-96px", // Half of height
            marginLeft: "-64px", // Half of width
          }}
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: [
              "0 0 0px rgba(138, 124, 219, 0)",
              "0 0 20px rgba(138, 124, 219, 0.5)",
              "0 0 0px rgba(138, 124, 219, 0)",
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            scale: { duration: 0.2 },
          }}
        >
          <div className="h-full flex items-center justify-center text-white/50 text-sm font-cinzel">
            Card {index + 1}
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 text-center text-sm text-white/70 font-cinzel">
        {spreadInfo[spreadType].spreadName} • Select {cardCount} cards from the deck below
      </div>
    </motion.div>
  )
}

