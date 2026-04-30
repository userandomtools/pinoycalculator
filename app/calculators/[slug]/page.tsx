import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import {
  getCalculatorBySlug,
  calculators,
  categories,
  getCalculatorsByCategory,
} from '@/data/calculators';
import { getTaxonomyMeta } from '@/data/content-taxonomy';
import {
  buildCalculatorContent,
  getIntroOverride,
  hasDeepOverride,
} from '@/lib/calculator-content';
import {
  getCalculatorSchema,
  getFAQSchema,
  getBreadcrumbSchema,
  getHowToSchema,
} from '@/lib/seo-schemas';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { CalculatorClient, CalculatorFaq } from './calculator-client';
import ShareButtons from '@/components/ShareButtons';

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const categoryIcons: Record<string, string> = {
  finance: '💰', salary: '💼', gaming: '🎮', academic: '🎓',
  health: '❤️', crypto: '₿', engineering: '⚙️', utilities: '🔧',
};

const categorySlugs = new Set(categories.map((c) => c.slug));

const sentenceToParagraphs = (text: string) =>
  text
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)
    .map((sentence, index) => (
      <p key={index} className="text-sm leading-relaxed text-muted-foreground">
        {sentence}
      </p>
    ));

/* ------------------------------------------------------------------ */
/*  Static params – pre-build ALL categories + ALL calculators        */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  const catParams = categories.map((c) => ({ slug: c.slug }));
  const calcParams = calculators.map((c) => ({ slug: c.slug }));
  return [...catParams, ...calcParams];
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Category page
  const cat = categories.find((c) => c.slug === slug);
  if (cat) {
    return {
      title: cat.name,
      description: `Free ${cat.name.toLowerCase()} for Filipinos. ${cat.description}.`,
      alternates: {
        canonical: `https://pinoycalculator.com/calculators/${cat.slug}`,
      },
    };
  }

  // Calculator page
  const calc = getCalculatorBySlug(slug);
  if (calc) {
    return {
      title: calc.title,
      description: calc.metaDescription,
      alternates: {
        canonical: `https://pinoycalculator.com/calculators/${calc.slug}`,
      },
      openGraph: {
        title: calc.title,
        description: calc.metaDescription,
        type: 'website',
        locale: 'en_PH',
      },
    };
  }

  return {};
}

/* ------------------------------------------------------------------ */
/*  Page component – resolves category vs calculator                  */
/* ------------------------------------------------------------------ */

export default async function CalculatorSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  /* ---------- Category page ---------- */
  if (categorySlugs.has(slug)) {
    const cat = categories.find((c) => c.slug === slug)!;
    const calcs = getCalculatorsByCategory(cat.id);
    const Icon = cat.icon;

    return (
      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: 'Calculators', href: '/all-calculators' },
            { label: cat.name, href: `/calculators/${cat.slug}` },
          ]}
        />

        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
            <Icon className="h-7 w-7 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">{cat.name}</h1>
            <p className="text-muted-foreground text-sm">{cat.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calcs.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="block rounded-xl border border-border bg-card p-5 card-elevated group h-full animate-fade-in"
            >
              <div className="text-2xl mb-3">{categoryIcons[calc.category]}</div>
              <h2 className="font-heading text-sm font-semibold group-hover:text-primary transition-colors mb-1">
                {calc.shortTitle}
              </h2>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {calc.description.slice(0, 100)}...
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                Use Calculator <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        {calcs.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            More calculators coming soon!
          </p>
        )}
      </div>
    );
  }

  /* ---------- Calculator page ---------- */
  const calc = getCalculatorBySlug(slug);
  if (!calc) notFound();

  const taxonomy = getTaxonomyMeta('calculator', calc.slug);
  const fieldLabels = calc.fields.filter((f) => f.type !== 'text').map((f) => f.label);
  const enriched = buildCalculatorContent(calc);
  const introText = getIntroOverride(calc.slug) ?? calc.description;
  const isDeep = hasDeepOverride(calc.slug);
  const allFaqs = [...calc.faqs, ...enriched.extraFaqs];

  const relatedCalcs = enriched.internalLinks
    .map((link) => {
      const target = calculators.find((c) => c.slug === link.slug);
      return target
        ? { ...link, title: target.shortTitle, category: target.category }
        : null;
    })
    .filter(Boolean) as {
    slug: string;
    anchor: string;
    title: string;
    category: string;
  }[];

  const combinedSchema = [
    getCalculatorSchema(calc),
    ...(allFaqs.length > 0
      ? [
          getFAQSchema(
            allFaqs.map((f) => ({ question: f.question, answer: f.answer }))
          ),
        ]
      : []),
    getHowToSchema(
      `How to use the ${calc.shortTitle}`,
      enriched.howToSteps.map((s, i) => ({
        title: `Step ${i + 1}`,
        content: s,
      }))
    ),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      {
        name: calc.category.charAt(0).toUpperCase() + calc.category.slice(1),
        url: `/calculators/${calc.category}`,
      },
      { name: calc.shortTitle, url: `/calculators/${calc.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={combinedSchema} />

      <div className="container max-w-4xl py-8">
        <Breadcrumbs
          items={[
            {
              label:
                calc.category.charAt(0).toUpperCase() + calc.category.slice(1),
              href: `/calculators/${calc.category}`,
            },
            {
              label: calc.shortTitle,
              href: `/calculators/${calc.slug}`,
            },
          ]}
        />

        <div className="animate-fade-in">
          {/* Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <span className="category-badge mb-2 bg-accent text-accent-foreground capitalize inline-block">
                {calc.category}
              </span>
              <h1 className="mt-2 text-2xl font-extrabold md:text-3xl">
                {calc.title}
              </h1>
            </div>
            <div className="mt-2 md:mt-0 self-start">
              <ShareButtons title={calc.title} />
            </div>
          </div>

          {/* Intro — server rendered for AEO */}
          <div className="mb-6 space-y-3">
            {sentenceToParagraphs(introText)}
          </div>

          {isDeep && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Reviewed &amp; expanded by our editorial team
            </div>
          )}

          {/* Topic / Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {taxonomy.topicHubs.map((hub) => (
              <Badge
                key={hub}
                variant="secondary"
                className="rounded-full px-3 py-1"
              >
                {hub}
              </Badge>
            ))}
            {taxonomy.tags.slice(0, 6).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-full px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Quick Answer — server rendered for featured-snippet eligibility */}
          <section className="mb-8 rounded-2xl border border-border bg-card p-5 md:p-6">
            <h2 className="mb-3 text-xl font-bold">Quick Answer</h2>
            <div className="space-y-3">
              {sentenceToParagraphs(calc.metaDescription)}
              <p className="text-sm leading-relaxed text-muted-foreground">
                If you have been comparing numbers in your head and still feel
                unsure, this tool keeps things simple by showing the result
                clearly using the standard formula for{' '}
                {calc.shortTitle.toLowerCase()}.
              </p>
            </div>
          </section>

          {/* Interactive Calculator — Client Component boundary */}
          <CalculatorClient calc={calc} />

          {/* Who Should Use + Why Useful */}
          <section className="mb-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-3 text-xl font-bold">
                Who Should Use This Calculator
              </h2>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {enriched.whoShouldUse.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-3 text-xl font-bold">
                Why It&apos;s Useful
              </h2>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {enriched.whyUseful.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* How to Use */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold">
              How to Use This Calculator
            </h2>
            <div className="rounded-2xl border border-border bg-card p-5">
              <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {enriched.howToSteps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* What This Tool Checks */}
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold">
              What This Tool Helps You Check
            </h2>
            <div className="rounded-2xl border border-border bg-card p-5">
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {fieldLabels.map((label) => (
                  <li key={label}>
                    • Enter your {label.toLowerCase()} and get a faster estimate
                    without manual math.
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Formula */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold">Formula</h2>
            <div className="formula-box">
              <div className="mb-3 rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm font-semibold text-primary">
                {calc.formula}
              </div>
              <div className="space-y-3">
                {sentenceToParagraphs(calc.formulaExplanation)}
              </div>
            </div>
          </section>

          {/* Example */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold">Example Calculation</h2>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="space-y-3">
                {sentenceToParagraphs(calc.exampleCalculation)}
              </div>
            </div>
          </section>

          {/* Philippines Context */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold">Philippines Context</h2>
            <div className="rounded-xl border border-border bg-accent/30 p-5">
              <div className="space-y-3">
                {sentenceToParagraphs(calc.philippinesContext)}
              </div>
            </div>
          </section>

          {/* FAQ — Client Component for accordion */}
          <CalculatorFaq faqs={allFaqs} />

          {/* Related Search Topics */}
          <section className="mb-10">
            <h2 className="mb-2 text-xl font-bold">Related Search Topics</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Long-tail topics readers also explore around the{' '}
              {calc.shortTitle.toLowerCase()}.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {enriched.longTailKeywords.map(({ keyword, explanation }) => (
                <div
                  key={keyword}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="mb-1.5 text-sm font-semibold text-foreground">
                    {keyword}
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {explanation}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Calculators — internal links */}
          {relatedCalcs.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-bold">
                Related Calculators You May Need
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedCalcs.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/calculators/${rel.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/30"
                  >
                    <div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-primary">
                        {rel.anchor}
                      </div>
                      <div className="mt-0.5 text-xs capitalize text-muted-foreground">
                        {rel.category}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {calc.references.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-bold">References</h2>
              <ul className="space-y-2">
                {calc.references.map((ref) => (
                  <li key={ref.url}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      {ref.title} <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
