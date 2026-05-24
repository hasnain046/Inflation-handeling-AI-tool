'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, BarChart3, TrendingUp } from 'lucide-react'

const reports = [
  { id: '1', title: 'Monthly CPI Forecast Report', type: 'PDF', date: '2024-01-15', size: '2.4 MB', icon: TrendingUp },
  { id: '2', title: 'Sentiment Analysis Summary', type: 'PDF', date: '2024-01-14', size: '1.8 MB', icon: BarChart3 },
  { id: '3', title: 'Economic Indicators Export', type: 'CSV', date: '2024-01-13', size: '0.5 MB', icon: FileText },
  { id: '4', title: 'Q4 2023 Executive Dashboard', type: 'PDF', date: '2024-01-01', size: '4.1 MB', icon: BarChart3 },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate and download inflation analysis reports</p>
        </div>
        <Button variant="gradient" size="sm" className="gap-2">
          <FileText className="w-4 h-4" /> Generate Report
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report, i) => (
          <motion.div key={report.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="flex items-center gap-4 hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <report.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{report.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{report.type} · {report.size} · {report.date}</p>
              </div>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Download className="w-4 h-4" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
