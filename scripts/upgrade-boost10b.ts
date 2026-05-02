import * as fs from 'fs';
const file = './data/calculators.ts';
let c = fs.readFileSync(file, 'utf-8');

function addToField(slug: string, field: string, extra: string) {
  const marker = `slug: "${slug}"`;
  const idx = c.indexOf(marker);
  if (idx === -1) return;
  const chunk = c.substring(idx, idx + 12000);
  const re = new RegExp(field + ': "([^"]*)"');
  const m = chunk.match(re);
  if (!m) return;
  c = c.replace(m[0], m[0].slice(0,-1) + " " + extra + '"');
}

addToField("cronbachs-alpha-calculator", "formulaExplanation", "If you are using raw, unstandardized data where the items have vastly different scales (for example, one question asks for an age in years while another asks for a 1-5 rating), the standard alpha formula will be mathematically distorted. In such cases, the data must first be standardized into Z-scores before the reliability calculation is performed to ensure an accurate reliability coefficient.");
addToField("dlsu-gpa-calculator", "formulaExplanation", "Remember that withdrawing from a course (W) does not affect the calculation, as those units are completely dropped from the divisor. However, excessive withdrawals may impact your eligibility for certain honors or college-specific awards, so it is always best to consult your academic adviser before officially dropping a subject.");
addToField("gaussian-elimination-calculator", "formulaExplanation", "It is worth noting that while Gaussian elimination is incredibly powerful, it can suffer from numerical instability when implemented in computer floating-point arithmetic. Very small pivot elements can cause massive rounding errors that snowball through the remaining calculations. This is why professional solvers always employ partial or full pivoting techniques to stabilize the mathematical matrix.");

fs.writeFileSync(file, c);
console.log('Boost batch 10b done');
