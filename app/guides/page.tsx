import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Star } from 'lucide-react';
import { getAllGuides } from '@/data/guides';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Best Financial & Salary Guides Philippines 2026 (Free Resources)',
  description: 'Expert-verified computation guides for 13th month pay, VAT, Pag-IBIG MP2, and more. Free authoritative resources for Filipino employees, students, and businesses.',
  alternates: { canonical: 'https://pinoycalculator.com/guides' },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <div className="container max-w-5xl py-12 md:py-20">
      <div className="max-w-2xl mb-12">
        <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20">
          Knowledge Hub
        </Badge>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Authoritative Computation Guides
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Expert-verified walkthroughs and step-by-step tutorials for Philippine labor laws, tax regulations, and academic standards. Designed for clarity, accuracy, and ease of use.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group"
          >
            <Card className="h-full border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg active:scale-[0.98]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       <Badge variant="secondary" className="text-[10px] uppercase font-bold px-2 py-0">
                         {g.category}
                       </Badge>
                       <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                         <Star className="h-3 w-3 fill-current" /> Verified
                       </span>
                    </div>
                    <h2 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug">
                      {g.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {g.metaDescription}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Full Guide <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-20 p-8 rounded-3xl bg-secondary/30 border border-border text-center max-w-3xl mx-auto">
         <h3 className="text-xl font-bold mb-3">Can't find the guide you need?</h3>
         <p className="text-muted-foreground text-sm mb-6">Our editorial team is constantly expanding our knowledge base. Suggest a new computation guide or tutorial and we'll prioritize it for our next update.</p>
         <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-2xl bg-foreground px-8 text-sm font-bold text-background hover:opacity-90 transition-opacity">
           Request a Guide
         </Link>
      </div>
    </div>
  );
}
