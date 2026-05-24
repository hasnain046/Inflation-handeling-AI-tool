'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const CANNED_RESPONSES: Record<string, string> = {
  default: "I'm your AI economist assistant. I can help you understand inflation trends, interpret forecasts, and explain economic indicators. What would you like to know?",
  inflation: "Current CPI stands at 314.2, with a 3.7% year-over-year inflation rate. The XGBoost model predicts CPI will reach ~317.8 over the next month, driven primarily by elevated oil prices (+0.42 SHAP impact) and housing costs.",
  forecast: "Our best model (XGBoost, R²=0.97) forecasts CPI rising to ~317.8 in 1 month, ~320.5 in 3 months, and ~324.1 in 6 months. Confidence intervals widen with horizon. The 12-month forecast carries ±8.2 uncertainty.",
  sentiment: "Current inflation sentiment score is -0.34 (NEGATIVE). 52% of analyzed content is negative, driven by housing costs (-0.62), fuel prices (-0.71), and grocery inflation (-0.58). Sentiment has been deteriorating over the past 2 weeks.",
  oil: "Oil prices at $78.4/bbl have a SHAP impact of +0.42 on CPI — the single largest driver. A $10 increase in oil prices typically adds ~0.08% to monthly CPI. Current geopolitical tensions pose upside risk.",
  fed: "The Fed Funds Rate at 5.25% is exerting downward pressure on inflation (-0.28 SHAP impact). Rate cuts are unlikely until core PCE falls below 2.5%. Our model suggests rates will remain elevated through Q3 2024.",
  risk: "Current risk level is MEDIUM. Key risks: (1) Oil price spike from geopolitical events, (2) Persistent housing inflation, (3) Wage-price spiral if unemployment falls below 3.5%. Commodity Shock Index at 58.1 is elevated.",
}

function getResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('forecast') || lower.includes('predict')) return CANNED_RESPONSES.forecast
  if (lower.includes('sentiment') || lower.includes('news')) return CANNED_RESPONSES.sentiment
  if (lower.includes('oil') || lower.includes('energy')) return CANNED_RESPONSES.oil
  if (lower.includes('fed') || lower.includes('rate') || lower.includes('interest')) return CANNED_RESPONSES.fed
  if (lower.includes('risk')) return CANNED_RESPONSES.risk
  if (lower.includes('inflation') || lower.includes('cpi')) return CANNED_RESPONSES.inflation
  return CANNED_RESPONSES.default
}

export function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', content: CANNED_RESPONSES.default },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 800))
    const response = getResponse(userMsg.content)
    setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }])
    setLoading(false)
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 glass-card shadow-2xl flex flex-col"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI Economist</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-indigo-500/30' : 'bg-purple-500/30'}`}>
                    {msg.role === 'assistant' ? <Bot className="w-3 h-3 text-indigo-400" /> : <User className="w-3 h-3 text-purple-400" />}
                  </div>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${msg.role === 'assistant' ? 'bg-white/5 text-foreground' : 'bg-indigo-500/20 text-white'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-indigo-400" />
                  </div>
                  <div className="bg-white/5 px-3 py-2 rounded-xl">
                    <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about inflation..."
                className="text-xs"
              />
              <Button size="icon" variant="gradient" onClick={send} disabled={loading || !input.trim()}>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
