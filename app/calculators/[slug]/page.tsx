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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

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

          {/* Interactive Calculator — Client Component boundary (HERO OF THE PAGE) */}
          <div className="mb-10">
            <CalculatorClient calc={calc} />
          </div>

          {/* --- Content Below the Fold --- */}

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

          {/* Quick Answer */}
          <section className="mb-8 rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Quick Answer
            </h2>
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              {sentenceToParagraphs(calc.metaDescription)}
            </div>
          </section>

          {/* Interactive Calculator — Client Component boundary */}
          <CalculatorClient calc={calc} />

          {/* Progressive Disclosure SEO Content */}
          <Accordion type="single" collapsible className="mb-10 w-full space-y-4">
            
            {/* Guide & Usage details */}
            <AccordionItem value="how-it-works" className="rounded-xl border border-border bg-card px-4">
              <AccordionTrigger className="text-base font-bold hover:no-underline">
                How to Use & Who It's For
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 text-sm text-muted-foreground">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Step-by-Step Guide</h3>
                    <ol className="space-y-2">
                      {enriched.howToSteps.map((step, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Who Should Use This</h3>
                    <ul className="space-y-2">
                      {enriched.whoShouldUse.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Formula & Example details */}
            <AccordionItem value="formula-example" className="rounded-xl border border-border bg-card px-4">
              <AccordionTrigger className="text-base font-bold hover:no-underline">
                Formula & Example Calculation
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 text-sm text-muted-foreground">
                <div className="mb-4 rounded-lg bg-muted/50 p-4 font-mono text-xs font-semibold text-primary">
                  {calc.formula}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Understanding the Formula</h3>
                    <div className="space-y-2 leading-relaxed">{sentenceToParagraphs(calc.formulaExplanation)}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-4">
                    <h3 className="mb-1 font-semibold text-foreground">Practical Example</h3>
                    <div className="space-y-2 leading-relaxed">{sentenceToParagraphs(calc.exampleCalculation)}</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Philippines Context details */}
            <AccordionItem value="ph-context" className="rounded-xl border border-border bg-card px-4">
              <AccordionTrigger className="text-base font-bold hover:no-underline">
                Philippine Rules & Regulations
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 text-sm text-muted-foreground space-y-2 leading-relaxed">
                {sentenceToParagraphs(calc.philippinesContext)}
                
                {isDeep && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    Reviewed &amp; expanded by our editorial team
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
