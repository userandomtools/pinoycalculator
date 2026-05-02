import * as fs from 'fs';
const file = './data/calculators.ts';
let c = fs.readFileSync(file, 'utf-8');

function addToField(slug: string, field: string, extra: string) {
  const marker = `slug: "${slug}"`;
  const idx = c.indexOf(marker);
  if (idx === -1) return;
  const chunk = c.substring(idx, idx + 10000);
  const re = new RegExp(field + ': "([^"]*)"');
  const m = chunk.match(re);
  if (!m) return;
  c = c.replace(m[0], m[0].slice(0,-1) + " " + extra + '"');
}

addToField("pag-ibig-multi-purpose-loan-calculator", "formulaExplanation", "When comparing MPL with private bank personal loans, consider the total cost difference. A 100,000 peso loan at Pag-IBIG 10.5% for 24 months costs approximately 11,210 pesos in total interest. The same amount at a private bank at 18% diminishing balance costs approximately 19,800 in interest. At a lending app at 24% add-on, total interest could reach 48,000 pesos. This comparison illustrates why government loans should always be explored first before turning to private sector financing options.");

addToField("slovin-formula-calculator", "formulaExplanation", "Understanding the relationship between margin of error and sample size is essential for budget planning in research. Halving the margin of error from 10% to 5% roughly quadruples the required sample size, while reducing from 5% to 2.5% again quadruples it.");

fs.writeFileSync(file, c);
console.log('Final boost done');
