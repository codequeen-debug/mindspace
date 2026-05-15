import { useEffect, useRef, useState } from 'react'


// ── Icons ────────────────────────────────────────────────────────────────────
function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}
function DotsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    </svg>
  )
}
function LockOpenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  )
}
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  )
}
function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6M9 6V4h6v2" />
    </svg>
  )
}
function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" width="16" height="16">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  )
}
function NotebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  )
}
function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" width="18" height="18">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const MOODS = ['Happy', 'Calm', 'Anxious', 'Sad', 'Grateful', 'Tired']
const MAX_CHARS = 280
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY

const THERAPIST_SYSTEM = `You are a warm, compassionate AI mental wellness companion named Sage. 
You support users who are journaling about their emotions and mental health. 
Respond with empathy, ask thoughtful follow-up questions, and offer gentle guidance. 
Keep responses concise (2-4 sentences). Never diagnose. 
Always encourage professional help for serious concerns.
Start your first message with a warm greeting.`

function formatDate(d = new Date()) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function JournalScreen() {
  const [entries, setEntries] = useState([
    { id: 1, date: 'Nov 12, 2025', text: 'Today was a good day. I felt really productive and managed to complete most of my tasks.', mood: 'Happy' },
    { id: 2, date: 'Nov 11, 2025', text: 'Had a rough morning but turned it around by going for a walk in the afternoon.', mood: 'Calm' },
  ])
  const [text, setText] = useState('')
  const [selectedMood, setSelectedMood] = useState('Happy')
  const [locked, setLocked] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [search, setSearch] = useState('')
  const [sortAsc, setSortAsc] = useState(false)
  const [breakActive, setBreakActive] = useState(false)
  const [breakSeconds, setBreakSeconds] = useState(300)
  const breakRef = useRef(null)

  // Chat state
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)
  const [chatHistory, setChatHistory] = useState([])
  const chatEndRef = useRef(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (showChat) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, showChat])

  // Initial greeting from Sage when chat opens for first time
  useEffect(() => {
    if (showChat && chatMessages.length === 0) {
      setChatMessages([{
        role: 'therapist',
        text: "Hi there 🌿 I'm Sage, your wellness companion. How are you feeling today? I'm here to listen.",
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
      setUnreadCount(0)
    }
    if (showChat) setUnreadCount(0)
  }, [showChat])

async function sendChatMessage() {
  if (!chatInput.trim() || chatLoading) return

  const userText = chatInput.trim()

  const userMsg = {
    role: 'user',
    text: userText,
    time: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  setChatMessages(prev => [...prev, userMsg])
  setChatInput('')
  setChatLoading(true)

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${THERAPIST_SYSTEM}

User message: ${userText}

Respond naturally and differently each time.`
                }
              ]
            }
          ]
        })
      }
    )

    const data = await res.json()

    console.log(data)

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here for you. Tell me a little more."

    const therapistMsg = {
      role: 'therapist',
      text: reply,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    setChatMessages(prev => [...prev, therapistMsg])

    if (!showChat) {
      setUnreadCount(n => n + 1)
    }

  } catch (err) {
    console.error(err)

    setChatMessages(prev => [
      ...prev,
      {
        role: 'therapist',
        text: 'Connection issue. Please try again.',
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    ])
  } finally {
    setChatLoading(false)
  }
}

  // Break timer
  useEffect(() => {
    if (breakActive) {
      breakRef.current = setInterval(() => {
        setBreakSeconds(s => {
          if (s <= 1) { clearInterval(breakRef.current); setBreakActive(false); return 300 }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(breakRef.current)
    }
    return () => clearInterval(breakRef.current)
  }, [breakActive])

  function toggleBreak() {
    if (breakActive) { setBreakActive(false); setBreakSeconds(300) }
    else { setBreakSeconds(300); setBreakActive(true) }
  }

  function formatBreak(s) {
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  }

  function saveEntry() {
    if (locked || !text.trim()) return
    setEntries(prev => [{ id: Date.now(), date: formatDate(), text: text.trim(), mood: selectedMood }, ...prev])
    setText('')
  }

  function deleteEntry(id) { setEntries(prev => prev.filter(e => e.id !== id)) }

  function openEdit(entry) { setEditId(entry.id); setEditText(entry.text) }

  function confirmEdit() {
    if (!editText.trim()) return
    setEntries(prev => prev.map(e => e.id === editId ? { ...e, text: editText.trim() } : e))
    setEditId(null); setEditText('')
  }

  function toggleSort() { setSortAsc(a => !a); setEntries(prev => [...prev].reverse()) }

  const filtered = entries.filter(
    e => e.text.toLowerCase().includes(search.toLowerCase()) ||
         e.mood.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <style>{`
        .journal-root {
          background: linear-gradient(170deg, #b8d9f5 0%, #dbeeff 40%, #e8f4fd 70%, #f0f8ff 100%);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          font-family: var(--font-display, 'SF Pro Rounded', system-ui, sans-serif);
        }
        .cloud-shape {
          position: absolute;
          background: rgba(255,255,255,0.65);
          border-radius: 50px;
          pointer-events: none;
        }
        .cloud-shape::before, .cloud-shape::after {
          content: '';
          position: absolute;
          background: rgba(255,255,255,0.65);
          border-radius: 50%;
        }
        .cloud-a { width: 110px; height: 34px; top: 22px; left: 18px; }
        .cloud-a::before { width: 56px; height: 48px; top: -22px; left: 14px; }
        .cloud-a::after  { width: 38px; height: 36px; top: -14px; left: 48px; }
        .cloud-b { width: 80px; height: 24px; top: 36px; right: 28px; opacity: 0.55; }
        .cloud-b::before { width: 40px; height: 36px; top: -16px; left: 10px; }
        .cloud-b::after  { width: 28px; height: 26px; top: -10px; left: 38px; }
        .cloud-c { width: 60px; height: 18px; top: 220px; right: 12px; opacity: 0.4; }
        .cloud-c::before { width: 32px; height: 28px; top: -12px; left: 8px; }

        .j-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 20px 8px; position: relative; z-index: 2;
        }
        .j-icon-btn {
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 50%;
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #2a6fa8; transition: background 0.15s;
          position: relative;
        }
        .j-icon-btn:hover { background: rgba(255,255,255,0.85); }

        /* Chat badge */
        .j-chat-badge {
          position: absolute;
          top: -4px; right: -4px;
          background: #e8402a;
          color: white;
          font-size: 10px; font-weight: 800;
          width: 18px; height: 18px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid white;
          animation: pulse-badge 1.5s infinite;
        }
        @keyframes pulse-badge {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .j-title {
          padding: 4px 20px 0; font-size: 30px; font-weight: 800;
          color: #1a4d7a; line-height: 1.12; position: relative; z-index: 2;
        }
        .j-mood-row {
          display: flex; align-items: center; gap: 7px;
          padding: 10px 20px 6px; color: #2a6fa8; font-size: 14px; font-weight: 500;
          position: relative; z-index: 2;
        }
        .j-mood-chips {
          display: flex; gap: 7px; flex-wrap: wrap;
          padding: 0 20px 10px; position: relative; z-index: 2;
        }
        .j-mood-chip {
          background: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 20px; padding: 4px 13px;
          font-size: 12px; color: #1a4d7a; cursor: pointer;
          transition: background 0.15s, font-weight 0.1s;
        }
        .j-mood-chip:hover { background: rgba(255,255,255,0.75); }
        .j-mood-chip.active { background: rgba(255,255,255,0.9); font-weight: 700; border-color: rgba(42,111,168,0.35); }
        .j-streak-row { display: flex; gap: 8px; padding: 4px 20px 10px; position: relative; z-index: 2; }
        .j-badge {
          background: rgba(255,255,255,0.52);
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 14px; padding: 5px 12px;
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: #1a4d7a; font-weight: 600;
        }
        .j-badge svg { color: #e8a020; }
        .j-lock-banner {
          margin: 0 16px 6px;
          background: rgba(192,80,80,0.1); border: 1px solid rgba(192,80,80,0.3);
          border-radius: 12px; padding: 8px 14px;
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; color: #8a2020; font-weight: 500;
          position: relative; z-index: 2;
        }
        .j-textarea-wrap { margin: 0 16px; position: relative; z-index: 2; }
        .j-textarea {
          width: 100%; height: 120px;
          background: rgba(255,255,255,0.62);
          border: 1.5px solid rgba(255,255,255,0.88);
          border-radius: 18px; padding: 14px 16px;
          font-size: 14px; color: #1a3d5c; resize: none; outline: none;
          font-family: inherit; transition: background 0.15s, border-color 0.15s;
        }
        .j-textarea::placeholder { color: #7ab4d4; }
        .j-textarea:focus { background: rgba(255,255,255,0.82); border-color: rgba(90,160,220,0.6); }
        .j-textarea:disabled { opacity: 0.5; cursor: not-allowed; }
        .j-char-count { text-align: right; font-size: 11px; color: #5a94c0; margin-top: 4px; padding-right: 4px; }
        .j-char-count.warn { color: #c05050; }
        .j-btn-row { display: flex; gap: 8px; padding: 10px 16px 4px; position: relative; z-index: 2; }
        .j-btn-save {
          flex: 1; background: rgba(42,111,168,0.82); color: white;
          border: none; border-radius: 14px; padding: 13px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          font-family: inherit; transition: background 0.15s, transform 0.1s;
        }
        .j-btn-save:hover { background: rgba(26,77,122,0.9); }
        .j-btn-save:active { transform: scale(0.98); }
        .j-btn-save:disabled { background: rgba(150,195,225,0.45); color: rgba(255,255,255,0.55); cursor: not-allowed; }
        .j-break-banner {
          margin: 10px 16px;
          background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.88);
          border-radius: 50px; display: flex; align-items: center; justify-content: center;
          gap: 10px; padding: 10px 16px; position: relative; z-index: 2;
        }
        .j-break-text { font-size: 12px; font-weight: 700; color: #2a6fa8; letter-spacing: 0.06em; text-transform: uppercase; }
        .j-break-timer { font-size: 13px; font-weight: 800; color: #1a4d7a; min-width: 36px; text-align: center; }
        .j-btn-break {
          background: rgba(42,111,168,0.14); border: 1px solid rgba(42,111,168,0.28);
          border-radius: 20px; padding: 4px 12px;
          font-size: 11px; font-weight: 700; color: #1a4d7a; cursor: pointer;
          font-family: inherit; transition: background 0.15s;
        }
        .j-btn-break:hover { background: rgba(42,111,168,0.25); }
        .j-search {
          margin: 4px 16px 8px;
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.52); border: 1px solid rgba(255,255,255,0.85);
          border-radius: 12px; padding: 8px 12px; position: relative; z-index: 2; color: #6fa8cc;
        }
        .j-search input { background: none; border: none; outline: none; font-size: 13px; color: #1a3d5c; width: 100%; font-family: inherit; }
        .j-search input::placeholder { color: #7ab4d4; }
        .j-entries { padding: 4px 16px 100px; position: relative; z-index: 2; }
        .j-entries-label { font-size: 11px; font-weight: 700; color: #5a94c0; letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 10px; padding-left: 2px; }
        .j-entry-card {
          background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.88);
          border-radius: 18px; padding: 12px 14px; margin-bottom: 10px;
          animation: slideIn 0.2s ease;
        }
        @keyframes slideIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .j-entry-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .j-entry-date { font-size: 11px; font-weight: 700; color: #5a94c0; letter-spacing: 0.04em; }
        .j-mood-tag { font-size: 10px; background: rgba(42,111,168,0.12); color: #1a4d7a; border-radius: 10px; padding: 2px 9px; font-weight: 700; }
        .j-entry-text { font-size: 13px; color: #1a3d5c; line-height: 1.55; }
        .j-entry-actions { display: flex; gap: 6px; margin-top: 9px; }
        .j-btn-edit, .j-btn-del {
          display: flex; align-items: center; gap: 4px;
          background: none; border-radius: 10px; padding: 4px 12px;
          font-size: 11px; font-weight: 600; cursor: pointer;
          font-family: inherit; transition: background 0.15s;
        }
        .j-btn-edit { color: #2a6fa8; border: 1px solid rgba(42,111,168,0.25); }
        .j-btn-edit:hover { background: rgba(42,111,168,0.1); }
        .j-btn-del { color: #c05050; border: 1px solid rgba(192,80,80,0.25); }
        .j-btn-del:hover { background: rgba(192,80,80,0.08); }
        .j-navbar {
          position: fixed; bottom: 0; left: 0; right: 0;
          display: flex; justify-content: space-around;
          padding: 12px 0 18px;
          background: rgba(220,238,252,0.88); border-top: 1px solid rgba(255,255,255,0.8);
          backdrop-filter: blur(8px); z-index: 5;
        }
        .j-nav-item {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          font-size: 10px; font-weight: 600; color: #5a94c0; cursor: pointer;
        }
        .j-nav-item.active { color: #1a4d7a; }
        .j-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(20,60,100,0.32); z-index: 20;
          display: flex; align-items: flex-end; justify-content: center;
          padding-bottom: 24px; animation: fadeIn 0.15s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .j-modal {
          background: rgba(228,243,255,0.97); border: 1.5px solid rgba(255,255,255,0.92);
          border-radius: 24px; padding: 22px 18px;
          width: calc(100% - 32px); max-width: 420px;
          animation: slideUp 0.2s ease;
        }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .j-modal-title { font-size: 15px; font-weight: 800; color: #1a4d7a; margin-bottom: 14px; }
        .j-modal-btns { display: flex; gap: 8px; margin-top: 12px; }
        .j-btn-confirm { flex: 1; background: #2a6fa8; color: white; border: none; border-radius: 13px; padding: 11px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; }
        .j-btn-confirm:hover { background: #1a4d7a; }
        .j-btn-cancel { flex: 1; background: rgba(90,148,192,0.13); color: #2a6fa8; border: 1px solid rgba(90,148,192,0.3); border-radius: 13px; padding: 11px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; }
        .j-btn-cancel:hover { background: rgba(90,148,192,0.22); }
        .j-menu-row {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.85);
          border-radius: 13px; padding: 11px 14px; cursor: pointer;
          font-size: 14px; font-weight: 600; color: #1a4d7a; margin-bottom: 7px;
          transition: background 0.15s;
        }
        .j-menu-row:hover { background: rgba(255,255,255,0.75); }
        .j-menu-row.danger { color: #c05050; }
        .j-menu-row.danger:hover { background: rgba(192,80,80,0.07); }
        .j-empty { text-align: center; font-size: 13px; color: #6fa8cc; padding: 20px 0; }

        /* ── Chat Modal ── */
        .chat-overlay {
          position: fixed; inset: 0;
          background: rgba(10,40,80,0.45);
          z-index: 30;
          display: flex; align-items: flex-end; justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        .chat-modal {
          width: 100%; max-width: 480px;
          height: 78vh;
          background: linear-gradient(160deg, #e8f4ff 0%, #f4f9ff 100%);
          border-radius: 28px 28px 0 0;
          border: 1.5px solid rgba(255,255,255,0.9);
          border-bottom: none;
          display: flex; flex-direction: column;
          animation: slideUp 0.25s ease;
          overflow: hidden;
        }
        .chat-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 18px 14px;
          background: rgba(255,255,255,0.6);
          border-bottom: 1px solid rgba(200,225,245,0.6);
          flex-shrink: 0;
        }
        .chat-header-info { display: flex; align-items: center; gap: 10px; }
        .chat-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, #5ba8d4, #2a6fa8);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .chat-name { font-size: 15px; font-weight: 800; color: #1a4d7a; }
        .chat-status { font-size: 11px; color: #5a94c0; font-weight: 500; display: flex; align-items: center; gap: 4px; }
        .chat-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #4caf7d; display: inline-block; }
        .chat-close {
          background: rgba(42,111,168,0.1); border: none; border-radius: 50%;
          width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #2a6fa8; transition: background 0.15s;
        }
        .chat-close:hover { background: rgba(42,111,168,0.2); }
        .chat-messages {
          flex: 1; overflow-y: auto; padding: 16px 14px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(90,148,192,0.3); border-radius: 4px; }
        .chat-bubble-wrap {
          display: flex; flex-direction: column;
          animation: slideIn 0.2s ease;
        }
        .chat-bubble-wrap.user { align-items: flex-end; }
        .chat-bubble-wrap.therapist { align-items: flex-start; }
        .chat-bubble {
          max-width: 80%; padding: 10px 14px;
          font-size: 13.5px; line-height: 1.5;
          border-radius: 18px; word-break: break-word;
        }
        .chat-bubble.user {
          background: linear-gradient(135deg, #2a6fa8, #1a4d7a);
          color: white; border-bottom-right-radius: 5px;
        }
        .chat-bubble.therapist {
          background: rgba(255,255,255,0.85);
          color: #1a3d5c; border-bottom-left-radius: 5px;
          border: 1px solid rgba(200,225,245,0.7);
        }
        .chat-time { font-size: 10px; color: #8ab4cc; margin-top: 3px; padding: 0 4px; }
        .chat-typing {
          display: flex; align-items: center; gap: 5px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(200,225,245,0.7);
          border-radius: 18px; border-bottom-left-radius: 5px;
          width: fit-content;
        }
        .chat-typing span {
          width: 7px; height: 7px; border-radius: 50%;
          background: #5a94c0; display: inline-block;
          animation: typing-bounce 1.2s infinite;
        }
        .chat-typing span:nth-child(2) { animation-delay: 0.2s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        .chat-input-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 14px 90px;
        }
        .chat-input {
          flex: 1; background: rgba(255,255,255,0.8);
          border: 1.5px solid rgba(200,225,245,0.8);
          border-radius: 22px; padding: 10px 16px;
          font-size: 13.5px; color: #1a3d5c;
          outline: none; font-family: inherit;
          transition: border-color 0.15s;
        }
        .chat-input:focus { border-color: rgba(42,111,168,0.5); }
        .chat-input::placeholder { color: #8ab4cc; }
        .chat-send {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, #2a6fa8, #1a4d7a);
          border: none; display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: white; flex-shrink: 0;
          transition: transform 0.15s, opacity 0.15s;
        }
        .chat-send:hover { transform: scale(1.08); }
        .chat-send:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
        .chat-role-tag {
          font-size: 10px; font-weight: 700; color: #5a94c0;
          letter-spacing: 0.05em; text-transform: uppercase;
          padding: 0 4px; margin-bottom: 3px;
        }
      `}</style>

      <div className="journal-root">
        <div className="cloud-shape cloud-a" />
        <div className="cloud-shape cloud-b" />
        <div className="cloud-shape cloud-c" />

        {/* Header */}
        <div className="j-header">
          <button className="j-icon-btn" aria-label="Back"><ArrowLeftIcon /></button>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Chat button with notification badge */}
            <button className="j-icon-btn" onClick={() => setShowChat(true)} aria-label="Open therapist chat">
              <ChatIcon />
              {unreadCount > 0 && (
                <span className="j-chat-badge">{unreadCount}</span>
              )}
            </button>
            <button className="j-icon-btn" onClick={() => setLocked(l => !l)} aria-label="Toggle lock">
              {locked ? <LockIcon /> : <LockOpenIcon />}
            </button>
            <button className="j-icon-btn" onClick={() => setShowMenu(true)} aria-label="Menu">
              <DotsIcon />
            </button>
          </div>
        </div>

        <div className="j-title">Reflection<br />Journal</div>

        <div className="j-mood-row"><SunIcon /> How are you feeling today?</div>

        <div className="j-mood-chips">
          {MOODS.map(m => (
            <button key={m} className={`j-mood-chip${selectedMood === m ? ' active' : ''}`} onClick={() => setSelectedMood(m)}>{m}</button>
          ))}
        </div>

        <div className="j-streak-row">
          <div className="j-badge"><FlameIcon /> {Math.min(entries.length, 3)} day streak</div>
          <div className="j-badge"><BookIcon /> {entries.length} {entries.length === 1 ? 'entry' : 'entries'}</div>
        </div>

        {locked && (
          <div className="j-lock-banner"><LockIcon /> Journal is locked — unlock to write</div>
        )}

        <div className="j-textarea-wrap">
          <textarea
            className="j-textarea"
            placeholder="Type here..."
            value={text}
            disabled={locked}
            onChange={e => { if (e.target.value.length <= MAX_CHARS) setText(e.target.value) }}
          />
          <div className={`j-char-count${text.length > 250 ? ' warn' : ''}`}>{text.length} / {MAX_CHARS}</div>
        </div>

        <div className="j-btn-row">
          <button className="j-btn-save" disabled={locked || !text.trim()} onClick={saveEntry}>Save Entry</button>
        </div>

        <div className="j-break-banner">
          <MoonIcon style={{ color: '#2a6fa8' }} />
          <span className="j-break-text">Take a break</span>
          {breakActive && <span className="j-break-timer">{formatBreak(breakSeconds)}</span>}
          <button className="j-btn-break" onClick={toggleBreak}>{breakActive ? 'Stop' : 'Start'}</button>
          <MoonIcon style={{ color: '#2a6fa8' }} />
        </div>

        <div className="j-search">
          <SearchIcon />
          <input type="text" placeholder="Search past entries..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="j-entries">
          <div className="j-entries-label">Past Entries</div>
          {filtered.length === 0 ? (
            <div className="j-empty">No entries yet</div>
          ) : (
            filtered.map(entry => (
              <div key={entry.id} className="j-entry-card">
                <div className="j-entry-top">
                  <span className="j-entry-date">{entry.date}</span>
                  <span className="j-mood-tag">{entry.mood}</span>
                </div>
                <div className="j-entry-text">{entry.text}</div>
                <div className="j-entry-actions">
                  <button className="j-btn-edit" onClick={() => openEdit(entry)}><PencilIcon /> Edit</button>
                  <button className="j-btn-del" onClick={() => deleteEntry(entry.id)}><TrashIcon /> Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        <nav className="j-navbar">
          <div className="j-nav-item"><CalendarIcon /> <span>Planner</span></div>
          <div className="j-nav-item"><TargetIcon /> <span>Focus</span></div>
          <div className="j-nav-item active"><NotebookIcon /> <span>Journal</span></div>
        </nav>

        {/* Edit modal */}
        {editId !== null && (
          <div className="j-modal-overlay" onClick={() => setEditId(null)}>
            <div className="j-modal" onClick={e => e.stopPropagation()}>
              <div className="j-modal-title">Edit Entry</div>
              <div className="j-textarea-wrap" style={{ margin: 0 }}>
                <textarea className="j-textarea" style={{ height: 100 }} value={editText} onChange={e => setEditText(e.target.value)} />
              </div>
              <div className="j-modal-btns">
                <button className="j-btn-cancel" onClick={() => setEditId(null)}>Cancel</button>
                <button className="j-btn-confirm" onClick={confirmEdit}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Menu modal */}
        {showMenu && (
          <div className="j-modal-overlay" onClick={() => setShowMenu(false)}>
            <div className="j-modal" onClick={e => e.stopPropagation()}>
              <div className="j-modal-title">Options</div>
              <div className="j-menu-row" onClick={() => { setLocked(l => !l); setShowMenu(false) }}>
                {locked ? <LockOpenIcon /> : <LockIcon />}
                {locked ? 'Unlock Journal' : 'Lock Journal'}
              </div>
              <div className="j-menu-row" onClick={() => { toggleSort(); setShowMenu(false) }}>
                <SearchIcon /> Sort: {sortAsc ? 'Oldest first' : 'Newest first'}
              </div>
              <div className="j-menu-row danger" onClick={() => { setEntries([]); setShowMenu(false) }}>
                <TrashIcon /> Clear All Entries
              </div>
              <div className="j-modal-btns">
                <button className="j-btn-cancel" onClick={() => setShowMenu(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Chat Modal ── */}
        {showChat && (
          <div className="chat-overlay" onClick={() => setShowChat(false)}>
            <div className="chat-modal" onClick={e => e.stopPropagation()}>
              {/* Chat header */}
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="chat-avatar">🌿</div>
                  <div>
                    <div className="chat-name">Sage</div>
                    <div className="chat-status">
                      <span className="chat-status-dot" /> AI Wellness Companion
                    </div>
                  </div>
                </div>
                <button className="chat-close" onClick={() => setShowChat(false)}><XIcon /></button>
              </div>

              {/* Messages */}
              <div className="chat-messages">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`chat-bubble-wrap ${msg.role}`}>
                    {msg.role === 'therapist' && <div className="chat-role-tag">Sage</div>}
                    {msg.role === 'user' && <div className="chat-role-tag">You</div>}
                    <div className={`chat-bubble ${msg.role}`}>{msg.text}</div>
                    <div className="chat-time">{msg.time}</div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="chat-bubble-wrap therapist">
                    <div className="chat-role-tag">Sage</div>
                    <div className="chat-typing">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="chat-input-row">
                <input
                  className="chat-input"
                  placeholder="Share what's on your mind..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChatMessage()}
                />
                <button className="chat-send" onClick={sendChatMessage} disabled={!chatInput.trim() || chatLoading}>
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}