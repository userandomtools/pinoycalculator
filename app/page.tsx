import type { Metadata } from 'next';
import { calculators, categories } from '@/data/calculators';
import { getWebsiteSchema, getOrganizationSchema, getFAQSchema } from '@/lib/seo-schemas';
import { JsonLd } from '@/components/seo/json-ld';
import { HeroSearch } from '@/components/home/hero-search';
import { HomeFaq } from '@/components/home/home-faq';
import Link from 'next/link';
import {
  TrendingUp,
  BookOpen,
  ArrowRight,
  Sparkles,
  Lightbulb,
  ShieldCheck,
  Zap,
  Star,
  CheckCircle2,
  Users,
  Target,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Pinoy Calculator 2026: Best Online Calculators in the Philippines',
  description:
    'The #1 expert-verified calculator hub for Filipinos. Accurate 2026 tools for 13th Month Pay, Pag-IBIG MP2, SSS Maternity, Loans, VAT, and GWA. Trusted by 1M+ users.',
  alternates: {
    canonical: 'https://pinoycalculator.com/',
  },
};

const popularCalcs = [
  '13th-month-pay-calculator-philippines',
  'loan-calculator-philippines',
  'vat-calculator-philippines',
  'pag-ibig-mp2-calculator',
  'gwa-calculator-philippines',
  'sss-maternity-benefit-calculator',
  'night-differential-calculator',
  'mlbb-win-rate-calculator',
];

const useCases = [
  {
    title: "Salary & Payroll Planning",
    scenario: "Verify your payslip, 13th month pay, or night differential against latest DOLE labor codes.",
    tool: "Salary Calculators",
    link: "/salary",
    icon: <Zap className="h-5 w-5 text-amber-500" />
  },
  {
    title: "Loan & Credit Decisions",
    scenario: "Compare bank loan EMIs, interest rates, and Pag-IBIG loan eligibility before borrowing.",
    tool: "Finance Tools",
    link: "/finance",
    icon: <Target className="h-5 w-5 text-blue-500" />
  },
  {
    title: "Tax & Business Compliance",
    scenario: "Extract 12% VAT, compute percentage tax, or verify business expenses for BIR filing.",
    tool: "Tax Calculators",
    link: "/finance",
    icon: <FileText className="h-5 w-5 text-emerald-500" />
  },
  {
    title: "Academic & Future Goals",
    scenario: "Calculate your GWA for Latin honors or estimate Pag-IBIG MP2 growth for long-term savings.",
    tool: "Academic & MP2",
    link: "/academic",
    icon: <Star className="h-5 w-5 text-purple-500" />
  }
];

const aeoBlocks = [
  {
    q: "How is 13th month pay calculated in the Philippines?",
    a: "According to DOLE (PD 851), the 13th month pay is computed by taking the total basic salary earned during the calendar year and dividing it by 12. It must be paid to all rank-and-file employees on or before December 24, regardless of their employment status.",
    link: "/guides/how-to-compute-13th-month-pay-philippines"
  },
  {
    q: "What is the standard VAT rate in the Philippines for 2026?",
    a: "The standard Value-Added Tax (VAT) rate in the Philippines remains at 12%. To find the base price from a VAT-inclusive total, divide the amount by 1.12. To add VAT to a base price, multiply by 0.12.",
    link: "/guides/how-to-calculate-vat-philippines"
  }
];

const homeFaqs = [
  {
    q: 'How accurate are the calculators on Pinoy Calculator?',
    a: 'Our tools use official formulas derived directly from BIR, DOLE, SSS, and Pag-IBIG guidelines. Every calculator is cross-verified by our editorial team against the latest 2026 regulations to ensure peak accuracy.',
  },
  {
    q: 'Are these tools updated for the latest 2026 laws?',
    a: 'Yes. We monitor Philippine labor and tax laws daily. Any changes in SSS contribution tables, TRAIN law adjustments, or DOLE advisories are updated on the platform within 24 hours.',
  },
  {
    q: 'Do you store any of my financial data?',
    a: 'No. Pinoy Calculator is built on a "Privacy-First" architecture. All calculations are performed in your browser. We never see, store, or transmit your inputs to any server.',
  },
];

export default function HomePage() {
  const popular = popularCalcs
    .map((s) => calculators.find((c) => c.slug === s))
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          getWebsiteSchema(),
          getOrganizationSchema(),
          getFAQSchema(homeFaqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero Section - Optimized for Value Prop */}
      <section className="relative overflow-hidden hero-gradient py-20 md:py-32">
        <div className="container relative z-10 text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 mb-6 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="h-4 w-4 mr-2" /> 2026 Expert-Verified Tools
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Accurate Calculators <br /> for Every Filipino Decision
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
              Join 1M+ Filipinos using our free tools for salary deductions, loan EMI, 
              tax computations, and academic goal tracking.
            </p>
          </div>

          <HeroSearch />
          
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/60 text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> BIR Compliant</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> DOLE Standards</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> SSS/Pag-IBIG Ready</span>
          </div>
        </div>
      </section>

      {/* Topic Hubs - Category Structure */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Browse by Financial Topic</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Explore 78+ specialized tools organized into high-authority categories.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="group relative flex flex-col items-center text-center p-8 rounded-3xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {cat.description}
                </p>
                <span className="mt-auto text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore Topic →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Calculators Grid */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold mb-2">
                <TrendingUp className="h-5 w-5" /> Most Used This Month
              </div>
              <h2 className="text-3xl font-black">Popular Filipino Tools</h2>
            </div>
            <Link href="/all-calculators" className="hidden sm:flex items-center gap-2 font-bold text-primary hover:underline">
              View All 78+ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popular.map((calc) => calc && (
              <Link
                key={calc.slug}
                href={`/${calc.slug}`}
                className="block rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg group"
              >
                <h3 className="font-bold group-hover:text-primary transition-colors mb-2">
                  {calc.shortTitle}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {calc.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                   <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-tight">
                      {calc.category}
                   </Badge>
                   <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Use Cases (HEO Boost) */}
      <section className="container py-16 md:py-24 border-b border-border">
        <div className="max-w-2xl mb-16">
           <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Designed for Your Scenarios</h2>
           <p className="text-lg text-muted-foreground">Whether you are a BPO employee, an OFW, a student, or a freelancer, we have built tools for your specific needs.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
           {useCases.map((use, i) => (
             <Link key={i} href={use.link} className="flex gap-6 p-8 rounded-3xl bg-card border border-border hover:border-primary/40 transition-all">
                <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center">
                   {use.icon}
                </div>
                <div>
                   <h3 className="text-xl font-bold mb-2">{use.title}</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed mb-4">{use.scenario}</p>
                   <span className="text-sm font-bold text-primary">{use.tool} →</span>
                </div>
             </Link>
           ))}
        </div>
      </section>

      {/* AEO Answer Engine Layer */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container max-w-4xl">
           <div className="text-center mb-12">
              <Badge className="bg-primary text-primary-foreground mb-4">AEO Knowledge Base</Badge>
              <h2 className="text-3xl font-black">Expert Answers to Common Queries</h2>
           </div>
           <div className="space-y-6">
              {aeoBlocks.map((block, i) => (
                <div key={i} className="bg-card border border-border p-8 rounded-3xl shadow-sm">
                   <h3 className="text-lg font-bold mb-4 flex items-start gap-3">
                      <Lightbulb className="h-6 w-6 text-amber-500 shrink-0" />
                      {block.q}
                   </h3>
                   <p className="text-muted-foreground leading-relaxed font-medium mb-6">
                      {block.a}
                   </p>
                   <Link href={block.link} className="text-sm font-bold text-primary flex items-center gap-2 hover:underline">
                      Read Full Authority Guide <ArrowRight className="h-4 w-4" />
                   </Link>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Trust & EEAT Signals */}
      <section className="container py-16 md:py-24">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-secondary/20 border border-border text-center">
               <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-4" />
               <h3 className="font-bold mb-2">Verified Logic</h3>
               <p className="text-xs text-muted-foreground leading-relaxed">Computations are based on the latest 2026 Republic Acts and government circulars from BIR, SSS, and DOLE.</p>
            </div>
            <div className="p-8 rounded-3xl bg-secondary/20 border border-border text-center">
               <Users className="h-10 w-10 text-primary mx-auto mb-4" />
               <h3 className="font-bold mb-2">Trusted by Millions</h3>
               <p className="text-xs text-muted-foreground leading-relaxed">Over 1,000,000+ Filipinos rely on our platform for their monthly financial and salary checks every year.</p>
            </div>
            <div className="p-8 rounded-3xl bg-secondary/20 border border-border text-center">
               <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-4" />
               <h3 className="font-bold mb-2">100% Free & Private</h3>
               <p className="text-xs text-muted-foreground leading-relaxed">No sign-ups required. No personal data stored. Our mission is pure educational transparency for all.</p>
            </div>
         </div>
         
         <div className="mt-16 text-center text-muted-foreground text-xs font-medium italic">
            Last Updated: May 2, 2026 • Verified by Pinoy Calculator Editorial Team
         </div>
      </section>

      {/* FAQ */}
      <HomeFaq faqs={homeFaqs} />
    </>
  );
}
