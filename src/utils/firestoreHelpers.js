import { db } from '../firebase'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  getDoc
} from 'firebase/firestore'

// Journal helpers
export function getUserJournals(userId, callback) {
  const q = query(
    collection(db, 'journals'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, callback)
}

export async function addJournal(userId, title, content, locked = false) {
  return addDoc(collection(db, 'journals'), {
    userId,
    title,
    content,
    locked,
    createdAt: serverTimestamp()
  })
}

export async function updateJournal(journalId, updates) {
  return updateDoc(doc(db, 'journals', journalId), updates)
}

export async function deleteJournal(journalId) {
  return deleteDoc(doc(db, 'journals', journalId))
}

// Task helpers
export function getUserTasks(userId, callback) {
  const q = query(
    collection(db, 'tasks'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, callback)
}

export async function addTask(userId, title, description, dueDate) {
  return addDoc(collection(db, 'tasks'), {
    userId,
    title,
    description,
    dueDate,
    completed: false,
    createdAt: serverTimestamp()
  })
}

export async function updateTask(taskId, updates) {
  return updateDoc(doc(db, 'tasks', taskId), updates)
}

export async function deleteTask(taskId) {
  return deleteDoc(doc(db, 'tasks', taskId))
}

// Chat helpers
export function getUserChats(userId, callback) {
  const q = query(
    collection(db, 'chats'),
    where('studentId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, callback)
}

export function getTherapistChats(therapistId, callback) {
  const q = query(
    collection(db, 'chats'),
    where('therapistId', '==', therapistId),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, callback)
}

export async function addChat(studentId, therapistId) {
  return addDoc(collection(db, 'chats'), {
    studentId,
    therapistId,
    messages: [],
    createdAt: serverTimestamp()
  })
}

export async function addMessage(chatId, senderId, text) {
  const message = {
    senderId,
    text,
    createdAt: serverTimestamp()
  }
  return updateDoc(doc(db, 'chats', chatId), {
    messages: arrayUnion(message)
  })
}

// User helpers
export async function getUser(userId) {
  const userDoc = await getDoc(doc(db, 'users', userId))
  return userDoc.exists() ? userDoc.data() : null
}

export async function updateUser(userId, updates) {
  return updateDoc(doc(db, 'users', userId), updates)
}