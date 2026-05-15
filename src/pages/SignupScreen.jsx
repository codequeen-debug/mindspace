import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useStore } from '../store/store'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sun-icon-small">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.22 4.22l2.83 2.83M15.95 15.95l2.83 2.83M4.22 19.78l2.83-2.83M15.95 8.05l2.83-2.83"/>
    </svg>
  )
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cloud-icon-small">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
  )
}

export default function SignupScreen() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const { dispatch } = useStore()
  const setTab = (tab) => dispatch({ type: 'SET_TAB', tab })

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(email, password, displayName)
    } catch (err) {
      setError('Failed to create account')
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <style>{`
        .auth-page {
          background: linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #F0F8FF 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Sora', sans-serif;
          padding: 20px;
        }

        .sun-icon-small {
          width: 40px;
          height: 40px;
          color: #FFD700;
          position: absolute;
          top: 40px;
          right: 40px;
          filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3));
          animation: float 4s ease-in-out infinite;
        }

        .cloud-icon-small {
          width: 30px;
          height: 20px;
          color: rgba(255, 255, 255, 0.6);
          position: absolute;
        }

        .cloud-auth-1 { top: 80px; left: 30px; animation: drift 15s linear infinite; }
        .cloud-auth-2 { top: 150px; right: 60px; animation: drift 20s linear infinite reverse; }
        .cloud-auth-3 { bottom: 120px; left: 50px; animation: drift 18s linear infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }

        @keyframes drift {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(calc(100vw + 50px)); }
        }

        .auth-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 32px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 10;
        }

        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.8);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.05);
        }

        .arrow-icon {
          width: 20px;
          height: 20px;
          color: #4A90E2;
        }

        .auth-title {
          font-size: 28px;
          font-weight: 800;
          color: #2E4A62;
          text-align: center;
          margin-bottom: 8px;
          margin-top: 20px;
        }

        .auth-subtitle {
          font-size: 16px;
          color: #5A7A92;
          text-align: center;
          margin-bottom: 32px;
          font-weight: 400;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #2E4A62;
        }

        .form-input {
          padding: 16px;
          border: 2px solid rgba(74, 144, 226, 0.2);
          border-radius: 12px;
          font-size: 16px;
          font-family: inherit;
          background: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus {
          border-color: #4A90E2;
          background: white;
          box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
        }

        .auth-button {
          background: linear-gradient(135deg, #4A90E2, #357ABD);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .auth-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
        }

        .auth-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-links {
          text-align: center;
          margin-top: 24px;
        }

        .auth-link {
          color: #4A90E2;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: color 0.2s ease;
        }

        .auth-link:hover {
          color: #357ABD;
        }

        .error-message {
          background: rgba(255, 59, 48, 0.1);
          color: #D63031;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 59, 48, 0.2);
          font-size: 14px;
          text-align: center;
          margin-bottom: 16px;
        }
      `}</style>

      <SunIcon />

      <CloudIcon className="cloud-auth-1" />
      <CloudIcon className="cloud-auth-2" />
      <CloudIcon className="cloud-auth-3" />

      <div className="auth-container">
        <button className="back-button" onClick={() => setTab('landing')}>
          <ArrowLeftIcon />
        </button>

        <h1 className="auth-title">Join MindSpace</h1>
        <p className="auth-subtitle">Begin your journey to mindfulness</p>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Display Name</label>
            <input
              type="text"
              className="form-input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button className="auth-button" disabled={loading} type="submit">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-links">
          <a href="#" className="auth-link" onClick={(e) => { e.preventDefault(); setTab('login'); }}>
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  )
}