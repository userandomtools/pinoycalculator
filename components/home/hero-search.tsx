'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Calculator } from 'lucide-react';
import { searchCalculators } from '@/data/calculators';

export function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const results = searchQuery.length > 1 ? searchCalculators(searchQuery).slice(0, 8) : [];

  return (
    <div className="max-w-xl mx-auto relative animate-fade-in">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search calculators... (e.g. 13th month pay, loan, VAT)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-2xl border-0 bg-card px-12 py-4 text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
      />
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-card border border-border shadow-lg overflow-hidden z-10">
          {results.map((r) => (
            <Link
              key={r.slug}
              href={`/calculators/${r.slug}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
              onClick={() => setSearchQuery('')}
            >
              <Calculator className="h-4 w-4 text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">{r.shortTitle}</div>
                <div className="text-xs text-muted-foreground capitalize">{r.category}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
