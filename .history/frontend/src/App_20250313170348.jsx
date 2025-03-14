import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css'
import TarotCard from './components/TarotCard';
import TarotDetail from './components/TarotDetail';
import FlashCards from './pages/flashCards';
import DrawCards from './pages/drawCards';

function App() {
  
  const tarotCards = [
    { id: 0, name: "The Fool", image: "src/images/the-fool.png", meaning: "New beginnings, adventure, spontaneity.",
      detailedMeaning: "This card encourages you to embrace change and trust that the universe will provide. It symbolizes innocence, optimism, and stepping forward without fear of the unknown. While it can be a symbol of freedom and new opportunities, The Fool also warns against naivety and rushing into things without thinking them through.",
      useCases: [
        "Starting a new job or career path.",
        "Beginning a creative project.",
        "A major life transition like moving to a new city."
      ],
      difficulty: "Easy" },
    { id: 1, name: "The Magician", image: "src/images/the-magician.png", meaning: "Manifestation, resourcefulness, power.",
      detailedMeaning: "The Magician represents the power to create and manifest your goals. It emphasizes personal will, skill, and focus. This card asks you to make use of your inner resources and talents to achieve success. It also reminds you to be conscious of your power, as what you create can be both positive or negative depending on your intentions.",
      useCases: [
        "Using your skills to complete a challenging task.",
        "Starting a business or project using your unique abilities.",
        "Manifesting personal goals with focused intention."
      ],
      difficulty: "Hard" },
    { id: 2, name: "The High Priestess", image: "src/images/the-high-priestess.png", meaning: "Intuition, wisdom, mystery.",
      detailedMeaning: "This card invites you to trust your intuition and connect with your subconscious mind. The High Priestess indicates that you may need to take a step back and reflect on a situation to gain deeper insight. She suggests that answers are hidden, and you must trust in your own instincts and inner voice to uncover them.",
      useCases: [
        "Seeking answers through meditation or introspection.",
        "Listening to your gut feeling when making a decision.",
        "Trusting that not everything can be immediately understood; sometimes patience is required."
      ],
      difficulty: "Easy" },
    { id: 3, name: "The Empress", image: "src/images/the-empress.png", meaning: "Nurturing, abundance, femininity.",
      detailedMeaning: "This card signifies creativity in its most abundant form. It represents nurturing energy and the creation of something meaningful. The Empress encourages you to take care of yourself and your environment, to embrace your creativity, and to allow abundance to flow into your life.",
      useCases: [
        "Giving birth to a new idea or project.",
        "Caring for others or nurturing relationships.",
        "Creating beauty or art that brings harmony and joy."
      ],
      difficulty: "Hard" },
    { id: 4, name: "The Emperor", image: "src/images/the-emperor.png", meaning: "Authority, structure, discipline.",
      detailedMeaning: "The Emperor emphasizes the importance of setting boundaries, creating structure, and taking control of your destiny. This card encourages leadership and decision-making based on logic, stability, and authority. It also suggests that you may need to establish order in a situation that is chaotic or undefined.",
      useCases: [
        "Taking charge of a team or situation.",
        "Setting clear boundaries in relationships or projects.",
        "Making disciplined decisions for long-term stability."
      ],
      difficulty: "Medium" },
    { id: 5, name: "The Hierophant", image: "src/images/the-hierophant.png", meaning: "Tradition, spiritual guidance, conformity.",
      detailedMeaning: "The Hierophant represents spiritual wisdom and guidance from a higher source. It signifies tradition, conformity, and the search for truth and meaning. This card suggests that you may need to seek advice from a mentor or spiritual leader to gain clarity and understanding.",
      useCases: [
        "Seeking advice from a teacher or mentor.",
        "Exploring traditional spiritual practices or beliefs.",
        "Conforming to social norms or expectations."
      ],
      difficulty: "Hard" },
    { id: 6, name: "The Lovers", image: "src/images/the-lovers.png", meaning: "Love, harmony, relationships.",
      detailedMeaning: "The Lovers card represents love, relationships, and choices. It signifies union, harmony, and alignment with your values and beliefs. This card suggests that you may need to make an important decision related to love or relationships, and that you should follow your heart and intuition.",
      useCases: [
        "Making a decision about a romantic relationship.",
        "Choosing between two paths or options.",
        "Seeking harmony and balance in your relationships."
      ],
      difficulty: "Hard" },
    { id: 7, name: "The Chariot", image: "src/images/the-chariot.png", meaning: "Determination, victory, willpower.",
      detailedMeaning: "The Chariot represents determination, willpower, and victory. It signifies overcoming obstacles and moving forward with confidence and strength. This card suggests that you may need to take control of a situation and steer it in the direction you desire, using your inner strength and resolve.",
      useCases: [
        "Overcoming challenges or obstacles.",
        "Taking control of a situation or project.",
        "Moving forward with confidence and determination."
      ],
      difficulty: "Easy" },
    { id: 8, name: "Strength", image: "src/images/strength.png", meaning: "Courage, patience, inner strength.",
      detailedMeaning: "The Strength card represents courage, patience, and inner strength. It signifies the ability to overcome challenges with grace and compassion. This card suggests that you may need to find the courage to face your fears and challenges, and to trust in your inner strength and resilience.",
      useCases: [
        "Facing your fears with courage and compassion.",
        "Practicing patience and resilience in difficult situations.",
        "Drawing on your inner strength to overcome challenges."
      ],
      difficulty: "Medium" },
    { id: 9, name: "The Hermit", image: "src/images/the-hermit.png", meaning: "Soul-searching, introspection, guidance.",
      detailedMeaning: "The Hermit represents introspection, solitude, and inner guidance. It signifies the need to take time for reflection and soul-searching to find answers within yourself. This card suggests that you may need to seek solitude and quiet contemplation to gain clarity and insight.",
      useCases: [
        "Taking time for self-reflection and introspection.",
        "Seeking guidance from within through meditation or spiritual practices.",
        "Finding answers by looking inward and listening to your inner voice."
      ],
      difficulty: "Medium" },
    { id: 10, name: "Wheel of Fortune", image: "src/images/wheel-of-fortune.png", meaning: "Fate, cycles, change.",
      detailedMeaning: "The Wheel of Fortune represents the cycles of life, luck, and destiny. It reminds you that change is inevitable, and sometimes forces beyond your control are at play. This card encourages you to remain adaptable and open to unexpected shifts.",
      useCases: [
        "Navigating a major life transition.",
        "Adapting to changes in fortune or circumstance.",
        "Recognizing patterns or karmic cycles."
      ],
      difficulty: "Medium" },
    { id: 11, name: "Justice", image: "src/images/justice.png", meaning: "Truth, fairness, law.",
      detailedMeaning: "Justice represents truth, accountability, and the consequences of actions. It encourages you to act with integrity and take responsibility for your decisions. It also signifies legal matters or ethical questions.",
      useCases: [
        "Making a fair and balanced decision.",
        "Facing consequences of actions with integrity.",
        "Seeking justice or legal resolution."
      ],
      difficulty: "Medium" },
    { id: 12, name: "The Hanged Man", image: "src/images/the-hanged-man.png", meaning: "Pause, surrender, new perspective.",
      detailedMeaning: "This card symbolizes a necessary pause, sacrifice, or change in perspective. The Hanged Man asks you to let go of control and consider a new way of thinking. It's about seeing things from a different point of view.",
      useCases: [
        "Taking a break to gain clarity.",
        "Letting go of control to allow transformation.",
        "Reevaluating priorities or plans."
      ],
      difficulty: "Hard" },
    { id: 13, name: "Death", image: "src/images/death.png", meaning: "Transformation, endings, rebirth.",
      detailedMeaning: "Despite its ominous name, Death represents transformation and renewal. It indicates the end of one cycle and the beginning of another, allowing for growth and new opportunities.",
      useCases: [
        "Letting go of old habits or beliefs.",
        "Transitioning into a new phase of life.",
        "Facing a symbolic death or rebirth experience."
      ],
      difficulty: "Hard" },
    { id: 14, name: "Temperance", image: "src/images/temperance.png", meaning: "Balance, moderation, harmony.",
      detailedMeaning: "Temperance calls for balance and equilibrium in all areas of life. It encourages moderation, patience, and finding the middle path. It’s a card of healing and integration.",
      useCases: [
        "Finding work-life balance.",
        "Practicing moderation or healthy habits.",
        "Blending different aspects of life or identity."
      ],
      difficulty: "Easy" },
    { id: 15, name: "The Devil", image: "src/images/the-devil.png", meaning: "Temptation, addiction, materialism.",
      detailedMeaning: "The Devil represents entrapment, obsession, or harmful patterns. It urges you to examine unhealthy attachments or behaviors and regain control over your desires.",
      useCases: [
        "Breaking free from addictions or bad habits.",
        "Recognizing manipulative relationships.",
        "Exploring your shadow self."
      ],
      difficulty: "Hard" },
    { id: 16, name: "The Tower", image: "src/images/the-tower.png", meaning: "Sudden change, upheaval, revelation.",
      detailedMeaning: "The Tower signals dramatic change or sudden disruption. Though often uncomfortable, it clears the way for new growth and deeper understanding. Expect unexpected truths to be revealed.",
      useCases: [
        "Major life disruption or awakening.",
        "Sudden realization or truth revealed.",
        "Breaking down illusions or false structures."
      ],
      difficulty: "Hard" },
    { id: 17, name: "The Star", image: "src/images/the-star.png", meaning: "Hope, inspiration, renewal.",
      detailedMeaning: "The Star brings a sense of healing and renewed faith. It offers hope, peace, and spiritual guidance after turmoil. This card encourages you to trust in the future.",
      useCases: [
        "Recovering from hardship or emotional loss.",
        "Finding hope and clarity in difficult times.",
        "Reconnecting with your dreams and purpose."
      ],
      difficulty: "Easy" },
    { id: 18, name: "The Moon", image: "src/images/the-moon.png", meaning: "Illusion, intuition, confusion.",
      detailedMeaning: "The Moon represents mystery, illusion, and the subconscious. It encourages you to look beyond the surface and trust your intuition when clarity is lacking.",
      useCases: [
        "Navigating emotional or confusing situations.",
        "Interpreting dreams or subconscious signals.",
        "Exploring your intuitive or psychic abilities."
      ],
      difficulty: "Medium" },
    { id: 19, name: "The Sun", image: "src/images/the-sun.png", meaning: "Joy, success, vitality.",
      detailedMeaning: "The Sun signifies warmth, clarity, and happiness. It is a positive card that symbolizes abundance, success, and the power of optimism.",
      useCases: [
        "Celebrating achievements or milestones.",
        "Spreading positivity and warmth.",
        "Finding clarity and joy in life."
      ],
      difficulty: "Easy" },
    { id: 20, name: "Judgement", image: "src/images/judgement.png", meaning: "Awakening, rebirth, reflection.",
      detailedMeaning: "Judgement represents spiritual awakening and self-evaluation. It calls you to reflect on your actions, make peace with the past, and rise to your higher calling.",
      useCases: [
        "Reflecting on personal growth and choices.",
        "Answering a spiritual or life calling.",
        "Releasing guilt and embracing transformation."
      ],
      difficulty: "Medium" },
    { id: 21, name: "The World", image: "src/images/the-world.png", meaning: "Completion, fulfillment, unity.",
      detailedMeaning: "The World represents the successful completion of a journey or goal. It symbolizes harmony, accomplishment, and wholeness. A cycle has come full circle, and you’re ready for what’s next.",
      useCases: [
        "Reaching a significant goal or milestone.",
        "Finding balance and harmony in life.",
        "Beginning a new journey after closure."
      ],
      difficulty: "Easy" },
    { id: 22, name: "Ace of Cups", image: "src/images/ace-of-cups.png", meaning: "Love, new feelings, emotional beginnings.",
      detailedMeaning: "The Ace of Cups represents the start of a new emotional journey. It symbolizes love, compassion, and the overflowing of positive emotions. This card often heralds a new relationship, emotional healing, or creative inspiration.",
      useCases: [
        "Starting a new relationship or friendship.",
        "Opening up emotionally or expressing your feelings.",
        "Beginning a creative or spiritual journey."
      ],
      difficulty: "Easy" },
    { id: 23, name: "Two of Cups", image: "src/images/two-of-cups.png", meaning: "Union, partnership, connection.",
      detailedMeaning: "This card symbolizes harmony and mutual attraction in relationships. It represents emotional balance, connection, and unity between two people or ideas.",
      useCases: [
        "Forming a romantic or business partnership.",
        "Establishing emotional harmony in a relationship.",
        "Celebrating deep bonds or mutual support."
      ],
      difficulty: "Medium" },
    { id: 24, name: "Three of Cups", image: "src/images/three-of-cups.png", meaning: "Celebration, friendship, community.",
      detailedMeaning: "The Three of Cups signifies joy, celebration, and togetherness. It’s a card of community support, friendship, and emotional connection through shared experiences.",
      useCases: [
        "Celebrating achievements or special events.",
        "Spending time with close friends.",
        "Joining a community or collaborative group."
      ],
      difficulty: "Easy" },
    { id: 25, name: "Four of Cups", image: "src/images/four-of-cups.png", meaning: "Contemplation, apathy, reevaluation.",
      detailedMeaning: "This card represents emotional discontent or withdrawal. It may indicate a need to pause and reflect on what truly matters. It’s a sign that you might be missing an opportunity due to dissatisfaction or distraction.",
      useCases: [
        "Reevaluating emotional needs or desires.",
        "Taking time to reflect before making a decision.",
        "Recognizing overlooked opportunities."
      ],
      difficulty: "Medium" },
    { id: 26, name: "Five of Cups", image: "src/images/five-of-cups.png", meaning: "Loss, grief, disappointment.",
      detailedMeaning: "The Five of Cups represents mourning or regret over something lost. While it's important to acknowledge grief, this card also reminds you to focus on what still remains.",
      useCases: [
        "Processing emotional pain or regret.",
        "Coping with loss or disappointment.",
        "Finding healing in grief."
      ],
      difficulty: "Hard" },
    { id: 27, name: "Six of Cups", image: "src/images/six-of-cups.png", meaning: "Nostalgia, childhood, innocence.",
      detailedMeaning: "This card reflects on the past with fondness. It can represent childhood memories, innocent joy, or reconnecting with old friends. It’s also about sharing kindness and simple pleasures.",
      useCases: [
        "Reconnecting with old friends or family.",
        "Reflecting on childhood or past experiences.",
        "Practicing kindness and innocence."
      ],
      difficulty: "Easy" },
    { id: 28, name: "Seven of Cups", image: "src/images/seven-of-cups.png", meaning: "Choices, illusion, fantasy.",
      detailedMeaning: "The Seven of Cups presents a range of possibilities, but not all are real or beneficial. It warns against wishful thinking or being overwhelmed by options. Clear focus is needed.",
      useCases: [
        "Evaluating many options or opportunities.",
        "Avoiding distractions or illusions.",
        "Making a choice aligned with reality."
      ],
      difficulty: "Medium" },
    { id: 29, name: "Eight of Cups", image: "src/images/eight-of-cups.png", meaning: "Withdrawal, search for meaning, letting go.",
      detailedMeaning: "This card symbolizes walking away from something unfulfilling in search of deeper purpose. It’s a courageous step toward emotional growth and spiritual truth.",
      useCases: [
        "Leaving a relationship or job to find deeper meaning.",
        "Starting a spiritual or personal quest.",
        "Letting go of what no longer serves you."
      ],
      difficulty: "Hard" },
    { id: 30, name: "Nine of Cups", image: "src/images/nine-of-cups.png", meaning: "Contentment, wishes fulfilled, satisfaction.",
      detailedMeaning: "Often called the 'wish card,' the Nine of Cups represents emotional fulfillment and personal satisfaction. It’s a card of happiness, pleasure, and success in relationships or goals.",
      useCases: [
        "Achieving emotional goals.",
        "Celebrating personal success.",
        "Gratitude for abundance and joy."
      ],
      difficulty: "Easy" },
    { id: 31, name: "Ten of Cups", image: "src/images/ten-of-cups.png", meaning: "Harmony, happiness, family.",
      detailedMeaning: "The Ten of Cups represents ultimate emotional fulfillment and harmony, particularly in relationships or family. It symbolizes lasting joy, peace, and shared happiness.",
      useCases: [
        "Family harmony and emotional security.",
        "Feeling content and whole in relationships.",
        "Achieving emotional fulfillment."
      ],
      difficulty: "Easy" },
    { id: 32, name: "Page of Cups", image: "src/images/page-of-cups.png", meaning: "Inspiration, curiosity, new feelings.",
      detailedMeaning: "The Page of Cups represents a youthful approach to emotions and creativity. It invites you to stay open to messages from your heart and imagination.",
      useCases: [
        "Starting a new emotional journey.",
        "Receiving a heartfelt message.",
        "Exploring creative or intuitive ideas."
      ],
      difficulty: "Medium" },
    { id: 33, name: "Knight of Cups", image: "src/images/knight-of-cups.png", meaning: "Romance, idealism, emotional pursuit.",
      detailedMeaning: "The Knight of Cups is the romantic dreamer. He follows his heart and brings messages of love, creativity, or inspiration. However, he can be overly idealistic or inconsistent.",
      useCases: [
        "Pursuing romantic or artistic goals.",
        "Delivering or receiving a heartfelt message.",
        "Following your emotional instincts."
      ],
      difficulty: "Medium" },
    { id: 34, name: "Queen of Cups", image: "src/images/queen-of-cups.png", meaning: "Compassion, intuition, nurturing.",
      detailedMeaning: "The Queen of Cups is emotionally wise, intuitive, and caring. She embodies emotional balance and deep understanding. This card calls you to care for others with compassion and empathy.",
      useCases: [
        "Providing emotional support to others.",
        "Trusting your intuition in personal matters.",
        "Offering care and empathy."
      ],
      difficulty: "Hard" },
    { id: 35, name: "King of Cups", image: "src/images/king-of-cups.png", meaning: "Emotional maturity, diplomacy, calm.",
      detailedMeaning: "The King of Cups governs his emotions with wisdom and grace. He is calm, compassionate, and leads with empathy. He advises staying emotionally balanced and offering guidance with compassion.",
      useCases: [
        "Leading with emotional intelligence.",
        "Staying composed during emotional situations.",
        "Offering counsel or support to others."
      ],
      difficulty: "Hard" },
    { id: 36, name: "Ace of Swords", image: "src/images/ace-of-swords.png", meaning: "Clarity, truth, breakthrough.",
      detailedMeaning: "The Ace of Swords represents a powerful mental breakthrough or a moment of truth. It signifies clarity, sharp thinking, and decisive action. This card cuts through confusion and invites intellectual strength.",
      useCases: [
        "Making a decisive decision based on logic.",
        "Beginning a new intellectual pursuit.",
        "Gaining clarity on a complicated situation."
      ],
      difficulty: "Medium" },
    { id: 37, name: "Two of Swords", image: "src/images/two-of-swords.png", meaning: "Indecision, stalemate, difficult choices.",
      detailedMeaning: "This card represents being caught between two choices or opposing forces. It suggests a need to make a decision, even if the way forward isn’t yet clear. Avoidance only prolongs the challenge.",
      useCases: [
        "Facing a tough decision or internal conflict.",
        "Seeking balance between logic and emotion.",
        "Working through a situation of avoidance."
      ],
      difficulty: "Medium" },
    { id: 38, name: "Three of Swords", image: "src/images/three-of-swords.png", meaning: "Heartbreak, sorrow, grief.",
      detailedMeaning: "The Three of Swords symbolizes emotional pain and heartbreak. It may indicate betrayal, loss, or emotional separation. Though painful, this card also marks a moment of emotional release and eventual healing.",
      useCases: [
        "Coping with grief or emotional loss.",
        "Processing heartbreak or betrayal.",
        "Understanding pain as a catalyst for healing."
      ],
      difficulty: "Hard" },
    { id: 39, name: "Four of Swords", image: "src/images/four-of-swords.png", meaning: "Rest, recovery, retreat.",
      detailedMeaning: "This card calls for rest and recuperation. It suggests withdrawing from external noise to heal, reflect, and regain strength before taking further action.",
      useCases: [
        "Taking a mental or emotional break.",
        "Recovering from illness or stress.",
        "Finding peace through solitude."
      ],
      difficulty: "Easy" },
    { id: 40, name: "Five of Swords", image: "src/images/five-of-swords.png", meaning: "Conflict, tension, betrayal.",
      detailedMeaning: "The Five of Swords indicates conflict, arguments, or winning at a cost. It can reflect ego clashes or unethical victories. This card advises reflection on whether the battle is truly worth it.",
      useCases: [
        "Dealing with workplace or relationship conflict.",
        "Evaluating if a victory was ethical or fair.",
        "Letting go of ego-driven competition."
      ],
      difficulty: "Hard" },
    { id: 41, name: "Six of Swords", image: "src/images/six-of-swords.png", meaning: "Transition, moving forward, healing.",
      detailedMeaning: "This card symbolizes a shift from turmoil to peace. It may reflect a literal or emotional journey away from struggle toward a calmer state. It often implies support in healing transitions.",
      useCases: [
        "Leaving behind toxic situations.",
        "Healing after emotional turmoil.",
        "Relocating or moving into a more peaceful phase."
      ],
      difficulty: "Medium" },
    { id: 42, name: "Seven of Swords", image: "src/images/seven-of-swords.png", meaning: "Deception, strategy, secrecy.",
      detailedMeaning: "The Seven of Swords represents secrecy or acting behind the scenes. It can imply cunning strategy but also warns of deceit, avoidance, or dishonesty — either from yourself or others.",
      useCases: [
        "Navigating sensitive situations discreetly.",
        "Being cautious of deception.",
        "Creating a strategic plan."
      ],
      difficulty: "Hard" },
    { id: 43, name: "Eight of Swords", image: "src/images/eight-of-swords.png", meaning: "Restriction, helplessness, mental traps.",
      detailedMeaning: "This card suggests feeling trapped or restricted by fear or limiting beliefs. The path forward may seem blocked, but it is mental clarity that will release you.",
      useCases: [
        "Challenging self-imposed limitations.",
        "Releasing fear-based thinking.",
        "Escaping mental overwhelm."
      ],
      difficulty: "Hard" },
    { id: 44, name: "Nine of Swords", image: "src/images/nine-of-swords.png", meaning: "Anxiety, nightmares, worry.",
      detailedMeaning: "The Nine of Swords reflects sleepless nights, anxiety, and inner torment. It suggests that worries may be overwhelming or exaggerated, and healing begins by facing them honestly.",
      useCases: [
        "Managing chronic stress or anxiety.",
        "Facing fear-based thoughts.",
        "Seeking support for mental health."
      ],
      difficulty: "Hard" },
    { id: 45, name: "Ten of Swords", image: "src/images/ten-of-swords.png", meaning: "Painful ending, betrayal, collapse.",
      detailedMeaning: "This card marks a dramatic conclusion, a harsh ending, or deep emotional pain. Though painful, it also signifies that the worst is behind you, and healing can begin.",
      useCases: [
        "Processing a painful ending or loss.",
        "Acknowledging betrayal or failure.",
        "Finding hope after hitting rock bottom."
      ],
      difficulty: "Hard" },
    { id: 46, name: "Page of Swords", image: "src/images/page-of-swords.png", meaning: "Curiosity, new ideas, vigilance.",
      detailedMeaning: "The Page of Swords is alert, intelligent, and inquisitive. It encourages exploration of new ideas, sharp communication, and keen observation — though it can also imply restlessness or gossip.",
      useCases: [
        "Starting a new intellectual pursuit.",
        "Investigating or asking important questions.",
        "Practicing discernment and curiosity."
      ],
      difficulty: "Medium" },
    { id: 47, name: "Knight of Swords", image: "src/images/knight-of-swords.png", meaning: "Ambition, assertiveness, action.",
      detailedMeaning: "The Knight of Swords charges forward with bold ideas and fearless energy. It signifies ambition and fast-moving action — though it may warn against recklessness or impulsivity.",
      useCases: [
        "Taking fast, decisive action.",
        "Standing up for your beliefs.",
        "Channeling strong mental energy productively."
      ],
      difficulty: "Medium" },
    { id: 48, name: "Queen of Swords", image: "src/images/queen-of-swords.png", meaning: "Wisdom, independence, clarity.",
      detailedMeaning: "The Queen of Swords is logical, honest, and intellectually sharp. She balances truth with compassion and sees through illusions. This card encourages you to speak clearly and think critically.",
      useCases: [
        "Making a rational, unbiased decision.",
        "Communicating with honesty and precision.",
        "Leading with intellect and grace."
      ],
      difficulty: "Hard" },
    { id: 49, name: "King of Swords", image: "src/images/king-of-swords.png", meaning: "Authority, logic, intellect.",
      detailedMeaning: "The King of Swords represents mastery of thought, communication, and ethical leadership. He advises approaching situations with clarity, truth, and disciplined reasoning.",
      useCases: [
        "Making a strategic or ethical decision.",
        "Leading with wisdom and intellect.",
        "Balancing justice with reason."
      ],
      difficulty: "Hard" },
    { id: 50, name: "Ace of Pentacles", isFlipped: false, image: "src/images/ace-of-pentacles.png", meaning: "Opportunity, prosperity, manifestation.",
      detailedMeaning: "The Ace of Pentacles represents new beginnings in the material world — finances, career, health, or home. It signals potential for abundance and a grounded start to prosperity.",
      useCases: [
        "Starting a new job or investment.",
        "Beginning a health or wellness journey.",
        "Manifesting material stability."
      ],
      difficulty: "Easy" },
    { id: 51, name: "Two of Pentacles", isFlipped: false, image: "src/images/two-of-pentacles.png", meaning: "Balance, multitasking, adaptability.",
      detailedMeaning: "This card signifies the need to manage multiple responsibilities or shifting priorities. It represents flexibility, time management, and the importance of staying centered amid change.",
      useCases: [
        "Juggling work-life balance.",
        "Managing financial decisions.",
        "Adapting to changing circumstances."
      ],
      difficulty: "Medium" },
    { id: 52, name: "Three of Pentacles", isFlipped: false, image: "src/images/three-of-pentacles.png", meaning: "Teamwork, collaboration, skill development.",
      detailedMeaning: "The Three of Pentacles represents cooperative effort and skilled craftsmanship. It highlights the importance of working with others and being recognized for your contributions.",
      useCases: [
        "Collaborating on a team project.",
        "Being acknowledged for your work.",
        "Learning or improving a craft."
      ],
      difficulty: "Easy" },
    { id: 53, name: "Four of Pentacles", isFlipped: false, image: "src/images/four-of-pentacles.png", meaning: "Control, security, possessiveness.",
      detailedMeaning: "This card reflects a strong desire to maintain control or hold onto resources. It can indicate financial security but also fear of loss or resistance to change.",
      useCases: [
        "Saving or managing money conservatively.",
        "Setting financial boundaries.",
        "Letting go of scarcity mindset."
      ],
      difficulty: "Medium" },
    { id: 54, name: "Five of Pentacles", isFlipped: false, image: "src/images/five-of-pentacles.png", meaning: "Hardship, loss, isolation.",
      detailedMeaning: "The Five of Pentacles represents struggle — often financial, physical, or emotional. It suggests hardship but also implies that help is nearby, even if unseen.",
      useCases: [
        "Navigating financial or emotional difficulty.",
        "Seeking support or community.",
        "Focusing on hope amid adversity."
      ],
      difficulty: "Hard" },
    { id: 55, name: "Six of Pentacles", isFlipped: false, image: "src/images/six-of-pentacles.png", meaning: "Generosity, support, balance.",
      detailedMeaning: "This card reflects the giving and receiving of support. It emphasizes fairness, charitable acts, and balance in relationships or finances.",
      useCases: [
        "Helping others in need.",
        "Receiving support or guidance.",
        "Redistributing time or energy more fairly."
      ],
      difficulty: "Easy" },
    { id: 56, name: "Seven of Pentacles", isFlipped: false, image: "src/images/seven-of-pentacles.png", meaning: "Patience, investment, long-term vision.",
      detailedMeaning: "The Seven of Pentacles invites reflection on progress. It encourages patience and strategic thinking, emphasizing that rewards often come from consistent effort and care.",
      useCases: [
        "Evaluating the results of hard work.",
        "Planning for long-term success.",
        "Pausing to reassess goals."
      ],
      difficulty: "Medium" },
    { id: 57, name: "Eight of Pentacles", isFlipped: false, image: "src/images/eight-of-pentacles.png", meaning: "Skill mastery, dedication, craftsmanship.",
      detailedMeaning: "This card symbolizes deep focus and dedication to a task or craft. It highlights the importance of effort, training, and continual improvement.",
      useCases: [
        "Working hard toward a goal.",
        "Studying or training to improve.",
        "Practicing consistency and discipline."
      ],
      difficulty: "Medium" },
    { id: 58, name: "Nine of Pentacles", isFlipped: false, image: "src/images/nine-of-pentacles.png", meaning: "Self-sufficiency, abundance, refinement.",
      detailedMeaning: "The Nine of Pentacles celebrates independence and the rewards of sustained effort. It suggests enjoying the fruits of your labor with confidence and grace.",
      useCases: [
        "Enjoying personal achievements.",
        "Living a life of comfort and elegance.",
        "Celebrating self-worth and success."
      ],
      difficulty: "Easy" },
    { id: 59, name: "Ten of Pentacles", isFlipped: false, image: "src/images/ten-of-pentacles.png", meaning: "Legacy, wealth, long-term security.",
      detailedMeaning: "This card represents long-term success, family legacy, and financial stability. It emphasizes generational wealth, strong foundations, and shared prosperity.",
      useCases: [
        "Investing in family or legacy goals.",
        "Building long-term stability.",
        "Creating a supportive home or community."
      ],
      difficulty: "Medium" },
    { id: 60, name: "Page of Pentacles", isFlipped: false, image: "src/images/page-of-pentacles.png", meaning: "Ambition, opportunity, learning.",
      detailedMeaning: "The Page of Pentacles is eager to explore new opportunities, particularly in career or education. It reflects practicality, a student mindset, and readiness to build success.",
      useCases: [
        "Beginning a course or certification.",
        "Planning a new financial endeavor.",
        "Taking small steps toward big goals."
      ],
      difficulty: "Easy" },
    { id: 61, name: "Knight of Pentacles", isFlipped: false, image: "src/images/knight-of-pentacles.png", meaning: "Reliability, persistence, hard work.",
      detailedMeaning: "The Knight of Pentacles values diligence and responsibility. He symbolizes dependable effort, methodical progress, and unwavering focus.",
      useCases: [
        "Committing to a steady path.",
        "Showing up consistently in your work.",
        "Handling responsibilities with care."
      ],
      difficulty: "Medium" },
    { id: 62, name: "Queen of Pentacles", isFlipped: false, image: "src/images/queen-of-pentacles.png", meaning: "Nurturing, abundance, practicality.",
      detailedMeaning: "The Queen of Pentacles blends grounded practicality with care and compassion. She symbolizes a strong provider and nurturer, connected to home, nature, and material well-being.",
      useCases: [
        "Managing home and finances with balance.",
        "Providing for others in a nurturing way.",
        "Creating a space of security and comfort."
      ],
      difficulty: "Easy" },
    { id: 63, name: "King of Pentacles", isFlipped: false, image: "src/images/king-of-pentacles.png", meaning: "Wealth, leadership, discipline.",
      detailedMeaning: "The King of Pentacles represents successful leadership and mastery in the material world. He is a provider and protector, symbolizing financial wisdom and business success.",
      useCases: [
        "Managing a business or investment portfolio.",
        "Providing for others through leadership.",
        "Building a legacy of abundance and wisdom."
      ],
      difficulty: "Hard" }
  ];
  const navigate = useNavigate();

  const TarotDetailWrapper = ({tarotCards}) => {
    console.log("called");
    const { id } = useParams();
    console.log("TarotDetailWrapper called with id:", id);
    const card = tarotCards.find(card => card.id === parseInt(id));
    console.log("Found card:", card);
    return <TarotDetail card={card} />;
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tarot Insights Board</h1>
        <button className="button" onClick={() => {navigate(`/`)}}>Home</button>
        <button className="button" onClick={() => {navigate(`/flashcards`)}}>Flashcards</button>
        <button className="button" onClick={() => {navigate(`/drawcards`)}}>Drawcards</button>
      </header>

      <Routes>
        {/* Main route showing tarot cards */}
        <Route path="/" element={
          <div className="tarot-card-container">
            {tarotCards.map((card) => (
              <TarotCard key={card.id} card={card} />
            ))}
          </div>
        } />

        <Route path="/:id" element={<TarotDetailWrapper tarotCards={tarotCards}/>} />
        <Route path="/flashcards" element={<FlashCards tarotCards={tarotCards}/>} />
        <Route path="/drawcards" element={<DrawCards tarotCards={tarotCards}/>} />
      </Routes>
    </div>
  );
}

export default App;
