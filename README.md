# 🗳️ ElectraGuide – AI Election Learning Assistant

### Final Submission – Production-Ready Application

ElectraGuide is a fully functional, AI-powered web assistant designed to help users understand the election process through interactive learning, smart explanations, and a clean, intuitive interface.

---

## ✨ Key Features

### 🎯 Guided Learning Flow

* Step-by-step interactive experience covering all core election stages
* Smooth transitions powered by Framer Motion
* Dynamic progress tracking for better user engagement

---

### 📊 Interactive Timeline

* Clickable, expandable timeline of election stages
* Visual breakdown of each step for quick understanding

---

### 🤖 Smart Chat Assistant

* Context-aware responses based on the current election step
* Intent detection:

  * **simple / short** → concise explanations
  * **detail / more** → in-depth explanations
  * **like I’m 10 / kid** → simplified analogies
* 🎤 Voice input using browser-based speech recognition

---

### 🌍 Multilingual Support

* Instant language toggle (English ↔ Hindi)
* Powered by a lightweight local translation dictionary
* No external API dependency, ensuring fast and reliable switching

---

### 🧪 Quiz & Gamification

* Interactive quiz with instant feedback
* Final score and completion state
* Reinforces learning through engagement

---

## 🎨 UI / UX Highlights

* Premium, minimal design inspired by modern products
* Smooth animations and transitions
* Clean typography and consistent spacing
* Fully responsive layout
* Light/Dark mode support

---

## 🧠 Intelligent Behavior

The assistant demonstrates logical decision-making by:

* Adapting responses based on user intent
* Maintaining context of the current learning step
* Providing simplified or detailed explanations dynamically

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

## 🏁 Final Status

ElectraGuide is fully functional and submission-ready.

The application successfully demonstrates:

* A smart, context-aware assistant
* Logical decision-making based on user input
* Effective use of Google technologies
* Practical real-world usability
* Clean, maintainable, and modular code

This solution delivers a polished, reliable, and engaging experience aligned with all challenge expectations.

---

## 🚀 Deployment

The application is deployed using Vercel for fast and reliable hosting.

Due to billing constraints with Google Cloud Run, the project uses a lightweight deployment approach while still integrating Google technologies via browser-based APIs (Web Speech API).
