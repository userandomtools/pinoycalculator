'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { CalculatorDefinition } from '@/data/calculators';
import { computeCalculator } from '@/lib/calculator-engine';
import { FinanceCharts } from '@/components/FinanceCharts';

interface CalculatorClientProps {
  calc: CalculatorDefinition;
}

export function CalculatorClient({ calc }: CalculatorClientProps) {
  const [values, setValues] = useState<Record<string, string | number>>({});
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const handleFieldChange = (id: string, value: string | number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleCalculate = () => {
    const merged: Record<string, string | number> = {};
    calc.fields.forEach((f) => {
      merged[f.id] =
        values[f.id] ??
        f.defaultValue ??
        (f.type === 'select' ? f.options?.[0]?.value || '' : '');
    });
    setResults(computeCalculator(calc, merged));
  };

  return (
    <div className="mb-10 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
      <h2 className="mb-6 text-lg font-semibold font-heading">Calculate Now</h2>
      <div className="space-y-4">
        {calc.fields
          .filter((f) => f.type !== 'text')
          .map((field) => (
            <div key={field.id}>
              <label className="mb-1.5 block text-sm font-medium">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  className="calc-input"
                  value={String(
                    values[field.id] ??
                      field.defaultValue ??
                      field.options?.[0]?.value ??
                      ''
                  )}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="relative">
                  {field.prefix && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      {field.prefix}
                    </span>
                  )}
                  <input
                    type="number"
                    className={`calc-input ${field.prefix ? 'pl-8' : ''} ${
                      field.suffix ? 'pr-16' : ''
                    }`}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={values[field.id] ?? field.defaultValue ?? ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  />
                  {field.suffix && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      {field.suffix}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
      <button
        onClick={handleCalculate}
        className="mt-6 w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Calculate
      </button>

      {results && (
        <>
          <FinanceCharts slug={calc.slug} results={results} values={values} />
          
          <div className="calc-result mt-6 animate-fade-in">
            <h3 className="mb-4 text-sm font-semibold text-accent-foreground font-heading">
              Results
            </h3>
            <div className="space-y-3">
              {Object.entries(results).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                >
                  <span className="text-sm text-muted-foreground">{key}</span>
                  <span className="text-sm font-bold text-foreground">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* FAQ Accordion — also a client component */
interface CalculatorFaqProps {
  faqs: { question: string; answer: string }[];
}

export function CalculatorFaq({ faqs }: CalculatorFaqProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  if (faqs.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-medium">{faq.question}</span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform shrink-0 ml-2 ${
                  openFaq === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openFaq === i && (
              <div className="px-5 pb-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
