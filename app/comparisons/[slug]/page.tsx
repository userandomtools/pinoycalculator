import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { getAllComparisons, getComparisonBySlug } from '@/data/comparisons';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';

export async function generateStaticParams() {
  return getAllComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  if (!comp) return {};
  return {
    title: comp.title,
    description: comp.metaDescription,
    alternates: { canonical: `https://pinoycalculator.com/comparisons/${slug}` },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  if (!comp) notFound();

  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ label: 'Comparisons', href: '/comparisons' }, { label: comp.title, href: `/comparisons/${slug}` }]} />
      <h1 className="text-2xl font-extrabold md:text-3xl mb-3">{comp.title}</h1>
      <p className="text-sm text-muted-foreground mb-8 max-w-2xl">{comp.intro}</p>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-semibold">Calculator</th>
              {comp.featureHeaders.map((h) => (
                <th key={h} className="px-4 py-3 text-center font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comp.items.map((item) => (
              <tr key={item.slug} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/calculators/${item.slug}`} className="font-medium text-primary hover:underline">{item.name}</Link>
                </td>
                {comp.featureHeaders.map((h) => {
                  const val = item.features[h];
                  return (
                    <td key={h} className="px-4 py-3 text-center">
                      {val === true ? <Check className="h-4 w-4 text-green-600 mx-auto" /> : val === false ? <X className="h-4 w-4 text-muted-foreground mx-auto" /> : <span className="text-xs">{String(val)}</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
