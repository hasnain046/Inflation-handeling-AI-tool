'use client'

import { motion } from 'framer-motion'
import { Brain, TrendingUp, MessageSquare, Zap, Shield, BarChart3, Globe, Bell } from 'lucide-react'

const features = [
  { icon: Brain, title: 'ML Forecasting Engine', description: '6 models including XGBoost, LSTM, and Prophet for multi-horizon CPI prediction.', color: 'from-indigo-500 to-purple-600' },
  { icon: MessageSquare, title: 'NLP Sentiment Analysis', description: 'FinBERT/RoBERTa analyzes news and social media for inflation sentiment signals.', color: 'from-purple-500 to-pink-600' },
  { icon: TrendingUp, title: 'Real-time CPI Tracking', description: 'TimescaleDB-powered time-series tracking with live economic indicator feeds.', color: 'from-cyan-500 to-blue-600' },
  { icon: Zap, title: 'Explainable AI (SHAP)', description: 'Understand exactly why inflation is predicted to rise or fall with SHAP values.', color: 'from-yellow-500 to-orange-600' },
  { icon: Globe, title: 'Economic Narrative Engine', description: 'Detect housing, fuel, grocery, and recession narratives from global data streams.', color: 'from-green-500 to-teal-600' },
  { icon: BarChart3, title: 'Scenario Simulator', description: 'Interactively model oil price, interest rate, and GDP shocks on inflation.', color: 'from-orange-500 to-red-600' },
  { icon: Bell, title: 'Real-time Alert System', description: 'Instant notifications for CPI spikes, sentiment anomalies, and economic shocks.', color: 'from-pink-500 to-rose-600' },
  { icon: Shield, title: 'Enterprise Security', description: 'JWT auth, RBAC, audit logs, and SOC2-ready infrastructure.', color: 'from-slate-500 to-gray-600' },
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black mb-4">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to forecast, analyze, and act on inflation data — powered by state-of-the-art AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card group cursor-default"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
