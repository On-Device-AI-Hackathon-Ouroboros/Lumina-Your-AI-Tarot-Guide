# Nova - Your AI Tarot Guide
Nova is an on-device AI tarot reading companion designed to provide comfort and guidance during uncertain times. In a world where anxiety and desperation often cloud our judgment, Nova offers a gentle, spam-free alternative to lengthy tarot reader waitlists and unreliable fortune-telling apps.  

Developed in just 24 hours during a hackathon, Nova focuses on creating a warm, supportive experience rather than fancy features. It serves as a digital companion that celebrates your happiness, comforts you during struggles, and reminds you of your inner strength when life becomes overwhelming.

## Table of Contents
- [Why On-device](#why-on-device)
- [Features](#features)
- [Developers](#developers)
- [Setup Instructions](#setup-instructions)
- [Run Instructions](#run-instructions)
- [Tech Stack](#tech-stack)
- [Video Walkthrough](#video-walkthrough)
- [Notes](#notes)
- [License](#license)

## Why On-device
Why Nova is just perfect for on-device:
1. **Privacy and Intimacy**: Tarot readings and personal journaling are deeply private experiences. By keeping Nova on-device, all your personal reflections, emotional data, and questions stay completely on your device.
2. **Emotional Security**: When people turn to mystical practices, they're often in vulnerable emotional states. On-device processing creates a sense of emotional safety and containment. 
3. **Resource Efficiency**: Our tarot reading algorithms and journal analysis don't require massive computing power, making them perfect for efficient on-device processing that won't drain your battery.

## Features
### 🔮 Crystal Ball  
Receive personalized oracle messages based on your birthday and the exact moment you seek guidance. These messages aren't random but specifically generated for your "moment of seeking."

### 🃏 Tarot Reading  
Nova offers two types of readings:
1. Yes or No: Get quick, concise, and clear answers to pressing questions when you're feeling indecisive about matters like "Will we meet again?" or "Should I make this relationship exclusive?"
2. Nova Tells You: Receive detailed insights by selecting a category (love, career, self-discovery, etc.). Nova automatically matches the most suitable card spread for your question and provides comprehensive guidance. Continue the conversation to explore your reading further.

### 📓 Self Journal  
Your personal space to document thoughts, emotions, and daily experiences. Unlike standard mood tracking apps that require you to define your emotions (which most people struggle with), Nova uses AI to analyze your journal entries and provide emotional insights. Future updates will include a database feature to track emotional patterns over time.

## Developers
- Ziqi Liu, [Linkedin](https://www.linkedin.com/in/ziqi-l-scarlett/)  
- Ya Ji, [Linkedin](https://www.linkedin.com/in/ya-ji/)  
- Yijia Ma, [Linkedin](https://linkedin.com/in/yijia-ma-815a23250)

## Setup Instructions
```
git clone https://github.com/On-Device-AI-Hackathon-Ouroboros/Nova-Your-AI-Tarot-Guide.git  
cd Nova-Your Tarot Guide  
# Frontend setup
cd frontend 
pip install -r requirements.txt
npm install
npm run dev  
  
# Backend setup
cd backend/model_2
# Activate virtual environment
.\llm-venv\Scripts\Activate.ps1  
# If llm-venv not found, please first create a new virtual env by 
python -m venv llm-venv
source llm-venv/bin/activate
pip install -r requirements.txt
```

## Run Instructions
Before running the servers, make sure you're in the root directory of the project (`./Nova-Your Tarot Guide`).
### Run frontend server  
```
cd frontend  
npm run dev  
```

### Run backend server  
```
cd backend  
# To verify the model works
python ./src/workspace.py
python ./src/chatbot.py

# Run backend server
python model.py
```

## Tech Stack
### Frontend
Typescript
Next.js
Express
React
### Backend
Python
Flask

## Video Walkthrough

Here's a walkthrough of Nova AI:
[Video Walkthrough](https://www.loom.com/share/your-video-link)  
Video created with Loom

## Notes
1. **Model Comparison**:
	•	**Llama-3.1-8b-chat-8k**: Based on our experiments, this model performs more stably within the AnythingLLM framework compared to Llama-3.2-3b-chat-8k.

2. **AnythingLLM Considerations**:
	•	**Model Switching**: AnythingLLM may require a restart and switching between models to maintain responsiveness. 

3. **Next.js Socket Behavior**:
	•	**Auto Socket Close on Timeout**: Next.js has an automatic socket close mechanism when a timeout occurs. This behavior can cause issues during debugging, especially with complex prompts that take longer to process. Even if the backend is working well, the frontend might still encounter internal server errors due to the socket timeout.

4. **Prompt Engineering Optimization**
  •	Excessively long prompts resulted in unstable responses, while imprecise prompts generated unsatisfactory answers. We spent much time fine-tuning our prompts to achieve the balance between specificity and reliability.

## License

    Copyright [2025] [Ouroboros]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.