'use client'

import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const tooltipStyle = {
  backgroundColor: 'rgba(10,10,30,0.95)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '12px',
}

interface CPIChartProps {
  data: Array<{ date: string; value: number; yoy: number }>
}

export function CPIHistoryChart({ data }: CPIChartProps) {
  const formatted = data.map((d) => ({ ...d, date: d.date.slice(0, 7) }))
  return (
    <Card>
      <CardHeader>
        <CardTitle>CPI Historical Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={formatted}>
            <defs>
              <linearGradient id="cpiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="value" stroke="#6366f1" fill="url(#cpiGrad)" strokeWidth={2} dot={false} name="CPI" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface ForecastChartProps {
  historical: Array<{ date: string; value: number }>
  forecast: Array<{ date: string; value: number; lower: number; upper: number }>
}

export function ForecastChart({ historical, forecast }: ForecastChartProps) {
  const combined = [
    ...historical.slice(-12).map((d) => ({ date: d.date.slice(0, 7), actual: d.value, predicted: null, lower: null, upper: null })),
    ...forecast.map((d) => ({ date: d.date.slice(0, 7), actual: null, predicted: d.value, lower: d.lower, upper: d.upper })),
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>CPI Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={combined}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
            <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2} dot={false} name="Actual CPI" connectNulls={false} />
            <Line type="monotone" dataKey="predicted" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Forecast" connectNulls={false} />
            <Line type="monotone" dataKey="upper" stroke="#22c55e" strokeWidth={1} strokeOpacity={0.3} dot={false} name="Upper CI" connectNulls={false} />
            <Line type="monotone" dataKey="lower" stroke="#22c55e" strokeWidth={1} strokeOpacity={0.3} dot={false} name="Lower CI" connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface SentimentChartProps {
  data: Array<{ date: string; score: number }>
}

export function SentimentTimelineChart({ data }: SentimentChartProps) {
  const formatted = data.map((d) => ({ ...d, date: d.date.slice(5) }))
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={formatted}>
            <defs>
              <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} domain={[-1, 1]} />
            <Tooltip contentStyle={tooltipStyle} />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
            <Area type="monotone" dataKey="score" stroke="#f59e0b" fill="url(#sentGrad)" strokeWidth={2} dot={false} name="Sentiment" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface ModelComparisonChartProps {
  models: Array<{ name: string; mae: number; rmse: number; r2: number; isBest: boolean }>
}

export function ModelComparisonChart({ models }: ModelComparisonChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Comparison (MAE)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={models} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} width={100} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="mae" fill="#6366f1" radius={[0, 4, 4, 0]} name="MAE" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
