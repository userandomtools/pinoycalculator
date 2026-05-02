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

addToField("co-amoxiclav-pediatric-dose-calculator", "formulaExplanation", "In cases where a child has poor renal function, the doctor will likely prescribe a lower dose or extend the interval between doses (e.g., every 24 hours instead of every 12 hours) to prevent the drug from accumulating to toxic levels in the body. Always double-check the concentration on the box before calculating.");
addToField("pack-per-year-calculator", "formulaExplanation", "For individuals who smoke irregularly, estimating an average daily consumption over a given period is acceptable. For example, if you smoked only on weekends, estimating an average of 3 cigarettes per day across the entire year is a practical way to compute your ongoing pack-year accumulation for clinical reporting.");
addToField("pack-per-year-calculator", "description", "While quitting smoking is the ultimate goal, quantifying the past damage is equally important. The pack-year calculator removes the ambiguity from smoking history, replacing vague descriptions like 'I smoked for a while' with hard, clinical data. This precise language allows for better communication with specialists, ensuring that your medical file accurately reflects your true risk profile, and helps doctors customize your long-term health monitoring plan.");
addToField("vo2-max-calculator", "formulaExplanation", "It is important to remember that these estimation formulas assume a baseline level of healthy physiological function. Factors such as severe dehydration, extreme heat, or a lack of sleep can artificially elevate your heart rate during the tests, leading to a mathematically lower (and inaccurate) VO2 Max estimation for that specific day. Ensure you test under normal, rested conditions.");
addToField("waist-to-hip-ratio-calculator", "formulaExplanation", "If your weight fluctuates frequently, it is recommended to track your WHR over several months rather than relying on a single measurement. Minor changes in bloating or hydration can slightly alter your waist measurement on any given day. Taking an average WHR over a few weeks provides a much more reliable indicator of your true fat distribution and metabolic risk.");

fs.writeFileSync(file, c);
console.log('Boost batch 9b done');
