"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MagicalBackground } from "@/components/ui/magical-background"
import { MagicalButton } from "@/components/ui/magical-button"
import { JournalGuidance } from "@/components/ui/journal-guidance"
import { JournalSummary } from "@/components/ui/journal-summary"
import { useRouter } from "next/navigation"
import { HelpCircle, BookOpen, ArrowLeft } from "lucide-react"

export default function SoulJournalPage() {
  const router = useRouter()
  const [journalText, setJournalText] = useState("")
  const [showIntro, setShowIntro] = useState(true)
  const [showGuidance, setShowGuidance] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [lastTypingTime, setLastTypingTime] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Update character count when journal text changes
  useEffect(() => {
    setCharacterCount(journalText.length)
  }, [journalText])

  // Auto-show guidance after a period of typing
  useEffect(() => {
    if (!showIntro && !showSummary && journalText.length > 50) {
      const timer = setTimeout(() => {
        const currentTime = Date.now()
        // If user has been typing and then paused for 10 seconds
        if (currentTime - lastTypingTime > 10000 && !showGuidance) {
          setShowGuidance(true)
        }
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [journalText, lastTypingTime, showGuidance, showIntro, showSummary])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJournalText(e.target.value)
    setLastTypingTime(Date.now())
  }

  const handleStartWriting = () => {
    setShowIntro(false)
    // Focus the textarea after animation completes
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }, 500)
  }

  const handleRequestGuidance = () => {
    setShowGuidance(true)
  }

  const handleCloseGuidance = () => {
    setShowGuidance(false)
  }

  const handleFinishJournal = () => {
    // Hide the guidance if it's showing
    setShowGuidance(false)
    // Show the summary section
    setShowSummary(true)
  }

  const handleNewEntry = () => {
    setJournalText("")
    setShowSummary(false)
    // Focus the textarea after resetting
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }, 100)
  }

  return (
    <MagicalBackground>
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-3xl font-bold text-center font-cinzel text-nova-purple"
        >
          Soul Journal
        </motion.h1>

        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            {/* Introduction Section */}
            {showIntro && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
              >
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <BookOpen className="w-16 h-16 text-nova-purple" />
                  </motion.div>
                </div>

                <h2 className="mb-4 text-2xl font-bold text-center font-cinzel">Welcome to Your Soul Journal</h2>

                <p className="mb-6 text-center font-parisienne text-xl">
                  This is a sacred space for your thoughts, feelings, and reflections. As you write, Nova will offer
                  gentle guidance to help you explore your inner world more deeply.
                </p>

                <p className="mb-8 text-center">
                  When you've finished writing, Nova will reflect on the emotions and themes present in your journal
                  entry, offering insights to help you better understand yourself.
                </p>

                <div className="flex justify-center">
                  <MagicalButton onClick={handleStartWriting}>Begin Your Journey</MagicalButton>
                </div>
              </motion.div>
            )}

            {/* Writing Section */}
            {!showIntro && !showSummary && (
              <motion.div
                key="writing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold font-cinzel">Your Thoughts</h2>
                  <button
                    onClick={handleRequestGuidance}
                    className="flex items-center justify-center p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Request guidance"
                    title="Ask Nova for guidance"
                  >
                    <HelpCircle className="w-5 h-5 text-nova-purple" />
                  </button>
                </div>

                <textarea
                  ref={textareaRef}
                  value={journalText}
                  onChange={handleTextChange}
                  placeholder="Begin writing your thoughts, feelings, and reflections here..."
                  className="w-full h-64 p-4 mb-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-nova-purple/50 transition-all duration-300 resize-none"
                />

                <div className="flex justify-between items-center">
                  <div className="text-sm opacity-70">{characterCount} characters</div>

                  <div className="flex gap-4">
                    <MagicalButton variant="outline" onClick={() => router.push("/functions")}>
                      Cancel
                    </MagicalButton>
                    <MagicalButton onClick={handleFinishJournal} disabled={journalText.length < 20}>
                      Complete Entry
                    </MagicalButton>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Summary Section */}
            {showSummary && (
              <motion.div
                key="summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <JournalSummary journalText={journalText} />

                <div className="flex justify-center gap-4 mt-8">
                  <MagicalButton variant="outline" onClick={handleNewEntry}>
                    New Entry
                  </MagicalButton>
                  <MagicalButton onClick={() => router.push("/functions")}>Return to Functions</MagicalButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back button */}
        {!showIntro && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-6 left-6 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            onClick={() => router.push("/functions")}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        )}

        {/* Guidance popup */}
        {showGuidance && <JournalGuidance journalText={journalText} onClose={handleCloseGuidance} />}
      </div>
    </MagicalBackground>
  )
}

