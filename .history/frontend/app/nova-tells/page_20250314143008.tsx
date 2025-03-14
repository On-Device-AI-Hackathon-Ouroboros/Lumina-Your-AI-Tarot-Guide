"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MagicalBackground } from "@/components/ui/magical-background"
import { MagicalButton } from "@/components/ui/magical-button"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TarotCard } from "@/components/ui/tarot-card"
import { CardDealingAnimation } from "@/components/ui/card-dealing-animation"
import { TarotQuestionCategory, type TarotSpreadType, spreadInfo } from "@/components/ui/tarot-question-category"
import { TarotSpread } from "@/components/ui/tarot-spread"
import { TarotMeditation } from "@/components/ui/tarot-meditation"
import { TarotChat } from "@/components/ui/tarot-chat"
import { Shuffle } from "lucide-react"

// Array of Yes/No responses
const yesNoResponses = [
  { answer: "Yes", explanation: "The stars align in your favor. Trust your instincts." },
  { answer: "No", explanation: "The cosmic energies suggest caution. Perhaps another path awaits." },
  { answer: "Yes", explanation: "The universe whispers its approval. Move forward with confidence." },
  { answer: "No", explanation: "The celestial bodies urge patience. This is not the right time." },
  { answer: "Yes", explanation: "The mystical forces support your journey. Embrace this opportunity." },
  { answer: "No", explanation: "The ethereal guides suggest reflection. Seek deeper understanding first." },
]

// Full tarot deck with 78 cards
const tarotDeck = [
  // Major Arcana (22 cards)
  { id: 0, name: "The Fool", meaning: "New beginnings, innocence, spontaneity" },
  { id: 1, name: "The Magician", meaning: "Manifestation, resourcefulness, power" },
  { id: 2, name: "The High Priestess", meaning: "Intuition, unconscious, divine feminine" },
  { id: 3, name: "The Empress", meaning: "Fertility, nurturing, abundance" },
  { id: 4, name: "The Emperor", meaning: "Authority, structure, control" },
  { id: 5, name: "The Hierophant", meaning: "Tradition, conformity, morality" },
  { id: 6, name: "The Lovers", meaning: "Relationships, choices, alignment of values" },
  { id: 7, name: "The Chariot", meaning: "Direction, control, willpower" },
  { id: 8, name: "Strength", meaning: "Courage, patience, compassion" },
  { id: 9, name: "The Hermit", meaning: "Soul-searching, introspection, guidance" },
  { id: 10, name: "Wheel of Fortune", meaning: "Change, cycles, inevitable fate" },
  { id: 11, name: "Justice", meaning: "Fairness, truth, cause and effect" },
  { id: 12, name: "The Hanged Man", meaning: "Surrender, new perspective, enlightenment" },
  { id: 13, name: "Death", meaning: "Endings, change, transformation" },
  { id: 14, name: "Temperance", meaning: "Balance, moderation, patience" },
  { id: 15, name: "The Devil", meaning: "Shadow self, attachment, addiction" },
  { id: 16, name: "The Tower", meaning: "Sudden change, revelation, awakening" },
  { id: 17, name: "The Star", meaning: "Hope, faith, rejuvenation" },
  { id: 18, name: "The Moon", meaning: "Illusion, fear, subconscious" },
  { id: 19, name: "The Sun", meaning: "Success, joy, celebration" },
  { id: 20, name: "Judgment", meaning: "Reflection, reckoning, awakening" },
  { id: 21, name: "The World", meaning: "Completion, integration, accomplishment" },

  // Wands Suit (14 cards)
  { id: 22, name: "Ace of Wands", meaning: "Creation, willpower, inspiration, desire" },
  { id: 23, name: "Two of Wands", meaning: "Planning, making decisions, leaving home" },
  { id: 24, name: "Three of Wands", meaning: "Looking ahead, expansion, foresight" },
  { id: 25, name: "Four of Wands", meaning: "Community, home, celebration" },
  { id: 26, name: "Five of Wands", meaning: "Competition, conflict, rivalry" },
  { id: 27, name: "Six of Wands", meaning: "Victory, success, public recognition" },
  { id: 28, name: "Seven of Wands", meaning: "Challenge, competition, protection" },
  { id: 29, name: "Eight of Wands", meaning: "Speed, action, air travel" },
  { id: 30, name: "Nine of Wands", meaning: "Resilience, grit, last stand" },
  { id: 31, name: "Ten of Wands", meaning: "Burden, extra responsibility, hard work" },
  { id: 32, name: "Page of Wands", meaning: "Exploration, excitement, freedom" },
  { id: 33, name: "Knight of Wands", meaning: "Energy, passion, adventure" },
  { id: 34, name: "Queen of Wands", meaning: "Courage, determination, joy" },
  { id: 35, name: "King of Wands", meaning: "Big picture, leader, overcoming challenges" },

  // Cups Suit (14 cards)
  { id: 36, name: "Ace of Cups", meaning: "New feelings, spirituality, intuition" },
  { id: 37, name: "Two of Cups", meaning: "Unity, partnership, connection" },
  { id: 38, name: "Three of Cups", meaning: "Friendship, community, happiness" },
  { id: 39, name: "Four of Cups", meaning: "Apathy, contemplation, disconnectedness" },
  { id: 40, name: "Five of Cups", meaning: "Loss, grief, self-pity" },
  { id: 41, name: "Six of Cups", meaning: "Familiarity, happy memories, healing" },
  { id: 42, name: "Seven of Cups", meaning: "Opportunities, choices, wishful thinking" },
  { id: 43, name: "Eight of Cups", meaning: "Walking away, disillusionment, leaving behind" },
  { id: 44, name: "Nine of Cups", meaning: "Contentment, satisfaction, gratitude" },
  { id: 45, name: "Ten of Cups", meaning: "Divine love, blissful relationships, harmony" },
  { id: 46, name: "Page of Cups", meaning: "Creative opportunities, curiosity, possibility" },
  { id: 47, name: "Knight of Cups", meaning: "Following the heart, idealist, romantic" },
  { id: 48, name: "Queen of Cups", meaning: "Compassion, calm, comfort" },
  { id: 49, name: "King of Cups", meaning: "Emotional balance, generosity, control" },

  // Swords Suit (14 cards)
  { id: 50, name: "Ace of Swords", meaning: "Breakthrough, clarity, sharp mind" },
  { id: 51, name: "Two of Swords", meaning: "Difficult choices, indecision, stalemate" },
  { id: 52, name: "Three of Swords", meaning: "Heartbreak, suffering, grief" },
  { id: 53, name: "Four of Swords", meaning: "Rest, restoration, contemplation" },
  { id: 54, name: "Five of Swords", meaning: "Conflict, tension, loss" },
  { id: 55, name: "Six of Swords", meaning: "Transition, leaving behind, moving on" },
  { id: 56, name: "Seven of Swords", meaning: "Deception, trickery, tactics and strategy" },
  { id: 57, name: "Eight of Swords", meaning: "Imprisonment, entrapment, self-victimization" },
  { id: 58, name: "Nine of Swords", meaning: "Anxiety, worry, fear" },
  { id: 59, name: "Ten of Swords", meaning: "Failure, collapse, defeat" },
  { id: 60, name: "Page of Swords", meaning: "New ideas, curiosity, restless mind" },
  { id: 61, name: "Knight of Swords", meaning: "Action, impulsiveness, defending beliefs" },
  { id: 62, name: "Queen of Swords", meaning: "Independent, unbiased judgment, clear boundaries" },
  { id: 63, name: "King of Swords", meaning: "Truth, authority, intellectual power" },

  // Pentacles Suit (14 cards)
  { id: 64, name: "Ace of Pentacles", meaning: "Opportunity, prosperity, new venture" },
  { id: 65, name: "Two of Pentacles", meaning: "Balance, priorities, adaptation" },
  { id: 66, name: "Three of Pentacles", meaning: "Teamwork, collaboration, building" },
  { id: 67, name: "Four of Pentacles", meaning: "Conservation, security, frugality" },
  { id: 68, name: "Five of Pentacles", meaning: "Need, poverty, insecurity" },
  { id: 69, name: "Six of Pentacles", meaning: "Charity, generosity, sharing" },
  { id: 70, name: "Seven of Pentacles", meaning: "Assessment, evaluation, reflection" },
  { id: 71, name: "Eight of Pentacles", meaning: "Diligence, knowledge, detail-oriented" },
  { id: 72, name: "Nine of Pentacles", meaning: "Fruits of labor, self-sufficiency, luxury" },
  { id: 73, name: "Ten of Pentacles", meaning: "Legacy, inheritance, culmination" },
  { id: 74, name: "Page of Pentacles", meaning: "Ambition, desire, diligence" },
  { id: 75, name: "Knight of Pentacles", meaning: "Efficiency, hard work, responsibility" },
  { id: 76, name: "Queen of Pentacles", meaning: "Nurturing, practical, financial security" },
  { id: 77, name: "King of Pentacles", meaning: "Abundance, prosperity, security" },
]

export default function NovaTellsPage() {
  const router = useRouter()
  const [isGeneratingYesNo, setIsGeneratingYesNo] = useState(false)
  const [yesNoResult, setYesNoResult] = useState<{ answer: string; explanation: string } | null>(null)

  // Tarot reading states
  const [shuffledDeck, setShuffledDeck] = useState<typeof tarotDeck>([])
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([])
  const [isRevealingCards, setIsRevealingCards] = useState(false)
  const [tarotReading, setTarotReading] = useState("")
  const [isGeneratingReading, setIsGeneratingReading] = useState(false)
  const [showChat, setShowChat] = useState(false) // Nuevo estado para mostrar el chat

  // Animation and flow states
  const [activeTab, setActiveTab] = useState("yes-no")
  const [showCategorySelection, setShowCategorySelection] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<TarotSpreadType | null>(null)
  const [showMeditation, setShowMeditation] = useState(false)
  const [showDealingAnimation, setShowDealingAnimation] = useState(false)
  const [showTarotGrid, setShowTarotGrid] = useState(false)

  // Shuffle the deck when the component mounts
  useEffect(() => {
    shuffleDeck()
  }, [])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    if (value === "tarot") {
      // Reset states for tarot tab
      setSelectedCardIds([])
      setIsRevealingCards(false)
      setTarotReading("")
      setShowCategorySelection(true)
      setSelectedCategory(null)
      setShowMeditation(false)
      setShowDealingAnimation(false)
      setShowTarotGrid(false)
      setShowChat(false)
    }
  }

  // Handle category selection
  const handleCategorySelect = (category: TarotSpreadType) => {
    setSelectedCategory(category)
    setShowCategorySelection(false)

    // Mostrar la meditación en lugar de la animación directamente
    setShowMeditation(true)
  }

  // Handle meditation complete
  const handleMeditationComplete = () => {
    setShowMeditation(false)

    // Iniciar la animación de barajar después de la meditación
    setShowDealingAnimation(true)
  }

  // Handle animation complete
  const handleDealingAnimationComplete = () => {
    setShowDealingAnimation(false)
    setShowTarotGrid(true)
  }

  const shuffleDeck = () => {
    // Create a copy of the deck and shuffle it
    const newDeck = [...tarotDeck].sort(() => Math.random() - 0.5)
    setShuffledDeck(newDeck)
    setSelectedCardIds([])
    setIsRevealingCards(false)
    setTarotReading("")
    setShowChat(false)
  }

  const getYesNoAnswer = () => {
    setIsGeneratingYesNo(true)
    setYesNoResult(null)

    // Simulate a magical process with a delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * yesNoResponses.length)
      setYesNoResult(yesNoResponses[randomIndex])
      setIsGeneratingYesNo(false)
    }, 2000)
  }

  const handleCardSelect = (cardId: number) => {
    if (!selectedCategory) return

    const requiredCards = selectedCategory
      ? selectedCategory === "general"
        ? 3
        : selectedCategory === "love" || selectedCategory === "spiritual"
          ? 4
          : 5
      : 3

    // Only allow selection if we haven't reached the required number of cards and cards aren't being revealed
    if (selectedCardIds.length < requiredCards && !isRevealingCards) {
      // Check if card is already selected
      if (!selectedCardIds.includes(cardId)) {
        const newSelectedCards = [...selectedCardIds, cardId]
        setSelectedCardIds(newSelectedCards)

        // If we've selected all required cards, start the reveal process
        if (newSelectedCards.length === requiredCards) {
          setTimeout(() => {
            setIsRevealingCards(true)
            setTimeout(() => {
              generateTarotReading(newSelectedCards, selectedCategory)
            }, 1500) // Shorter wait time since all cards flip together
          }, 500)
        }
      }
    }
  }

  const generateTarotReading = (cardIds: number[], spreadType: TarotSpreadType) => {
    setIsGeneratingReading(true)

    // Get the selected cards
    const selectedCards = cardIds.map((id) => shuffledDeck.find((card) => card.id === id)!)

    // Simulate AI generating a reading based on spread type
    setTimeout(() => {
      let reading = ""

      switch (spreadType) {
        case "general":
          reading = `The ${selectedCards[0].name} represents your past, suggesting ${selectedCards[0].meaning.toLowerCase()}. Your present is illuminated by ${selectedCards[1].name}, which indicates ${selectedCards[1].meaning.toLowerCase()}. Looking to your future, ${selectedCards[2].name} reveals ${selectedCards[2].meaning.toLowerCase()}. This timeline shows a journey of personal evolution, with each phase building upon the last.\`  This timeline shows a journey of personal evolution, with each phase building upon the last.`
          break

        case "love":
          reading = `The ${selectedCards[0].name} at the base of your pyramid represents the foundation of your relationship, showing ${selectedCards[0].meaning.toLowerCase()}. The ${selectedCards[1].name} reveals your partner's energy, bringing ${selectedCards[1].meaning.toLowerCase()} to the connection. The ${selectedCards[2].name} shows the dynamics between you, creating ${selectedCards[2].meaning.toLowerCase()}. At the peak, ${selectedCards[3].name} indicates the potential outcome, suggesting ${selectedCards[3].meaning.toLowerCase()} if you follow this path.`
          break

        case "career":
          reading = `The ${selectedCards[0].name} forms the roots of your career tree, indicating ${selectedCards[0].meaning.toLowerCase()} as your foundation. The left branch, ${selectedCards[1].name}, suggests ${selectedCards[1].meaning.toLowerCase()} as one path of growth. The right branch, ${selectedCards[2].name}, offers ${selectedCards[2].meaning.toLowerCase()} as an alternative direction. The ${selectedCards[3].name} and ${selectedCards[4].name} represent the fruits of these paths, promising ${selectedCards[3].meaning.toLowerCase()} and ${selectedCards[4].meaning.toLowerCase()} respectively. Your wealth tree is flourishing with potential.`
          break

        case "choices":
          reading = `The ${selectedCards[0].name} at the center represents your current position, showing ${selectedCards[0].meaning.toLowerCase()}. The left path begins with ${selectedCards[1].name}, suggesting ${selectedCards[1].meaning.toLowerCase()}, and leads to ${selectedCards[2].name}, which promises ${selectedCards[2].meaning.toLowerCase()}. The right path starts with ${selectedCards[3].name}, indicating ${selectedCards[3].meaning.toLowerCase()}, and culminates in ${selectedCards[4].name}, offering ${selectedCards[4].meaning.toLowerCase()}. Both paths have merit, but one resonates more with your true desires.`
          break

        case "spiritual":
          reading = `Your mind is represented by ${selectedCards[0].name}, revealing ${selectedCards[0].meaning.toLowerCase()} in your thoughts and beliefs. Your body's energy is shown through ${selectedCards[1].name}, manifesting as ${selectedCards[1].meaning.toLowerCase()} in your physical experience. Your spirit is illuminated by ${selectedCards[2].name}, bringing ${selectedCards[2].meaning.toLowerCase()} to your inner self. The integration card, ${selectedCards[3].name}, suggests that ${selectedCards[3].meaning.toLowerCase()} will help you harmonize these aspects of your being.`
          break

        default:
          reading = `The cards reveal a powerful message: ${selectedCards.map((card) => `${card.name} (${card.meaning.toLowerCase()})`).join(", ")}. Together, they suggest that you are at a significant crossroads. Trust your intuition and embrace the changes coming your way. The cosmic energies are supporting your transformation.`
      }

      setTarotReading(reading)
      setIsGeneratingReading(false)
    }, 3000)
  }

  const resetTarotReading = () => {
    // Reset states
    setSelectedCardIds([])
    setIsRevealingCards(false)
    setTarotReading("")
    setShowCategorySelection(true)
    setSelectedCategory(null)
    setShowMeditation(false)
    setShowDealingAnimation(false)
    setShowTarotGrid(false)
    setShowChat(false)

    // Shuffle the deck
    shuffleDeck()
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
          Nova Tells You
        </motion.h1>

        <div className="w-full max-w-4xl">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/20 backdrop-blur-sm">
              <TabsTrigger value="yes-no" className="font-cinzel">
                Yes or No
              </TabsTrigger>
              <TabsTrigger value="tarot" className="font-cinzel">
                Tarot Reading
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="yes-no"
              className="p-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
            >
              <div className="flex flex-col items-center">
                <h2 className="mb-6 text-2xl font-bold text-center font-cinzel">Seek Your Answer</h2>

                <p className="mb-8 text-center font-parisienne text-xl">
                  Focus on your question. Are the winds of fate blowing in your favor?
                </p>

                {!yesNoResult && !isGeneratingYesNo && (
                  <MagicalButton onClick={getYesNoAnswer}>Reveal my fate</MagicalButton>
                )}

                {isGeneratingYesNo && (
                  <motion.div
                    className="flex flex-col items-center justify-center h-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-16 h-16 mb-4">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-nova-purple/50"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 0, 0.7],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <motion.div
                        className="absolute inset-2 rounded-full bg-nova-purple/70"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 0.2, 0.7],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                      />
                      <motion.div
                        className="absolute inset-4 rounded-full bg-nova-purple"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                      />
                    </div>
                    <p className="text-center font-parisienne text-xl">Consulting the cosmic forces...</p>
                  </motion.div>
                )}

                {yesNoResult && (
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="mb-6 text-4xl font-bold font-cinzel text-nova-purple">{yesNoResult.answer}</div>

                    <p className="mb-8 text-center font-parisienne text-xl">{yesNoResult.explanation}</p>

                    <div className="flex gap-4">
                      <MagicalButton onClick={getYesNoAnswer}>Ask Again</MagicalButton>

                      <MagicalButton variant="outline" onClick={() => setYesNoResult(null)}>
                        New Question
                      </MagicalButton>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>

            <TabsContent
              value="tarot"
              className="p-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
            >
              <AnimatePresence mode="wait">
                {/* Category Selection */}
                {showCategorySelection && <TarotQuestionCategory onSelectCategory={handleCategorySelect} />}

                {/* Meditation Screen */}
                {showMeditation && selectedCategory && (
                  <TarotMeditation
                    questionCategory={spreadInfo[selectedCategory].name}
                    onComplete={handleMeditationComplete}
                  />
                )}

                {/* Card Dealing Animation */}
                {showDealingAnimation && selectedCategory && (
                  <CardDealingAnimation
                    onAnimationComplete={handleDealingAnimationComplete}
                    cardCount={tarotDeck.length}
                    spreadType={selectedCategory}
                  />
                )}

                {/* Tarot Content */}
                {showTarotGrid && selectedCategory && !showChat && (
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="mb-4 text-2xl font-bold text-center font-cinzel">Tarot Reading</h2>

                    {/* Card Spread Display */}
                    <TarotSpread
                      spreadType={selectedCategory}
                      selectedCardIds={selectedCardIds}
                      isRevealingCards={isRevealingCards}
                      shuffledDeck={shuffledDeck}
                      onCardSelect={() => {}}
                    />

                    {/* Card Selection Grid */}
                    {!tarotReading && !isRevealingCards && (
                      <motion.div
                        className="w-full mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm">
                            Selected: {selectedCardIds.length}/
                            {selectedCategory === "general"
                              ? 3
                              : selectedCategory === "love" || selectedCategory === "spiritual"
                                ? 4
                                : 5}
                          </p>
                          <button
                            onClick={shuffleDeck}
                            className="flex items-center justify-center p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                            aria-label="Shuffle deck"
                          >
                            <Shuffle className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-[300px] overflow-y-auto p-2 rounded-lg bg-white/10">
                          {shuffledDeck.map((card) => (
                            <TarotCard
                              key={card.id}
                              card={card}
                              isSelected={selectedCardIds.includes(card.id)}
                              isRevealed={selectedCardIds.includes(card.id) && isRevealingCards}
                              onClick={() => handleCardSelect(card.id)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Loading State */}
                    {isGeneratingReading && (
                      <motion.div
                        className="flex flex-col items-center justify-center h-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="relative w-16 h-16 mb-4">
                          <motion.div
                            className="absolute inset-0 rounded-full bg-nova-purple/50"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.7, 0, 0.7],
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <motion.div
                            className="absolute inset-2 rounded-full bg-nova-purple/70"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 0.2, 0.7],
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                          />
                          <motion.div
                            className="absolute inset-4 rounded-full bg-nova-purple"
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                          />
                        </div>
                        <p className="text-center font-parisienne text-xl">Nova is interpreting the cards...</p>
                      </motion.div>
                    )}

                    {/* Reading Result */}
                    {tarotReading && !isGeneratingReading && (
                      <motion.div
                        className="w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <div className="p-6 mb-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                          <h3 className="mb-4 text-xl font-bold text-center font-cinzel">Nova&apos;s Insight:</h3>
                          <p className="text-center font-parisienne text-lg">{tarotReading}</p>
                        </div>

                        <div className="flex justify-center gap-4">
                          <MagicalButton onClick={() => setShowChat(true)}>Ask Nova About Your Reading</MagicalButton>
                          <MagicalButton variant="outline" onClick={resetTarotReading}>
                            New Reading
                          </MagicalButton>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Chat Interface */}
                {showChat && tarotReading && <TarotChat tarotReading={tarotReading} onClose={resetTarotReading} />}
              </AnimatePresence>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-8">
            <MagicalButton variant="outline" onClick={() => router.push("/functions")}>
              Return to Functions
            </MagicalButton>
          </div>
        </div>
      </div>
    </MagicalBackground>
  )
}

