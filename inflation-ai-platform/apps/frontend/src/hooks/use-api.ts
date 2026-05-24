import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import type { DashboardKPIs, ForecastResult, SentimentSummary, EconomicIndicator, SimulationInput, SimulationResult, Alert } from '@inflation-ai/types'
import { mockKPIs, mockForecast, mockSentiment, mockIndicators, mockAlerts } from '@/lib/mock-data'

// Forecast hooks
export function useForecast(horizon: string = '6m') {
  return useQuery({
    queryKey: ['forecast', horizon],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: ForecastResult }>(`/forecast/monthly?horizon=${horizon}`)
        return data.data
      } catch {
        return mockForecast
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useForecastCompare() {
  return useQuery({
    queryKey: ['forecast', 'compare'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/forecast/compare')
        return data.data
      } catch {
        return { models: [] }
      }
    },
  })
}

export function useForecastExplain() {
  return useQuery({
    queryKey: ['forecast', 'explain'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/forecast/explain')
        return data.data
      } catch {
        return null
      }
    },
  })
}

// Sentiment hooks
export function useSentiment() {
  return useQuery({
    queryKey: ['sentiment', 'live'],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: SentimentSummary }>('/sentiment/live')
        return data.data
      } catch {
        return mockSentiment
      }
    },
    refetchInterval: 60 * 1000,
  })
}

// Economics hooks
export function useEconomicIndicators() {
  return useQuery({
    queryKey: ['economics', 'indicators'],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: EconomicIndicator[] }>('/economics/indicators')
        return data.data
      } catch {
        return mockIndicators
      }
    },
    staleTime: 10 * 60 * 1000,
  })
}

// Simulation hook
export function useSimulation() {
  return useMutation({
    mutationFn: async (inputs: SimulationInput) => {
      try {
        const { data } = await api.post<{ data: SimulationResult }>('/simulation/run', inputs)
        return data.data
      } catch {
        throw new Error('Simulation failed')
      }
    },
  })
}

// Alerts hooks
export function useAlerts() {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: Alert[] }>('/alerts')
        return data.data
      } catch {
        return mockAlerts
      }
    },
    refetchInterval: 30 * 1000,
  })
}
