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
import { CalculatorClient } from './calculator-client';
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
    const title = `Best ${cat.name} Philippines 2026: Expert-Verified Tools`;
    const desc = `Use the expert-verified ${cat.name} 2026 for accurate results in the Philippines. Features high-precision formulas \u0026 depth for GEO \u0026 AEO search engines.`;
    return {
      title: title.substring(0, 60),
      description: desc.substring(0, 160),
      alternates: {
        canonical: `https://pinoycalculator.com/${cat.slug}`,
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
        canonical: `https://pinoycalculator.com/${calc.slug}`,
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
            { label: cat.name, href: `/${cat.slug}` },
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
              href={`/${calc.slug}`}
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
        url: `/${calc.category}`,
      },
      { name: calc.shortTitle, url: `/${calc.slug}` },
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
              href: `/${calc.category}`,
            },
            {
              label: calc.shortTitle,
              href: `/${calc.slug}`,
            },
          ]}
        />

        <div className="animate-fade-in">
          {/* Header */}
          <div className="mb-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <span className="category-badge mb-2 bg-accent text-accent-foreground capitalize inline-block text-xs px-2 py-0.5 rounded-full">
                {calc.category}
              </span>
              <h1 className="text-2xl font-extrabold md:text-3xl">
                {calc.title}
              </h1>
              {/* Short Intro - Just first 2 sentences */}
              <div className="mt-2 text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
                {sentenceToParagraphs(introText).slice(0, 2)}
              </div>
            </div>
            <div className="mt-1 self-start">
              <ShareButtons title={calc.title} />
            </div>
          </div>
          
          <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground border-b border-border pb-4">
            <div className="flex items-center gap-1.5">
              <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">A</span>
              <span className="font-medium text-foreground">Pinoy Calculator Editorial Team</span>
            </div>
            <span>•</span>
            <time dateTime={new Date().toISOString().split('T')[0]}>
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          </div>

          {/* Interactive Calculator — HERO OF THE PAGE */}
          <div className="mb-10">
            <CalculatorClient calc={calc} />
          </div>

          {/* --- Fully Visible Content Sections --- */}

          {/* Tags / Topic Hubs */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-foreground mr-1">Topics:</span>
            {taxonomy.topicHubs.map((hub) => (
              <Badge key={hub} variant="secondary" className="rounded-full px-3 py-1 font-medium">
                {hub}
              </Badge>
            ))}
            {taxonomy.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-full px-3 py-1 font-normal text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>

          {/* What This Tool Does — Educational Context */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold">What This Tool Does & Why It Matters</h2>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {sentenceToParagraphs(introText)}
            </div>
          </section>

          {/* How to Use & Who It's For — Static, fully visible */}
          <section className="mb-10 rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">How to Use & Who It&apos;s For</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-base font-semibold text-foreground">Step-by-Step Guide</h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  {enriched.howToSteps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-foreground">Who Should Use This</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {enriched.whoShouldUse.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Formula & Example — Static, fully visible */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold">Formula & Example Calculation</h2>
            <div className="mb-5 rounded-xl bg-muted/60 p-5 font-mono text-sm font-semibold text-primary border border-border">
              {calc.formula}
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-base font-semibold text-foreground">Understanding the Formula</h3>
                <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {sentenceToParagraphs(calc.formulaExplanation)}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-3 text-base font-semibold text-foreground">Practical Examples</h3>
                <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {sentenceToParagraphs(calc.exampleCalculation)}
                </div>
              </div>
            </div>
          </section>

          {/* Philippine Context — Static, fully visible */}
          <section className="mb-10 rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Philippine Rules & Context</h2>
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              {sentenceToParagraphs(calc.philippinesContext)}
            </div>
            {isDeep && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Reviewed &amp; expanded by our editorial team
              </div>
            )}
          </section>

          {/* FAQ — Static, fully visible, NO accordion */}
          {allFaqs.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-6 text-xl font-bold">Frequently Asked Questions</h2>
              <div className="space-y-5">
                {allFaqs.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{faq.question}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

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
                    href={`/${rel.slug}`}
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

          <section className="mt-12 rounded-xl bg-muted/50 p-5 text-xs text-muted-foreground border border-border">
            <p>
              <strong>Disclaimer:</strong> This calculator provides mathematical estimates based on the formulas and variables provided. It is designed for informational and educational purposes only and should not be considered professional financial, legal, medical, or engineering advice. Always consult with a qualified professional or official government agency (e.g., BIR, SSS, Pag-IBIG) before making significant decisions based on these calculations.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
