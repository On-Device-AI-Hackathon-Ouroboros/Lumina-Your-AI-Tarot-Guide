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
  // 如果你还要在点了之后再延迟翻出来，也可保留isFlipped逻辑
  // 这里只演示：当 isRevealed && isSelected => 就显示"front"
  // 否则 => "back"

  // 用 framer-motion 做一点淡入动画
  // （若不需要动画，可直接 <div> 返回即可）
  const [showFront, setShowFront] = useState(false);

  useEffect(() => {
    // 当处于揭示 && 选中 => 显示正面
    // 否则 显示背面
    setShowFront(isRevealed && isSelected);
  }, [isRevealed, isSelected]);

  // 若提供了 position，用绝对定位
  const positionStyle = position
    ? {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
        marginTop: "-96px",  // Half of card height (48 * 2)
        marginLeft: "-64px", // Half of card width  (32 * 2)
      }
    : {};

  return (
    <div
      className={cn(
        "simple-card-container", // 我们在globals.css中定义的class
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
