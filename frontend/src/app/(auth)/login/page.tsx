'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { loginSchema } from '@serisara/shared';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setErrorMessage(validation.error.errors[0]?.message || 'Please check your inputs');
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-stone-200/80 shadow-xl shadow-stone-200/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-black text-stone-900">Welcome Back</CardTitle>
        <CardDescription className="text-stone-500">
          Sign in to access your saved itineraries and bookings
        </CardDescription>
      </CardHeader>

      <CardContent>
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 flex items-start gap-3 text-rose-700 text-xs leading-relaxed animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="login-email"
            label="Email Address"
            type="email"
            placeholder="traveler@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
            autoComplete="email"
          />

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label htmlFor="login-password" className="text-xs font-semibold text-stone-700 tracking-wide uppercase">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-stone-400 hover:text-stone-600 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-stone-100 pt-4 text-xs text-stone-500">
        <span>Don&apos;t have an account?</span>{' '}
        <Link href="/register" className="ml-1.5 font-bold text-emerald-700 hover:text-emerald-800 hover:underline">
          Create account
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <Card className="border-stone-200/80 shadow-xl shadow-stone-200/50 p-8 text-center text-sm text-stone-400 animate-pulse">
        Loading sign in...
      </Card>
    }>
      <LoginForm />
    </Suspense>
  );
}
