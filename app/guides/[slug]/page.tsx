import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, Info, Lightbulb, ShieldCheck, HelpCircle } from 'lucide-react';
import { getGuideBySlug, getAllGuides } from '@/data/guides';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { getFAQSchema, getHowToSchema, getBreadcrumbSchema } from '@/lib/seo-schemas';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      <div className="container max-w-4xl py-10 md:py-16">
        <Breadcrumbs
          items={[
            { label: 'Guides', href: '/guides' },
            { label: guide.title, href: `/guides/${slug}` },
          ]}
        />

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary" className="capitalize">
            {guide.category}
          </Badge>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
            Expert Verified
          </Badge>
        </div>
        
        <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl text-foreground leading-[1.1] mb-6">
          {guide.title}
        </h1>
        
        <p className="text-lg leading-relaxed text-muted-foreground mb-10 max-w-2xl font-medium">
          {guide.intro}
        </p>

        {/* Quick Answer Box */}
        <Card className="mb-12 border-primary/20 bg-primary/5 shadow-sm overflow-hidden">
          <div className="bg-primary px-6 py-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary-foreground" />
            <h2 className="font-bold text-primary-foreground">Quick Answer & Key Takeaway</h2>
          </div>
          <CardContent className="p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">The Short Answer</h3>
                <p className="text-sm leading-relaxed font-semibold text-foreground">{guide.quickAnswer.summary}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Target Audience</h3>
                  <p className="text-sm font-medium">{guide.quickAnswer.targetAudience}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Key Takeaway</h3>
                  <p className="text-sm font-medium text-primary">{guide.quickAnswer.keyTakeaway}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Step-by-Step Instructions</h2>
          </div>
          <div className="grid gap-6">
            {guide.steps.map((step, i) => (
              <div key={i} className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-black text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Infographic Idea (Mockup) */}
        {guide.infographicIdeas && guide.infographicIdeas.length > 0 && (
          <section className="mb-16">
            {guide.infographicIdeas.map((info, idx) => (
              <Card key={idx} className="border-dashed border-2 border-primary/30 bg-primary/5 mb-6">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Interactive Visual: {info.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 italic">[{info.format}: {info.dataPoints.join(", ")}]</p>
                  <p className="text-xs text-muted-foreground/60">Note: This is a placeholder for a custom infographic asset.</p>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {/* Example Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Real-World Examples</h2>
          </div>
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-6 md:p-8">
            <div className="space-y-4 font-medium text-amber-900/80 italic leading-relaxed whitespace-pre-line">
              {guide.example}
            </div>
          </div>
        </section>

        {/* Comprehensive Analysis Content */}
        {guide.comprehensiveContent && guide.comprehensiveContent.length > 0 && (
          <section className="mb-16 space-y-12">
            {guide.comprehensiveContent.map((section, idx) => (
              <div key={idx} className="prose prose-slate max-w-none">
                <h2 className="text-3xl font-extrabold text-foreground mb-6">{section.title}</h2>
                <div className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Key Concepts */}
        {guide.keyConcepts && guide.keyConcepts.length > 0 && (
          <section className="mb-16">
             <h2 className="text-2xl font-bold tracking-tight mb-6">Expert Concepts to Master</h2>
             <div className="grid gap-4 sm:grid-cols-2">
                {guide.keyConcepts.map((concept, i) => (
                  <div key={i} className="p-5 rounded-xl bg-secondary/30 border border-border">
                    <h3 className="font-bold text-foreground mb-1">{concept.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{concept.description}</p>
                  </div>
                ))}
             </div>
          </section>
        )}

        {/* FAQ Section */}
        {guide.faqs.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-10">
              {guide.faqs.map((faq, i) => (
                <div key={i} className="group">
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trust Signals */}
        <div className="grid gap-6 md:grid-cols-2 mb-16 pt-8 border-t border-border">
           <div className="flex gap-4">
              <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
              <div>
                 <h4 className="text-sm font-bold mb-1 uppercase tracking-wider">Editorial Methodology</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed">{guide.editorialMethodology}</p>
              </div>
           </div>
           <div className="flex gap-4">
              <Info className="h-6 w-6 text-muted-foreground shrink-0" />
              <div>
                 <h4 className="text-sm font-bold mb-1 uppercase tracking-wider">Disclaimer</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed">{guide.disclaimer}</p>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-primary p-8 md:p-12 text-center text-primary-foreground shadow-xl shadow-primary/20 mb-16">
          <p className="text-lg md:text-xl font-bold mb-6 max-w-md mx-auto">{guide.ctaText}</p>
          <Link
            href={guide.ctaLink}
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-primary hover:bg-white/90 transition-all shadow-lg active:scale-95"
          >
            Open Free Calculator <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Related Guides */}
        {guide.relatedGuides.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-8">Continue Reading</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {guide.relatedGuides.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/guides/${rel.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm"
                >
                  <span className="font-bold group-hover:text-primary transition-colors">{rel.title}</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
