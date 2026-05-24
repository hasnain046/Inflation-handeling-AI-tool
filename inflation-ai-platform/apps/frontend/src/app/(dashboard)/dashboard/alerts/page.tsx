'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockAlerts } from '@/lib/mock-data'
import { useAlertStore } from '@/store'
import { useEffect } from 'react'
import { Bell, AlertTriangle, TrendingUp, MessageSquare, Zap, CheckCheck } from 'lucide-react'

const alertIcons = {
  INFLATION_SPIKE: TrendingUp,
  SENTIMENT_ANOMALY: MessageSquare,
  CPI_THRESHOLD: Bell,
  ECONOMIC_SHOCK: Zap,
}

const severityVariant = {
  LOW: 'default',
  MEDIUM: 'warning',
  HIGH: 'danger',
  CRITICAL: 'danger',
} as const

export default function AlertsPage() {
  const { alerts, setAlerts, markRead, markAllRead, unreadCount } = useAlertStore()

  useEffect(() => { setAlerts(mockAlerts) }, [setAlerts])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Alerts</h1>
          <p className="text-sm text-muted-foreground mt-1">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead} className="gap-2">
            <CheckCheck className="w-4 h-4" /> Mark All Read
          </Button>
        )}
      </motion.div>

      <div className="space-y-3">
        {alerts.map((alert, i) => {
          const Icon = alertIcons[alert.type]
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`flex items-start gap-4 cursor-pointer hover:border-white/20 transition-all ${!alert.read ? 'border-indigo-500/20' : ''}`}
                onClick={() => markRead(alert.id)}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  alert.severity === 'CRITICAL' ? 'bg-red-500/20' :
                  alert.severity === 'HIGH' ? 'bg-orange-500/20' :
                  alert.severity === 'MEDIUM' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    alert.severity === 'CRITICAL' ? 'text-red-400' :
                    alert.severity === 'HIGH' ? 'text-orange-400' :
                    alert.severity === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={severityVariant[alert.severity]} className="text-[10px]">{alert.severity}</Badge>
                    <span className="text-xs text-muted-foreground">{alert.type.replace('_', ' ')}</span>
                    {!alert.read && <span className="w-2 h-2 bg-indigo-400 rounded-full" />}
                  </div>
                  <p className="text-sm text-white">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(alert.createdAt).toLocaleString()}</p>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
