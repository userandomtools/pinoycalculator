import * as fs from 'fs';

const file = './data/calculators.ts';
let c = fs.readFileSync(file, 'utf-8');

const replacements = [
  // 1. loan-calculator-philippines
  {
    original: "The Bangko Sentral ng Pilipinas (BSP) regulates",
    updated: "The [Bangko Sentral ng Pilipinas (BSP)](https://www.bsp.gov.ph/) regulates",
  },
  {
    original: "Bureau of Internal Revenue (BIR)",
    updated: "[Bureau of Internal Revenue (BIR)](https://www.bir.gov.ph/)",
  },
  {
    original: "Pag-IBIG housing loans",
    updated: "[Pag-IBIG housing loans](https://www.pagibigfund.gov.ph/)",
  },
  
  // 2. vat-calculator-philippines
  {
    original: "12% Value-Added Tax",
    updated: "12% [Value-Added Tax (VAT)](https://www.bir.gov.ph/index.php/tax-information/value-added-tax.html)",
  },
  {
    original: "Department of Trade and Industry (DTI)",
    updated: "[Department of Trade and Industry (DTI)](https://www.dti.gov.ph/)",
  },
  {
    original: "business loans",
    updated: "[business loans](/loan-calculator-philippines)",
  },

  // 3. pag-ibig-mp2-calculator
  {
    original: "Home Development Mutual Fund (HDMF)",
    updated: "[Home Development Mutual Fund (HDMF)](https://www.pagibigfund.gov.ph/)",
  },
  {
    original: "time deposits",
    updated: "[time deposits](/time-deposit-calculator)",
  },
  
  // 4. time-deposit-calculator
  {
    original: "Philippine Deposit Insurance Corporation (PDIC)",
    updated: "[Philippine Deposit Insurance Corporation (PDIC)](https://www.pdic.gov.ph/)",
  },
  {
    original: "Pag-IBIG MP2",
    updated: "[Pag-IBIG MP2](/pag-ibig-mp2-calculator)",
  },
  
  // 5. pwd-discount-calculator
  {
    original: "Republic Act No. 10754",
    updated: "[Republic Act No. 10754](https://ncda.gov.ph/disability-laws/republic-acts/republic-act-no-10754/)",
  },
  {
    original: "National Council on Disability Affairs (NCDA)",
    updated: "[National Council on Disability Affairs (NCDA)](https://ncda.gov.ph/)",
  },
  {
    original: "Value-Added Tax",
    updated: "[Value-Added Tax](/vat-calculator-philippines)",
  },

  // 6. bpi-credit-to-cash-calculator
  {
    original: "Bangko Sentral ng Pilipinas (BSP)",
    updated: "[Bangko Sentral ng Pilipinas (BSP)](https://www.bsp.gov.ph/)",
  },
  {
    original: "personal loans",
    updated: "[personal loans](/loan-calculator-philippines)",
  },

  // 7. 13th-month-pay-calculator-philippines
  {
    original: "Department of Labor and Employment (DOLE)",
    updated: "[Department of Labor and Employment (DOLE)](https://www.dole.gov.ph/)",
  },
  {
    original: "Presidential Decree No. 851",
    updated: "[Presidential Decree No. 851](https://www.dole.gov.ph/php_assets/uploads/2017/12/Presidential-Decree-No.-851.pdf)",
  },
  {
    original: "night differential",
    updated: "[night differential](/night-differential-calculator)",
  },

  // 8. night-differential-calculator
  {
    original: "Article 86 of the Labor Code",
    updated: "[Article 86 of the Labor Code](https://bwc.dole.gov.ph/labor-code-of-the-philippines)",
  },
  {
    original: "13th-month pay",
    updated: "[13th-month pay](/13th-month-pay-calculator-philippines)",
  },

  // 9. sss-maternity-benefit-calculator
  {
    original: "Social Security System (SSS)",
    updated: "[Social Security System (SSS)](https://www.sss.gov.ph/)",
  },
  {
    original: "Republic Act 11210",
    updated: "[Republic Act 11210](https://www.officialgazette.gov.ph/2019/02/20/republic-act-no-11210/)",
  },

  // 10. gwa-calculator-philippines
  {
    original: "Commission on Higher Education (CHED)",
    updated: "[Commission on Higher Education (CHED)](https://ched.gov.ph/)",
  },
  {
    original: "Department of Science and Technology (DOST)",
    updated: "[Department of Science and Technology (DOST)](https://sei.dost.gov.ph/)",
  },
  {
    original: "DLSU GPA",
    updated: "[DLSU GPA](/dlsu-gpa-calculator)",
  }
];

let updatedCount = 0;

for (const r of replacements) {
  // Use regex with global flag to replace all occurrences within the file
  // Be careful not to replace already replaced strings (e.g. replacing 'DOLE' inside a link again)
  // We'll use a positive lookahead to ensure we aren't already inside a markdown link
  const escapedOriginal = r.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(?<!\\[)${escapedOriginal}(?!\\])`, 'g');
  
  if (c.match(regex)) {
    c = c.replace(regex, r.updated);
    updatedCount++;
    console.log(`Applied: ${r.original}`);
  } else {
    console.log(`Could not find: ${r.original}`);
  }
}

fs.writeFileSync(file, c);
console.log(`Successfully applied ${updatedCount} link replacements.`);
