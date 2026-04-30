import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo-schemas";
import {
  Calculator, Code2, Shield, BookOpen, ExternalLink, ArrowRight,
  Wrench, Globe, PenTool, CheckCircle2, Linkedin, Github, Twitter,
  Mail, FileText, Layers, Lock, RefreshCw, Users
} from "lucide-react";

interface AuthorData {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  image: string;
  bio: string[];
  stats: { label: string; value: string; icon: React.ElementType }[];
  trustCards: { icon: React.ElementType; title: string; desc: string }[];
  works: { category: string; items: { title: string; link: string }[] }[];
  socials: { platform: string; url: string; icon: React.ElementType }[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDesc: string;
}

const authors: Record<string, AuthorData> = {
  "ziven-borceg": {
    slug: "ziven-borceg",
    name: "Ziven Borceg",
    role: "Web Developer & Content Strategist",
    tagline: "Building practical web tools that solve real problems — from code to content.",
    image: "https://lh3.googleusercontent.com/a/ACg8ocK2JtQV1l1rNezpyNQHRyTkvWEcl1Kv85o-oEa3E2E-H0OsWgw=s576-c-no",
    metaTitle: "Ziven Borceg – Web Developer & Content Strategist",
    metaDesc: "Meet Ziven Borceg, the web developer and content strategist behind Pinoy Calculator. Building practical tools with React, Next.js, and Vite for real-world use.",
    bio: [
      "Coming from a commerce background, my journey into technology wasn't conventional — but it gave me a unique, problem-solving perspective. What started as a simple curiosity about computers and coding has grown into hands-on expertise in modern web development, particularly working with React, Next.js, and Vite.",
      "I combine this technical foundation with UI/UX design skills and content writing to build highly functional, user-centric web applications. Over time, I've successfully developed, SEO-optimized, and deployed multiple tool-based websites — including platforms like userandom.com, pinoycalculator.com and more.",
      "Beyond building tools, I believe in building in public and sharing what I learn. I regularly document my blogging experience, content writing strategies, and practical tips. Whether you're looking to understand web development or want to follow my tips on effective blogging, you can connect with my journey here and on Medium.",
    ],
    stats: [
      { label: "Tools Built", value: "80+", icon: Calculator },
      { label: "Websites Deployed", value: "5+", icon: Globe },
      { label: "Articles Written", value: "100+", icon: PenTool },
      { label: "Tech Stack Focus", value: "React / Vite", icon: Code2 },
    ],
    trustCards: [
      {
        icon: Wrench,
        title: "Hands-On Builder",
        desc: "Every tool on Pinoy Calculator was designed, coded, and tested personally. No outsourcing, no templates — real code solving real problems.",
      },
      {
        icon: BookOpen,
        title: "Content-First Approach",
        desc: "Each guide and article is written from research and practical experience. The goal is always clarity — not word count or keyword stuffing.",
      },
      {
        icon: Globe,
        title: "Multi-Site Experience",
        desc: "Has built and managed multiple utility websites across different niches, each designed to rank organically and serve real user queries.",
      },
      {
        icon: Layers,
        title: "Full Stack Ownership",
        desc: "From UI design to SEO optimization to deployment — every layer of the product is handled with intention and quality control.",
      },
    ],
    works: [
      {
        category: "Finance & Salary Calculators",
        items: [
          { title: "13th Month Pay Calculator", link: "/calculators/13th-month-pay-calculator" },
          { title: "SSS Maternity Benefit Calculator", link: "/calculators/sss-maternity-benefit-calculator" },
          { title: "Philippine VAT Calculator", link: "/calculators/philippine-vat-calculator" },
          { title: "Night Differential Calculator", link: "/calculators/night-differential-calculator" },
          { title: "Separation Pay Calculator", link: "/calculators/separation-pay-calculator" },
        ],
      },
      {
        category: "Guides & How-To Articles",
        items: [
          { title: "How to Calculate Electricity Bill", link: "/guides/how-to-calculate-electricity-bill" },
          { title: "How to Compute 13th Month Pay", link: "/guides/how-to-compute-13th-month-pay-philippines-calculator" },
          { title: "How to Calculate Back Pay Philippines", link: "/guides/how-to-calculate-back-pay-philippines" },
          { title: "How to Calculate Final Grade", link: "/guides/how-to-calculate-final-grade" },
          { title: "How to Calculate VAT in the Philippines", link: "/guides/how-to-calculate-vat-in-the-philippines" },
        ],
      },
      {
        category: "Academic & Utility Tools",
        items: [
          { title: "GWA Calculator", link: "/calculators/general-weighted-average-calculator" },
          { title: "GPA Calculator Philippines", link: "/calculators/gpa-calculator-philippines" },
          { title: "Cronbach's Alpha Calculator", link: "/calculators/cronbachs-alpha-calculator" },
          { title: "Angel Number Calculator", link: "/calculators/angel-number-calculator" },
          { title: "Age Calculator", link: "/calculators/age-calculator" },
        ],
      },
    ],
    socials: [
      { platform: "Medium", url: "https://medium.com/@zivenborceg", icon: FileText },
      { platform: "LinkedIn", url: "#", icon: Linkedin },
      { platform: "Twitter", url: "#", icon: Twitter },
    ],
    faqs: [
      {
        question: "What is Ziven's role on Pinoy Calculator?",
        answer: "Ziven is the lead developer and content strategist. He designs, builds, and writes every tool and guide on the platform — from the code to the SEO structure to the written content.",
      },
      {
        question: "Does Ziven have formal tech qualifications?",
        answer: "Ziven comes from a commerce background but has built deep, practical expertise in React, Next.js, Vite, and modern web development through years of hands-on project work. His portfolio of deployed websites is proof of real capability.",
      },
      {
        question: "How can I contact Ziven?",
        answer: "You can reach out through the Contact page on Pinoy Calculator, follow his writing on Medium (@zivenborceg), or connect via social media links on this page.",
      },
      {
        question: "Does Ziven write all the content himself?",
        answer: "Yes. All guides, tool descriptions, and articles on Pinoy Calculator are researched and written by Ziven personally. The focus is always on accuracy, clarity, and genuine helpfulness.",
      },
      {
        question: "Can I request Ziven to build a custom tool?",
        answer: "Absolutely. If you have an idea for a calculator or utility tool, reach out through the Contact page. If it serves a genuine user need, there's a good chance it'll get built.",
      },
    ],
  },
  "ripion-chakma": {
    slug: "ripion-chakma",
    name: "Ripion Chakma",
    role: "Cybersecurity Researcher & Developer",
    tagline: "Securing digital systems and building practical tools — one vulnerability at a time.",
    image: "https://lh3.googleusercontent.com/a/ACg8ocI7JOIKJOmWA6y-8a9dwPT-a0CyZJRfDwK6I6xw67o6Eqzlx0dgSwwD0JbmaBiEDtS7bM-LBMTTBs91mvnS_UQBGnuVW9U=s576-c-no",
    metaTitle: "Ripion Chakma – Cybersecurity Researcher & Developer",
    metaDesc: "Meet Ripion Chakma, cybersecurity researcher and developer behind Pinoy Calculator. Building secure, practical tools with a Computer Science foundation.",
    bio: [
      "With a Computer Science background, my journey into cybersecurity started with a simple curiosity: how do digital systems break, and more importantly, how can we secure them?",
      "That core question led me from writing my first lines of code to diving deep into the world of ethical hacking, vulnerability research, and defensive security. I believe in not just finding problems, but also building solutions.",
      "Beyond security research, I actively develop tool-based projects designed to solve practical technical challenges for the blogging and developer community. My work bridges the gap between cybersecurity expertise and real-world utility.",
    ],
    stats: [
      { label: "Security Focus", value: "Ethical Hacking", icon: Shield },
      { label: "Background", value: "Computer Science", icon: Code2 },
      { label: "Open Source Projects", value: "10+", icon: Github },
      { label: "Dev & Security", value: "Dual Focus", icon: Lock },
    ],
    trustCards: [
      {
        icon: Shield,
        title: "Security-First Mindset",
        desc: "Every tool and feature is reviewed with a security lens. From input validation to data handling — nothing leaves the browser without being tested.",
      },
      {
        icon: Code2,
        title: "CS-Trained Developer",
        desc: "With a formal Computer Science degree, Ripion brings structured problem-solving and strong fundamentals to every project he touches.",
      },
      {
        icon: Lock,
        title: "Vulnerability Researcher",
        desc: "Active experience in ethical hacking and vulnerability research means the tools you use here are built with security best practices baked in.",
      },
      {
        icon: RefreshCw,
        title: "Open Source Contributor",
        desc: "Ripion's code is on GitHub for anyone to review. Transparency isn't just a buzzword — it's how trust is built in the security world.",
      },
    ],
    works: [
      {
        category: "Security & Development Projects",
        items: [
          { title: "Open Source Security Tools", link: "https://github.com/ripionck" },
          { title: "Tool-Based Web Projects", link: "/all-calculators" },
        ],
      },
      {
        category: "Calculator Contributions",
        items: [
          { title: "Electrical Load Calculator", link: "/calculators/electrical-load-calculator" },
          { title: "Oxygen Tank Duration Calculator", link: "/calculators/oxygen-tank-duration-calculator" },
          { title: "Ampicillin Dose Calculator", link: "/calculators/ampicillin-dose-calculator" },
          { title: "Paracetamol Dosage Calculator", link: "/calculators/paracetamol-dosage-calculator" },
        ],
      },
    ],
    socials: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/ripionck/", icon: Linkedin },
      { platform: "GitHub", url: "https://github.com/ripionck", icon: Github },
    ],
    faqs: [
      {
        question: "What is Ripion's role on Pinoy Calculator?",
        answer: "Ripion contributes as a developer and security reviewer. He helps build tools, reviews code for vulnerabilities, and ensures the platform follows security best practices.",
      },
      {
        question: "Does Ripion have cybersecurity certifications?",
        answer: "Ripion has a Computer Science degree and active experience in ethical hacking and vulnerability research. His GitHub profile showcases real security-focused projects and contributions.",
      },
      {
        question: "How can I reach Ripion?",
        answer: "You can connect with Ripion on LinkedIn (linkedin.com/in/ripionck) or explore his open-source work on GitHub (github.com/ripionck).",
      },
      {
        question: "Does Ripion review the security of Pinoy Calculator?",
        answer: "Yes. All tools on the platform run calculations entirely in your browser. Ripion ensures no user data is collected, stored, or transmitted — privacy and security are built into the architecture.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(authors).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = authors[slug];
  if (!author) return {};
  return {
    title: author.metaTitle,
    description: author.metaDesc,
    alternates: { canonical: `https://pinoycalculator.com/author/${author.slug}` }
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const author = slug ? authors[slug] : null;

  if (!author) notFound();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: author.name, url: `/author/${author.slug}` },
  ]);

  const faqSchema = getFAQSchema(author.faqs);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: `https://pinoycalculator.com/author/${author.slug}`,
    image: author.image || undefined,
    jobTitle: author.role,
    description: author.tagline,
    sameAs: author.socials.filter(s => s.url !== "#").map(s => s.url),
    worksFor: {
      "@type": "Organization",
      name: "Pinoy Calculator",
      url: "https://pinoycalculator.com",
    },
  };

  const combinedSchema = [breadcrumbSchema, faqSchema, personSchema];

  return (
    <>
      <JsonLd data={combinedSchema} />

      <div className="container py-8 max-w-5xl">
        <Breadcrumbs items={[ { label: "Authors", href: "/author" }, { label: author.name, href: `/author/${author.slug}` } ]} />

        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="mb-6">
            {author.image ? (
              <img
                src={author.image}
                alt={`${author.name} — ${author.role}`}
                className="w-28 h-28 rounded-full mx-auto border-4 border-primary/20 shadow-lg object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-28 h-28 rounded-full mx-auto border-4 border-primary/20 shadow-lg bg-muted flex items-center justify-center">
                <Users className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            {author.name}
          </h1>
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
            {author.role}
          </Badge>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {author.tagline}
          </p>

          {/* Social Links - Hero */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {author.socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
              >
                <s.icon className="h-4 w-4" />
                {s.platform}
              </a>
            ))}
          </div>
        </section>

        {/* Credibility Stats */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            At a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {author.stats.map((stat) => (
              <Card key={stat.label} className="text-center border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-extrabold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            About {author.name.split(" ")[0]}
          </h2>
          <Card className="border-border/60 shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-4">
              {author.bio.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Why Trust Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Why Trust {author.name.split(" ")[0]}?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {author.trustCards.map((card) => (
              <Card key={card.title} className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-accent shrink-0">
                      <card.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Work / Articles Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Work & Contributions
          </h2>
          <div className="space-y-6">
            {author.works.map((group) => (
              <Card key={group.category} className="border-border/60 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    {group.category}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {group.items.map((item) => {
                      const isExternal = item.link.startsWith("http");
                      return isExternal ? (
                        <a
                          key={item.title}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent/60 transition-colors group text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-foreground group-hover:text-accent-foreground transition-colors">
                            {item.title}
                          </span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto shrink-0" />
                        </a>
                      ) : (
                        <Link
                          key={item.title}
                          href={item.link}
                          className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent/60 transition-colors group text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-foreground group-hover:text-accent-foreground transition-colors">
                            {item.title}
                          </span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Card className="border-border/60 shadow-sm">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {author.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Final CTA */}
        <section className="text-center rounded-2xl bg-accent/40 border border-border/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Explore What We've Built
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Browse 80+ free calculators, in-depth guides, and comparison tools — all built to help you get quick, accurate answers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/all-calculators">
                <Calculator className="h-4 w-4 mr-2" />
                Browse All Tools
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                <Mail className="h-4 w-4 mr-2" />
                Get in Touch
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};
