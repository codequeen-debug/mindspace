import { useStore } from './store/store'
import { useAuth } from './contexts/AuthContext'
import StatusBar from './components/StatusBar'
import BottomNav from './components/BottomNav'
import HomeScreen from './pages/HomeScreen'
import PlannerScreen from './pages/PlannerScreen'
import FocusScreen from './pages/FocusScreen'
import JournalScreen from './pages/JournalScreen'
import ChatScreen from './pages/ChatScreen'
import LoginScreen from './pages/LoginScreen'
import SignupScreen from './pages/SignupScreen'
import LandingPage from './pages/LandingPage'

function Screen() {
  const { state } = useStore()
  const { currentUser } = useAuth()

  if (!currentUser) {
    switch (state.activeTab) {
      case 'landing': return <LandingPage />
      case 'login': return <LoginScreen />
      case 'signup': return <SignupScreen />
      default: return <LandingPage />
    }
  }

  switch (state.activeTab) {
    case 'home': return <HomeScreen />
    case 'planner': return <PlannerScreen />
    case 'focus': return <FocusScreen />
    case 'journal': return <JournalScreen />
    case 'chat': return <ChatScreen />
    default: return <HomeScreen />
  }
}

export default function App() {
  const { state } = useStore()
  const { currentUser } = useAuth()

  // Don't show status bar on landing page
  const showStatusBar = !(state.activeTab === 'landing' && !currentUser)

  return (
    <div className="phone-shell">
      {showStatusBar && <StatusBar />}
      <div className="screen">
        <Screen />
      </div>
      <BottomNav />
    </div>
  )
}
