'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'How accurate are the inflation forecasts?', a: 'Our best model (XGBoost ensemble) achieves 94.2% accuracy (MAPE < 0.2%) on out-of-sample CPI forecasts. Accuracy varies by horizon — 1-month forecasts are most accurate, 12-month forecasts carry wider confidence intervals.' },
  { q: 'What data sources does InflationAI use?', a: 'We integrate FRED API, World Bank, IMF, BLS CPI datasets, News API, Twitter/X sentiment streams, Google Trends, commodity price feeds, and Forex APIs — 12+ sources updated in real-time.' },
  { q: 'How does the sentiment analysis work?', a: 'We use FinBERT and RoBERTa fine-tuned on financial text to classify inflation-related sentiment from news articles and social media. The system extracts topics like housing, fuel, and grocery inflation automatically.' },
  { q: 'Can I use the API in my own applications?', a: 'Yes. All plans include REST API access. Analyst and Enterprise plans include higher rate limits and webhook support for real-time data delivery.' },
  { q: 'What is the Scenario Simulator?', a: 'An interactive tool where you adjust macroeconomic variables (oil price, interest rates, GDP, unemployment) and the AI instantly predicts the impact on CPI — useful for stress testing and policy analysis.' },
  { q: 'Is my data secure?', a: 'Yes. We use JWT authentication, role-based access control, encrypted data at rest and in transit, and maintain full audit logs. Enterprise plans support on-premise deployment.' },
]

export function LandingFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black mb-4">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-white text-sm">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-sm text-muted-foreground mt-3 leading-relaxed overflow-hidden"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
