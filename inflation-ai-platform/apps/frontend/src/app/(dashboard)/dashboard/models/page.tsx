'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ModelComparisonChart } from '@/components/charts'
import { mockModelComparison, mockForecast } from '@/lib/mock-data'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'

const tooltipStyle = { backgroundColor: 'rgba(10,10,30,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }

const shapData = [
  { feature: 'Oil Price', impact: 0.42, direction: 'positive' },
  { feature: 'Sentiment Score', impact: -0.31, direction: 'negative' },
  { feature: 'Interest Rate', impact: -0.28, direction: 'negative' },
  { feature: 'GDP Growth', impact: 0.19, direction: 'positive' },
  { feature: 'Unemployment', impact: -0.15, direction: 'negative' },
  { feature: 'Exchange Rate', impact: 0.12, direction: 'positive' },
  { feature: 'Food Index', impact: 0.09, direction: 'positive' },
]

export default function ModelsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-white">Model Performance</h1>
        <p className="text-sm text-muted-foreground mt-1">ML model metrics, comparison, and explainability</p>
      </motion.div>

      <ModelComparisonChart models={mockModelComparison.models} />

      {/* Metrics table */}
      <Card>
        <CardHeader><CardTitle>Detailed Metrics</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['Model', 'MAE ↓', 'RMSE ↓', 'MAPE ↓', 'R² ↑', 'Status'].map((h) => (
                    <th key={h} className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockModelComparison.models.map((m) => (
                  <tr key={m.name} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-2.5 px-3 font-medium text-white">{m.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{m.mae}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{m.rmse}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{m.mape}%</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{m.r2}</td>
                    <td className="py-2.5 px-3">
                      <Badge variant={m.isBest ? 'success' : 'default'}>{m.isBest ? 'Active' : 'Standby'}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* SHAP Explainability */}
      <Card>
        <CardHeader>
          <CardTitle>SHAP Feature Importance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-4">
            Why is inflation predicted to rise? SHAP values show each feature's contribution to the forecast.
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={shapData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} domain={[-0.5, 0.5]} />
              <YAxis type="category" dataKey="feature" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} width={110} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="impact" radius={[0, 4, 4, 0]} name="SHAP Impact"
                fill="#6366f1"
              />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Positive values push CPI higher. Negative values push CPI lower.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
