import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { guidesData, getGuideBySlug, getAllGuides } from '@/data/guides';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { getFAQSchema, getHowToSchema, getBreadcrumbSchema } from '@/lib/seo-schemas';

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: { canonical: `https://pinoycalculator.com/guides/${slug}` },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const schemas = [
    getHowToSchema(
      guide.title,
      guide.steps.map((s) => ({ title: s.title, content: s.content }))
    ),
    getFAQSchema(guide.faqs.map((f) => ({ question: f.q, answer: f.a }))),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: guide.title, url: `/guides/${slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <div className="container max-w-3xl py-8">
        <Breadcrumbs
          items={[
            { label: 'Guides', href: '/guides' },
            { label: guide.title, href: `/guides/${slug}` },
          ]}
        />

        <span className="category-badge mb-3 bg-accent text-accent-foreground capitalize">
          {guide.category}
        </span>
        <h1 className="mt-2 text-2xl font-extrabold md:text-3xl mb-4">{guide.title}</h1>
        <p className="text-sm leading-relaxed text-muted-foreground mb-8">{guide.intro}</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Step-by-Step Guide</h2>
          <div className="space-y-4">
            {guide.steps.map((step, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Example</h2>
          <div className="rounded-xl border border-border bg-accent/30 p-5">
            {guide.example.split('\n\n').map((p, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </section>

        {guide.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {guide.faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold mb-1">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 mb-10 text-center">
          <p className="text-sm font-medium mb-3">{guide.ctaText}</p>
          <Link
            href={guide.ctaLink}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Use Calculator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {guide.relatedGuides.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">Related Guides</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {guide.relatedGuides.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/guides/${rel.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
                >
                  <span className="text-sm font-medium group-hover:text-primary">{rel.title}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
