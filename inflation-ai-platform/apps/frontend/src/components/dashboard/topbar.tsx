'use client'

import { Bell, Search, Sun, Moon, User, LogOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useAuthStore, useAlertStore } from '@/store'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mockAlerts } from '@/lib/mock-data'
import { useEffect } from 'react'

const tickerItems = ['CPI: 314.2 ▲', 'Core: 3.9%', 'Oil: $78.4 ▲', 'USD/EUR: 1.085', 'Fed: 5.25%']

export function DashboardTopbar() {
  const { theme, setTheme } = useTheme()
  const { user, clearAuth } = useAuthStore()
  const { alerts, unreadCount, setAlerts } = useAlertStore()
  const [showAlerts, setShowAlerts] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const router = useRouter()

  useEffect(() => { setAlerts(mockAlerts) }, [setAlerts])

  const handleLogout = () => {
    clearAuth()
    router.push('/login')
  }

  return (
    <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Live ticker */}
      <div className="hidden md:flex items-center gap-6 overflow-hidden">
        {tickerItems.map((item) => (
          <span key={item} className="text-xs text-muted-foreground font-mono whitespace-nowrap">{item}</span>
        ))}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 glass px-3 py-1.5 rounded-lg text-xs text-muted-foreground">
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
          <kbd className="text-xs bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>

        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* Alerts */}
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setShowAlerts(!showAlerts)}>
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                {unreadCount}
              </span>
            )}
          </Button>
          {showAlerts && (
            <div className="absolute right-0 top-12 w-80 glass-card z-50 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">Alerts</span>
                <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-2 rounded-lg text-xs ${!alert.read ? 'bg-white/5' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        alert.severity === 'CRITICAL' ? 'bg-red-400' :
                        alert.severity === 'HIGH' ? 'bg-orange-400' :
                        alert.severity === 'MEDIUM' ? 'bg-yellow-400' : 'bg-green-400'
                      }`} />
                      <span className="text-foreground">{alert.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 glass px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
              {user?.name?.[0] ?? 'U'}
            </div>
            <span className="text-xs text-foreground hidden md:block">{user?.name ?? 'User'}</span>
          </button>
          {showProfile && (
            <div className="absolute right-0 top-12 w-48 glass-card z-50 shadow-2xl space-y-1">
              <div className="pb-2 mb-2 border-b border-white/10">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-white/5 hover:text-white">
                <User className="w-3.5 h-3.5" /> Profile
              </button>
              <button onClick={handleLogout} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10">
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
