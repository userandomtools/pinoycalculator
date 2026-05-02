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

addToField("paracetamol-dosage-calculator", "description", "Filipino parents often ask how much Tempra or Biogesic syrup to give their children during fever episodes. The weight-based calculation method used by pediatricians ensures that the dose is neither too low (ineffective) nor too high (toxic). This calculator is especially useful during dengue season when the DOH recommends paracetamol as the only safe antipyretic, making accurate dosing even more critical for children who may be fighting the virus.");

addToField("paracetamol-dosage-calculator", "philippinesContext", "The Philippine market for paracetamol is dominated by Unilab (Biogesic for adults, Tempra for children), which holds over 50% market share. Generic paracetamol is available at significantly lower prices under the Generics Act (RA 9502) and is required to be offered by all pharmacies. DOH health centers and rural health units distribute paracetamol free of charge to indigent patients. During typhoon seasons and dengue outbreaks, paracetamol is consistently among the top priority medicines distributed through DOH relief operations.");

addToField("home-credit-interest-rate-calculator", "description", "Many first-time Filipino borrowers encounter Home Credit as their introduction to formal consumer financing, and the experience can be either empowering or financially burdensome depending on how well they understand the total cost. This calculator helps bridge that knowledge gap by showing the complete picture upfront.");

addToField("home-credit-interest-rate-calculator", "philippinesContext", "Home Credit has become a gateway financial product for millions of unbanked and underbanked Filipinos. By providing access to installment financing without traditional bank requirements, they serve a market segment that would otherwise rely on informal money lenders or 5-6 lending (where interest rates can exceed 20% monthly). While Home Credit rates are high compared to bank products, they are substantially lower than the predatory lending alternatives that many low-income Filipinos would otherwise face.");

fs.writeFileSync(file, c);
console.log('Boost batch 6 done');
