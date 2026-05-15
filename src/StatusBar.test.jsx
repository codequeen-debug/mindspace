import { render, screen, act } from '@testing-library/react'
import StatusBar from './components/StatusBar'

const mockBattery = {
  level: 0.8,
  charging: false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ datetime: '2024-01-01T09:41:00.000+00:00' })
  })
)

navigator.getBattery = jest.fn(() => Promise.resolve(mockBattery))

// 1. Renders without crashing
test('renders the status bar', async () => {
  await act(async () => { render(<StatusBar />) })
  expect(screen.getByTestId('status-bar')).toBeInTheDocument()
})

// 2. Displays a time string
test('displays a time after API sync', async () => {
  await act(async () => { render(<StatusBar />) })
  expect(screen.getByText(/\d{1,2}:\d{2}/)).toBeInTheDocument()
})

// 3. Calls the World Time API on mount
test('fetches time from World Time API', async () => {
  await act(async () => { render(<StatusBar />) })
  expect(fetch).toHaveBeenCalledWith('https://worldtimeapi.org/api/ip')
})

// 4. Calls the Battery API on mount
test('requests battery status on mount', async () => {
  await act(async () => { render(<StatusBar />) })
  expect(navigator.getBattery).toHaveBeenCalled()
})

// 5. Battery turns red at 20% or below
test('battery fill turns red at 20% or below', async () => {
  navigator.getBattery = jest.fn(() =>
    Promise.resolve({ ...mockBattery, level: 0.2 })
  )
  await act(async () => { render(<StatusBar />) })
  const redRect = document.querySelector('rect[fill="#FF3B30"]')
  expect(redRect).toBeInTheDocument()
})

// 6. Falls back to local time if API fails
test('falls back to local time if API call fails', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'))
  await act(async () => { render(<StatusBar />) })
  expect(screen.getByText(/\d{1,2}:\d{2}/)).toBeInTheDocument()
})