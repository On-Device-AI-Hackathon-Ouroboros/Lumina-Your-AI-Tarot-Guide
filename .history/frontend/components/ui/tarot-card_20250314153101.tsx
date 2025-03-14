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
  const [showFront, setShowFront] = useState(false);

  useEffect(() => {
    setShowFront(isRevealed && isSelected);
  }, [isRevealed, isSelected]);

  const positionStyle = position
    ? {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
        marginTop: "-96px",
        marginLeft: "-64px",
      }
    : {};

  return (
    <div
      className={cn(
        "simple-card-container",
      )}
      style={positionStyle}
      onClick={onClick}
    >
      {showFront ? (
        /* 正面 */
        <motion.div
          className="simple-card-front"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* 标题 */}
          <h3 className="simple-card-front-title">
            {card.name}
          </h3>

          {/* 图片 */}
          <div className="simple-card-front-image-container">
            <img
              src={
                card.image ||
                `/placeholder.svg?height=120&width=100&text=${encodeURIComponent(card.name)}`
              }
              alt={card.name}
            />
          </div>

          {/* 含义 */}
          <p className="simple-card-front-meaning">{card.meaning}</p>
        </motion.div>
      ) : (
        /* 背面 */
        <motion.div
          className={cn(
            "simple-card-back",
            isSelected && "simple-card-back-selected"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="simple-card-back-inner">
            <motion.div
              className="text-white/70 text-2xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              ✨
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
