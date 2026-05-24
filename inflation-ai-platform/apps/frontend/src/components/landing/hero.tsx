'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3, Brain, Zap } from 'lucide-react'

const tickerItems = [
  'CPI: 314.2 ▲ +0.4%', 'Core CPI: 3.9% YoY', 'Oil: $78.4 ▲ +2.1%',
  'USD/EUR: 1.085 ▼ -0.3%', 'Fed Rate: 5.25%', 'Unemployment: 3.7%',
  'Gold: $2,045 ▲ +0.8%', 'Food Index: 118.3 ▲ +1.2%',
]

const floatingElements = [
  { icon: Brain, label: 'AI Model', x: '10%', y: '20%', delay: 0 },
  { icon: BarChart3, label: 'Live Data', x: '85%', y: '15%', delay: 1 },
  { icon: Zap, label: 'Real-time', x: '80%', y: '70%', delay: 2 },
]

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-hero-gradient opacity-80" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating AI elements */}
      {floatingElements.map(({ icon: Icon, label, x, y, delay }) => (
        <motion.div
          key={label}
          className="absolute hidden lg:flex items-center gap-2 glass px-3 py-2 rounded-xl text-xs text-muted-foreground"
          style={{ left: x, top: y }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Icon className="w-4 h-4 text-indigo-400" />
          {label}
        </motion.div>
      ))}

      {/* Live ticker */}
      <div className="absolute top-16 left-0 right-0 bg-black/40 border-y border-white/5 py-2 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-xs text-muted-foreground mx-8 font-mono">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-indigo-300 mb-8 border border-indigo-500/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live AI Forecasting Engine Active
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">Predict Inflation</span>
            <br />
            <span className="gradient-text">Before It Happens</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            AI-powered real-time inflation forecasting using machine learning, big data, and economic sentiment intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="gradient" size="xl" className="gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="xl" className="gap-2">
                View Dashboard <BarChart3 className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="#research">
              <Button variant="ghost" size="xl">
                Explore Research
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Forecast Accuracy', value: '94.2%' },
            { label: 'Data Sources', value: '12+' },
            { label: 'ML Models', value: '6' },
            { label: 'Real-time Updates', value: '< 1min' },
          ].map(({ label, value }) => (
            <div key={label} className="glass-card text-center py-4">
              <div className="text-2xl font-bold gradient-text">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
