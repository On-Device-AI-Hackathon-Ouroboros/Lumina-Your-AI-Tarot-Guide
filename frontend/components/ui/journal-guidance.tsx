"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface JournalGuidanceProps {
  journalText: string
  onClose: () => void
}

export function JournalGuidance({ journalText, onClose }: JournalGuidanceProps) {
  const [guidanceQuestion, setGuidanceQuestion] = useState("")

  // Placeholder logic for generating guidance questions based on journal content
  useEffect(() => {
    // This would be replaced with actual AI logic in the future
    const wordCount = journalText.split(/\s+/).filter(Boolean).length
    const lowerText = journalText.toLowerCase()

    // Simple keyword-based question generation
    if (lowerText.includes("sad") || lowerText.includes("unhappy") || lowerText.includes("depressed")) {
      setGuidanceQuestion("Could you explore what might be contributing to these feelings of sadness?")
    } else if (lowerText.includes("happy") || lowerText.includes("joy") || lowerText.includes("excited")) {
      setGuidanceQuestion("What aspects of this situation bring you the most joy?")
    } else if (lowerText.includes("worry") || lowerText.includes("anxious") || lowerText.includes("stress")) {
      setGuidanceQuestion("What steps might help you address these concerns?")
    } else if (lowerText.includes("friend") || lowerText.includes("family") || lowerText.includes("relationship")) {
      setGuidanceQuestion("How has this relationship influenced your personal growth?")
    } else if (wordCount > 30) {
      setGuidanceQuestion("Is there a pattern or theme emerging in your thoughts?")
    } else {
      setGuidanceQuestion("What emotions are most present for you right now?")
    }
  }, [journalText])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative pointer-events-auto"
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 15 }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute rounded-full bg-nova-purple/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{ width: "220px", height: "220px", top: "-60px", left: "-60px" }}
          />

          {/* Inner orb */}
          <motion.div
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-nova-purple/80 to-nova-blue/80 backdrop-blur-md flex items-center justify-center shadow-lg"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            onClick={onClose}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-white/20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Sparkles */}
            <motion.div
              className="absolute w-full h-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white"
                  style={{
                    top: `${15 + Math.random() * 70}%`,
                    left: `${15 + Math.random() * 70}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Question bubble */}
          <motion.div
            className="absolute top-0 left-full ml-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-4 shadow-lg max-w-xs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-r-8 border-b-8 border-transparent border-r-white/20" />
            <p className="font-fell text-lg">{guidanceQuestion}</p>
            <div className="text-xs text-right italic opacity-70 mt-2">Tap the orb to dismiss</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

