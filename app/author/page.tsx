import Link from "next/link";
import type { Metadata } from "next";
import { getBreadcrumbSchema } from "@/lib/seo-schemas";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Code, Lightbulb, ArrowRight, Users } from "lucide-react";

const authors = [
  {
    name: "Ziven Borceg",
    slug: "ziven-borceg",
    role: "Web Developer · UI/UX Designer · Content Writer",
    image: "https://lh3.googleusercontent.com/a/ACg8ocK2JtQV1l1rNezpyNQHRyTkvWEcl1Kv85o-oEa3E2E-H0OsWgw=s576-c-no",
    bio: "With a commerce background turned tech builder, Ziven brings a unique problem-solving lens to web development. He specializes in React, Next.js, and Vite — creating fast, SEO-optimized tool-based websites that real people actually use. Beyond code, he writes practical guides on blogging, content strategy, and UI/UX design.",
    tags: ["React & Next.js", "UI/UX Design", "SEO & Content"],
  },
  {
    name: "Ripion Chakma",
    slug: "ripion-chakma",
    role: "Cybersecurity Researcher · Ethical Hacker · Tool Builder",
    image: "https://lh3.googleusercontent.com/a/ACg8ocI7JOIKJOmWA6y-8a9dwPT-a0CyZJRfDwK6I6xw67o6Eqzlx0dgSwwD0JbmaBiEDtS7bM-LBMTTBs91mvnS_UQBGnuVW9U=s576-c-no",
    bio: "A Computer Science graduate driven by one core question: how do digital systems break — and how do we secure them? Ripion combines ethical hacking expertise with hands-on development skills, building open-source security tools and practical projects that solve real technical challenges for the community.",
    tags: ["Cybersecurity", "Ethical Hacking", "Open Source"],
  },
];

export const metadata: Metadata = {
  title: "Meet the Team – Authors Behind Pinoy Calculator",
  description: "Meet Ziven Borceg and Ripion Chakma — the web developer and cybersecurity expert building free, trustworthy calculator tools and guides for Filipinos.",
  alternates: { canonical: "https://pinoycalculator.com/author" }
};

export default function AuthorsIndex() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Authors", url: "/author" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="container py-12 md:py-20 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Users className="h-4 w-4" />
            Our Authors
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Meet the Team Behind Pinoy Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real builders. Real expertise. We create practical digital tools and educational content you can actually trust.
          </p>
        </div>

        {/* Author Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {authors.map((author) => (
            <Card key={author.slug} className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-5">
                  {author.image ? (
                    <img
                      src={author.image}
                      alt={author.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                      {author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground">{author.name}</h2>
                    <p className="text-sm text-muted-foreground">{author.role}</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{author.bio}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {author.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <Button asChild variant="outline" className="w-full group">
                  <Link href={`/author/${author.slug}`}>
                    View Full Profile
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What Problem We Solve */}
        <section className="rounded-2xl bg-card border border-border/50 p-8 md:p-12 mb-16">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            What Problem We Solve
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Functional Development</h3>
              <p className="text-sm text-muted-foreground">We build fast, accessible tools that solve everyday calculation and decision-making needs — no bloat, no ads wall.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Security-First Mindset</h3>
              <p className="text-sm text-muted-foreground">Every tool is built with privacy and security in mind. No data collection, no tracking — just tools that work.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Educational Content</h3>
              <p className="text-sm text-muted-foreground">We pair every tool with practical guides that explain the "why" and "how" — so you don't just calculate, you understand.</p>
            </div>
          </div>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            Pinoy Calculator bridges the gap between functional web development and robust cybersecurity — delivering practical, simple-to-use digital tools and educational content designed for everyday users. We believe useful technology should be free, private, and built by people who actually understand the problems being solved.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">Explore Our Work</h2>
          <p className="text-muted-foreground mb-6">Browse the tools and guides we've built for you.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild><Link href="/all-calculators">Browse Calculators</Link></Button>
            <Button asChild variant="outline"><Link href="/guides">Read Guides</Link></Button>
            <Button asChild variant="outline"><Link href="/contact">Contact Us</Link></Button>
          </div>
        </div>
      </div>
    </>
  );
};
