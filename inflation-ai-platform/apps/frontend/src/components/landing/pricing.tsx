'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Researcher',
    price: '$49',
    period: '/month',
    description: 'For individual economists and researchers.',
    features: ['CPI Forecast Dashboard', '3-month horizon', 'Sentiment Analysis', 'PDF Reports', 'Email Alerts', '5 API calls/min'],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    name: 'Analyst',
    price: '$149',
    period: '/month',
    description: 'For professional analysts and small teams.',
    features: ['Everything in Researcher', '12-month horizon', 'Scenario Simulator', 'SHAP Explainability', 'SMS + Email Alerts', '50 API calls/min', 'Model Comparison'],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For institutions and large organizations.',
    features: ['Everything in Analyst', 'Custom ML models', 'White-label option', 'Dedicated support', 'SLA guarantee', 'Unlimited API', 'On-premise deployment'],
    cta: 'Contact Sales',
    highlight: false,
  },
]

export function LandingPricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black mb-4">
            <span className="gradient-text">Simple Pricing</span>
          </h2>
          <p className="text-muted-foreground">Start free. Scale as you grow.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card relative ${plan.highlight ? 'border-indigo-500/40 glow' : ''}`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button variant={plan.highlight ? 'gradient' : 'outline'} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
