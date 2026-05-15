import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useStore } from '../store/store'

const THERAPIST_ID = 'therapist_1'
const THERAPIST_NAME = 'Therapist'

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}

export default function ChatScreen() {
  const { currentUser } = useAuth()
  const { state, dispatch } = useStore()
  const messages = state.chat?.messages || []
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (!currentUser) return
    setLoading(false)
  }, [currentUser])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    if (!text.trim() || !currentUser) return
    dispatch({ type: 'CHAT_SEND_MESSAGE', senderId: currentUser.uid, text: text.trim() })
    setText('')
  }

  return (
    <div className="chat-screen screen-enter">
      <style>{`
        .chat-screen { display: flex; flex-direction: column; height: 100%; padding: 16px 14px 0; }
        .chat-header { display: flex; align-items: center; justify-content: space-between; padding: 0 4px 14px; }
        .chat-title { font-size: 22px; font-weight: 800; line-height: 1.1; }
        .chat-subtitle { color: rgba(13, 45, 69, 0.75); font-size: 13px; margin-top: 4px; }
        .chat-box { flex: 1; overflow-y: auto; padding-right: 6px; }
        .chat-empty { margin-top: 48px; text-align: center; color: rgba(13,45,69,0.65); }
        .chat-message { max-width: 78%; margin-bottom: 12px; padding: 12px 14px; border-radius: 18px; line-height: 1.4; position: relative; }
        .chat-message.user { margin-left: auto; background: #1a5a8a; color: white; border-bottom-right-radius: 6px; }
        .chat-message.therapist { background: rgba(255,255,255,0.9); color: #0d2d45; border: 1px solid rgba(13,45,69,0.12); border-bottom-left-radius: 6px; }
        .chat-badge { font-size: 11px; color: rgba(13,45,69,0.7); margin-bottom: 6px; display: block; }
        .chat-input-row { display: flex; gap: 10px; align-items: center; padding: 12px 0 18px; }
        .chat-input { flex: 1; border: 1px solid rgba(13,45,69,0.2); border-radius: 18px; padding: 12px 14px; font-size: 14px; outline: none; }
        .chat-send { width: 48px; height: 48px; border-radius: 50%; border: none; background: #1a5a8a; color: white; cursor: pointer; display: grid; place-items: center; }
      `}</style>

      <div className="chat-header">
        <div>
          <button className="icon-btn" onClick={() => dispatch({ type: 'SET_TAB', tab: 'home' })}>
            <ArrowLeftIcon />
          </button>
        </div>
        <div>
          <div className="chat-title">Live Chat</div>
          <div className="chat-subtitle">Talk with your therapist anytime</div>
        </div>
        <div style={{ width: 42 }} />
      </div>

      <div className="chat-box">
        {loading ? (
          <p className="chat-empty">Connecting to your chat...</p>
        ) : messages.length === 0 ? (
          <p className="chat-empty">No chat yet. Send a message to start a conversation with your therapist.</p>
        ) : (
          messages.map((message, index) => {
            const isUser = message.senderId === currentUser.uid
            const created = message.createdAt ? new Date(message.createdAt) : null
            return (
              <div key={`${message.senderId}-${index}`} className={`chat-message ${isUser ? 'user' : 'therapist'}`}>
                <span className="chat-badge">{isUser ? 'You' : THERAPIST_NAME}{created ? ` • ${created.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}</span>
                <div>{message.text}</div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="chat-send" onClick={handleSend}>→</button>
      </div>
    </div>
  )
}
