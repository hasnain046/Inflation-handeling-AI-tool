import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050510] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">InflationAI</span>
          </Link>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Predict Inflation<br />
            <span className="gradient-text">Before It Happens</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Join thousands of economists and analysts using AI-powered forecasting to stay ahead of inflation trends.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { label: 'Accuracy', value: '94.2%' },
              { label: 'Data Sources', value: '12+' },
              { label: 'ML Models', value: '6' },
              { label: 'Users', value: '2,400+' },
            ].map(({ label, value }) => (
              <div key={label} className="glass-card py-4 text-center">
                <div className="text-xl font-bold gradient-text">{value}</div>
                <div className="text-xs text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold gradient-text">InflationAI</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
