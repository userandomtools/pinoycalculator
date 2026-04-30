import { calculators, categories } from '../data/calculators';
import { getTaxonomyMeta } from '../data/content-taxonomy';
import { computeCalculator } from '../lib/calculator-engine';
import * as fs from 'fs';

interface AuditResult {
  slug: string;
  category: string;
  status: 'working' | 'partially-working' | 'broken' | 'placeholder' | 'thin' | 'seo-incomplete';
  issues: string[];
}

const audit: AuditResult[] = [];

for (const calc of calculators) {
  const issues: string[] = [];
  
  // 1. Check metadata
  if (!calc.title || calc.title.length < 5) issues.push('Missing/short title');
  if (!calc.metaDescription || calc.metaDescription.length < 20) issues.push('Missing/short metaDescription');
  
  // 2. Check functionality basics
  if (!calc.fields || calc.fields.length === 0) issues.push('No input fields defined');
  
  // 3. Check SEO/Content blocks
  if (!calc.formula || calc.formula.length < 3) issues.push('Missing formula');
  if (!calc.formulaExplanation || calc.formulaExplanation.length < 10) issues.push('Missing formulaExplanation');
  if (!calc.exampleCalculation || calc.exampleCalculation.length < 10) issues.push('Missing exampleCalculation');
  if (!calc.philippinesContext || calc.philippinesContext.length < 10) issues.push('Missing philippinesContext');
  if (!calc.faqs || calc.faqs.length === 0) issues.push('Missing FAQs');
  
  // Try computing with dummy data
  try {
    const dummyInputs: Record<string, string> = {};
    for (const f of calc.fields) {
      if (f.type === 'number') {
        dummyInputs[f.id] = '10';
      } else if (f.type === 'select') {
        dummyInputs[f.id] = f.options?.[0]?.value || '';
      } else if (f.type as any === 'checkbox') {
        dummyInputs[f.id] = 'false';
      } else if (f.type === 'grade-table') {
        dummyInputs[f.id] = JSON.stringify([{ subject: 'Math', grade: '1.0', units: '3' }, { subject: 'English', grade: '1.5', units: '3' }]);
      }
    }
    const result = computeCalculator(calc, dummyInputs);
    if (!result || Object.keys(result).length === 0) {
      issues.push('Compute logic returns empty result');
    } else if (result.result === "Calculator not implemented yet.") {
      issues.push('Compute logic is not implemented');
    }
  } catch (err: any) {
    issues.push(`Compute error: ${err.message}`);
  }

  // Taxonomy check
  const taxonomy = getTaxonomyMeta('calculator', calc.slug);
  if (!taxonomy || taxonomy.tags.length === 0) issues.push('Missing taxonomy tags');

  // Classification
  let status: AuditResult['status'] = 'working';
  
  if (issues.length > 5) {
    status = 'placeholder';
  } else if (issues.some(i => i.includes('Compute') || i.includes('No input') || i.includes('not implemented'))) {
    status = 'broken';
  } else if (issues.some(i => i.includes('Missing formula') || i.includes('Missing/short title'))) {
    status = 'thin';
  } else if (issues.length > 0) {
    status = 'seo-incomplete';
  }

  audit.push({
    slug: calc.slug,
    category: calc.category,
    status,
    issues
  });
}

const report = {
  total: calculators.length,
  working: audit.filter(a => a.status === 'working').length,
  broken: audit.filter(a => a.status === 'broken').length,
  placeholder: audit.filter(a => a.status === 'placeholder').length,
  thin: audit.filter(a => a.status === 'thin').length,
  seoIncomplete: audit.filter(a => a.status === 'seo-incomplete').length,
  details: audit
};

fs.writeFileSync('audit-report.json', JSON.stringify(report, null, 2));
console.log('Audit complete. Check audit-report.json');
