'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

const ToastContext = React.createContext<{
  toast: (props: ToastProps) => void
}>({ toast: () => {} })

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>([])

  const toast = React.useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { ...props, id }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'glass-card px-4 py-3 min-w-[300px] animate-in slide-in-from-right',
              t.variant === 'destructive' && 'border-red-500/30'
            )}
          >
            {t.title && <p className="font-semibold text-sm">{t.title}</p>}
            {t.description && <p className="text-xs text-muted-foreground">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function Toaster() {
  return null
}

export function useToast() {
  return React.useContext(ToastContext)
}
