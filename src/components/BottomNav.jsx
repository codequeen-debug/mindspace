import { useStore } from '../store/store'
import { useAuth } from '../contexts/AuthContext'

function PlannerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

function FocusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
    </svg>
  )
}

function JournalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v12H5.5L4 18.5V4z"/>
      <path d="M8 11h8M8 15h5"/>
    </svg>
  )
}

function LoginIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
      <polyline points="10,17 15,12 10,7"/>
      <line x1="15" y1="12" x2="3" y2="12"/>
    </svg>
  )
}

function SignupIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
  )
}

export default function BottomNav() {
  const { state, dispatch } = useStore()
  const { currentUser } = useAuth()
  const setTab = (tab) => dispatch({ type: 'SET_TAB', tab })

  const authenticatedTabs = [
    { id: 'planner', label: 'Planner', Icon: PlannerIcon },
    { id: 'focus', label: 'Focus', Icon: FocusIcon },
    { id: 'journal', label: 'Journal', Icon: JournalIcon },
    { id: 'chat', label: 'Chat', Icon: ChatIcon },
  ]

  const unauthenticatedTabs = [
    { id: 'landing', label: 'Welcome', Icon: () => <span>🏠</span> },
    { id: 'login', label: 'Login', Icon: LoginIcon },
    { id: 'signup', label: 'Signup', Icon: SignupIcon },
  ]

  const tabs = currentUser ? authenticatedTabs : unauthenticatedTabs

  // Don't show bottom nav on landing page
  if (state.activeTab === 'landing' && !currentUser) {
    return null
  }

  return (
    <nav className="bottom-nav">
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`nav-item ${state.activeTab === id || (state.activeTab === 'home' && id === 'planner') ? 'active' : ''}`}
          onClick={() => setTab(id)}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
      <div className="home-indicator" />
    </nav>
  )
}
