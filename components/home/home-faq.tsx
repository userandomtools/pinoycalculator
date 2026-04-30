'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface HomeFaqProps {
  faqs: { q: string; a: string }[];
}

export function HomeFaq({ faqs }: HomeFaqProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="container py-14">
      <div className="flex items-center gap-2 mb-2 justify-center">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>
      <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
        Common questions about Pinoy Calculator and our free online tools.
      </p>
      <div className="max-w-2xl mx-auto space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-medium">{faq.q}</span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform shrink-0 ml-2 ${
                  openFaq === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openFaq === i && (
              <div className="px-5 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
