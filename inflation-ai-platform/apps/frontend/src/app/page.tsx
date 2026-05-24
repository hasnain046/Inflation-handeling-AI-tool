import { LandingHero } from '@/components/landing/hero'
import { LandingFeatures } from '@/components/landing/features'
import { LandingHowItWorks } from '@/components/landing/how-it-works'
import { LandingStats } from '@/components/landing/stats'
import { LandingTestimonials } from '@/components/landing/testimonials'
import { LandingPricing } from '@/components/landing/pricing'
import { LandingFAQ } from '@/components/landing/faq'
import { LandingFooter } from '@/components/landing/footer'
import { LandingNav } from '@/components/landing/nav'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white overflow-x-hidden">
      <LandingNav />
      <LandingHero />
      <LandingStats />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingTestimonials />
      <LandingPricing />
      <LandingFAQ />
      <LandingFooter />
    </main>
  )
}
