import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
}

export function formatCPI(value: number): string {
  return value.toFixed(1)
}

export function getRiskColor(level: string): string {
  const colors: Record<string, string> = {
    LOW: 'text-green-400',
    MEDIUM: 'text-yellow-400',
    HIGH: 'text-orange-400',
    CRITICAL: 'text-red-400',
  }
  return colors[level] ?? 'text-gray-400'
}

export function getRiskBg(level: string): string {
  const colors: Record<string, string> = {
    LOW: 'bg-green-400/10 border-green-400/20',
    MEDIUM: 'bg-yellow-400/10 border-yellow-400/20',
    HIGH: 'bg-orange-400/10 border-orange-400/20',
    CRITICAL: 'bg-red-400/10 border-red-400/20',
  }
  return colors[level] ?? 'bg-gray-400/10 border-gray-400/20'
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n)
}
