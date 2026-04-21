# 📱 Mock Test App (React Native)

 Overview
This is a timed mock test application built using React Native.  
It simulates real exam conditions for competitive exams like IIT JAM, GATE, and CSIR NET.

---

Features

- ✅ MCQ (Single correct answer)
- ✅ MSQ (Multiple correct answers)
- ✅ Countdown Timer (Auto-submit at 0)
- ✅ Question Navigation Palette
- ✅ Previous / Next navigation
- ✅ Submit with confirmation
- ✅ Result Screen with:
  - Score & Percentage
  - Correct / Wrong / Skipped
  - Time tracking per question

---

Logic Handling

- MCQ → Only one option selectable  
- MSQ → Multiple options allowed  
- MSQ scoring → Full match required (partial = 0)  
- Timer → Auto submit when time ends  
- Time tracking → Implemented using useRef  

---

Tech Stack

- React Native (Expo)
- React Navigation
- JavaScript (Hooks: useState, useEffect, useRef)

---



```bash
npm install
npx expo start
