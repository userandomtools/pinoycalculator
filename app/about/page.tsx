import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Pinoy Calculator – Free Online Calculators for Filipinos",
  description: "Pinoy Calculator offers 80+ free calculators built for Filipinos. Finance, salary, academic, gaming tools — fast, private, and accurate. Learn what we do and why.",
};

import Link from "next/link";
import { Calculator, Zap, Shield, Users, Target, ArrowRight, CheckCircle2, ExternalLink, BookOpen, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/seo-schemas";

const trustPoints = [
  { icon: Calculator, label: "80+ Free Tools", desc: "Finance, salary, academic, gaming & more" },
  { icon: Users, label: "Built for Filipinos", desc: "Philippine laws, rates & regulations" },
  { icon: Zap, label: "Instant Results", desc: "No sign-up, no ads, no waiting" },
];

const whyTrustCards = [
  {
    icon: Zap,
    title: "Fast by Default",
    desc: "Every tool loads instantly. No bloated scripts, no pop-ups, no cookie walls. You open a page, you get your answer.",
  },
  {
    icon: Shield,
    title: "Privacy Friendly",
    desc: "We don't collect personal data. Calculations happen in your browser — nothing is sent to a server. Your numbers stay yours.",
  },
  {
    icon: Target,
    title: "Built for Real Usage",
    desc: "Each calculator is designed around actual questions Filipinos ask — from 13th month pay to SSS benefits to gaming stats.",
  },
  {
    icon: BookOpen,
    title: "Clear & Simple Design",
    desc: "No confusing interfaces. Input your numbers, see the breakdown. Every tool includes step-by-step explanations so you understand the math.",
  },
];

const faqs = [
  {
    question: "Is Pinoy Calculator completely free?",
    answer: "Yes, 100% free. Every calculator, guide, and comparison on the site is available without any payment, subscription, or sign-up required. We believe essential calculation tools should be accessible to everyone.",
  },
  {
    question: "Do you store my data or personal information?",
    answer: "No. All calculations run directly in your browser. We don't send your numbers to any server, and we don't collect personal information. There are no accounts, no tracking of individual usage, and no data selling — ever.",
  },
  {
    question: "Can I request a new calculator or tool?",
    answer: "Absolutely! We actively build new tools based on what Filipinos are searching for and requesting. If you need a specific calculator, head to our Contact page and send us a message. Many of our tools were built because someone asked.",
  },
  {
    question: "Is the site mobile friendly?",
    answer: "Yes. Every page is designed mobile-first. Whether you're on a phone, tablet, or desktop, the calculators adapt to your screen size. Most of our users access the site from mobile devices, so we optimize for that experience first.",
  },
  {
    question: "How often do you add new content?",
    answer: "We publish new calculators and guides regularly — typically several new tools per month. We prioritize tools based on search demand and user requests. Our guides are also updated when Philippine regulations change (tax rates, SSS contributions, etc.).",
  },
];

const About = () => {
  const faqSchema = getFAQSchema(faqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
    {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/30 py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Calculator className="h-4 w-4" />
              Free tools for every Filipino
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-5 leading-tight">
              The Calculators You Actually Need
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              No sign-ups. No ads. No nonsense. Just fast, accurate calculators built specifically for Philippine laws, rates, and everyday life.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            {trustPoints.map((tp) => (
              <Card key={tp.label} className="border-border/60 shadow-sm hover:shadow-md transition-shadow bg-card">
                <CardContent className="flex flex-col items-center text-center p-5 gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <tp.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-bold text-foreground text-sm">{tp.label}</span>
                  <span className="text-xs text-muted-foreground">{tp.desc}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="gap-2 rounded-xl px-8 text-base font-semibold">
              <Link href="/all-calculators">
                Browse All Calculators <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">What Pinoy Calculator Does</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Pinoy Calculator is a collection of <strong className="text-foreground">80+ free online calculators</strong> designed for Filipinos. Each tool is purpose-built to answer a specific question — from computing your 13th month pay to figuring out your SSS maternity benefit, from calculating your GWA to estimating construction labor costs.
            </p>
            <p>
              Beyond calculators, we publish <strong className="text-foreground">in-depth guides</strong> that explain the formulas, laws, and regulations behind each tool. We also offer <strong className="text-foreground">side-by-side comparisons</strong> of financial products like bank loans, salary packages, and government benefits.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { label: "Finance & Loan Calculators", desc: "VAT, income tax, loan amortization, time deposit interest" },
              { label: "Salary & Employment Tools", desc: "13th month pay, back pay, night differential, daily wage" },
              { label: "Academic Calculators", desc: "GWA, GPA, final grade, Cronbach's alpha" },
              { label: "Gaming & Specialty Tools", desc: "MLBB win rate, Nether portal, angel numbers, engine displacement" },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 items-start rounded-xl border border-border bg-card p-4">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-foreground text-sm">{item.label}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Built This */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">Why We Built This</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Most calculator websites are either generic (designed for a US audience), packed with ads, or just plain confusing. If you've ever searched "how to compute 13th month pay" and landed on a page that made you <em>more</em> confused, you know the problem.
            </p>
            <p>
              We built Pinoy Calculator because Filipino workers, students, and business owners deserve tools that <strong className="text-foreground">actually match Philippine regulations</strong>. Tools that reference DOLE, BIR, SSS, and Pag-IBIG — not generic formulas from another country.
            </p>
            <p>
              Every calculator is designed to load fast, work on any device, and give you a clear answer in seconds. No "please sign up first." No "download our app." Just open the page, type your numbers, and get your result.
            </p>
          </div>
        </div>
      </section>

      {/* Why Users Trust Us */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Why Users Trust Us</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              We don't just build calculators — we build them the right way.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {whyTrustCards.map((card) => (
              <Card key={card.title} className="border-border/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-card">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">Our Approach</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Every page on Pinoy Calculator is a <strong className="text-foreground">dedicated tool</strong>, not a generic multi-purpose widget. When you search for "SSS maternity benefit calculator," you land on a page built specifically for that — with the right inputs, the correct formula, and a detailed explanation of how SSS computes your benefit.
            </p>
            <p>
              We structure each tool page with the calculator at the top, followed by formula breakdowns, step-by-step examples, and an FAQ section. This isn't just for SEO — it's because people genuinely want to understand the math behind their results.
            </p>
            <p>
              Our guides go deeper. Each article walks you through the process with real numbers, references to official government sources, and practical tips you won't find on generic how-to sites.
            </p>
          </div>
        </div>
      </section>

      {/* Author / Team Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 text-center">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Ziven */}
            <Link href="/author/ziven-borceg" className="group">
              <div className="rounded-2xl border border-border bg-card p-6 text-center hover:shadow-md transition-shadow h-full">
                <img
                  src="https://lh3.googleusercontent.com/a/ACg8ocK2JtQV1l1rNezpyNQHRyTkvWEcl1Kv85o-oEa3E2E-H0OsWgw=s576-c-no"
                  alt="Ziven Borceg — Web Developer & Content Strategist"
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-primary/20 object-cover"
                />
                <h3 className="text-lg font-bold text-foreground mb-1">Ziven Borceg</h3>
                <p className="text-sm text-primary font-medium mb-3">Web Developer & Content Strategist</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Builds and writes every tool and guide on Pinoy Calculator. React, Next.js, Vite — from code to content.
                </p>
                <span className="text-sm font-medium text-primary group-hover:underline inline-flex items-center gap-1">
                  View Full Profile <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
            {/* Ripion */}
            <Link href="/author/ripion-chakma" className="group">
              <div className="rounded-2xl border border-border bg-card p-6 text-center hover:shadow-md transition-shadow h-full">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-primary/20 bg-muted flex items-center justify-center">
                  <Shield className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">Ripion Chakma</h3>
                <p className="text-sm text-primary font-medium mb-3">Cybersecurity Researcher & Developer</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Ensures every tool follows security best practices. CS background with ethical hacking expertise.
                </p>
                <span className="text-sm font-medium text-primary group-hover:underline inline-flex items-center gap-1">
                  View Full Profile <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-5 data-[state=open]:shadow-sm">
                <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Ready to Calculate?</h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto">
            Pick a calculator, get your answer, and move on with your day. It's that simple.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 rounded-xl px-8 text-base font-semibold">
              <Link href="/all-calculators">
                Explore All Tools <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 rounded-xl px-8 text-base font-semibold">
              <Link href="/guides">
                Read Guides <BookOpen className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
