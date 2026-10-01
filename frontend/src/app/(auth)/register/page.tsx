'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { registerSchema } from '@serisara/shared';

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const validation = registerSchema.safeParse({ email, password, fullName });
    if (!validation.success) {
      setErrorMessage(validation.error.errors[0]?.message || 'Please check your inputs');
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      // If user session exists right away (optional verification enabled), navigate to dashboard
      if (data.session) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setIsSuccess(true);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-stone-200/80 shadow-xl shadow-stone-200/50 text-center p-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <CardTitle className="text-2xl font-black text-stone-900 mb-2">Check Your Email</CardTitle>
        <p className="text-stone-600 text-sm mb-6 leading-relaxed">
          We&apos;ve sent a verification link to <span className="font-semibold text-stone-900">{email}</span>. Click the link in your email to activate your Serisara travel account.
        </p>
        <Button onClick={() => router.push('/login')} variant="outline" className="w-full">
          Back to Sign In
        </Button>
      </Card>
    );
  }

  return (
    <Card className="border-stone-200/80 shadow-xl shadow-stone-200/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-black text-stone-900">Create Account</CardTitle>
        <CardDescription className="text-stone-500">
          Start planning your tailor-made Sri Lanka journey
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
            id="register-fullname"
            label="Full Name"
            type="text"
            placeholder="Nimal Perera"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
            required
            autoComplete="name"
          />

          <Input
            id="register-email"
            label="Email Address"
            type="email"
            placeholder="traveler@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
            autoComplete="email"
          />

          <Input
            id="register-password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
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
            hint="Include uppercase, lowercase, and a number"
            required
            autoComplete="new-password"
          />

          <Input
            id="register-confirm-password"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
            autoComplete="new-password"
          />

          <Button
            type="submit"
            size="lg"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Create Free Account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-stone-100 pt-4 text-xs text-stone-500">
        <span>Already have an account?</span>{' '}
        <Link href="/login" className="ml-1.5 font-bold text-emerald-700 hover:text-emerald-800 hover:underline">
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
