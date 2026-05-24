'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SentimentTimelineChart } from '@/components/charts'
import { mockSentiment } from '@/lib/mock-data'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const tooltipStyle = { backgroundColor: 'rgba(10,10,30,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }

export default function SentimentPage() {
  const pieData = [
    { name: 'Positive', value: mockSentiment.positive, color: '#22c55e' },
    { name: 'Negative', value: mockSentiment.negative, color: '#ef4444' },
    { name: 'Neutral', value: mockSentiment.neutral, color: '#64748b' },
  ]

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-white">Sentiment Analysis</h1>
        <p className="text-sm text-muted-foreground mt-1">NLP-powered inflation sentiment from news and social media</p>
      </motion.div>

      {/* Overall sentiment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader><CardTitle>Overall Sentiment</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                    {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                {pieData.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-muted-foreground">{d.name}: {d.value}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-3xl font-black" style={{ color: mockSentiment.overall < 0 ? '#ef4444' : '#22c55e' }}>
                  {mockSentiment.overall.toFixed(2)}
                </p>
                <Badge variant={mockSentiment.label === 'NEGATIVE' ? 'danger' : mockSentiment.label === 'POSITIVE' ? 'success' : 'default'} className="mt-1">
                  {mockSentiment.label}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Top Inflation Topics</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSentiment.topTopics.map((topic) => (
                <div key={topic.topic} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">{topic.topic}</span>
                      <span className="text-xs text-muted-foreground">{topic.count.toLocaleString()} mentions</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(topic.count / mockSentiment.topTopics[0].count) * 100}%`,
                          backgroundColor: topic.sentiment < 0 ? '#ef4444' : '#22c55e',
                        }}
                      />
                    </div>
                  </div>
                  <Badge variant={topic.sentiment < -0.5 ? 'danger' : topic.sentiment < 0 ? 'warning' : 'success'} className="text-[10px] w-12 justify-center">
                    {topic.sentiment.toFixed(2)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <SentimentTimelineChart data={mockSentiment.timeline} />
    </div>
  )
}
