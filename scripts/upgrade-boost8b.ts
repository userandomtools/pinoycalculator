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

addToField("afpslai-loan-calculator", "formulaExplanation", "Unlike many consumer loans that heavily front-load interest payments, AFPSLAI’s diminishing balance computation ensures that a fair portion of your early payments actually goes toward reducing the principal. This method is particularly beneficial if you decide to pre-terminate the loan, as you will not be penalized with unearned interest charges. Always request an official computation from an AFPSLAI branch before signing your loan documents to confirm these figures.");
addToField("eastwest-personal-loan-calculator", "formulaExplanation", "It is also important to factor in the Documentary Stamp Tax (DST), a government-mandated tax applied to loans above a certain threshold or for specific purposes. While DST might seem like a minor charge, it reduces the net proceeds you receive from the bank. By calculating the gross monthly amortization along with estimating upfront deductions, borrowers can ensure they apply for an adequate gross loan amount to cover their actual cash needs after all bank fees are subtracted.");

fs.writeFileSync(file, c);
console.log('Boost batch 8b done');
