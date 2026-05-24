'use client'

import { motion } from 'framer-motion'

const steps = [
  { step: '01', title: 'Data Ingestion', description: 'Automated pipelines collect CPI data, news articles, social sentiment, and economic indicators from 12+ sources in real-time.', color: 'text-indigo-400' },
  { step: '02', title: 'NLP Processing', description: 'FinBERT and RoBERTa classify sentiment, extract inflation narratives, and score economic signals from unstructured text.', color: 'text-purple-400' },
  { step: '03', title: 'Feature Engineering', description: 'Pandas/NumPy pipelines combine structured economic data with NLP scores into ML-ready feature vectors.', color: 'text-cyan-400' },
  { step: '04', title: 'ML Forecasting', description: 'Ensemble of XGBoost, LSTM, Prophet, and SVR models generate 1/3/6/12-month CPI forecasts with confidence intervals.', color: 'text-green-400' },
  { step: '05', title: 'Explainability', description: 'SHAP values decompose each prediction, showing exactly which factors drive inflation up or down.', color: 'text-yellow-400' },
  { step: '06', title: 'Delivery', description: 'Results surface in real-time dashboards, alerts, PDF reports, and API endpoints for downstream consumption.', color: 'text-orange-400' },
]

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black mb-4">
            <span className="gradient-text">How the AI Pipeline Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From raw data to actionable forecasts in under 60 seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-6xl font-black text-white/5">{step.step}</div>
              <div className={`text-sm font-bold ${step.color} mb-2`}>Step {step.step}</div>
              <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
