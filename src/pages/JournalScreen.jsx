import { useEffect, useRef, useState } from 'react'
//import { db } from '../firebase'
import { journalEntries } from '../data/journalEntries'
import { useStore } from '../store/store'
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'

// ── ICONS ─────────────────────────────────────────────────────────────────────
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
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
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

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" width="16" height="16">
      <circle cx="12" cy="12" r="4" />
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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <rect x="3" y="4" width="18" height="18" rx="2" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

function NotebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const MOODS = ['Happy', 'Calm', 'Anxious', 'Sad', 'Grateful', 'Tired']
const MAX_CHARS = 280
const STORAGE_KEY = 'journal_lock_password'

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY

const THERAPIST_SYSTEM = `You are Sage, a warm wellness companion.
Respond empathetically in 2-4 sentences.
Never diagnose mental illness.
Encourage professional support for serious concerns.`

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function JournalScreen() {
  const { dispatch } = useStore()

  const [firebaseEntries, setFirebaseEntries] = useState([])
  const [localEntries, setLocalEntries] = useState([])

  const [text, setText] = useState('')
  const [selectedMood, setSelectedMood] = useState('Happy')

  const [locked, setLocked] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const [editTarget, setEditTarget] = useState(null)
  const [editText, setEditText] = useState('')

  const [search, setSearch] = useState('')
  const [sortAsc, setSortAsc] = useState(false)

  const [breakActive, setBreakActive] = useState(false)
  const [breakSeconds, setBreakSeconds] = useState(300)

  const [deleteTarget, setDeleteTarget] = useState(null)

  const breakRef = useRef(null)

  // CHAT
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)

  const chatEndRef = useRef(null)

  // ── SEED LOCAL ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const seeded = journalEntries.map((entry, index) => ({
      id: `local-${index}`,
      text: entry.content,
      mood: entry.mood,
      isLocal: true,
      date: entry.createdAt.toLocaleDateString()
    }))

    setLocalEntries(seeded)
  }, [])

  // ── FIREBASE LISTENER ───────────────────────────────────────────────────────
  useEffect(() => {
    const q = query(collection(db, 'journals'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, snapshot => {
      const docs = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
        isLocal: false,
        date:
          d.data().createdAt?.toDate().toLocaleDateString() || 'Just now'
      }))

      setFirebaseEntries(docs)
    })

    return () => unsubscribe()
  }, [])

  // ── BREAK TIMER ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (breakActive) {
      breakRef.current = setInterval(() => {
        setBreakSeconds(s => {
          if (s <= 1) {
            clearInterval(breakRef.current)
            setBreakActive(false)
            return 300
          }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(breakRef.current)
    }

    return () => clearInterval(breakRef.current)
  }, [breakActive])

  // ── CHAT EFFECTS ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (showChat) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages, showChat])

  useEffect(() => {
    if (showChat && chatMessages.length === 0) {
      setChatMessages([
        {
          role: 'therapist',
          text: "Hi 🌿 I'm Sage. How are you feeling today?",
          time: new Date().toLocaleTimeString()
        }
      ])

      setUnreadCount(0)
    }

    if (showChat) {
      setUnreadCount(0)
    }
  }, [showChat])

  // ── SAVE ENTRY ──────────────────────────────────────────────────────────────
  async function saveEntry() {
    if (!text.trim()) return

    await addDoc(collection(db, 'journals'), {
      text: text.trim(),
      mood: selectedMood,
      createdAt: serverTimestamp()
    })

    setText('')
  }

  // ── CHAT ────────────────────────────────────────────────────────────────────
  async function sendChatMessage() {
    if (!chatInput.trim() || chatLoading) return

    const userText = chatInput.trim()

    setChatMessages(prev => [
      ...prev,
      {
        role: 'user',
        text: userText,
        time: new Date().toLocaleTimeString()
      }
    ])

    setChatInput('')
    setChatLoading(true)

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `${THERAPIST_SYSTEM}

User message: ${userText}`
                  }
                ]
              }
            ]
          })
        }
      )

      const data = await res.json()

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm here for you."

      setChatMessages(prev => [
        ...prev,
        {
          role: 'therapist',
          text: reply,
          time: new Date().toLocaleTimeString()
        }
      ])
    } catch (err) {
      console.error(err)
    } finally {
      setChatLoading(false)
    }
  }

  // ── HELPERS ─────────────────────────────────────────────────────────────────
  const allEntries = [...firebaseEntries, ...localEntries]

  const filtered = allEntries.filter(
    e =>
      e.text?.toLowerCase().includes(search.toLowerCase()) ||
      e.mood?.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = sortAsc ? [...filtered].reverse() : filtered

  function formatBreak(s) {
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  }

  async function confirmDelete() {
    if (deleteTarget?.isLocal) {
      setLocalEntries(prev =>
        prev.filter(e => e.id !== deleteTarget.id)
      )
    } else {
      await deleteDoc(doc(db, 'journals', deleteTarget.id))
    }

    setDeleteTarget(null)
  }

  async function confirmEdit() {
    if (!editText.trim()) return

    if (editTarget.isLocal) {
      setLocalEntries(prev =>
        prev.map(e =>
          e.id === editTarget.id
            ? { ...e, text: editText.trim() }
            : e
        )
      )
    } else {
      await updateDoc(doc(db, 'journals', editTarget.id), {
        text: editText.trim()
      })
    }

    setEditTarget(null)
    setEditText('')
  }

  // ── UI ──────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .jr {
          min-height:100vh;
          background:#dff1ff;
          font-family:system-ui;
        }

        .jr-hdr {
          display:flex;
          justify-content:space-between;
          padding:20px;
        }

        .jr-ibtn {
          width:40px;
          height:40px;
          border:none;
          border-radius:50%;
          background:white;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          position:relative;
        }

        .jr-chat-badge {
          position:absolute;
          top:-4px;
          right:-4px;
          background:red;
          color:white;
          width:18px;
          height:18px;
          border-radius:50%;
          font-size:10px;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .jr-title {
          font-size:30px;
          font-weight:800;
          padding:0 20px;
          color:#0d2d45;
        }

        .jr-chips {
          display:flex;
          gap:8px;
          padding:20px;
          flex-wrap:wrap;
        }

        .jr-chip {
          border:none;
          border-radius:20px;
          padding:6px 14px;
          cursor:pointer;
        }

        .jr-chip.on {
          background:#1a5a8a;
          color:white;
        }

        .jr-ta {
          width:calc(100% - 32px);
          margin:0 16px;
          height:120px;
          border:none;
          border-radius:16px;
          padding:14px;
          resize:none;
        }

        .jr-savebtn {
          margin:16px;
          width:calc(100% - 32px);
          padding:14px;
          border:none;
          border-radius:14px;
          background:#1a5a8a;
          color:white;
          font-weight:700;
        }

        .jr-ecard {
          background:white;
          margin:10px 16px;
          padding:14px;
          border-radius:16px;
        }

        .chat-overlay {
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.4);
          display:flex;
          align-items:flex-end;
          z-index:100;
        }

        .chat-modal {
          width:100%;
          height:78vh;
          background:white;
          border-radius:24px 24px 0 0;
          display:flex;
          flex-direction:column;
        }

        .chat-header {
          display:flex;
          justify-content:space-between;
          padding:16px;
          border-bottom:1px solid #ddd;
        }

        .chat-messages {
          flex:1;
          overflow-y:auto;
          padding:16px;
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .chat-bubble {
          max-width:80%;
          padding:10px 14px;
          border-radius:16px;
        }

        .chat-bubble.user {
          background:#1a5a8a;
          color:white;
          align-self:flex-end;
        }

        .chat-bubble.therapist {
          background:#eef7ff;
        }

        .chat-input-row {
          display:flex;
          gap:8px;
          padding:12px;
        }

        .chat-input {
          flex:1;
          padding:12px;
          border-radius:20px;
          border:1px solid #ccc;
        }

        .chat-send {
          width:42px;
          height:42px;
          border:none;
          border-radius:50%;
          background:#1a5a8a;
          color:white;
        }
      `}</style>

      <div className="jr">
        {/* HEADER */}
        <div className="jr-hdr">
          <button
            className="jr-ibtn"
            onClick={() =>
              dispatch({ type: 'SET_SCREEN', screen: 'planner' })
            }
          >
            <ArrowLeftIcon />
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="jr-ibtn"
              onClick={() => setShowChat(true)}
            >
              <ChatIcon />

              {unreadCount > 0 && (
                <span className="jr-chat-badge">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              className="jr-ibtn"
              onClick={() => setLocked(v => !v)}
            >
              {locked ? <LockIcon /> : <LockOpenIcon />}
            </button>

            <button
              className="jr-ibtn"
              onClick={() => setShowMenu(true)}
            >
              <DotsIcon />
            </button>
          </div>
        </div>

        <div className="jr-title">
          Reflection
          <br />
          Journal
        </div>

        <div style={{ padding: '20px' }}>
          <SunIcon />
        </div>

        <div className="jr-chips">
          {MOODS.map(m => (
            <button
              key={m}
              className={`jr-chip ${selectedMood === m ? 'on' : ''}`}
              onClick={() => setSelectedMood(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <textarea
          className="jr-ta"
          value={text}
          disabled={locked}
          onChange={e => setText(e.target.value)}
        />

        <button className="jr-savebtn" onClick={saveEntry}>
          Save Entry
        </button>

        <div style={{ padding: '0 16px 16px' }}>
          <input
            placeholder="Search entries..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 12,
              border: 'none'
            }}
          />
        </div>

        {sorted.map(entry => (
          <div key={entry.id} className="jr-ecard">
            <div style={{ fontWeight: 700 }}>{entry.mood}</div>

            <div style={{ marginTop: 8 }}>
              {entry.text}
            </div>

            <div
              style={{
                display: 'flex',
                gap: 8,
                marginTop: 12
              }}
            >
              <button
                onClick={() => {
                  setEditTarget(entry)
                  setEditText(entry.text)
                }}
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteTarget(entry)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* CHAT */}
        {showChat && (
          <div
            className="chat-overlay"
            onClick={() => setShowChat(false)}
          >
            <div
              className="chat-modal"
              onClick={e => e.stopPropagation()}
            >
              <div className="chat-header">
                <div>
                  <div style={{ fontWeight: 800 }}>
                    🌿 Sage
                  </div>

                  <div style={{ fontSize: 12 }}>
                    Wellness Companion
                  </div>
                </div>

                <button
                  className="jr-ibtn"
                  onClick={() => setShowChat(false)}
                >
                  <XIcon />
                </button>
              </div>

              <div className="chat-messages">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`chat-bubble ${msg.role}`}
                  >
                    {msg.text}
                  </div>
                ))}

                {chatLoading && (
                  <div className="chat-bubble therapist">
                    Typing...
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              <div className="chat-input-row">
                <input
                  className="chat-input"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e =>
                    e.key === 'Enter' &&
                    sendChatMessage()
                  }
                />

                <button
                  className="chat-send"
                  onClick={sendChatMessage}
                >
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