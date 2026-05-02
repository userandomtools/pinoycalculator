import * as fs from 'fs';

const file = './data/calculators.ts';
let c = fs.readFileSync(file, 'utf-8');

const replacements = [
  {
    slug: 'salary-calculator',
    original: 'It accounts for SSS, PhilHealth, and Pag-IBIG, which are mandatory for all employees.',
    updated: 'It accounts for SSS, PhilHealth, and [Pag-IBIG](https://www.pagibigfund.gov.ph/), which are mandatory for all employees.',
  },
  {
    slug: 'salary-calculator',
    original: 'You must also consider your annual bonuses when planning.',
    updated: 'You must also consider your annual bonuses when planning, which you can estimate using our [13th Month Pay Calculator](/13th-month-pay-calculator).',
  },
  {
    slug: '13th-month-pay-calculator',
    original: 'The law mandates that all rank-and-file employees receive this',
    updated: 'The [Department of Labor and Employment (DOLE)](https://www.dole.gov.ph/) mandates that all rank-and-file employees receive this',
  },
  {
    slug: '13th-month-pay-calculator',
    original: 'and you can cross-reference your daily rate',
    updated: 'and you can cross-reference your daily rate using our [Daily Wage Calculator](/daily-wage-calculator)',
  },
  {
    slug: 'sss-contribution-calculator',
    original: 'The Social Security System (SSS) is a state-run, social insurance program',
    updated: 'The [Social Security System (SSS)](https://www.sss.gov.ph/) is a state-run, social insurance program',
  },
  {
    slug: 'sss-contribution-calculator',
    original: 'Your SSS contribution is deducted alongside your PhilHealth',
    updated: 'Your SSS contribution is deducted alongside your PhilHealth (check the [PhilHealth Contribution Calculator](/philhealth-contribution-calculator))',
  },
  {
    slug: 'pag-ibig-contribution-calculator',
    original: 'The Home Development Mutual Fund (HDMF), more popularly known as the Pag-IBIG Fund',
    updated: 'The Home Development Mutual Fund (HDMF), officially managed by the [Pag-IBIG Fund](https://www.pagibigfund.gov.ph/)',
  },
  {
    slug: 'vat-calculator',
    original: 'The standard VAT rate in the Philippines is 12%.',
    updated: 'According to the [Bureau of Internal Revenue (BIR)](https://www.bir.gov.ph/), the standard VAT rate in the Philippines is 12%.',
  },
  {
    slug: 'vat-calculator',
    original: 'If you are calculating total business income, you must also factor in income tax.',
    updated: 'If you are calculating total business income, you must also factor in income tax using an [Income Tax Calculator](/income-tax-calculator).',
  },
  {
    slug: 'income-tax-calculator',
    original: 'The TRAIN Law (Republic Act No. 10963) significantly altered the income tax brackets',
    updated: 'The [TRAIN Law (Republic Act No. 10963)](https://ntrc.gov.ph/) significantly altered the income tax brackets',
  },
  {
    slug: 'income-tax-calculator',
    original: 'Ensure you understand your net take-home pay.',
    updated: 'Ensure you understand your net take-home pay by referring to our comprehensive [Salary Calculator](/salary-calculator).',
  }
];

let updatedCount = 0;

for (const r of replacements) {
  if (c.includes(r.original)) {
    c = c.replace(r.original, r.updated);
    updatedCount++;
  } else {
    // try to find a partial match if formatting changed
    const partial = r.original.substring(0, 30);
    if (c.includes(partial)) {
       console.log(`Partial match found for ${r.slug}: ${partial}`);
    } else {
       console.log(`Could not find string for ${r.slug}: ${r.original}`);
    }
  }
}

fs.writeFileSync(file, c);
console.log(`Successfully applied ${updatedCount} link replacements.`);
