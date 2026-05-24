import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InflationAI — Predict Inflation Before It Happens',
  description: 'AI-powered real-time inflation forecasting using machine learning, big data, and economic sentiment intelligence.',
  keywords: ['inflation', 'AI', 'forecasting', 'CPI', 'machine learning', 'economics'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
