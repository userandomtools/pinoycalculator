import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, ArrowRight } from 'lucide-react';
import { getAllComparisons } from '@/data/comparisons';

export const metadata: Metadata = {
  title: 'Calculator Comparisons',
  description: 'Compare the best calculators for loans, salary, and finance in the Philippines.',
  alternates: { canonical: 'https://pinoycalculator.com/comparisons' },
};

export default function ComparisonsIndexPage() {
  const comparisons = getAllComparisons();
  return (
    <div className="container py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Compare Calculators</h1>
      <p className="text-muted-foreground mb-8">Side-by-side feature comparisons of the best calculators for the Philippines.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisons.map((c) => (
          <Link key={c.slug} href={`/comparisons/${c.slug}`} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 card-elevated group">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent">
              <BarChart3 className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-sm font-semibold group-hover:text-primary transition-colors">{c.title}</h2>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.metaDescription}</p>
              <span className="text-xs text-primary mt-2 inline-flex items-center gap-1">Compare <ArrowRight className="h-3 w-3" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
