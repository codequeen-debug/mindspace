import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { StoreProvider } from './store/store'
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>
)
