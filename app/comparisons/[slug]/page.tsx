import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, X, Info, Lightbulb, TrendingUp, HelpCircle, ShieldCheck, AlertCircle, FileText, LayoutGrid } from 'lucide-react';
import { getAllComparisons, getComparisonBySlug } from '@/data/comparisons';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

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
    <div className="container py-8 md:py-12 max-w-5xl">
      <Breadcrumbs items={[{ label: 'Comparisons', href: '/comparisons' }, { label: comp.title, href: `/comparisons/${slug}` }]} />
      
      {/* 1. SEO Intro Section */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
          {comp.title}
        </h1>
        <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed text-lg">
          <p>{comp.intro}</p>
        </div>
      </div>

      {/* 2. Quick Answer Box */}
      <Card className="mb-12 border-primary/20 bg-primary/5 overflow-hidden shadow-sm">
        <CardHeader className="bg-primary/10 border-b border-primary/10 py-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-primary">
            <Lightbulb className="h-5 w-5" />
            Quick Summary: Best Choice
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-foreground font-medium mb-4 leading-relaxed">
            {comp.quickAnswer.summary}
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Why Compare?</h4>
              <p className="text-sm text-muted-foreground">{comp.quickAnswer.whyCompare}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Factors to Watch</h4>
              <ul className="grid sm:grid-cols-2 gap-2">
                {comp.quickAnswer.factors.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Comparison Table */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-primary" />
            Side-by-Side Comparison
          </h2>
          <Badge variant="outline" className="text-xs uppercase tracking-tighter">Updated May 2026</Badge>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left font-bold text-foreground">Calculator Name</th>
                {comp.featureHeaders.map((h) => (
                  <th key={h} className="px-4 py-4 text-center font-bold text-foreground whitespace-nowrap">{h}</th>
                ))}
                <th className="px-6 py-4 text-center font-bold text-foreground">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comp.items.map((item) => (
                <tr key={item.slug} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/${item.slug}`} className="font-bold text-primary hover:underline block">
                      {item.name}
                    </Link>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono">/{item.slug}</span>
                  </td>
                  {comp.featureHeaders.map((h) => {
                    const val = item.features[h];
                    return (
                      <td key={h} className="px-4 py-4 text-center">
                        {val === true ? (
                          <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3.5 w-3.5 text-green-700" />
                          </div>
                        ) : val === false ? (
                          <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-50">
                            <X className="h-3.5 w-3.5 text-red-400" />
                          </div>
                        ) : (
                          <span className="text-xs font-medium text-foreground">{String(val)}</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 text-center">
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase">
                      {item.features['Verdict'] || 'Recommended'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. How to Choose Section */}
      <div className="mb-16 py-12 border-y border-border">
        <h2 className="text-3xl font-extrabold mb-4">{comp.howToChoose.title}</h2>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-3xl">
          {comp.howToChoose.content}
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {comp.howToChoose.factors.map((f, i) => (
            <Card key={i} className="border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors shadow-none">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px]">{i + 1}</span>
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. Infographic Ideas (Mock Display) */}
      {comp.infographicIdeas.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Visual Guide Insights
          </h2>
          <div className="grid gap-4">
            {comp.infographicIdeas.map((idea, i) => (
              <div key={i} className="p-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 flex flex-col md:flex-row gap-6 items-center">
                <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                   <FileText className="h-10 w-10 text-primary/40" />
                </div>
                <div className="flex-1">
                   <h4 className="font-bold text-lg mb-1 text-primary">{idea.title}</h4>
                   <p className="text-xs text-muted-foreground mb-3 italic">Format: {idea.format}</p>
                   <div className="flex flex-wrap gap-2 mb-3">
                      {idea.dataPoints.map(p => <Badge key={p} variant="outline" className="text-[9px] bg-background">{p}</Badge>)}
                   </div>
                   <p className="text-[10px] text-muted-foreground">Alt Text: {idea.altText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comprehensive Analysis Content */}
      {comp.comprehensiveContent && comp.comprehensiveContent.length > 0 && (
        <section className="mb-16 space-y-12 border-t border-border pt-16">
          {comp.comprehensiveContent.map((section, idx) => (
            <div key={idx} className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-extrabold text-foreground mb-6">{section.title}</h2>
              <div className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 6. FAQ Section */}
      {comp.faqs.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-10">
            {comp.faqs.map((faq, i) => (
              <div key={i} className="group">
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SEO Trust Elements */}
      <div className="mb-16 p-8 rounded-3xl bg-muted/40 border border-border">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Editorial Methodology
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {comp.editorialMethodology}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Important Disclaimer
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              {comp.disclaimer}
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
           <span className="text-[10px] text-muted-foreground">Author: Pinoycalculator team</span>
           <span className="text-[10px] text-muted-foreground">Last Updated: May 2026</span>
        </div>
      </div>

      {/* 8. Conclusion + CTA */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold mb-4">Make Your Next Move with Precision</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The best loan calculator is the one that gives you the confidence to borrow within your means. Explore our full list of tools to find the exact match for your financial goal.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/all-calculators" className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
            Browse All Tools
          </Link>
          <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-8 text-sm font-bold text-foreground transition-all hover:bg-muted active:scale-95">
            Request a Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
