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
      const timer = setTimeout(() => {
        setIsFlipped(true)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      // 如果没选或没到翻牌阶段，就确保卡片呈背面
      setIsFlipped(false)
    }
  }, [isRevealed, isSelected])

  // 若提供了 position，用绝对定位把卡片放置在特定位置
  const positionStyle = position
    ? {
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        marginTop: "-96px",
        marginLeft: "-64px",
      }
    : {}

  return (
    <div
      className={cn("relative perspective-1000 w-32 h-48 cursor-pointer", position ? "m-0" : "")}
      onClick={onClick}
      style={positionStyle}
    >
      {/* 这里给父级容器做3D翻转：isFlipped时rotate-y-180 */}
      <motion.div
        className={cn(
          "absolute w-full h-full transition-all duration-500",
          "transform-style-3d" // 确保有自定义/全局CSS: .transform-style-3d { transform-style: preserve-3d; }
        )}
        animate={isFlipped ? { rotateY: 180 } : { rotateY: 0 }}
        initial={false}
      >
        {/* 
          Card Back （星星那面） 
          —— 当父容器 rotateY(0) 时，这一面朝向用户 
        */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden rounded-lg border-2",
            isSelected ? "border-white" : "border-white/30",
            "bg-gradient-to-b from-nova-purple/80 to-nova-blue/80 backdrop-blur-sm shadow-lg",
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
          Card Front （文字+含义面） 
          —— 父容器翻转 180 度时，这一面才朝向用户
        */}
        <div
          className="absolute w-full h-full rounded-lg bg-white/90 backdrop-blur-sm border-2 border-nova-purple/50 shadow-lg overflow-hidden rotate-y-180 backface-hidden"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
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
