import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { z } from 'zod'
import axios from 'axios'

export const simulationRouter = Router()
simulationRouter.use(authenticate)

const simulationSchema = z.object({
  oilPrice: z.number().min(20).max(200),
  interestRate: z.number().min(0).max(20),
  exchangeRate: z.number().min(0.5).max(2),
  gdpGrowth: z.number().min(-10).max(15),
  unemployment: z.number().min(0).max(25),
  importCost: z.number().min(50).max(200),
})

simulationRouter.post('/run', async (req, res, next) => {
  try {
    const inputs = simulationSchema.parse(req.body)

    // Try ML service first
    try {
      const { data } = await axios.post(`${process.env.ML_SERVICE_URL}/simulation/run`, inputs)
      return res.json({ success: true, data: data.data })
    } catch {
      // Fallback: simple linear model
      const result = runLocalSimulation(inputs)
      res.json({ success: true, data: result })
    }
  } catch (err) {
    next(err)
  }
})

function runLocalSimulation(inputs: z.infer<typeof simulationSchema>) {
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
