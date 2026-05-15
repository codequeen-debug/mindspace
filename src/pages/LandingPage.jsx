import { useStore } from '../store/store'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sun-icon">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.22 4.22l2.83 2.83M15.95 15.95l2.83 2.83M4.22 19.78l2.83-2.83M15.95 8.05l2.83-2.83"/>
    </svg>
  )
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cloud-icon">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="plus-icon">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

export default function LandingPage() {
  const { dispatch } = useStore()
  const setTab = (tab) => dispatch({ type: 'SET_TAB', tab })

  return (
    <div className="landing-page">
      <style>{`
        .landing-page {
          background: linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #F0F8FF 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Sora', sans-serif;
        }

        .sun-icon {
          width: 80px;
          height: 80px;
          color: #FFD700;
          position: absolute;
          top: 60px;
          right: 80px;
          filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.3));
          animation: float 6s ease-in-out infinite;
        }

        .cloud-icon {
          width: 60px;
          height: 40px;
          color: rgba(255, 255, 255, 0.8);
          position: absolute;
        }

        .cloud-1 { top: 100px; left: 50px; animation: drift 20s linear infinite; }
        .cloud-2 { top: 200px; right: 100px; animation: drift 25s linear infinite reverse; }
        .cloud-3 { bottom: 150px; left: 80px; animation: drift 30s linear infinite; }
        .cloud-4 { bottom: 100px; right: 50px; animation: drift 22s linear infinite reverse; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        @keyframes drift {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }

        .welcome-text {
          text-align: center;
          color: #2E4A62;
          z-index: 10;
          max-width: 400px;
        }

        .welcome-title {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 16px;
          background: linear-gradient(45deg, #2E4A62, #4A90E2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

        .welcome-subtitle {
          font-size: 18px;
          font-weight: 400;
          color: #5A7A92;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .sign-in-button {
          background: linear-gradient(135deg, #4A90E2, #357ABD);
          border: none;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
          transition: all 0.3s ease;
          z-index: 10;
        }

        .sign-in-button:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(74, 144, 226, 0.4);
        }

        .plus-icon {
          width: 32px;
          height: 32px;
          color: white;
        }

        .sign-in-label {
          position: absolute;
          bottom: -35px;
          left: 50%;
          transform: translateX(-50%);
          color: #5A7A92;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
        }
      `}</style>

      <SunIcon />

      <CloudIcon className="cloud-1" />
      <CloudIcon className="cloud-2" />
      <CloudIcon className="cloud-3" />
      <CloudIcon className="cloud-4" />

      <div className="welcome-text">
        <h1 className="welcome-title">MindSpace</h1>
        <p className="welcome-subtitle">
          Your personal sanctuary for mindfulness, planning, and reflection.
          Take a moment to breathe and begin your journey.
        </p>
      </div>

      <div style={{ position: 'relative' }}>
        <button className="sign-in-button" onClick={() => setTab('login')}>
          <PlusIcon />
        </button>
        <div className="sign-in-label">Sign In</div>
      </div>
    </div>
  )
}