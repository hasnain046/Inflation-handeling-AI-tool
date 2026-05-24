'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockNarratives } from '@/lib/mock-data'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const trendIcon = { RISING: TrendingUp, FALLING: TrendingDown, STABLE: Minus }
const trendColor = { RISING: 'text-red-400', FALLING: 'text-green-400', STABLE: 'text-yellow-400' }
const trendBadge = { RISING: 'danger', FALLING: 'success', STABLE: 'warning' } as const

export default function NarrativesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-white">Economic Narratives</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-detected inflation narratives from global data streams</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNarratives.map((narrative, i) => {
          const TrendIcon = trendIcon[narrative.trend]
          return (
            <motion.div
              key={narrative.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:border-white/20 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white">{narrative.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{narrative.category}</p>
                  </div>
                  <Badge variant={trendBadge[narrative.trend]} className="flex items-center gap-1">
                    <TrendIcon className="w-3 h-3" />
                    {narrative.trend}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="text-white">{(narrative.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${narrative.confidence * 100}%` }} />
                    </div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Mentions</span>
                    <span className="text-white">{narrative.mentions.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Sentiment</span>
                    <span className={narrative.sentimentScore < 0 ? 'text-red-400' : 'text-green-400'}>
                      {narrative.sentimentScore.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
