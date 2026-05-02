import * as fs from 'fs';

const file = './data/calculators.ts';
let c = fs.readFileSync(file, 'utf-8');

import { calculators } from '../data/calculators';

let updatedCount = 0;

for (const calc of calculators) {
  const fullText = calc.description + calc.formula + calc.formulaExplanation + calc.exampleCalculation + calc.philippinesContext + JSON.stringify(calc.faqs);
  
  // 1. Check and inject Internal Links (relatedSlugs)
  if (!calc.relatedSlugs || calc.relatedSlugs.length === 0) {
    const defaultSlugs = ["salary-calculator-philippines", "13th-month-pay-calculator-philippines"];
    const regex = new RegExp(`(slug: "${calc.slug}",[\\s\\S]*?faqs: \\[.*?\\])(,)`, 'm');
    const match = c.match(regex);
    if (match) {
        c = c.replace(regex, `$1,\n    relatedSlugs: ["${defaultSlugs[0]}", "${defaultSlugs[1]}"]$2`);
    }
  }

  // 2. Check and inject External Links
  const hasGov = fullText.includes(".gov.ph") || fullText.includes(".edu.ph");
  if (!hasGov) {
    let linkStr = "";
    if (calc.category === 'health') {
        linkStr = " Consult the [Department of Health (DOH)](https://doh.gov.ph/) for official clinical guidelines.";
    } else if (calc.category === 'finance' || calc.category === 'salary') {
        linkStr = " For official taxation rules, always refer to the [Bureau of Internal Revenue (BIR)](https://www.bir.gov.ph/).";
    } else if (calc.category === 'academic') {
        linkStr = " These metrics align with the national standards set by the [Commission on Higher Education (CHED)](https://ched.gov.ph/).";
    } else if (calc.category === 'engineering' || calc.category === 'utilities') {
        linkStr = " These mathematical models are frequently utilized in technical research by the [Department of Science and Technology (DOST)](https://www.dost.gov.ph/).";
    } else {
        // Gaming / Crypto / Misc
        linkStr = " Always ensure your digital activities comply with the regulatory frameworks established by the [Bangko Sentral ng Pilipinas (BSP)](https://www.bsp.gov.ph/) or the [Department of Information and Communications Technology (DICT)](https://dict.gov.ph/).";
    }
    
    // Inject at the end of philippinesContext
    const pcRe = new RegExp(`(slug: "${calc.slug}",[\\s\\S]*?philippinesContext: ")([^"]*)(")`, 'm');
    const match = c.match(pcRe);
    if (match) {
        c = c.replace(pcRe, (_, g1, g2, g3) => g1 + g2 + linkStr + g3);
        updatedCount++;
    }
  }
}

fs.writeFileSync(file, c);
console.log(`Successfully injected external links into ${updatedCount} calculators.`);
