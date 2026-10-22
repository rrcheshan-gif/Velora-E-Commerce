import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', variant = 'dark', size = 'md' }: LogoProps) {
  const textColor =
    variant === 'light'
      ? 'text-white'
      : variant === 'gold'
      ? 'text-velora-gold-400'
      : 'text-velora-black';

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const textSizes = {
    sm: 'text-lg tracking-[0.25em]',
    md: 'text-2xl tracking-[0.3em]',
    lg: 'text-3xl tracking-[0.35em]',
  };

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 transition-transform duration-300 hover:opacity-95 ${className}`}
    >
      {/* Custom Geometric V Monogram Icon with Champagne Gold Facets */}
      <svg
        className={`${iconSizes[size]} transition-transform duration-500 group-hover:scale-105`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer subtle shield diamond */}
        <polygon
          points="50,5 95,25 78,85 50,97 22,85 5,25"
          fill="none"
          stroke="#C5A52A"
          strokeWidth="2.5"
          strokeOpacity="0.4"
        />
        {/* Left wing of luxury V */}
        <path
          d="M20 22 L50 82 L42 82 L12 22 Z"
          fill="url(#goldGradientLeft)"
        />
        {/* Right wing of luxury V */}
        <path
          d="M80 22 L50 82 L58 82 L88 22 Z"
          fill="url(#goldGradientRight)"
        />
        {/* Central brilliant diamond star */}
        <polygon
          points="50,30 54,42 66,46 54,50 50,62 46,50 34,46 46,42"
          fill="#FAF7EF"
          filter="drop-shadow(0px 0px 3px rgba(212,175,55,0.8))"
        />
        <defs>
          <linearGradient id="goldGradientLeft" x1="12" y1="22" x2="50" y2="82" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EBDCA0" />
            <stop offset="0.5" stopColor="#C5A52A" />
            <stop offset="1" stopColor="#826618" />
          </linearGradient>
          <linearGradient id="goldGradientRight" x1="88" y1="22" x2="50" y2="82" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FAF7EF" />
            <stop offset="0.4" stopColor="#DFC86D" />
            <stop offset="1" stopColor="#A37F33" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex flex-col">
        <span className={`font-serif font-bold uppercase leading-none ${textSizes[size]} ${textColor}`}>
          VELORA
        </span>
        <span className="text-[7.5px] uppercase tracking-[0.25em] text-neutral-400 font-sans mt-0.5">
          International
        </span>
      </div>
    </Link>
  );
}
