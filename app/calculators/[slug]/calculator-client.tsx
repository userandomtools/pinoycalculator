'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { CalculatorDefinition } from '@/data/calculators';
import { computeCalculator } from '@/lib/calculator-engine';
import { FinanceCharts } from '@/components/FinanceCharts';
import { Plus, Trash2 } from 'lucide-react';

interface GradeRow {
  subject: string;
  grade: string;
  units: string;
}

function GradeTableField({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  const [rows, setRows] = useState<GradeRow[]>(() => {
    try {
      return value ? JSON.parse(value) : [{ subject: '', grade: '', units: '' }];
    } catch {
      return [{ subject: '', grade: '', units: '' }];
    }
  });

  const updateRow = (index: number, field: keyof GradeRow, val: string) => {
    const newRows = [...rows];
    newRows[index][field] = val;
    setRows(newRows);
    onChange(JSON.stringify(newRows));
  };

  const addRow = () => {
    const newRows = [...rows, { subject: '', grade: '', units: '' }];
    setRows(newRows);
    onChange(JSON.stringify(newRows));
  };

  const removeRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    if (newRows.length === 0) newRows.push({ subject: '', grade: '', units: '' });
    setRows(newRows);
    onChange(JSON.stringify(newRows));
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        <div className="col-span-5">Subject</div>
        <div className="col-span-3 text-center">Grade</div>
        <div className="col-span-3 text-center">Units</div>
        <div className="col-span-1"></div>
      </div>
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-5">
            <input type="text" className="calc-input text-sm px-3 py-2" placeholder="Subject (opt)" value={row.subject} onChange={e => updateRow(i, 'subject', e.target.value)} />
          </div>
          <div className="col-span-3">
            <input type="number" className="calc-input text-sm px-3 py-2 text-center" placeholder="1.0" step="0.01" value={row.grade} onChange={e => updateRow(i, 'grade', e.target.value)} />
          </div>
          <div className="col-span-3">
            <input type="number" className="calc-input text-sm px-3 py-2 text-center" placeholder="3" step="0.5" value={row.units} onChange={e => updateRow(i, 'units', e.target.value)} />
          </div>
          <div className="col-span-1 flex justify-end">
            <button type="button" onClick={() => removeRow(i)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Remove row">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addRow} className="mt-2 flex items-center text-sm font-medium text-primary hover:underline">
        <Plus className="w-4 h-4 mr-1" /> Add Subject
      </button>
    </div>
  );
}

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
              {field.type === 'grade-table' ? (
                <GradeTableField
                  id={field.id}
                  value={String(values[field.id] || '')}
                  onChange={(v) => handleFieldChange(field.id, v)}
                />
              ) : field.type === 'select' ? (
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
