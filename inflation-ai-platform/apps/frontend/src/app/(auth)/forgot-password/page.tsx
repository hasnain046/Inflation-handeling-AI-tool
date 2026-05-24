'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'

const schema = z.object({ email: z.string().email('Invalid email address') })
type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000))
    setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
        <p className="text-muted-foreground text-sm mb-6">We've sent a password reset link to your email address.</p>
        <Link href="/login"><Button variant="outline" className="w-full">Back to Sign In</Button></Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Forgot password?</h1>
      <p className="text-muted-foreground text-sm mb-8">Enter your email and we'll send you a reset link.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
          <Input type="email" placeholder="you@example.com" {...register('email')} />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>
        <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Send Reset Link
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        <Link href="/login" className="text-indigo-400 hover:text-indigo-300">Back to Sign In</Link>
      </p>
    </div>
  )
}
