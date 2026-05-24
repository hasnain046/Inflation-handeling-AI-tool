'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ForecastChart } from '@/components/charts'
import { mockCPIHistory, mockForecast, mockModelComparison } from '@/lib/mock-data'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const horizons = ['1m', '3m', '6m', '12m'] as const
const tooltipStyle = { backgroundColor: 'rgba(10,10,30,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }

export default function ForecastPage() {
  const [horizon, setHorizon] = useState<'1m' | '3m' | '6m' | '12m'>('6m')

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-white">CPI Forecast</h1>
        <p className="text-sm text-muted-foreground mt-1">Multi-horizon inflation predictions with confidence intervals</p>
      </motion.div>

      {/* Horizon selector */}
      <div className="flex gap-2">
        {horizons.map((h) => (
          <Button key={h} variant={horizon === h ? 'default' : 'outline'} size="sm" onClick={() => setHorizon(h)}>
            {h} Forecast
          </Button>
        ))}
      </div>

      {/* Main forecast chart */}
      <ForecastChart historical={mockCPIHistory} forecast={mockForecast.predictions} />

      {/* Model metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'MAE', value: mockForecast.mae, desc: 'Mean Absolute Error' },
          { label: 'RMSE', value: mockForecast.rmse, desc: 'Root Mean Square Error' },
          { label: 'MAPE', value: `${mockForecast.mape}%`, desc: 'Mean Absolute % Error' },
          { label: 'R²', value: mockForecast.r2, desc: 'Coefficient of Determination' },
        ].map(({ label, value, desc }) => (
          <Card key={label} className="text-center">
            <p className="text-xs text-muted-foreground">{desc}</p>
            <p className="text-3xl font-black gradient-text mt-2">{value}</p>
            <p className="text-sm font-semibold text-white mt-1">{label}</p>
          </Card>
        ))}
      </div>

      {/* Model comparison table */}
      <Card>
        <CardHeader>
          <CardTitle>Model Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['Model', 'MAE', 'RMSE', 'MAPE', 'R²', 'Status'].map((h) => (
                    <th key={h} className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockModelComparison.models.map((m) => (
                  <tr key={m.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                      {m.name}
                      {m.isBest && <Badge variant="success" className="text-[10px]">Best</Badge>}
                    </td>
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
    </div>
  )
}
