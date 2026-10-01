'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../providers/auth-provider';
import { authApiService } from '../../../services/auth.service';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '../../../components/ui';
import { User, Phone, Globe, CheckCircle2, AlertCircle, Camera } from 'lucide-react';
import { updateProfileSchema } from '@serisara/shared';

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [country, setCountry] = useState(profile?.country || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const validation = updateProfileSchema.safeParse({
      fullName,
      phone,
      country,
      bio,
      avatarUrl: avatarUrl || undefined,
    });

    if (!validation.success) {
      setErrorMessage(validation.error.errors[0]?.message || 'Please check your inputs');
      return;
    }

    setIsLoading(true);
    try {
      await authApiService.updateProfile({
        fullName,
        phone,
        country,
        bio,
        avatarUrl: avatarUrl || undefined,
      });

      await refreshProfile();
      setSuccessMessage('Profile details updated successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">Account Profile</h1>
        <p className="text-sm text-stone-500">Manage your personal information, travel preferences, and contact details</p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-sm flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-800 text-sm flex items-center gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-800 font-bold flex items-center justify-center text-3xl overflow-hidden shadow-inner">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  (fullName || 'T').charAt(0)
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Camera className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-stone-900">{fullName || profile?.full_name || 'Traveler'}</h2>
                <Badge variant={profile?.role === 'admin' ? 'danger' : profile?.role === 'manager' ? 'accent' : 'primary'}>
                  {profile?.role?.toUpperCase() || 'USER'}
                </Badge>
              </div>
              <p className="text-sm text-stone-500">{user?.email}</p>
              <p className="text-xs text-stone-400 pt-1">
                Account Active: {profile?.is_active ? 'Yes' : 'Suspended'} • Member since{' '}
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Recent'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Information</CardTitle>
          <CardDescription>Keep your information updated for seamless bookings and communications</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="profile-fullName"
                label="Full Name"
                placeholder="Nimal Perera"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
                required
              />

              <Input
                id="profile-phone"
                label="Phone Number"
                placeholder="+94 77 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                leftIcon={<Phone className="w-4 h-4" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="profile-country"
                label="Country of Origin"
                placeholder="Sri Lanka, United Kingdom, Australia..."
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                leftIcon={<Globe className="w-4 h-4" />}
              />

              <Input
                id="profile-avatarUrl"
                label="Avatar Image URL"
                placeholder="https://images.unsplash.com/..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                leftIcon={<Camera className="w-4 h-4" />}
                hint="Direct URL to your profile photo"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="profile-bio" className="block text-xs font-semibold text-stone-700 tracking-wide uppercase">
                Bio / Travel Interests
              </label>
              <textarea
                id="profile-bio"
                rows={4}
                className="w-full rounded-xl border border-stone-200 bg-white/80 p-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                placeholder="Tell us about yourself and your travel passions (e.g. Wildlife photography, surfing in Mirissa, ancient architecture...)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" size="md" isLoading={isLoading}>
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
