import Link from 'next/link'
import { TrendingUp, Github, Twitter, Linkedin } from 'lucide-react'

export function LandingFooter() {
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">InflationAI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI-powered inflation forecasting for economists, analysts, and institutions.
            </p>
            <div className="flex gap-4 mt-6">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Product', links: ['Dashboard', 'Forecasting', 'Sentiment', 'Simulator', 'Reports'] },
            { title: 'Research', links: ['Documentation', 'API Reference', 'Model Cards', 'Blog', 'Changelog'] },
            { title: 'Company', links: ['About', 'Careers', 'Privacy', 'Terms', 'Contact'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2024 InflationAI. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Not financial advice. For research and informational purposes only.</p>
        </div>
      </div>
    </footer>
  )
}
