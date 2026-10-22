import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  aspectRatio?: 'square' | 'portrait' | 'wide';
}

export function CategoryCard({ category, aspectRatio = 'portrait' }: CategoryCardProps) {
  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'wide'
      ? 'aspect-[16/9]'
      : 'aspect-[3/4]';

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`group relative overflow-hidden rounded-xl bg-neutral-900 block ${aspectClass} shadow-card`}
    >
      {/* Background Image */}
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
      />

      {/* Dark Vignette Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

      {/* Champagne Gold Accent Corner Border */}
      <div className="absolute inset-3 border border-white/20 rounded-lg pointer-events-none transition-all duration-500 group-hover:border-velora-gold-400/60" />

      {/* Category Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-velora-gold-400">
            {category.itemCount} Editions
          </span>

          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-velora-gold-500 group-hover:text-velora-black">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide mt-1 text-white group-hover:text-velora-gold-200 transition-colors">
          {category.name}
        </h3>

        <p className="text-xs text-neutral-300 line-clamp-2 mt-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          {category.tagline}
        </p>
      </div>
    </Link>
  );
}
