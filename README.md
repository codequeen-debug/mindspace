# MindSpace
A mindfulness app built with Vite + React, based on the FHCC Figma prototype.

## Problem Statement
College students often experience overwhelming levels of stress, anxiety, and disorganisation due to demanding coursework, deadlines, extracurricular activities, and personal responsibilities. Many existing productivity applications focus only on task completion and neglect emotional well-being. **MindSpace** was created to address this problem by combining productivity tools with wellness-centred design to help students stay organised while supporting mental balance.

---
## Motivation / User Story
### User Story
**Derrick** is a college student who feels mentally scattered and overwhelmed during busy academic periods. Between assignments, exams, and personal stress, he struggles to stay organised and frequently feels emotionally drained. After repeatedly reaching out to his Resident Assistant (**Rich-Ann**) for support, a solution emerged: an app that combines organisation, reflection, and wellness into a single calming experience.
**MindSpace helps students like Derrick manage academic responsibilities while promoting mental wellness and healthy habits.**

---
## Moore’s Vision Template
**For** college students who struggle with organisation and stress,  
**who** need a calming and productive way to manage daily responsibilities,  
**MindSpace** is a wellness-focused productivity application  
**that** combines journaling, task management, and soothing design to support mental well-being and academic success.  
**Unlike** traditional productivity apps that focus only on efficiency,  
**Our product** promotes emotional wellness through reflection, organisation, and a calming user experience.

---

## Target Users
MindSpace is designed for:
- College students experiencing academic stress
- Students balancing multiple responsibilities
- Individuals seeking better organisation and emotional wellness
- Students who want a private, calming productivity space

---

## Features

- **Planner** — Calendar (navigable month view) + task checklist with add/delete/sort
- **Focus** — S.A.V.E.R.S morning routine checklist with completion celebration
- **Journal** — Reflection journal with save/delete/lock/sort entries
- Context menus matching the prototype's dark modal pattern
- Global state via React `useReducer` + Context API

## Setup
```bash
npm install
npm run dev
```
Then open http://localhost:5173

## Build
```bash
npm run build
npm run preview
```
## Project Structure

```text
src/
├── main.jsx             # Application entry point
├── App.jsx              # Main shell, providers, and routing logic
├── index.css            # Global design tokens and styles
├── StatusBar.test.jsx   # Unit tests for core components
├── store/
│   └── store.jsx        # Global state management (useReducer + Context API)
├── components/          # Reusable UI components
│   ├── StatusBar.jsx
│   └── BottomNav.jsx
├── pages/               # Top-level route views
│   ├── HomeScreen.jsx
│   ├── PlannerScreen.jsx
│   ├── FocusScreen.jsx
│   └── JournalScreen.jsx
└── data/                # Static data and local assets
    └── journalEntries.jsx
```

## System Architecture
MindSpace uses a **Firebase Backend-as-a-Service (BaaS)** architecture.

### Why Firebase?
We selected Firebase because:
- It provides **real-time database updates**
- Simplifies backend setup and deployment
- Reduces server management complexity
- Supports scalability for student users
- Enables future authentication and notifications

### Architecture
```text
+----------------------+
|      End User        |
|   (College Student)  |
+----------+-----------+
           |
           v
+----------------------+
| React + Vite UI      |
| (Frontend Layer)     |
| - Planner Screen     |
| - Journal Screen     |
| - Focus Screen       |
| - Home Dashboard     |
+----------+-----------+
           |
           v
+----------------------+
| Firebase Firestore   |
| (Backend Service)    |
| - Journal Storage    |
| - Task Storage       |
| - Real-Time Sync     |
+----------+-----------+
           |
           v
+----------------------+
| Real-Time Updates    |
| - Live journal sync  |
| - Task updates       |
| - Data persistence   |
+----------------------+
```
 
## Design System
Colours, spacing, and typography are all defined as CSS custom properties in `index.css`.
The palette matches the prototype: light steel blue (`#7fafc4`) primary, muted teal navbar,
lavender calendar accent (`#9b8ec4`), and dark modals (`#2e2e3e`).

Fonts: **Sora** (display/headings) + **DM Sans** (body text) via Google Fonts.
