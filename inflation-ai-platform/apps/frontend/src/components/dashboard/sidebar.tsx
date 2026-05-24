'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, TrendingUp, MessageSquare, BookOpen, Database,
  BarChart3, Sliders, FileText, Bell, Settings, Shield, ChevronLeft, ChevronRight
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/forecast', icon: TrendingUp, label: 'CPI Forecast' },
  { href: '/dashboard/sentiment', icon: MessageSquare, label: 'Sentiment Analysis' },
  { href: '/dashboard/narratives', icon: BookOpen, label: 'Economic Narratives' },
  { href: '/dashboard/models', icon: BarChart3, label: 'Model Performance' },
  { href: '/dashboard/simulation', icon: Sliders, label: 'Scenario Simulation' },
  { href: '/dashboard/reports', icon: FileText, label: 'Reports' },
  { href: '/dashboard/alerts', icon: Bell, label: 'Alerts' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { href: '/dashboard/admin', icon: Shield, label: 'Admin Panel' },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <aside className={cn(
      'fixed left-0 top-0 h-full z-40 flex flex-col glass border-r border-white/5 transition-all duration-300',
      sidebarOpen ? 'w-64' : 'w-16'
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold gradient-text whitespace-nowrap overflow-hidden"
              >
                InflationAI
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group',
                active
                  ? 'bg-primary/20 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </nav>

      {/* Toggle */}
      <div className="p-2 border-t border-white/5">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  )
}
