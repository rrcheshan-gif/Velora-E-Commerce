'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/ui/Logo';
import { Lock, Mail, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SUPPORTED_COUNTRIES } from '@/data/mockData';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('United States');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register(fullName, email, password);
    setLoading(false);
    router.push('/account');
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
            Join The Maison
          </h1>
          <p className="text-xs text-neutral-500">
            Create your account to unlock private seasonal curations and VIP international services.
          </p>
        </div>

        {/* Benefits Ribbon */}
        <div className="p-3 bg-velora-gold-50/70 border border-velora-gold-200/80 rounded-xl text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-velora-gold-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome Privilège Privilege</span>
          </div>
          <p className="text-[11px] text-neutral-600">
            Enjoy 10% off your initial order with code <strong className="font-mono text-velora-black">VELORA10</strong>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-700 font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                required
                placeholder="Lord / Lady / Alexander Wright"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black focus:bg-white"
              />
            </div>
          </div>

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
            <label className="block text-neutral-700 font-medium mb-1">Country of Primary Residence</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black font-medium"
            >
              {SUPPORTED_COUNTRIES.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Create Secure Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-start">
            <input
              id="newsletter-opt-in"
              type="checkbox"
              defaultChecked
              className="mt-0.5 rounded border-neutral-300 text-velora-black focus:ring-0 w-3.5 h-3.5"
            />
            <label htmlFor="newsletter-opt-in" className="ml-2 text-[11px] text-neutral-600 leading-tight">
              I wish to receive private invitations to limited edition horology drops and seasonal gazettes.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-velora-black hover:bg-neutral-800 text-white font-semibold uppercase tracking-widest text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{loading ? 'Creating VIP Dossier...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
          <span>Already a patron? </span>
          <Link href="/auth/login" className="font-semibold text-velora-black hover:underline">
            Sign In to Account
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted under GDPR and Swiss International Data Protection Standards</span>
        </div>
      </div>
    </div>
  );
}
