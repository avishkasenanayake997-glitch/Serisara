'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { resetPasswordSchema } from '@serisara/shared';

export default function ResetPasswordPage() {
  const router = useRouter();

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

    const validation = resetPasswordSchema.safeParse({ password });
    if (!validation.success) {
      setErrorMessage(validation.error.errors[0]?.message || 'Please check password requirements');
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password,
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
        <CardTitle className="text-2xl font-black text-stone-900 mb-2">Password Updated</CardTitle>
        <p className="text-stone-600 text-sm mb-6 leading-relaxed">
          Your password has been changed successfully. You can now sign in with your new credentials.
        </p>
        <Button onClick={() => router.push('/login')} className="w-full">
          Sign In Now
        </Button>
      </Card>
    );
  }

  return (
    <Card className="border-stone-200/80 shadow-xl shadow-stone-200/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-black text-stone-900">Set New Password</CardTitle>
        <CardDescription className="text-stone-500">
          Choose a secure password for your Serisara account
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
            id="reset-password"
            label="New Password"
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
            id="reset-confirm-password"
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat new password"
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
            Update Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
