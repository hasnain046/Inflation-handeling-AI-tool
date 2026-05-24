'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string
  change?: number
  changeLabel?: string
  icon: React.ReactNode
  gradient: string
  delay?: number
}

export function KPICard({ title, value, change, changeLabel, icon, gradient, delay = 0 }: KPICardProps) {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="relative overflow-hidden hover:border-white/20 transition-all group">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {change !== undefined && (
              <div className={cn('flex items-center gap-1 mt-1 text-xs', isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-muted-foreground')}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : isNegative ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                {change > 0 ? '+' : ''}{change.toFixed(2)}% {changeLabel}
              </div>
            )}
          </div>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center opacity-80`}>
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
