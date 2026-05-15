import { useState } from 'react'
import { useStore } from '../store/store'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat']
const today = new Date()

function buildCalendarDays(month, year) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()
  const days = []

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrev - i, currentMonth: false, date: new Date(year, month - 1, daysInPrev - i) })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, currentMonth: true, date: new Date(year, month, d) })
  }
  const remaining = 42 - days.length
  for (let d = 1; d <= remaining; d++) {
    days.push({ day: d, currentMonth: false, date: new Date(year, month + 1, d) })
  }
  return days
}

function normalizeDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function isSameDay(d1, d2) {
  return d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
}

function ChevronLeft() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M15 18l-6-6 6-6"/></svg>
}
function ChevronRight() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>
}
function DotsIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
}
function SortIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M3 6h18M7 12h10M11 18h2"/></svg>
}
function CalIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function TrashIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
}
function CheckIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>
}

export default function PlannerScreen() {
  const { state, dispatch } = useStore()
  const { planner } = state
  const [newTitle, setNewTitle] = useState('')
  const [newDuration, setNewDuration] = useState('')
  const [newDate, setNewDate] = useState(normalizeDate(planner.selectedDate))
  const [editingTask, setEditingTask] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDuration, setEditDuration] = useState('')
  const [editDate, setEditDate] = useState(null)
  const [menuTarget, setMenuTarget] = useState(null)

  const days = buildCalendarDays(planner.currentMonth, planner.currentYear)

  function handleTaskRightClick(e, taskId) {
    e.preventDefault()
    setMenuTarget(taskId)
    dispatch({ type: 'PLANNER_SHOW_MENU', val: true })
  }

  function openAddModal() {
    setNewDate(normalizeDate(planner.selectedDate))
    setNewTitle('')
    setNewDuration('')
    dispatch({ type: 'PLANNER_SHOW_ADD', val: true })
  }

  function handleAddTask() {
    if (!newTitle.trim()) return
    dispatch({ type: 'ADD_TASK', title: newTitle.trim(), duration: newDuration.trim(), dueDate: normalizeDate(newDate) })
    setNewTitle('')
    setNewDuration('')
    setNewDate(normalizeDate(planner.selectedDate))
  }

  function handleEditTask() {
    if (!editTitle.trim() || !editingTask) return
    dispatch({ type: 'UPDATE_TASK', id: editingTask.id, title: editTitle.trim(), duration: editDuration.trim(), dueDate: normalizeDate(editDate) })
    setEditingTask(null)
    setEditTitle('')
    setEditDuration('')
    setEditDate(null)
  }

  return (
    <div className="planner-screen">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => dispatch({ type: 'SET_TAB', tab: 'home' })}>
          <ChevronLeft />
        </button>
        <h1>Daily Planner</h1>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => dispatch({ type: 'PLANNER_SHOW_MENU', val: true })}>
            <DotsIcon />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar-card">
        <div className="calendar-nav">
          <button className="cal-nav-btn" onClick={() => dispatch({ type: 'PLANNER_PREV_MONTH' })}>
            <ChevronLeft />
          </button>
          <div className="calendar-month">
            {MONTHS[planner.currentMonth]}
            <span className="calendar-year">{planner.currentYear}</span>
          </div>
          <button className="cal-nav-btn" onClick={() => dispatch({ type: 'PLANNER_NEXT_MONTH' })}>
            <ChevronRight />
          </button>
        </div>
        <div className="calendar-grid">
          {DAYS.map(d => <div key={d} className="cal-day-header">{d}</div>)}
          {days.map((d, i) => (
            <div
              key={i}
              className={`cal-day ${!d.currentMonth ? 'other-month' : ''} ${isSameDay(d.date, today) ? 'today' : ''} ${isSameDay(d.date, planner.selectedDate) ? 'selected-day' : ''}`}
              onClick={() => dispatch({ type: 'PLANNER_SELECT_DATE', date: d.date })}
            >
              {d.day}
            </div>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="tasks-section">
        <div className="tasks-header">
          <div>
            <p className="tasks-label">Tasks for</p>
            <p className="tasks-date">{planner.selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <button className="add-date-btn" onClick={openAddModal}>New task</button>
        </div>
        {planner.tasks.filter(task => isSameDay(task.dueDate, planner.selectedDate)).map(task => (
          <div
            key={task.id}
            className="task-item"
          >
            <div
              className={`task-checkbox ${task.done ? 'checked' : ''}`}
              onClick={() => dispatch({ type: 'TOGGLE_TASK', id: task.id })}
            />
            <div className="task-content">
              <div className="task-main">
                <span className="task-title" style={task.done ? { textDecoration: 'line-through', opacity: 0.5 } : {}}>
                  {task.title}
                </span>
                {task.duration && <span className="task-duration">{task.duration}</span>}
              </div>
              <span className="task-date-label">Due {task.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="task-actions">
              <button className="icon-btn small" onClick={() => {
                setEditingTask(task)
                setEditTitle(task.title)
                setEditDuration(task.duration || '')
                setEditDate(task.dueDate)
                dispatch({ type: 'PLANNER_SHOW_EDIT', val: true })
              }}>
                <CalIcon />
              </button>
              <button className="icon-btn small danger" onClick={() => dispatch({ type: 'DELETE_TASK', id: task.id })}>
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {planner.showMenu && (
        <div className="overlay" onClick={() => dispatch({ type: 'PLANNER_SHOW_MENU', val: false })}>
          <div className="context-menu" onClick={e => e.stopPropagation()}>
            {/* Sort */}
            <button className="context-item expandable">
              <div className="context-item-label-wrap">
                <span className="context-item-label">Sort By</span>
                <span className="context-sublabel">{planner.sortBy}</span>
              </div>
              <SortIcon />
            </button>
            <button className="context-item" style={{ paddingLeft: 32 }} onClick={() => dispatch({ type: 'PLANNER_SET_SORT', val: 'Entry Date' })}>
              <div className="sort-option">
                <div className="sort-check">{planner.sortBy === 'Entry Date' && <CheckIcon />}</div>
                <span className="context-item-label" style={{ fontSize: 15 }}>Entry Date</span>
              </div>
            </button>
            <button className="context-item" style={{ paddingLeft: 32 }} onClick={() => dispatch({ type: 'PLANNER_SET_SORT', val: 'Moment Date' })}>
              <div className="sort-option">
                <div className="sort-check">{planner.sortBy === 'Moment Date' && <CheckIcon />}</div>
                <span className="context-item-label" style={{ fontSize: 15 }}>Moment Date</span>
              </div>
            </button>
            {/* Edit */}
            <button className="context-item" onClick={() => {
              if (menuTarget) {
                const task = planner.tasks.find(t => t.id === menuTarget)
                if (task) {
                  setEditingTask(task)
                  setEditTitle(task.title)
                  setEditDuration(task.duration || '')
                  dispatch({ type: 'PLANNER_SHOW_EDIT', val: true })
                }
              }
              dispatch({ type: 'PLANNER_SHOW_MENU', val: false })
            }}>
              <span className="context-item-label">Edit Task</span>
              <CalIcon />
            </button>
            {/* Delete */}
            <button className="context-item danger" onClick={() => {
              if (menuTarget) dispatch({ type: 'DELETE_TASK', id: menuTarget })
              else if (planner.tasks.length > 0) dispatch({ type: 'DELETE_TASK', id: planner.tasks[planner.tasks.length - 1].id })
            }}>
              <span className="context-item-label">Delete Task</span>
              <TrashIcon />
            </button>
          </div>
        </div>
      )}

      {/* Add Task Sheet */}
      {planner.showAddTask && (
        <div className="add-modal" onClick={() => dispatch({ type: 'PLANNER_SHOW_ADD', val: false })}>
          <div className="add-modal-sheet" onClick={e => e.stopPropagation()}>
            <h3>New Task</h3>
            <input
              className="modal-input"
              placeholder="Task name"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleAddTask()}
            />
            <input
              className="modal-input"
              placeholder="Duration (optional, e.g. 30 mins)"
              value={newDuration}
              onChange={e => setNewDuration(e.target.value)}
            />
            <label className="modal-label">Due Date</label>
            <input
              className="modal-input"
              type="date"
              value={newDate.toISOString().slice(0, 10)}
              onChange={e => setNewDate(normalizeDate(new Date(e.target.value)))}
            />
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => dispatch({ type: 'PLANNER_SHOW_ADD', val: false })}>
                Cancel
              </button>
              <button className="modal-btn confirm" onClick={handleAddTask}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Sheet */}
      {planner.showEditTask && editingTask && (
        <div className="add-modal" onClick={() => dispatch({ type: 'PLANNER_SHOW_EDIT', val: false })}>
          <div className="add-modal-sheet" onClick={e => e.stopPropagation()}>
            <h3>Edit Task</h3>
            <input
              className="modal-input"
              placeholder="Task name"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleEditTask()}
            />
            <input
              className="modal-input"
              placeholder="Duration (optional, e.g. 30 mins)"
              value={editDuration}
              onChange={e => setEditDuration(e.target.value)}
            />
            <label className="modal-label">Due Date</label>
            <input
              className="modal-input"
              type="date"
              value={editDate ? editDate.toISOString().slice(0, 10) : ''}
              onChange={e => setEditDate(normalizeDate(new Date(e.target.value)))}
            />
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => dispatch({ type: 'PLANNER_SHOW_EDIT', val: false })}>
                Cancel
              </button>
              <button className="modal-btn confirm" onClick={handleEditTask}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
