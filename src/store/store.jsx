import { createContext, useContext, useEffect, useReducer } from 'react'

const STORAGE_KEY = 'mindspaceState'
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)
const dayAfter = new Date(today)
dayAfter.setDate(today.getDate() + 2)

function parseState(raw) {
  if (!raw) return null
  try {
    const state = JSON.parse(raw)
    const planner = state.planner || {}
    const tasks = Array.isArray(planner.tasks)
      ? planner.tasks.map((task) => ({
          ...task,
          dueDate: task?.dueDate ? new Date(task.dueDate) : today,
        }))
      : []

    return {
      ...state,
      planner: {
        ...planner,
        tasks,
        selectedDate: planner.selectedDate ? new Date(planner.selectedDate) : today,
      },
    }
  } catch {
    return null
  }
}

function serializeState(state) {
  return JSON.stringify({
    ...state,
    planner: {
      ...state.planner,
      selectedDate: state.planner.selectedDate instanceof Date ? state.planner.selectedDate.toISOString() : state.planner.selectedDate,
      tasks: state.planner.tasks.map((task) => ({
        ...task,
        dueDate: task.dueDate instanceof Date ? task.dueDate.toISOString() : task.dueDate,
      })),
    },
  })
}

const initialState = {
  activeTab: 'landing',

  planner: {
    tasks: [
      { id: 1, title: 'Go to Classes', duration: null, done: false, dueDate: today },
      { id: 2, title: 'Study Session', duration: '2hrs', done: false, dueDate: today },
      { id: 3, title: 'Take a walk', duration: '20 mins', done: false, dueDate: today },
      { id: 4, title: 'Do some self-care & EAT', duration: '1-2 hrs', done: false, dueDate: today },
      { id: 5, title: 'Go to Gym', duration: '1 hr', done: false, dueDate: today },
      { id: 6, title: 'Study for exam', duration: '2 hrs', done: false, dueDate: tomorrow },
      { id: 7, title: 'Call mom', duration: null, done: false, dueDate: dayAfter },
    ],
    selectedDate: today,
    currentMonth: today.getMonth(),
    currentYear: today.getFullYear(),
    sortBy: 'Entry Date',
    showMenu: false,
    showAddTask: false,
    showEditTask: false,
  },

  focus: {
    savers: [
      { id: 's', letter: 'S', title: 'Silence', desc: '1–2 minutes of stillness or breathing.', done: false },
      { id: 'a', letter: 'A', title: 'Affirmations', desc: 'Repeat 1 positive intention for today.', done: false },
      { id: 'v', letter: 'V', title: 'Visualization', desc: 'Picture your ideal outcome for the day.', done: false },
      { id: 'e', letter: 'E', title: 'Exercise', desc: 'Move your body for at least 2 minutes.', done: false },
      { id: 'r', letter: 'R', title: 'Reading', desc: 'Read 1 page or reflection prompt.', done: false },
      { id: 'sc', letter: 'S', title: 'Scribing', desc: 'Write a quick thought or gratitude.', done: false },
    ],
    showCompletion: false,
  },

  journal: {
    entries: [
      {
        id: 1,
        date: 'Nov 12, 2025',
        text: 'Today was a good day. I felt really productive and managed to complete most of my tasks.',
      },
      {
        id: 2,
        date: 'Nov 11, 2025',
        text: 'Had a rough morning but turned it around by going for a walk in the afternoon.',
      },
    ],
    currentText: '',
    sortBy: 'Entry Date',
    showMenu: false,
    locked: false,
  },
  chat: {
    messages: [],
  },
}

function reducer(state, action) {
  switch (action.type) {

    // ✅ NAVIGATION FIX (CRITICAL)
    case 'SET_TAB':
      return {
        ...state,
        activeTab: action.tab,
      }

    // ================= PLANNER =================
    case 'TOGGLE_TASK':
      return {
        ...state,
        planner: {
          ...state.planner,
          tasks: state.planner.tasks.map((t) =>
            t.id === action.id ? { ...t, done: !t.done } : t
          ),
        },
      }

    case 'ADD_TASK':
      return {
        ...state,
        planner: {
          ...state.planner,
          tasks: [
            ...state.planner.tasks,
            {
              id: Date.now(),
              title: action.title,
              duration: action.duration || null,
              done: false,
              dueDate: action.dueDate || state.planner.selectedDate,
            },
          ],
          showAddTask: false,
        },
      }

    case 'UPDATE_TASK':
      return {
        ...state,
        planner: {
          ...state.planner,
          tasks: state.planner.tasks.map((t) =>
            t.id === action.id ? { ...t, title: action.title, duration: action.duration || null, dueDate: action.dueDate || t.dueDate } : t
          ),
          showEditTask: false,
        },
      }

    case 'DELETE_TASK':
      return {
        ...state,
        planner: {
          ...state.planner,
          tasks: state.planner.tasks.filter((t) => t.id !== action.id),
          showMenu: false,
        },
      }

    case 'PLANNER_PREV_MONTH': {
      let m = state.planner.currentMonth - 1
      let y = state.planner.currentYear
      if (m < 0) {
        m = 11
        y--
      }
      return {
        ...state,
        planner: { ...state.planner, currentMonth: m, currentYear: y },
      }
    }

    case 'PLANNER_NEXT_MONTH': {
      let m = state.planner.currentMonth + 1
      let y = state.planner.currentYear
      if (m > 11) {
        m = 0
        y++
      }
      return {
        ...state,
        planner: { ...state.planner, currentMonth: m, currentYear: y },
      }
    }

    case 'PLANNER_SELECT_DATE':
      return {
        ...state,
        planner: { ...state.planner, selectedDate: action.date },
      }

    case 'PLANNER_SHOW_MENU':
      return {
        ...state,
        planner: { ...state.planner, showMenu: action.val },
      }

    case 'PLANNER_SHOW_ADD':
      return {
        ...state,
        planner: { ...state.planner, showAddTask: action.val },
      }

    case 'PLANNER_SHOW_EDIT':
      return {
        ...state,
        planner: { ...state.planner, showEditTask: action.val },
      }

    case 'PLANNER_SET_SORT':
      return {
        ...state,
        planner: {
          ...state.planner,
          sortBy: action.val,
          showMenu: false,
        },
      }

    case 'CHAT_SEND_MESSAGE': {
      const message = {
        id: Date.now(),
        senderId: action.senderId,
        text: action.text,
        createdAt: new Date().toISOString(),
      }

      const therapistReply = state.chat.messages.length === 0 && action.senderId !== 'therapist_1'
        ? {
            id: Date.now() + 1,
            senderId: 'therapist_1',
            text: 'Hi there! I’m here to listen. How can I support you today?',
            createdAt: new Date(Date.now() + 1000).toISOString(),
          }
        : null

      return {
        ...state,
        chat: {
          ...state.chat,
          messages: therapistReply
            ? [...state.chat.messages, message, therapistReply]
            : [...state.chat.messages, message],
        },
      }
    }

    // ================= FOCUS =================
    case 'UPDATE_SAVERS':
      return {
        ...state,
        focus: {
          ...state.focus,
          savers: action.savers,
        },
      }

    case 'TOGGLE_SAVER': {
      const savers = state.focus.savers.map((s) =>
        s.id === action.id ? { ...s, done: !s.done } : s
      )

      return {
        ...state,
        focus: {
          ...state.focus,
          savers,
          showCompletion: savers.every((s) => s.done),
        },
      }
    }

    case 'FOCUS_CLOSE_COMPLETION':
      return {
        ...state,
        focus: {
          ...state.focus,
          showCompletion: false,
        },
      }

    // ================= JOURNAL (SAFE + COMPLETE) =================
    case 'JOURNAL_SET_TEXT':
      return {
        ...state,
        journal: {
          ...state.journal,
          currentText: action.text || '',
        },
      }

    case 'JOURNAL_SAVE': {
      if (!state.journal?.currentText?.trim()) return state

      const entry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        text: state.journal.currentText,
      }

      return {
        ...state,
        journal: {
          ...state.journal,
          entries: [entry, ...state.journal.entries],
          currentText: '',
        },
      }
    }

    case 'JOURNAL_DELETE_ENTRY':
      return {
        ...state,
        journal: {
          ...state.journal,
          entries: state.journal.entries.filter((e) => e.id !== action.id),
          showMenu: false,
        },
      }

    case 'JOURNAL_SHOW_MENU':
      return {
        ...state,
        journal: {
          ...state.journal,
          showMenu: action.val,
        },
      }

    case 'JOURNAL_SET_SORT':
      return {
        ...state,
        journal: {
          ...state.journal,
          sortBy: action.val,
          showMenu: false,
        },
      }

    case 'JOURNAL_TOGGLE_LOCK':
      return {
        ...state,
        journal: {
          ...state.journal,
          locked: !state.journal.locked,
          showMenu: false,
        },
      }

    default:
      return state
  }
}

const StoreContext = createContext(null)

function initState(initial) {
  if (typeof window === 'undefined') return initial
  const stored = localStorage.getItem(STORAGE_KEY)
  const parsed = parseState(stored)
  return parsed || initial
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, initState)

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, serializeState(state))
  }, [state])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}