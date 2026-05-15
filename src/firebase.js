import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAea-GqiyNgWrVxQ4mnLqu1n9RIxXcHgjE',
  authDomain: 'mindspace-11d8d.firebaseapp.com',
  projectId: 'mindspace-11d8d',
  storageBucket: 'mindspace-11d8d.firebasestorage.app',
  messagingSenderId: '353828531355',
  appId: '1:353828531355:web:0b01bd62dbf8cecb6f6a3e',
  measurementId: 'G-HP306FCW15',
}

const app = initializeApp(firebaseConfig)
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

export const db = getFirestore(app)
export const auth = getAuth(app)
export { analytics }
export default app

