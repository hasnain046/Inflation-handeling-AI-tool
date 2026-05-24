import * as React from 'react'
import { cn } from '@/lib/utils'

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' }
>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-primary/20 text-primary border-primary/30',
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  }
  return (
    <div
      ref={ref}
      className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', variants[variant], className)}
      {...props}
    />
  )
})
Badge.displayName = 'Badge'

export { Badge }
