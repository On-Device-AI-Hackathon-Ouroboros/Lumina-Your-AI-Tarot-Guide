"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MagicalButton } from "./magical-button"
import { Send } from "lucide-react"

interface TarotChatProps {
  tarotReading: string
  onClose: () => void
}

interface ChatMessage {
  sender: "user" | "nova"
  text: string
  timestamp: Date
}

export function TarotChat({ tarotReading, onClose }: TarotChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "nova",
      text: "I've shared my insights about your cards. Is there anything specific about the reading you'd like to explore further?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [exchangeCount, setExchangeCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const maxExchanges = 3

  const handleSendMessage = async () => {
    if (!inputValue.trim() || exchangeCount >= maxExchanges) return

    // Add user message
    const userMessage: ChatMessage = {
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate Nova's response (in a real app, this would be handled by the backend)
    // setTimeout(() => {
    //   const novaMessage: ChatMessage = {
    //     sender: "nova",
    //     text: `This is a placeholder response. In the actual implementation, Nova would respond to your question about: "${userMessage.text}"`,
    //     timestamp: new Date(),
    //   }

    //   setMessages((prev) => [...prev, novaMessage])
    //   setIsTyping(false)
    //   setExchangeCount((prev) => prev + 1)
    // }, 2000)

    const message = "Act as a tarot expert at spread reading, based on your previous response: " + tarotReading + "user has follow up questions:" + inputValue
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
      const data = await res.json();
      const novaMessage: ChatMessage = {
        sender: "nova",
        text: data.response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, novaMessage])
      setIsTyping(false)
      setExchangeCount((prev) => prev + 1)
    } catch (error) {
      console.error('Error sending user messages:', error);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <motion.div
      className="w-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold font-cinzel">Ask Nova About Your Reading</h3>
        <div className="text-sm text-nova-purple/80">{maxExchanges - exchangeCount} questions remaining</div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 p-4 h-80 mb-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user" ? "bg-nova-purple/70 text-white" : "bg-white/30 backdrop-blur-sm"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/30 backdrop-blur-sm p-3 rounded-lg">
                <div className="flex space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-nova-purple/70 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-nova-purple/70 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-nova-purple/70 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            exchangeCount >= maxExchanges
              ? "You've reached the maximum number of questions"
              : "Type your question about the reading..."
          }
          disabled={exchangeCount >= maxExchanges || isTyping}
          className="magical-input flex-1"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || exchangeCount >= maxExchanges || isTyping}
          className="p-3 rounded-full bg-nova-purple/70 text-white disabled:opacity-50 transition-opacity"
        >
          <Send size={18} />
        </button>
      </div>

      {exchangeCount >= maxExchanges && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 font-parisienne text-lg">
            You've reached the maximum number of exchanges. The cosmic energies need to rest.
          </p>
          <MagicalButton onClick={onClose}>New Reading</MagicalButton>
        </motion.div>
      )}
    </motion.div>
  )
}

