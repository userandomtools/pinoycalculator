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

addToField("landbank-salary-loan-calculator", "description", "Landbank also offers specialized loan products for government employees including emergency loans during calamities, educational assistance loans, and livelihood loans for retiring personnel. The competitive interest rates reflect the government mandate to provide affordable financial services to public servants who form the backbone of national governance. For teachers especially, Landbank salary loans have become essential for managing classroom expenses, continuing education costs, and family obligations.");

addToField("landbank-salary-loan-calculator", "philippinesContext", "The Department of Education has the largest workforce in the Philippine government with over 800,000 teaching and non-teaching personnel, most of whom receive salaries through Landbank. This makes DepEd the largest single client for Landbank salary loans. Landbank maintains dedicated service windows at regional offices for DepEd personnel during loan application periods. The bank also partners with government agencies to offer preferential rates during financial literacy campaigns and government payday loan programs.");

addToField("toll-calculator-philippines", "description", "For daily commuters weighing the toll road versus free road decision, time savings must be quantified against toll costs. The SLEX route from Alabang to Calamba takes 30-45 minutes versus 1.5-2 hours via the national highway during peak hours. At a toll cost of 140 pesos each way, commuters effectively pay 280 pesos to save 1.5-3 hours daily — a value proposition most working professionals find worthwhile. This calculator helps quantify that tradeoff with actual toll figures.");

addToField("toll-calculator-philippines", "philippinesContext", "The Philippine government continues to invest heavily in expressway infrastructure. The Build Build Build program has accelerated construction of new expressway segments including the NLEX-SLEX Connector Road, Laguna Lakeshore Expressway Dike, and planned expressways in Visayas and Mindanao. These developments will expand the toll road network beyond Luzon, creating new toll calculation needs for Filipino motorists. The DOTr and DPWH coordinate with private concessionaires to ensure new expressways meet safety and capacity standards while providing fair toll pricing regulated by TRB.");

fs.writeFileSync(file, c);
console.log('Boost batch 7 done');
