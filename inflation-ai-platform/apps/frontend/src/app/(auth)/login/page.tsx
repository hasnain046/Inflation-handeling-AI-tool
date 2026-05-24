'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthStore } from '@/store'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      // Mock auth — replace with real API call
      await new Promise((r) => setTimeout(r, 1000))
      setAuth(
        { id: '1', email: data.email, name: 'Demo User', role: 'ANALYST', createdAt: new Date().toISOString() },
        'mock-jwt-token'
      )
      router.push('/dashboard')
    } catch {
      setError('Invalid email or password')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
      <p className="text-muted-foreground text-sm mb-8">Sign in to your InflationAI account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
          <Input type="email" placeholder="you@example.com" {...register('email')} />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
          <div className="relative">
            <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...register('password')} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot password?</Link>
        </div>

        {error && <p className="text-xs text-red-400 text-center">{error}</p>}

        <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{' '}
        <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign up</Link>
      </p>
    </div>
  )
}
