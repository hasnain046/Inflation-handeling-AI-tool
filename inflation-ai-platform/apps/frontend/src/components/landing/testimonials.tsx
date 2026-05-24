'use client'

import { motion } from 'framer-motion'

const testimonials = [
  { name: 'Sarah Chen', role: 'Chief Economist, Apex Capital', quote: 'InflationAI predicted the June CPI spike 3 weeks before the official release. Our portfolio positioning saved us $12M.', avatar: 'SC' },
  { name: 'Marcus Webb', role: 'Head of Research, GlobalMacro Fund', quote: 'The sentiment analysis engine is unlike anything I\'ve seen. It catches narrative shifts before they hit the data.', avatar: 'MW' },
  { name: 'Dr. Priya Nair', role: 'Economist, World Bank', quote: 'The explainability features make this suitable for policy work. We can actually justify our forecasts to stakeholders.', avatar: 'PN' },
  { name: 'James Okafor', role: 'CIO, Meridian Asset Management', quote: 'We replaced 3 separate Bloomberg terminals with InflationAI. The scenario simulator alone is worth the subscription.', avatar: 'JO' },
  { name: 'Elena Vasquez', role: 'Macro Strategist, Deutsche Bank', quote: 'The LSTM model\'s 12-month forecast accuracy of 94% is genuinely impressive. This is production-grade AI.', avatar: 'EV' },
  { name: 'Tom Harrington', role: 'Portfolio Manager, Citadel', quote: 'Real-time alerts have become part of our morning routine. The CPI threshold breach notification is invaluable.', avatar: 'TH' },
]

export function LandingTestimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black mb-4">
            <span className="gradient-text">Trusted by Top Economists</span>
          </h2>
          <p className="text-muted-foreground">Used by analysts at leading financial institutions worldwide.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
