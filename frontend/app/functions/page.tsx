"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MagicalBackground } from "@/components/ui/magical-background"
import { MagicalButton } from "@/components/ui/magical-button"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"

export default function FunctionsPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem("novaUserName")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  return (
    <MagicalBackground>
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-3xl font-bold text-center font-cinzel text-nova-purple"
        >
          Greetings, {userName || "Wanderer"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 text-xl text-center font-parisienne"
        >
          Choose your path:
        </motion.p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="p-8 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="w-16 h-16 text-nova-purple" />
              </motion.div>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-center font-cinzel">Daily Crystal Ball</h2>
            <p className="mb-6 text-center">Receive daily wisdom and guidance from the mystical crystal ball.</p>
            <MagicalButton onClick={() => router.push("/crystal-ball")}>Gaze Into the Crystal</MagicalButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col items-center"
          >
            <div className="p-8 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <svg className="w-16 h-16 text-nova-purple" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L8 6H4V10L2 12L4 14V18H8L12 22L16 18H20V14L22 12L20 10V6H16L12 2Z" />
                  <circle cx="12" cy="12" r="3" fill="white" />
                </svg>
              </motion.div>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-center font-cinzel">Nova Tells You</h2>
            <p className="mb-6 text-center">
              Seek answers to your questions through Yes/No divination or Tarot readings.
            </p>
            <MagicalButton onClick={() => router.push("/nova-tells")}>Seek Answers</MagicalButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <div className="p-8 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <svg className="w-16 h-16 text-nova-purple" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM6 4H11V12L8.5 10.5L6 12V4Z" />
                </svg>
              </motion.div>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-center font-cinzel">Soul Journal</h2>
            <p className="mb-6 text-center">
              Explore your inner world through guided reflective writing and emotional insights.
            </p>
            <MagicalButton onClick={() => router.push("/soul-journal")}>Begin Your Journey</MagicalButton>
          </motion.div>
        </div>
      </div>
    </MagicalBackground>
  )
}

