'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const stats = [
  { value: 94.2, suffix: '%', label: 'Forecast Accuracy', description: 'Across all ML models' },
  { value: 2.4, suffix: 'M+', label: 'Data Points Analyzed', description: 'Daily ingestion' },
  { value: 12, suffix: '+', label: 'Economic Indicators', description: 'Real-time tracked' },
  { value: 99.9, suffix: '%', label: 'Platform Uptime', description: 'SLA guaranteed' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) { setCount(value); clearInterval(timer) }
      else setCount(current)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="text-4xl font-black gradient-text">
      {count % 1 === 0 ? count.toFixed(0) : count.toFixed(1)}{suffix}
    </span>
  )
}

export function LandingStats() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card text-center py-8"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="text-sm font-semibold text-white mt-2">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
