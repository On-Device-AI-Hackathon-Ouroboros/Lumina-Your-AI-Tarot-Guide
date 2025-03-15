"use client"

import { motion } from "framer-motion"

interface JournalSummaryProps {
  journalText: string
}

export function JournalSummary({ journalText }: JournalSummaryProps) {
  // Placeholder logic for generating keywords
  // This would be replaced with actual AI analysis in the future
  const generateKeywords = (text: string): string[] => {
    const possibleKeywords = [
      "reflection",
      "growth",
      "challenge",
      "balance",
      "harmony",
      "transition",
      "clarity",
      "insight",
      "healing",
      "renewal",
      "connection",
      "purpose",
      "patience",
      "courage",
      "acceptance",
      "gratitude",
      "mindfulness",
      "resilience",
      "transformation",
      "peace",
    ]

    // Simple logic to select 3 keywords based on text content
    // In a real implementation, this would use AI to analyze the text
    const lowerText = text.toLowerCase()
    const selectedKeywords = []

    // Try to find keywords based on content
    if (lowerText.includes("happy") || lowerText.includes("joy") || lowerText.includes("excited")) {
      selectedKeywords.push("joy")
    }
    if (lowerText.includes("sad") || lowerText.includes("unhappy") || lowerText.includes("depressed")) {
      selectedKeywords.push("healing")
    }
    if (lowerText.includes("worry") || lowerText.includes("anxious") || lowerText.includes("stress")) {
      selectedKeywords.push("balance")
    }
    if (lowerText.includes("angry") || lowerText.includes("frustrated") || lowerText.includes("upset")) {
      selectedKeywords.push("clarity")
    }
    if (lowerText.includes("hope") || lowerText.includes("optimistic") || lowerText.includes("looking forward")) {
      selectedKeywords.push("renewal")
    }
    if (lowerText.includes("friend") || lowerText.includes("family") || lowerText.includes("relationship")) {
      selectedKeywords.push("connection")
    }
    if (lowerText.includes("work") || lowerText.includes("job") || lowerText.includes("career")) {
      selectedKeywords.push("purpose")
    }
    if (lowerText.includes("goal") || lowerText.includes("dream") || lowerText.includes("aspiration")) {
      selectedKeywords.push("transformation")
    }
    if (lowerText.includes("challenge") || lowerText.includes("difficult") || lowerText.includes("struggle")) {
      selectedKeywords.push("resilience")
    }

    // Fill remaining slots with random keywords if needed
    while (selectedKeywords.length < 3) {
      const randomKeyword = possibleKeywords[Math.floor(Math.random() * possibleKeywords.length)]
      if (!selectedKeywords.includes(randomKeyword)) {
        selectedKeywords.push(randomKeyword)
      }
    }

    // Limit to 3 keywords
    return selectedKeywords.slice(0, 3)
  }

  const keywords = generateKeywords(journalText)

  return (
    <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="p-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
        <h3 className="mb-8 text-xl font-bold text-center font-cinzel">Today's Reflection</h3>

        {/* Three blue light circles with keywords */}
        <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
          {keywords.map((keyword, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Outer glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-nova-blue/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: index * 0.5,
                }}
                style={{ width: "120px", height: "120px", top: "-10px", left: "-10px" }}
              />

              {/* Blue light circle */}
              <motion.div
                className="relative w-24 h-24 rounded-full bg-gradient-to-br from-nova-blue/80 to-nova-purple/50 backdrop-blur-md flex items-center justify-center shadow-lg"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: index * 0.7,
                }}
              >
                {/* Inner glow */}
                <motion.div
                  className="absolute w-16 h-16 rounded-full bg-white/20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: index * 0.3,
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
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-white"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.4 + index * 0.2,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Keyword */}
                <motion.p
                  className="relative text-white font-cinzel text-sm font-medium z-10"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  {keyword}
                </motion.p>
              </motion.div>

              {/* Label below circle */}
              <motion.p
                className="mt-3 text-center text-xs opacity-70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
              >
                {index === 0 ? "Primary" : index === 1 ? "Secondary" : "Tertiary"}
              </motion.p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="font-fell text-xl">
            These energies reflect your current state of being. Consider how they might guide your path forward.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

