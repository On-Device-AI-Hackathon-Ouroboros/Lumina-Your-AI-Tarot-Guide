"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MagicalButton } from "./magical-button"

interface TarotMeditationProps {
  questionCategory: string
  onComplete: () => void
}

export function TarotMeditation({ questionCategory, onComplete }: TarotMeditationProps) {
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [breathCount, setBreathCount] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const maxBreaths = 2 // Reducido a 2 ciclos en lugar de 3

  // Manage breathing animation cycle
  useEffect(() => {
    if (breathCount >= maxBreaths) {
      setIsReady(true)
      return
    }

    let timer: NodeJS.Timeout

    switch (breathingPhase) {
      case "inhale":
        timer = setTimeout(() => setBreathingPhase("hold"), 4000) // 4 seconds to inhale
        break
      case "hold":
        timer = setTimeout(() => setBreathingPhase("exhale"), 2000) // 2 seconds to hold
        break
      case "exhale":
        timer = setTimeout(() => setBreathingPhase("rest"), 4000) // 4 seconds to exhale
        break
      case "rest":
        timer = setTimeout(() => {
          setBreathingPhase("inhale")
          setBreathCount((prev) => prev + 1)
        }, 2000) // 2 seconds to rest
        break
    }

    return () => clearTimeout(timer)
  }, [breathingPhase, breathCount])

  const skipMeditation = () => {
    setBreathCount(maxBreaths)
  }
  // Get breathing instruction text
  const getBreathingText = () => {
    switch (breathingPhase) {
      case "inhale":
        return "Inhale slowly..."
      case "hold":
        return "Hold..."
      case "exhale":
        return "Exhale gently..."
      case "rest":
        return "Rest..."
    }
  }

  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-6 text-2xl font-bold text-center font-cinzel">Prepare Your Mind</h2>

      <p className="mb-8 text-center font-fell text-xl max-w-2xl">
        Close your eyes and take a moment to focus on your {questionCategory.toLowerCase()} question. Let your mind
        become clear as you breathe deeply.
      </p>

      <div className="relative flex flex-col items-center justify-center mb-12 h-64">
        {/* Breathing circle animation */}
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-nova-purple/30 to-nova-blue/30 backdrop-blur-sm border border-white/30"
          animate={{
            scale:
              breathingPhase === "inhale"
                ? [1, 1.5]
                : breathingPhase === "hold"
                  ? 1.5
                  : breathingPhase === "exhale"
                    ? [1.5, 1]
                    : 1,
            opacity: breathingPhase === "rest" ? [1, 0.7, 1] : 1,
          }}
          transition={{
            duration:
              breathingPhase === "inhale" || breathingPhase === "exhale"
                ? 4
                : breathingPhase === "hold" || breathingPhase === "rest"
                  ? 2
                  : 1,
            ease: "easeInOut",
          }}
          style={{ width: "200px", height: "200px" }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute rounded-full bg-white/10"
          animate={{
            scale:
              breathingPhase === "inhale"
                ? [0.7, 1.2]
                : breathingPhase === "hold"
                  ? 1.2
                  : breathingPhase === "exhale"
                    ? [1.2, 0.7]
                    : 0.7,
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            scale: {
              duration:
                breathingPhase === "inhale" || breathingPhase === "exhale"
                  ? 4
                  : breathingPhase === "hold" || breathingPhase === "rest"
                    ? 2
                    : 1,
              ease: "easeInOut",
            },
            opacity: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
          }}
          style={{ width: "150px", height: "150px" }}
        />

        {/* Breathing instruction text */}
        <motion.div
          className="absolute text-center text-white/90 font-fell text-2xl"
          key={breathingPhase} // Force re-render for animation
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {getBreathingText()}
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 flex space-x-2">
          {Array.from({ length: maxBreaths }).map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-white/50"
              animate={{
                backgroundColor: i < breathCount ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.3)",
                scale: i === breathCount && breathingPhase !== "rest" ? [1, 1.2, 1] : 1,
              }}
              transition={{
                scale: { duration: 1, repeat: i === breathCount ? Number.POSITIVE_INFINITY : 0 },
              }}
            />
          ))}
        </div>
      </div>
      {!isReady && <MagicalButton onClick={skipMeditation}>Skip Meditation</MagicalButton>}

      <AnimatePresence>
        {isReady && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-6 align-itmes-center text-center font-fell text-xl">
              With your question in mind, you are ready to consult the cards.
            </p>
            <div className="flex justify-center" >
              <MagicalButton onClick={onComplete}>Reveal the Cards</MagicalButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

