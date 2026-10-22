'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/ui/Logo';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoaded, setDemoLoaded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
    router.push('/account');
  };

  const handleDemoLogin = async () => {
    setDemoLoaded(true);
    await login('alexander.wright@velora-vip.com', 'demoPassword123');
    setTimeout(() => {
      router.push('/account');
    }, 400);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50/50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200 shadow-card">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo size="md" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-velora-black">
            Patron Sign In
          </h1>
          <p className="text-xs text-neutral-500">
            Access your curated wishlist, bespoke consignment tracking, and VIP benefits.
          </p>
        </div>

        {/* Demo Fast Login Banner */}
        <div className="p-4 bg-velora-cream/70 rounded-xl border border-velora-gold-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-velora-black">
            <Sparkles className="w-4 h-4 text-velora-gold-600" />
            <span>VIP Demo Account Available</span>
          </div>
          <p className="text-[11px] text-neutral-600">
            Sign in instantly as Diamond VIP Alexander Wright with pre-populated orders & saved addresses.
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 px-3 bg-velora-gold-500 hover:bg-velora-gold-400 text-velora-black font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            {demoLoaded ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Entering Portal...</span>
              </>
            ) : (
              <span>1-Click VIP Instant Login</span>
            )}
          </button>
        </div>

        {/* Traditional Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-700 font-medium mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                required
                placeholder="patron@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black focus:bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-neutral-700 font-medium">Password</label>
              <a href="#" className="text-[11px] text-neutral-400 hover:text-velora-black">
                Forgot key?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              defaultChecked
              className="rounded border-neutral-300 text-velora-black focus:ring-0 w-3.5 h-3.5"
            />
            <label htmlFor="remember-me" className="ml-2 text-[11px] text-neutral-600">
              Preserve secure session on this device
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-velora-black hover:bg-neutral-800 text-white font-semibold uppercase tracking-widest text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
          <span>New to VELORA Maison? </span>
          <Link href="/auth/register" className="font-semibold text-velora-black hover:underline">
            Request Registration
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Biometric & OAuth Supabase Architecture Compatible</span>
        </div>
      </div>
    </div>
  );
}
