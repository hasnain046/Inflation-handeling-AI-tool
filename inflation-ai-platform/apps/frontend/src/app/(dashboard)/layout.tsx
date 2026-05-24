'use client'

import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'
import { AIChatbot } from '@/components/dashboard/chatbot'
import { useUIStore } from '@/store'
import { cn } from '@/lib/utils'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <div className={cn('flex-1 flex flex-col transition-all duration-300', sidebarOpen ? 'lg:ml-64' : 'lg:ml-16')}>
        <DashboardTopbar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
      <AIChatbot />
    </div>
  )
}
