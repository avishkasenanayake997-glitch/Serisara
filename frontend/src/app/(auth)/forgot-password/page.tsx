'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../../lib/supabase/client';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui';
import { Mail, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { forgotPasswordSchema } from '@serisara/shared';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = forgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      setErrorMessage(validation.error.errors[0]?.message || 'Please enter a valid email');
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const redirectUrl = `${window.location.origin}/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setIsSuccess(true);
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
        <CardTitle className="text-2xl font-black text-stone-900 mb-2">Reset Link Sent</CardTitle>
        <p className="text-stone-600 text-sm mb-6 leading-relaxed">
          If an account exists with <span className="font-semibold text-stone-900">{email}</span>, you will receive password reset instructions shortly.
        </p>
        <Link href="/login" className="inline-block w-full">
          <Button variant="outline" className="w-full">
            Return to Sign In
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="border-stone-200/80 shadow-xl shadow-stone-200/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-black text-stone-900">Forgot Password</CardTitle>
        <CardDescription className="text-stone-500">
          Enter your registered email and we&apos;ll send you a password reset link
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
            id="forgot-email"
            label="Email Address"
            type="email"
            placeholder="traveler@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
            autoComplete="email"
          />

          <Button
            type="submit"
            size="lg"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Send Reset Link
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-stone-100 pt-4 text-xs text-stone-500">
        <Link href="/login" className="inline-flex items-center gap-1.5 font-bold text-stone-700 hover:text-emerald-700">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
