"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TarotCardProps {
  card: {
    id: number
    name: string
    meaning: string
    image?: string // Optional image URL
  }
  isSelected: boolean
  isRevealed: boolean
  onClick: () => void
  index?: number
  position?: { x: number; y: number; rotation: number } // For spread positioning
}

export function TarotCard({ card, isSelected, isRevealed, onClick, index = 0, position }: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (isRevealed && isSelected) {
      setIsFlipped(true)
    } else {
      setIsFlipped(false)
    }
  }, [isRevealed, isSelected])

  const positionStyle = position
    ? {
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        marginTop: "-96px",  // Half of card height
        marginLeft: "-64px", // Half of card width
      }
    : {}

  return (
    <div
      className={cn(
        "relative w-32 h-48 cursor-pointer",
        "transform-style-3d",
        position ? "m-0" : ""
      )}
      onClick={onClick}
      style={positionStyle}
    >
      <motion.div
        className="absolute w-full h-full"
        animate={isFlipped ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/*
          card back
        */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden rounded-lg border-2",
            isSelected ? "border-white" : "border-white/30",
            "bg-gradient-to-b from-nova-purple/80 to-nova-blue/80 backdrop-blur-sm shadow-lg"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-2 border-2 border-white/30 rounded-md flex items-center justify-center">
            <div className="w-16 h-24 border-2 border-white/50 rounded-md flex items-center justify-center">
              <motion.div
                className="text-white/70 text-2xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                ✨
              </motion.div>
            </div>
          </div>
        </div>

        {/*
          card front
        */}
        <div
          className="absolute w-full h-full rounded-lg bg-white/90 backdrop-blur-sm border-2 border-nova-purple/50 shadow-lg overflow-hidden"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          {card.image ? (
            <div className="h-full flex flex-col">
              <h3 className="text-sm font-bold font-cinzel text-nova-purple text-center p-1 border-b border-nova-purple/30">
                {card.name}
              </h3>
              <div className="flex-1 relative">
                <img
                  src={card.image || `/placeholder.svg?height=120&width=100&text=${encodeURIComponent(card.name)}`}
                  alt={card.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-center p-1 bg-white/80 text-gray-700">{card.meaning}</p>
            </div>
          ) : (
            <div className="p-3 h-full flex flex-col">
              <h3 className="text-sm font-bold font-cinzel text-nova-purple text-center mb-2 border-b border-nova-purple/30 pb-1">
                {card.name}
              </h3>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-nova-purple/20 flex items-center justify-center">
                  <span className="text-2xl">🔮</span>
                </div>
              </div>
              <p className="text-xs text-center mt-2 text-gray-700">{card.meaning}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
