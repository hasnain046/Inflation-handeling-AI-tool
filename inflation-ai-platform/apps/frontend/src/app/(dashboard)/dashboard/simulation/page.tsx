'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { SimulationInput, SimulationResult } from '@inflation-ai/types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Loader2, Play } from 'lucide-react'

const tooltipStyle = { backgroundColor: 'rgba(10,10,30,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }

const defaultInputs: SimulationInput = {
  oilPrice: 78.4,
  interestRate: 5.25,
  exchangeRate: 1.085,
  gdpGrowth: 2.1,
  unemployment: 3.7,
  importCost: 100,
}

function SliderInput({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-white font-medium">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  )
}

function runSimulation(inputs: SimulationInput): SimulationResult {
  const oilImpact = (inputs.oilPrice - 78.4) * 0.008
  const rateImpact = (inputs.interestRate - 5.25) * -0.15
  const fxImpact = (inputs.exchangeRate - 1.085) * -2.1
  const gdpImpact = (inputs.gdpGrowth - 2.1) * -0.12
  const unemploymentImpact = (inputs.unemployment - 3.7) * -0.18
  const importImpact = (inputs.importCost - 100) * 0.005
  const totalImpact = oilImpact + rateImpact + fxImpact + gdpImpact + unemploymentImpact + importImpact
  return {
    predictedCPI: parseFloat((314.2 + totalImpact * 10).toFixed(1)),
    inflationImpact: parseFloat(totalImpact.toFixed(3)),
    confidence: 0.87,
    breakdown: [
      { factor: 'Oil Price', impact: oilImpact },
      { factor: 'Interest Rate', impact: rateImpact },
      { factor: 'Exchange Rate', impact: fxImpact },
      { factor: 'GDP Growth', impact: gdpImpact },
      { factor: 'Unemployment', impact: unemploymentImpact },
      { factor: 'Import Cost', impact: importImpact },
    ],
  }
}

export default function SimulationPage() {
  const [inputs, setInputs] = useState<SimulationInput>(defaultInputs)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRun = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setResult(runSimulation(inputs))
    setLoading(false)
  }

  const update = (key: keyof SimulationInput) => (v: number) => setInputs((p) => ({ ...p, [key]: v }))

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-white">Scenario Simulator</h1>
        <p className="text-sm text-muted-foreground mt-1">Adjust macroeconomic variables and predict inflation impact</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <Card>
          <CardHeader><CardTitle>Simulation Controls</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <SliderInput label="Oil Price (WTI)" value={inputs.oilPrice} min={40} max={150} step={0.5} unit=" USD" onChange={update('oilPrice')} />
            <SliderInput label="Fed Funds Rate" value={inputs.interestRate} min={0} max={10} step={0.25} unit="%" onChange={update('interestRate')} />
            <SliderInput label="USD/EUR Exchange Rate" value={inputs.exchangeRate} min={0.8} max={1.4} step={0.001} unit="" onChange={update('exchangeRate')} />
            <SliderInput label="GDP Growth" value={inputs.gdpGrowth} min={-5} max={8} step={0.1} unit="%" onChange={update('gdpGrowth')} />
            <SliderInput label="Unemployment Rate" value={inputs.unemployment} min={2} max={12} step={0.1} unit="%" onChange={update('unemployment')} />
            <SliderInput label="Import Cost Index" value={inputs.importCost} min={70} max={150} step={1} unit="" onChange={update('importCost')} />

            <Button variant="gradient" className="w-full gap-2" onClick={handleRun} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              Run Simulation
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {result ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center">
                  <p className="text-xs text-muted-foreground">Predicted CPI</p>
                  <p className="text-3xl font-black gradient-text mt-1">{result.predictedCPI}</p>
                </Card>
                <Card className="text-center">
                  <p className="text-xs text-muted-foreground">Inflation Impact</p>
                  <p className={`text-3xl font-black mt-1 ${result.inflationImpact > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {result.inflationImpact > 0 ? '+' : ''}{result.inflationImpact.toFixed(3)}
                  </p>
                </Card>
              </div>

              <Card>
                <CardHeader><CardTitle>Factor Impact Breakdown</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={result.breakdown} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                      <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} />
                      <YAxis type="category" dataKey="factor" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} width={100} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="impact" radius={[0, 4, 4, 0]} name="Impact">
                        {result.breakdown.map((entry, i) => (
                          <Cell key={i} fill={entry.impact > 0 ? '#ef4444' : '#22c55e'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Play className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Adjust parameters and run simulation</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
