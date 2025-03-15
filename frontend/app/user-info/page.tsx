"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MagicalBackground } from "@/components/ui/magical-background"
import { MagicalButton } from "@/components/ui/magical-button"
import { useRouter } from "next/navigation"

export default function UserInfoPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [birthday, setBirthday] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && birthday) {
      // Store user info in localStorage
      localStorage.setItem("novaUserName", name)
      localStorage.setItem("novaUserBirthday", birthday)
      router.push("/functions")
    }
  }

  return (
    <MagicalBackground>
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 shadow-lg"
        >
          <h1 className="mb-6 text-3xl font-bold text-center font-cinzel text-nova-purple">Your Cosmic Profile</h1>

          <p className="mb-8 text-center font-fell text-xl">
            Please enter your name and birthday, so the stars can align just for you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="magical-input w-full"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="birthday" className="block text-sm font-medium">
                Birthday
              </label>
              <input
                id="birthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                className="magical-input w-full"
              />
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="pt-4">
              <MagicalButton type="submit" className="w-full">
                Continue
              </MagicalButton>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </MagicalBackground>
  )
}

