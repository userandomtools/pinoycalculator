import * as fs from 'fs';
import * as path from 'path';

const slugsToRemove = [
  // Duplicates
  "gwa-calculator-college",
  "general-weighted-average-calculator",
  "gpa-calculator-philippines",
  "13th-month-calculator",
  "how-to-compute-13th-month-pay-calculator",
  "how-to-calculate-13th-month",
  "13th-month-pay-calculation-dole",
  "sss-maternity-calculator",
  "mp2-savings-calculator",
  "ml-wr-calculator",
  "axie-calculator-energy",
  "ro-stat-calculator",
  "engine-cc-calculator",
  "canine-pregnancy-calculator",
  "pag-ibig-mpl-calculator",
  "philippine-vat-calculator",
  
  // Fake / Thin / Buying Guides
  "scientific-calculator-price-philippines",
  "canon-scientific-calculator-guide",
  "casio-calculator-watch-guide",
  "huawei-code-calculator",
  "prc-approved-calculator-guide",
  "tagalog-of-calculator",
  "non-programmable-calculator-guide",
];

function cleanDataCalculators() {
  const filePath = path.join(process.cwd(), './data/calculators.ts');
  let content = fs.readFileSync(filePath, 'utf-8');

  // We need to parse and remove objects from the calculators array that match these slugs.
  // Since it's a TS file with a complex structure, doing a regex is tricky. 
  // Let's use a regex that matches the object block.
  for (const slug of slugsToRemove) {
    const regex = new RegExp(`\\{\\s*slug:\\s*["']${slug}["'][\\s\\S]*?\\n\\s*\\},`, 'g');
    content = content.replace(regex, '');
  }

  // Also clean up relatedSlugs arrays
  for (const slug of slugsToRemove) {
    const regex1 = new RegExp(`"${slug}",?\\s*`, 'g');
    content = content.replace(regex1, '');
    const regex2 = new RegExp(`'${slug}',?\\s*`, 'g');
    content = content.replace(regex2, '');
  }

  fs.writeFileSync(filePath, content);
  console.log('Cleaned data/calculators.ts');
}

function cleanEngine() {
  const filePath = path.join(process.cwd(), './lib/calculator-engine.ts');
  let content = fs.readFileSync(filePath, 'utf-8');

  for (const slug of slugsToRemove) {
    const regex = new RegExp(`\\s*case\\s+["']${slug}["']:`, 'g');
    content = content.replace(regex, '');
  }

  fs.writeFileSync(filePath, content);
  console.log('Cleaned lib/calculator-engine.ts');
}

cleanDataCalculators();
cleanEngine();
