"use client"

import { useState } from "react"
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
  // 控制翻转的本地状态，默认 false -> 背面朝上
  const [isFlipped, setIsFlipped] = useState(false)

  // 如果你的父组件还要管理选中逻辑，可以在这里继续调用 onClick
  // 然后再根据需要让卡牌翻面
  const handleCardClick = () => {
    onClick()
    // 点击时：翻面/翻回
    setIsFlipped((prev) => !prev)
  }

  // 这部分仅用于牌阵布局，如果有的话
  const positionStyle = position
    ? {
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        marginTop: "-96px", // Half of card height
        marginLeft: "-64px", // Half of card width
      }
    : {}

  return (
    <div
      className={cn("relative perspective-1000 w-32 h-48 cursor-pointer", position ? "m-0" : "")}
      onClick={handleCardClick}
      style={positionStyle}
    >
      <motion.div
        className={cn(
          "absolute w-full h-full transition-all duration-500 transform-style-3d",
          // isFlipped 为 true 时，整体容器旋转180度，显示正面
          isFlipped ? "rotate-y-180" : "",
        )}
        initial={false}
        // 以下这段是你原本的“轻微上移”逻辑：如果想保留可留，不想要就删掉
        animate={isSelected ? { y: isRevealed ? 0 : -10 } : { y: 0 }}
        whileHover={!isSelected && !isRevealed ? { y: -10 } : {}}
      >
        {/* 
          --- 1）卡背（星星） ---
          当 isFlipped=false 时，背面可见；isFlipped=true 时，背面翻转到背后
        */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden rounded-lg border-2",
            isSelected ? "border-white" : "border-white/30",
            "bg-gradient-to-b from-nova-purple/80 to-nova-blue/80 backdrop-blur-sm shadow-lg",
          )}
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
          --- 2）卡正面 ---
          用 rotate-y-180 保证翻转后正面朝向用户
        */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-lg bg-white/90 backdrop-blur-sm border-2 border-nova-purple/50 shadow-lg overflow-hidden">
          {card.image ? (
            <div className="h-full flex flex-col">
              <h3 className="text-sm font-bold font-cinzel text-nova-purple text-center p-1 border-b border-nova-purple/30">
                {card.name}
              </h3>
              <div className="flex-1 relative">
                {/* 如果没图，就用占位符 */}
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
