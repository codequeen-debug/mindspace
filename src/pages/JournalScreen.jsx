import { useEffect, useRef, useState } from 'react'
import { db } from '../firebase'
import { journalEntries } from '../data/journalEntries'
import { useStore } from '../store/store'
import {
  collection, addDoc, onSnapshot,
  query, orderBy, doc, deleteDoc, updateDoc, serverTimestamp
} from 'firebase/firestore'

// --- ICON COMPONENTS ---
function ArrowLeftIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> }
function DotsIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg> }
function LockOpenIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg> }
function LockIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> }
function SearchIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> }
function PencilIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> }
function TrashIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg> }
function SunIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg> }
function MoonIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> }
function FlameIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg> }
function BookIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> }
function SortIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M3 6h18M7 12h10M11 18h2"/></svg> }
function CalendarIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> }
function TargetIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> }
function NotebookIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M8 7h8M8 11h6"/></svg> }
function EyeIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> }
function EyeOffIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg> }

const MOODS = ['Happy', 'Calm', 'Anxious', 'Sad', 'Grateful', 'Tired']
const MAX_CHARS = 280
const STORAGE_KEY = 'journal_lock_password'

// ─── Password Modal ────────────────────────────────────────────────────────────
function PasswordModal({ mode, onSuccess, onCancel }) {
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit() {
    if (mode === 'set') {
      if (pw.length < 4) { setError('Password must be at least 4 characters.'); return }
      if (pw !== confirm) { setError('Passwords do not match.'); return }
      localStorage.setItem(STORAGE_KEY, pw)
      onSuccess()
    } else {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (pw === saved) { onSuccess() }
      else { setError('Incorrect password.'); setPw('') }
    }
  }

  return (
    <div className="jr-ov" onClick={onCancel}>
      <div className="jr-modal" onClick={e => e.stopPropagation()}>
        <div className="jr-mtitle">{mode === 'set' ? '🔒 Set Journal Password' : '🔑 Unlock Journal'}</div>
        <p style={{ fontSize: 13, color: '#2a5a80', marginBottom: 12 }}>
          {mode === 'set' ? "Choose a password to lock your journal." : "Enter your password to unlock."}
        </p>
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <input
            type={showPw ? 'text' : 'password'}
            placeholder="Password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{ width: '100%', padding: '11px 40px 11px 14px', borderRadius: 12, border: '1.5px solid #c8dff0', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#f0f7ff' }}
          />
          <button onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#2a5a80' }}>
            {showPw ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {mode === 'set' && (
          <input
            type={showPw ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirm}
            onChange={e => { setConfirm(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid #c8dff0', fontSize: 14, outline: 'none', marginBottom: 10, boxSizing: 'border-box', background: '#f0f7ff' }}
          />
        )}
        {error && <p style={{ color: '#c03030', fontSize: 12, marginBottom: 8 }}>{error}</p>}
        <div className="jr-mbtns">
          <button className="jr-mno" onClick={onCancel}>Cancel</button>
          <button className="jr-mok" onClick={handleSubmit}>{mode === 'set' ? 'Set Password' : 'Unlock'}</button>
        </div>
      </div>
    </div>
  )
}

// ─── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="jr-ov" onClick={onCancel}>
      <div className="jr-modal" onClick={e => e.stopPropagation()}>
        <div className="jr-mtitle">🗑️ Delete Entry</div>
        <p style={{ fontSize: 13, color: '#2a5a80', marginBottom: 16 }}>
          Are you sure you want to delete this entry? This cannot be undone.
        </p>
        <div className="jr-mbtns">
          <button className="jr-mno" onClick={onCancel}>Cancel</button>
          <button className="jr-mok" style={{ background: '#c03030' }} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
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
  const breakRef = useRef(null)
  const [streak, setStreak] = useState(0)
  const [lockModal, setLockModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  // Seed local (journalEntries) as editable in-memory copies
  useEffect(() => {
    const seeded = journalEntries.map((entry, index) => ({
      id: `local-${index}`,
      text: entry.content,
      mood: entry.mood,
      isLocal: true,
      date: entry.createdAt.toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      })
    }))
    setLocalEntries(seeded)
  }, [])

  // Firebase real-time listener
  useEffect(() => {
    const q = query(collection(db, 'journals'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
        isLocal: false,
        date: d.data().createdAt?.toDate().toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        }) || 'Just now'
      }))
      setFirebaseEntries(docs)
    })
    return () => unsubscribe()
  }, [])

  const allEntries = [...firebaseEntries, ...localEntries]

    return () => unsubscribe();
  }, []);

  // --- BREAK TIMER EFFECT ---
  useEffect(() => {
    if (breakActive) {
      breakRef.current = setInterval(() => {
        setBreakSeconds(s => {
          if (s <= 1) { clearInterval(breakRef.current); setBreakActive(false); return 300 }
          return s - 1
        })
      }, 1000)
    } else { clearInterval(breakRef.current) }
    return () => clearInterval(breakRef.current)
  }, [breakActive])

  // ── Save new entry to Firebase ──
  async function saveEntry() {
    if (locked || !text.trim()) return
    try {
      await addDoc(collection(db, 'journals'), {
        text: text.trim(), mood: selectedMood, createdAt: serverTimestamp()
      })
      setText('')
    } catch (err) { console.error('Save error:', err) }
  }

  // ── Lock / Unlock ──
  function handleLockToggle() {
    if (!locked) {
      const hasPw = !!localStorage.getItem(STORAGE_KEY)
      if (hasPw) { setLocked(true) }
      else { setLockModal('set') }
    } else {
      setLockModal('unlock')
    }
  }

  function onPasswordSuccess() {
    if (lockModal === 'set') setLocked(true)
    else if (lockModal === 'unlock') setLocked(false)
    setLockModal(null)
  }

  // ── Edit — works for BOTH Firebase and local entries ──
  function openEdit(entry) {
    setEditTarget(entry)
    setEditText(entry.text)
  }

  async function confirmEdit() {
    if (!editText.trim()) return
    if (editTarget.isLocal) {
      // Local entry: update in-memory state
      setLocalEntries(prev =>
        prev.map(e => e.id === editTarget.id ? { ...e, text: editText.trim() } : e)
      )
    } else {
      // Firebase entry: update Firestore
      try {
        await updateDoc(doc(db, 'journals', editTarget.id), { text: editText.trim() })
      } catch (err) { console.error('Edit error:', err) }
    }
    setEditTarget(null)
    setEditText('')
  }

  // ── Delete — works for BOTH Firebase and local entries ──
  function requestDelete(entry) {
    setDeleteTarget(entry)
  }

  async function confirmDelete() {
    if (deleteTarget.isLocal) {
      // Local entry: remove from in-memory state
      setLocalEntries(prev => prev.filter(e => e.id !== deleteTarget.id))
    } else {
      // Firebase entry: delete from Firestore
      try {
        await deleteDoc(doc(db, 'journals', deleteTarget.id))
      } catch (err) { console.error('Delete error:', err) }
    }
    setDeleteTarget(null)
  }

  async function clearAllCloudEntries() {
    try {
      await Promise.all(firebaseEntries.map(e => deleteDoc(doc(db, 'journals', e.id))))
      setShowMenu(false)
    } catch (err) { console.error('Clear error:', err) }
  }

  function formatBreak(s) { return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` }

  // Sort + filter
  const sorted = sortAsc ? [...allEntries].reverse() : allEntries
  const filtered = sorted.filter(e =>
    e.text?.toLowerCase().includes(search.toLowerCase()) ||
    e.mood?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <style>{`
        .jr { background: linear-gradient(160deg, #5ba8d4 0%, #7ec3e8 30%, #a8d8f0 60%, #d0ecfa 100%); min-height: 100vh; font-family: system-ui, sans-serif; }
        .jr-hdr { display:flex; justify-content:space-between; align-items:center; padding:18px 20px 8px; }
        .jr-ibtn { background:rgba(255,255,255,0.45); border:1.5px solid rgba(255,255,255,0.7); border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#0d2d45; transition:background .15s; }
        .jr-ibtn:hover { background:rgba(255,255,255,0.7); }
        .jr-title { padding:4px 20px 2px; font-size:30px; font-weight:800; color:#0d2d45; line-height:1.12; }
        .jr-mood-row { display:flex; align-items:center; gap:7px; padding:10px 20px 6px; color:#0d2d45; font-size:14px; font-weight:600; }
        .jr-chips { display:flex; gap:7px; flex-wrap:wrap; padding:0 20px 10px; }
        .jr-chip { background:rgba(255,255,255,0.5); border:1.5px solid rgba(255,255,255,0.75); border-radius:20px; padding:4px 13px; font-size:12px; color:#0d2d45; font-weight:600; cursor:pointer; transition:background .15s; font-family:inherit; }
        .jr-chip.on { background:white; font-weight:800; color:#0d2d45; border-color:rgba(13,45,69,0.3); }
        .jr-badges { display:flex; gap:8px; padding:4px 20px 10px; }
        .jr-badge { background:rgba(255,255,255,0.45); border:1.5px solid rgba(255,255,255,0.7); border-radius:14px; padding:5px 12px; display:flex; align-items:center; gap:6px; font-size:12px; color:#0d2d45; font-weight:700; }
        .jr-tawrap { margin:0 16px; }
        .jr-ta { width:100%; height:120px; background:rgba(255,255,255,0.6); border:1.5px solid rgba(255,255,255,0.8); border-radius:18px; padding:14px 16px; font-size:14px; color:#0d2d45; resize:none; outline:none; font-family:inherit; font-weight:500; box-sizing:border-box; }
        .jr-ta:focus { background:rgba(255,255,255,0.85); }
        .jr-savewrap { padding:10px 16px 4px; }
        .jr-savebtn { width:100%; background:#1a5a8a; color:white; border:none; border-radius:14px; padding:13px; font-size:14px; font-weight:700; cursor:pointer; }
        .jr-savebtn:disabled { opacity:0.5; cursor:not-allowed; }
        .jr-break { margin:10px 16px; background:rgba(255,255,255,0.45); border:1.5px solid rgba(255,255,255,0.7); border-radius:50px; display:flex; align-items:center; justify-content:center; gap:10px; padding:10px 16px; }
        .jr-bktxt { font-size:12px; font-weight:700; color:#0d2d45; text-transform:uppercase; }
        .jr-srch { margin:4px 16px 8px; display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.5); border:1.5px solid rgba(255,255,255,0.75); border-radius:12px; padding:8px 12px; }
        .jr-srch input { background:none; border:none; outline:none; font-size:13px; color:#0d2d45; width:100%; }
        .jr-elist { padding:4px 16px 100px; }
        .jr-elabel { font-size:11px; font-weight:800; color:#0d2d45; letter-spacing:.07em; text-transform:uppercase; margin-bottom:10px; }
        .jr-ecard { background:rgba(255,255,255,0.6); border:1.5px solid rgba(255,255,255,0.8); border-radius:18px; padding:12px 14px; margin-bottom:10px; }
        .jr-etop { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
        .jr-edate { font-size:11px; font-weight:700; color:#2a5a80; }
        .jr-etag { font-size:10px; background:#1a5a8a; color:white; border-radius:10px; padding:2px 9px; font-weight:700; }
        .jr-etxt { font-size:13px; color:#0d2d45; line-height:1.55; font-weight:500; }
        .jr-eacts { display:flex; gap:6px; margin-top:9px; }
        .jr-ebtn { display:flex; align-items:center; gap:4px; background:rgba(255,255,255,0.7); border:1.5px solid rgba(13,45,69,0.15); border-radius:10px; padding:4px 12px; font-size:11px; font-weight:700; cursor:pointer; color:#0d2d45; font-family:inherit; }
        .jr-ebtn:hover { background:rgba(255,255,255,0.95); }
        .jr-ebtn.danger { color:#c03030; border-color:rgba(192,48,48,0.2); }
        .jr-navbar { position:fixed; bottom:0; left:0; right:0; display:flex; justify-content:space-around; padding:12px 0 18px; background:rgba(26,90,138,0.92); backdrop-filter:blur(8px); z-index:5; }
        .jr-navitem { display:flex; flex-direction:column; align-items:center; gap:3px; font-size:10px; font-weight:600; color:rgba(255,255,255,0.6); cursor:pointer; background:none; border:none; font-family:inherit; }
        .jr-navitem.active { color:white; }
        .jr-ov { position:fixed; inset:0; background:rgba(10,40,70,0.55); z-index:20; display:flex; align-items:center; justify-content:center; padding:20px; }
        .jr-modal { background:white; border-radius:24px; padding:22px 18px; width:100%; max-width:420px; }
        .jr-mtitle { font-size:16px; font-weight:800; color:#0d2d45; margin-bottom:14px; }
        .jr-mta { width:100%; height:100px; background:#f0f7ff; border:1.5px solid #c8dff0; border-radius:14px; padding:12px 14px; font-size:14px; resize:none; outline:none; box-sizing:border-box; font-family:inherit; }
        .jr-mbtns { display:flex; gap:8px; margin-top:12px; }
        .jr-mok, .jr-mno { flex:1; border:none; border-radius:13px; padding:12px; font-size:13px; font-weight:700; cursor:pointer; font-family:inherit; }
        .jr-mok { background:#1a5a8a; color:white; }
        .jr-mno { background:#f0f7ff; color:#0d2d45; }
        .jr-mrow { display:flex; align-items:center; gap:12px; background:#f0f7ff; border:1.5px solid #c8dff0; border-radius:13px; padding:12px 14px; width:100%; margin-bottom:8px; font-weight:600; cursor:pointer; font-size:14px; font-family:inherit; }
        .jr-locked-banner { margin:0 16px 10px; background:rgba(192,48,48,0.12); border:1.5px solid rgba(192,48,48,0.3); border-radius:14px; padding:10px 14px; display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; color:#c03030; }
      `}</style>

      <div className="jr">
        {/* ── Header ── */}
        <div className="jr-hdr">
          {/* Back button → navigates to Planner via store */}
          <button className="jr-ibtn" onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'planner' })}>
            <ArrowLeftIcon />
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="jr-ibtn" onClick={handleLockToggle} title={locked ? 'Unlock journal' : 'Lock journal'}>
              {locked ? <LockIcon /> : <LockOpenIcon />}
            </button>
            <button className="jr-ibtn" onClick={() => setShowMenu(true)}><DotsIcon /></button>
          </div>
        </div>

        <div className="jr-title">Reflection<br />Journal</div>
        <div className="jr-mood-row"><SunIcon /> How are you feeling today?</div>

        <div className="jr-chips">
          {MOODS.map(m => (
            <button key={m} className={`jr-chip${selectedMood === m ? ' on' : ''}`} onClick={() => setSelectedMood(m)}>{m}</button>
          ))}
        </div>

        <div className="jr-badges">
          <div className="jr-badge"><FlameIcon /> {streak} day streak</div>
          <div className="jr-badge"><BookIcon /> {allEntries.length} entries</div>
        </div>

        {locked && (
          <div className="jr-locked-banner">
            <LockIcon /> Journal is locked. Tap the lock icon to unlock.
          </div>
        )}

        <div className="jr-tawrap">
          <textarea
            className="jr-ta"
            placeholder={locked ? 'Journal is locked...' : 'Type here...'}
            value={text}
            disabled={locked}
            onChange={e => { if (e.target.value.length <= MAX_CHARS) setText(e.target.value) }}
          />
          {!locked && (
            <div style={{ textAlign: 'right', fontSize: 11, color: '#2a5a80', marginTop: 4, paddingRight: 4 }}>
              {text.length}/{MAX_CHARS}
            </div>
          )}
        </div>

        <div className="jr-savewrap">
          <button className="jr-savebtn" disabled={locked || !text.trim()} onClick={saveEntry}>Save Entry</button>
        </div>

        <div className="jr-break">
          <MoonIcon />
          <span className="jr-bktxt">Take a break</span>
          {breakActive && <span style={{ fontSize: 13, fontWeight: 700, color: '#0d2d45' }}>{formatBreak(breakSeconds)}</span>}
          <button
            style={{ marginLeft: 10, background: breakActive ? '#c03030' : '#1a5a8a', color: 'white', border: 'none', borderRadius: 10, padding: '5px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
            onClick={() => setBreakActive(!breakActive)}
          >
            {breakActive ? 'Stop' : 'Start'}
          </button>
        </div>

        <div className="jr-srch">
          <SearchIcon />
          <input type="text" placeholder="Search entries..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* ── Entries ── */}
        <div className="jr-elist">
          <div className="jr-elabel">Entries History ({filtered.length})</div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', color: '#2a5a80', fontSize: 13, padding: '20px 0', opacity: 0.7 }}>
              No entries found.
            </div>
          )}
          {filtered.map(entry => (
            <div key={entry.id} className="jr-ecard">
              <div className="jr-etop">
                <span className="jr-edate">{entry.date}</span>
                <span className="jr-etag">{entry.mood}</span>
              </div>
              <div className="jr-etxt">{entry.text}</div>
              {/* ── Edit & Delete on ALL entries ── */}
              <div className="jr-eacts">
                <button className="jr-ebtn" onClick={() => openEdit(entry)}>
                  <PencilIcon /> Edit
                </button>
                <button className="jr-ebtn danger" onClick={() => requestDelete(entry)}>
                  <TrashIcon /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Navbar ── */}
        <nav className="jr-navbar">
          <button className="jr-navitem" onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'planner' })}>
            <CalendarIcon /><span>Planner</span>
          </button>
          <button className="jr-navitem" onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'focus' })}>
            <TargetIcon /><span>Focus</span>
          </button>
          <button className="jr-navitem active">
            <NotebookIcon /><span>Journal</span>
          </button>
        </nav>

        {/* ── Password Modal ── */}
        {(lockModal === 'set' || lockModal === 'unlock') && (
          <PasswordModal
            mode={lockModal}
            onSuccess={onPasswordSuccess}
            onCancel={() => setLockModal(null)}
          />
        )}

        {/* ── Delete Confirmation ── */}
        {deleteTarget && (
          <DeleteConfirmModal
            onConfirm={confirmDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}

        {/* ── Edit Modal ── */}
        {editTarget && (
          <div className="jr-ov" onClick={() => setEditTarget(null)}>
            <div className="jr-modal" onClick={e => e.stopPropagation()}>
              <div className="jr-mtitle">✏️ Edit Entry</div>
              <textarea
                className="jr-mta"
                value={editText}
                onChange={e => { if (e.target.value.length <= MAX_CHARS) setEditText(e.target.value) }}
                autoFocus
              />
              <div style={{ textAlign: 'right', fontSize: 11, color: '#2a5a80', marginTop: 4 }}>
                {editText.length}/{MAX_CHARS}
              </div>
              <div className="jr-mbtns">
                <button className="jr-mno" onClick={() => setEditTarget(null)}>Cancel</button>
                <button className="jr-mok" onClick={confirmEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Options Menu ── */}
        {showMenu && (
          <div className="jr-ov" onClick={() => setShowMenu(false)}>
            <div className="jr-modal" onClick={e => e.stopPropagation()}>
              <div className="jr-mtitle">Options</div>
              <button className="jr-mrow" onClick={() => { setSortAsc(a => !a); setShowMenu(false) }}>
                <SortIcon /> Sort: {sortAsc ? 'Newest' : 'Oldest'} first
              </button>
              <button className="jr-mrow" style={{ color: '#c03030' }} onClick={clearAllCloudEntries}>
                <TrashIcon /> Clear Cloud Entries
              </button>
              {localStorage.getItem(STORAGE_KEY) && (
                <button className="jr-mrow" style={{ color: '#c03030' }} onClick={() => {
                  localStorage.removeItem(STORAGE_KEY); setLocked(false); setShowMenu(false)
                }}>
                  <LockOpenIcon /> Remove Password
                </button>
              )}
              <button className="jr-mno" style={{ width: '100%', marginTop: 4 }} onClick={() => setShowMenu(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

