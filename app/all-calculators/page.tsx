import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { calculators, categories } from '@/data/calculators';

const categoryIcons: Record<string, string> = {
  finance: '💰', salary: '💼', gaming: '🎮', academic: '🎓',
  health: '❤️', crypto: '₿', engineering: '⚙️', utilities: '🔧',
};

export const metadata: Metadata = {
  title: 'All Calculators – Browse 78+ Free Online Tools',
  description:
    'Browse all free online calculators for Filipinos. Finance, salary, gaming, academic, health, crypto, engineering, and utility tools.',
  alternates: { canonical: 'https://pinoycalculator.com/all-calculators' },
};

export default function AllCalculatorsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-2">All Calculators</h1>
      <p className="text-muted-foreground mb-8">
        Browse {calculators.length}+ free online calculators for Filipinos across{' '}
        {categories.length} categories.
      </p>

      {categories.map((cat) => {
        const Icon = cat.icon;
        const calcs = calculators.filter((c) => c.category === cat.id);
        return (
          <section key={cat.id} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <Icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{cat.name}</h2>
                <p className="text-xs text-muted-foreground">{calcs.length} calculators</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {calcs.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 card-elevated group"
                >
                  <div className="text-lg">{categoryIcons[calc.category] || '🔧'}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                      {calc.shortTitle}
                    </h3>
                    <span className="text-xs text-muted-foreground capitalize">
                      {calc.category}
                    </span>
                  </div>
                  <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
