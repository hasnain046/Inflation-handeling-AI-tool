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
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['ANALYST', 'RESEARCHER', 'GUEST']),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'ANALYST' },
  })

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000))
    setAuth(
      { id: '1', email: data.email, name: data.name, role: data.role, createdAt: new Date().toISOString() },
      'mock-jwt-token'
    )
    router.push('/dashboard')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
      <p className="text-muted-foreground text-sm mb-8">Start forecasting inflation with AI</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">Full Name</label>
          <Input placeholder="John Doe" {...register('name')} />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
          <Input type="email" placeholder="you@example.com" {...register('email')} />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">Role</label>
          <select
            {...register('role')}
            className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="ANALYST">Analyst</option>
            <option value="RESEARCHER">Researcher</option>
            <option value="GUEST">Guest</option>
          </select>
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

        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">Confirm Password</label>
          <Input type="password" placeholder="••••••••" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in</Link>
      </p>
    </div>
  )
}
