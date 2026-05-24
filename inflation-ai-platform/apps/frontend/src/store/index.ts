import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Alert } from '@inflation-ai/types'

interface AuthState {
  user: User | null
  accessToken: string | null
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user, accessToken) => set({ user, accessToken }),
      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    { name: 'auth-storage' }
  )
)

interface UIState {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}))

interface AlertState {
  alerts: Alert[]
  unreadCount: number
  setAlerts: (alerts: Alert[]) => void
  markRead: (id: string) => void
  markAllRead: () => void
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  unreadCount: 0,
  setAlerts: (alerts) => set({ alerts, unreadCount: alerts.filter((a) => !a.read).length }),
  markRead: (id) =>
    set((s) => {
      const alerts = s.alerts.map((a) => (a.id === id ? { ...a, read: true } : a))
      return { alerts, unreadCount: alerts.filter((a) => !a.read).length }
    }),
  markAllRead: () =>
    set((s) => ({ alerts: s.alerts.map((a) => ({ ...a, read: true })), unreadCount: 0 })),
}))
