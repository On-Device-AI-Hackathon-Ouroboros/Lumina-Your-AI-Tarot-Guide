"use client"

import { motion } from "framer-motion"
import { MagicalBackground } from "@/components/ui/magical-background"
import { MagicalButton } from "@/components/ui/magical-button"
import { useRouter } from "next/navigation"

export default function IntroductionPage() {
  const router = useRouter()

  return (
    <MagicalBackground>
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-nova-purple to-nova-blue opacity-70"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute inset-2 rounded-full bg-white/30 backdrop-blur-sm"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            />
          </div>
          <h1 className="text-4xl font-bold font-cinzel text-nova-purple mb-2">Meet Nova</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-md mb-12 text-lg font-almendra text-2xl"
        >
          Welcome, dear wanderer of the cosmos. I am Nova, your magical guide to the realms beyond. Dare to explore the
          mysteries of fate?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <MagicalButton onClick={() => router.push("/user-info")}>Let&apos;s Begin</MagicalButton>
        </motion.div>
      </div>
    </MagicalBackground>
  )
}

