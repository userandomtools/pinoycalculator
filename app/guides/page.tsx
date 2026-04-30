import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { getAllGuides } from '@/data/guides';

export const metadata: Metadata = {
  title: 'Guides – Step-by-Step Computation Guides',
  description: 'Step-by-step guides on how to compute 13th month pay, VAT, GWA, night differential, and more in the Philippines.',
  alternates: { canonical: 'https://pinoycalculator.com/guides' },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <div className="container py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Guides</h1>
      <p className="text-muted-foreground mb-8">
        Step-by-step computation guides for Filipino employees, students, and business owners.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 card-elevated group"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent">
              <BookOpen className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-sm font-semibold group-hover:text-primary transition-colors">
                {g.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{g.metaDescription}</p>
              <span className="text-xs text-primary mt-2 inline-flex items-center gap-1">
                Read guide <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
