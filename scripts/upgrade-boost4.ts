import * as fs from 'fs';
const file = './data/calculators.ts';
let c = fs.readFileSync(file, 'utf-8');

function addToField(slug: string, field: string, extra: string) {
  const marker = `slug: "${slug}"`;
  const idx = c.indexOf(marker);
  if (idx === -1) { console.log("NOT FOUND: " + slug); return; }
  const chunk = c.substring(idx, idx + 10000);
  const re = new RegExp(field + ': "([^"]*)"');
  const m = chunk.match(re);
  if (!m) { console.log("FIELD NOT FOUND: " + field + " in " + slug); return; }
  c = c.replace(m[0], m[0].slice(0,-1) + " " + extra + '"');
}

addToField("pag-ibig-multi-purpose-loan-calculator", "description", "For employees earning minimum wage or slightly above, the Pag-IBIG MPL may be the only accessible formal loan option since private banks often require minimum monthly income of 15,000 to 25,000 pesos. The MPL bridges this gap by using contribution history rather than income thresholds as the primary eligibility criterion. Self-employed individuals and voluntary Pag-IBIG members also qualify, making it one of the most inclusive lending programs in the Philippine financial system. The automatic payroll deduction mechanism ensures high repayment rates and protects members from falling into arrears.");

addToField("pag-ibig-multi-purpose-loan-calculator", "philippinesContext", "As of recent years, Pag-IBIG has processed millions of MPL applications annually, with total loan releases reaching tens of billions of pesos. The fund maintains a dedicated online portal (Virtual Pag-IBIG) where members can check their Total Accumulated Value, verify contribution records, and track loan application status. For members in areas hit by natural disasters, the Pag-IBIG calamity loan provides emergency financing at a reduced 5.95% interest rate with expedited processing. This special variant has been activated during typhoons, earthquakes, and the COVID-19 pandemic, providing critical financial support when members need it most.");

addToField("slovin-formula-calculator", "description", "Many Filipino thesis students struggle with the methodology chapter, particularly in justifying their sample size. Using this calculator eliminates manual computation errors and provides a defensible number for your thesis panel presentation. The tool also helps research advisors quickly verify student computations. For survey-based studies with populations ranging from 100 to 100,000, this formula provides a reliable starting point that most Philippine academic institutions accept without additional justification beyond stating your chosen margin of error.");

addToField("slovin-formula-calculator", "philippinesContext", "The formula appears in nearly every Philippine research methodology textbook including those published by Rex Book Store and C and E Publishing. CHED memoranda on research standards do not mandate a specific sampling formula but require students to provide statistical justification for their sample size. This formula satisfies that requirement with minimal complexity. For mixed-methods research common in Philippine graduate programs, the quantitative component uses this or Cochran formula while the qualitative component relies on theoretical saturation, typically involving 15-30 key informants depending on the research design and data richness achieved during interviews and focus group discussions.");

fs.writeFileSync(file, c);
console.log('Boost complete');
