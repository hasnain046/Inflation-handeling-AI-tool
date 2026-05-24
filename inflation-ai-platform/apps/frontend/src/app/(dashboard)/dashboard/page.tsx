'use client'

import { motion } from 'framer-motion'
import { KPICard } from '@/components/dashboard/kpi-card'
import { CPIHistoryChart, ForecastChart, SentimentTimelineChart, ModelComparisonChart } from '@/components/charts'
import { mockKPIs, mockCPIHistory, mockForecast, mockSentiment, mockModelComparison, mockIndicators } from '@/lib/mock-data'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getRiskColor, formatPercent } from '@/lib/utils'
import {
  TrendingUp, TrendingDown, Activity, Target, MessageSquare,
  AlertTriangle, DollarSign, Zap
} from 'lucide-react'

const kpiConfig = [
  { key: 'currentCPI', title: 'Current CPI', icon: <Activity className="w-5 h-5 text-white" />, gradient: 'from-indigo-500 to-purple-600', change: 0.4, changeLabel: 'MoM' },
  { key: 'predictedCPI', title: 'Predicted CPI (1M)', icon: <Target className="w-5 h-5 text-white" />, gradient: 'from-green-500 to-teal-600', change: 1.1, changeLabel: 'forecast' },
  { key: 'inflationRate', title: 'Inflation Rate', icon: <TrendingUp className="w-5 h-5 text-white" />, gradient: 'from-orange-500 to-red-600', change: -0.2, changeLabel: 'YoY' },
  { key: 'forecastAccuracy', title: 'Forecast Accuracy', icon: <Target className="w-5 h-5 text-white" />, gradient: 'from-cyan-500 to-blue-600' },
  { key: 'sentimentScore', title: 'Sentiment Score', icon: <MessageSquare className="w-5 h-5 text-white" />, gradient: 'from-yellow-500 to-orange-600', change: -0.05, changeLabel: '24h' },
  { key: 'riskLevel', title: 'Risk Level', icon: <AlertTriangle className="w-5 h-5 text-white" />, gradient: 'from-red-500 to-pink-600' },
  { key: 'currencyStrengthIndex', title: 'Currency Strength', icon: <DollarSign className="w-5 h-5 text-white" />, gradient: 'from-purple-500 to-indigo-600', change: -0.8, changeLabel: '24h' },
  { key: 'commodityShockIndex', title: 'Commodity Shock', icon: <Zap className="w-5 h-5 text-white" />, gradient: 'from-pink-500 to-rose-600', change: 2.3, changeLabel: '24h' },
]

function formatKPIValue(key: string, value: number | string): string {
  if (key === 'inflationRate') return `${value}%`
  if (key === 'forecastAccuracy') return `${value}%`
  if (key === 'sentimentScore') return String(value)
  if (key === 'riskLevel') return String(value)
  if (key === 'currencyStrengthIndex') return `${value}`
  if (key === 'commodityShockIndex') return `${value}`
  return String(value)
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time inflation intelligence dashboard</p>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiConfig.map((cfg, i) => (
          <KPICard
            key={cfg.key}
            title={cfg.title}
            value={formatKPIValue(cfg.key, (mockKPIs as any)[cfg.key])}
            change={cfg.change}
            changeLabel={cfg.changeLabel}
            icon={cfg.icon}
            gradient={cfg.gradient}
            delay={i * 0.05}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CPIHistoryChart data={mockCPIHistory} />
        <ForecastChart historical={mockCPIHistory} forecast={mockForecast.predictions} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentTimelineChart data={mockSentiment.timeline} />
        <ModelComparisonChart models={mockModelComparison.models} />
      </div>

      {/* Economic Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Economic Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockIndicators.map((ind) => (
              <div key={ind.id} className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-xs text-muted-foreground mb-1">{ind.name}</p>
                <p className="text-lg font-bold text-white">{ind.value}{ind.unit === '%' ? '%' : ''}</p>
                <p className={`text-xs mt-1 ${ind.change > 0 ? 'text-green-400' : ind.change < 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
                  {formatPercent(ind.change)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
