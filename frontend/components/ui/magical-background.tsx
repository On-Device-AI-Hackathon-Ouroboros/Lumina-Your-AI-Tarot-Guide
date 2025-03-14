"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface MagicalBackgroundProps {
  children: React.ReactNode
}

export function MagicalBackground({ children }: MagicalBackgroundProps) {
  const [stars, setStars] = useState<Array<{ id: number; size: number; top: string; left: string; delay: number }>>([])

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="dreamy-bg min-h-screen w-full">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: star.delay,
          }}
        />
      ))}

      <motion.div
        className="butterfly"
        style={{ top: "20%", left: "20%" }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C9.5 5 8.5 7 8 9C7.5 11 8 13 9 14.5C10 16 11.5 17 13 17.5C14.5 18 16 18 17.5 17.5C19 17 20 16 20.5 14.5C21 13 21 11 20 9C19 7 17.5 5 15 2C14 3.5 13 5 12 2ZM12 9C10.5 11 9.5 13 9 15C10.5 13 12 11 12 9ZM12 9C13.5 11 15 13 16.5 15C15 13 13.5 11 12 9Z" />
        </svg>
      </motion.div>

      <motion.div
        className="butterfly"
        style={{ top: "30%", left: "70%" }}
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C9.5 5 8.5 7 8 9C7.5 11 8 13 9 14.5C10 16 11.5 17 13 17.5C14.5 18 16 18 17.5 17.5C19 17 20 16 20.5 14.5C21 13 21 11 20 9C19 7 17.5 5 15 2C14 3.5 13 5 12 2ZM12 9C10.5 11 9.5 13 9 15C10.5 13 12 11 12 9ZM12 9C13.5 11 15 13 16.5 15C15 13 13.5 11 12 9Z" />
        </svg>
      </motion.div>

      <motion.div
        className="flower"
        style={{ bottom: "10%", left: "10%" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 24 24" fill="#ff9e7d" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C9 2 7 4 7 7C7 10 9 12 12 12C15 12 17 10 17 7C17 4 15 2 12 2ZM12 6C11.4 6 11 5.6 11 5C11 4.4 11.4 4 12 4C12.6 4 13 4.4 13 5C13 5.6 12.6 6 12 6ZM12 22C14 22 16 20 16 18C16 16 14 14 12 14C10 14 8 16 8 18C8 20 10 22 12 22Z" />
          <path d="M12 13V21" stroke="#2a7d54" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        className="flower"
        style={{ bottom: "15%", right: "15%" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg viewBox="0 0 24 24" fill="#8a7cdb" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C9 2 7 4 7 7C7 10 9 12 12 12C15 12 17 10 17 7C17 4 15 2 12 2ZM12 6C11.4 6 11 5.6 11 5C11 4.4 11.4 4 12 4C12.6 4 13 4.4 13 5C13 5.6 12.6 6 12 6ZM12 22C14 22 16 20 16 18C16 16 14 14 12 14C10 14 8 16 8 18C8 20 10 22 12 22Z" />
          <path d="M12 13V21" stroke="#2a7d54" strokeWidth="1" />
        </svg>
      </motion.div>

      {children}
    </div>
  )
}

