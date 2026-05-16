'use client'

import { useActionState } from 'react'
import { loginAction, type AuthState } from '@/lib/auth-actions'
import Link from 'next/link'

export default function LoginPage() {
  const [state, action, isPending] = useActionState<AuthState | null, FormData>(
    loginAction,
    null
  )

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg px-4 py-12 overflow-hidden">
      {/* Soft brand backdrop — peach / lavender / mint, same as marketing & dashboard */}
      <div
        className="pointer-events-none absolute inset-0 gradient-hero"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[420px]">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-display font-bold text-display-md text-ink tracking-tight">
              Ordino
            </span>
          </Link>
        </div>

        <div className="card p-7 md:p-8 shadow-card">
          <div className="text-center mb-6">
            <h1 className="font-display font-semibold text-h3 text-ink mb-2">
              Sign in
            </h1>
            <p className="text-body-sm text-ink-50">
              Operator dashboard access
            </p>
          </div>

          <form action={action} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-caption font-medium text-ink-70 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@ordino.ai"
                required
                autoComplete="email"
                className="form-input"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-caption font-medium text-ink-70 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                minLength={8}
                className="form-input"
              />
            </div>

            {state?.error && (
              <div className="text-caption text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA] rounded-md px-3 py-2">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-caption text-ink-50">
          <Link href="/" className="hover:text-accent transition-colors">
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  )
}
