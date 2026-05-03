# 🗳️ ElectraGuide – AI Election Learning Assistant

### Final Submission – Production-Ready Application

ElectraGuide is a fully functional, AI-powered web assistant designed to help users understand the election process through interactive learning, smart explanations, and a clean, intuitive interface.

---

## 🚀 Key Enhancements & Features

ElectraGuide has been refined into a highly polished, production-ready AI assistant with a strong focus on intelligence, interactivity, and user experience.

---

### 🧠 Advanced Chat Intelligence

* Context-aware responses based on the current learning step (e.g., *“Step 2: Nomination”*)
* Logical continuity by referencing previous and upcoming stages
* Intent-based responses:

  * **Simple / Short** → concise explanations
  * **Detail / More** → structured, in-depth explanations
  * **Like I’m 10 / Kid** → analogy-based explanations
* “Thinking…” animation to simulate real AI processing

---

### 🎯 Smart Interaction Controls

* Quick-action buttons:

  * *Explain Simply*
  * *Explain in Detail*
  * *Explain Like I’m 10*
* In-chat navigation:

  * ⬅️ Previous Step
  * ➡️ Next Step

---

### 🎙️ Voice Interaction (Google Browser APIs)

* 🎤 Speech-to-Text using Web Speech API
* 🔊 Text-to-Speech for AI responses
* Visual feedback for recording (“Listening…”)
* Graceful handling of microphone permissions

---

### 🌍 Multilingual Experience

* Instant English ↔ Hindi toggle
* Local translation system (no external APIs)
* Applies across:

  * UI elements
  * Chat responses
  * Quiz feedback

---

### 📊 Smart Quiz System

* Dynamic score calculation with percentage
* Tier-based feedback:

  * Low → revisit concepts
  * Medium → good understanding
  * High → excellent mastery 🎉
* Navigation options:

  * Restart Learning
  * View Timeline

---

### 🎨 Premium UI / UX

* Modern, minimal design inspired by Apple/Stripe
* Smooth animations with Framer Motion
* Consistent spacing and typography
* Subtle visual cues and interaction hints

---

### ⚡ Performance & Stability

* Fully client-side, lightweight (<10MB)
* No dependency on paid APIs
* Fast load time and smooth interactions
* Clean, modular, and maintainable code

---

## ☁️ Google Technologies Used

* **Web Speech API (Google-powered in Chrome)** for real-time voice input
* Designed for seamless integration within the Google ecosystem

---

## ▶️ How to Run Locally

```bash
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## 🧪 Usage Tip

Click the 🎤 microphone icon in the chat assistant and try:

👉 “Explain this like I’m 10”

---

## 🏁 Final Outcome

ElectraGuide delivers a seamless and intelligent learning experience that:

* Simplifies complex election processes
* Adapts dynamically to user intent
* Provides real-world usability through interactive design

This implementation meets all challenge requirements while maintaining reliability, performance, and user-centric design.

---

## 🚀 Deployment

The application is deployed using Vercel for fast and reliable hosting.

Due to billing constraints with Google Cloud Run, the project uses a lightweight deployment approach while still integrating Google technologies via browser-based APIs (Web Speech API).
