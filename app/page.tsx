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
  Cog,
  Grid3X3,
  BarChart3,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Online Calculators for Filipinos',
  description:
    'Free calculators for loans, salary, gaming stats, health metrics, and financial planning in the Philippines. Smart Calculators for Filipinos.',
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
  'mlbb-win-rate-calculator',
  'night-differential-calculator',
  'sss-maternity-benefit-calculator',
];

const guides = [
  {
    title: 'How to Compute 13th Month Pay in the Philippines',
    slug: 'how-to-compute-13th-month-pay-philippines',
  },
  { title: 'How Pag-IBIG MP2 Savings Works', slug: 'pag-ibig-mp2-savings-guide' },
  {
    title: 'How to Calculate GWA for College Students',
    slug: 'how-to-compute-gwa-college',
  },
  {
    title: 'How to Calculate VAT in the Philippines',
    slug: 'how-to-calculate-vat-philippines',
  },
  {
    title: 'How to Calculate Night Differential Pay',
    slug: 'how-to-calculate-night-differential',
  },
];

const formulas = [
  { title: '13th Month Pay', formula: 'Total Basic Salary ÷ 12', desc: 'Based on DOLE PD 851' },
  {
    title: 'Loan Amortization',
    formula: 'P × [r(1+r)ⁿ] / [(1+r)ⁿ – 1]',
    desc: 'Standard diminishing balance',
  },
  { title: 'VAT Computation', formula: 'Amount × 12%', desc: 'BIR standard rate' },
];

const categoryIcons: Record<string, string> = {
  finance: '💰',
  salary: '💼',
  gaming: '🎮',
  academic: '🎓',
  health: '❤️',
  crypto: '₿',
  engineering: '⚙️',
  utilities: '🔧',
};

const whyReasons = [
  {
    icon: '⚡',
    title: 'Instant Results',
    desc: 'Get accurate computations in seconds — no manual math needed.',
  },
  {
    icon: '🇵🇭',
    title: 'Philippines-Focused',
    desc: 'Built with Filipino tax rates, laws, and financial rules in mind.',
  },
  {
    icon: '📱',
    title: 'Works on Any Device',
    desc: 'Use on your phone, tablet, or desktop — no app download required.',
  },
  {
    icon: '🆓',
    title: '100% Free',
    desc: 'All calculators are completely free with no hidden charges or sign-ups.',
  },
];

const howSteps = [
  {
    step: '1',
    title: 'Choose a Calculator',
    desc: 'Browse categories or search for the tool you need — finance, salary, gaming, academic, and more.',
  },
  {
    step: '2',
    title: 'Enter Your Values',
    desc: 'Fill in the required fields with your data. Each calculator shows clear labels and examples.',
  },
  {
    step: '3',
    title: 'Get Instant Results',
    desc: 'Click Calculate and see your results immediately. Charts and breakdowns are shown for finance tools.',
  },
];

const homeFaqs = [
  {
    q: 'Are these calculators accurate?',
    a: 'Yes. Our calculators use official formulas from DOLE, BIR, SSS, Pag-IBIG, and other Philippine government agencies. We regularly verify our computations against official guidelines.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. All calculators on Pinoy Calculator are completely free and require no registration or sign-up.',
  },
  {
    q: 'Are these calculators designed for the Philippines?',
    a: 'Absolutely. Every calculator uses Philippine-specific rates, laws, and standards — from 12% VAT to DOLE\'s 13th month pay formula.',
  },
  {
    q: 'Can I use these on my phone?',
    a: 'Yes. Pinoy Calculator is fully responsive and works perfectly on smartphones, tablets, and desktop computers.',
  },
  {
    q: 'How often are calculators updated?',
    a: 'We regularly update our calculators to reflect the latest Philippine tax rates, government policies, and financial regulations.',
  },
  {
    q: 'What categories of calculators do you have?',
    a: 'We offer Finance, Salary, Gaming, Academic, Health, Crypto, Engineering, and Utility calculators — all tailored for Filipino users.',
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

      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm px-4 py-1.5 mb-6 text-sm font-medium text-primary-foreground">
              <Sparkles className="h-4 w-4" /> Smart Calculators for Filipinos
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-4 leading-tight">
              Best Online Calculators
              <br className="hidden sm:block" /> for Filipinos
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-4">
              Free calculators for loans, salary, gaming stats, health metrics, and financial
              planning in the Philippines.
            </p>
            <p className="text-primary-foreground/60 text-sm max-w-xl mx-auto mb-8">
              {calculators.length}+ calculators • {categories.length} categories • Updated for 2026
            </p>
          </div>

          <HeroSearch />
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="container py-14">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Popular Calculators</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popular.map(
            (calc) =>
              calc && (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  className="block rounded-xl border border-border bg-card p-5 card-elevated group animate-fade-in"
                >
                  <div className="text-2xl mb-3">{categoryIcons[calc.category]}</div>
                  <h3 className="font-heading text-sm font-semibold group-hover:text-primary transition-colors">
                    {calc.shortTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {calc.description.slice(0, 80)}...
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Calculate now <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              )
          )}
        </div>
      </section>

      {/* Why Online Calculators */}
      <section className="bg-muted/50 py-14">
        <div className="container">
          <div className="flex items-center gap-2 mb-2 justify-center">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Why Use Online Calculators?</h2>
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Pinoy Calculator helps Filipinos make smarter financial, academic, and lifestyle
            decisions with instant, accurate computations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyReasons.map((r) => (
              <div key={r.title} className="rounded-xl border border-border bg-card p-5 h-full animate-fade-in">
                <div className="text-2xl mb-3">{r.icon}</div>
                <h3 className="font-heading text-sm font-semibold mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Calculators Work */}
      <section className="container py-14">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <Cog className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">How Our Calculators Work</h2>
        </div>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          It&apos;s as easy as 1-2-3. No sign-ups, no downloads, no fees.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {howSteps.map((s) => (
            <div key={s.step} className="text-center animate-fade-in">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="font-heading text-sm font-semibold mb-2">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted/50 py-14">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 text-center">Calculator Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const count = calculators.filter((c) => c.category === cat.id).length;
              return (
                <Link
                  key={cat.id}
                  href={`/calculators/${cat.slug}`}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 card-elevated group animate-fade-in"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent">
                    <Icon className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                    <span className="text-xs font-medium text-primary mt-2 inline-block">
                      {count} calculators →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Formulas */}
      <section className="container py-14">
        <h2 className="text-2xl font-bold mb-8">Trending Formulas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {formulas.map((f) => (
            <div key={f.title} className="formula-box">
              <h3 className="font-heading text-sm font-semibold mb-2">{f.title}</h3>
              <div className="rounded-lg bg-card border border-border px-4 py-3 font-mono text-sm text-primary font-semibold mb-2">
                {f.formula}
              </div>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Guides */}
      <section className="bg-muted/50 py-14">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Featured Guides</h2>
            </div>
            <Link
              href="/guides"
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 card-elevated group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <BookOpen className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold group-hover:text-primary transition-colors">
                    {g.title}
                  </h3>
                  <span className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                    Read guide <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools Section */}
      <section className="container py-14">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Grid3X3 className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">All Calculators</h2>
          </div>
          <Link
            href="/all-calculators"
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
          >
            View all {calculators.length}+ tools <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {calculators.slice(0, 12).map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 card-elevated group animate-fade-in"
            >
              <div className="text-lg">{categoryIcons[calc.category] || '🔧'}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                  {calc.shortTitle}
                </h3>
                <span className="text-xs text-muted-foreground capitalize">{calc.category}</span>
              </div>
              <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/all-calculators"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Browse All {calculators.length}+ Calculators <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Comparisons CTA */}
      <section className="bg-muted/50 py-14">
        <div className="container">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Compare Calculators</h2>
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
            Not sure which calculator to use? Check our side-by-side comparisons of the best tools
            for loans, salary, and finance.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/comparisons/best-loan-calculators-philippines"
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium card-elevated hover:text-primary transition-colors"
            >
              Best Loan Calculators →
            </Link>
            <Link
              href="/comparisons/best-salary-calculators-philippines"
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium card-elevated hover:text-primary transition-colors"
            >
              Best Salary Calculators →
            </Link>
            <Link
              href="/comparisons/best-finance-calculators-philippines"
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium card-elevated hover:text-primary transition-colors"
            >
              Best Finance Calculators →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <HomeFaq faqs={homeFaqs} />
    </>
  );
}
