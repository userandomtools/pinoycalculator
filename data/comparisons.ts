export interface ComparisonItem {
  name: string;
  slug: string;
  features: Record<string, boolean | string>;
}

export interface ComparisonData {
  title: string;
  metaDescription: string;
  intro: string;
  featureHeaders: string[];
  items: ComparisonItem[];
}

export const comparisonsData: Record<string, ComparisonData> = {
  "best-loan-calculators-philippines": {
    title: "Best Loan Calculators in the Philippines",
    metaDescription: "Compare the best loan calculators for the Philippines. Features comparison for personal, car, housing, and credit card loan tools.",
    intro: "Looking for the best loan calculator in the Philippines? We compared the top loan computation tools so you can quickly figure out which one fits your situation, whether you're checking personal loans, car financing, or monthly amortization.",
    featureHeaders: ["Amortization Schedule", "Interest Type", "Chart Visualization", "Philippine Banks", "Free to Use"],
    items: [
      { name: "Loan Calculator PH", slug: "loan-calculator-philippines", features: { "Amortization Schedule": true, "Interest Type": "Diminishing", "Chart Visualization": true, "Philippine Banks": true, "Free to Use": true } },
      { name: "BPI Credit to Cash", slug: "bpi-credit-to-cash-calculator", features: { "Amortization Schedule": false, "Interest Type": "Add-on", "Chart Visualization": true, "Philippine Banks": true, "Free to Use": true } },
      { name: "BDO Installment", slug: "bdo-installment-calculator", features: { "Amortization Schedule": false, "Interest Type": "Add-on", "Chart Visualization": true, "Philippine Banks": true, "Free to Use": true } },
      { name: "Metrobank Car Loan", slug: "metrobank-car-loan-calculator", features: { "Amortization Schedule": true, "Interest Type": "Diminishing", "Chart Visualization": true, "Philippine Banks": true, "Free to Use": true } },
      { name: "PSBank Car Loan", slug: "psbank-car-loan-calculator", features: { "Amortization Schedule": true, "Interest Type": "Diminishing", "Chart Visualization": true, "Philippine Banks": true, "Free to Use": true } },
      { name: "Pag-IBIG MPL", slug: "pag-ibig-multi-purpose-loan-calculator", features: { "Amortization Schedule": true, "Interest Type": "Diminishing", "Chart Visualization": true, "Philippine Banks": false, "Free to Use": true } },
    ],
  },
  "best-salary-calculators-philippines": {
    title: "Best Salary Calculators in the Philippines",
    metaDescription: "Compare salary calculators for Filipino employees. 13th month pay, night differential, and SSS maternity benefit tools.",
    intro: "If you've ever double-checked your payslip, bonus, or benefit estimate and thought, 'Wait, is this right?' this comparison is for you. We lined up the best salary calculators for common employee concerns in the Philippines.",
    featureHeaders: ["DOLE-based Formula", "Tax Computation", "Multiple Scenarios", "Mobile Friendly", "Free to Use"],
    items: [
      { name: "13th Month Pay", slug: "13th-month-pay-calculator-philippines", features: { "DOLE-based Formula": true, "Tax Computation": true, "Multiple Scenarios": true, "Mobile Friendly": true, "Free to Use": true } },
      { name: "Night Differential", slug: "night-differential-calculator", features: { "DOLE-based Formula": true, "Tax Computation": false, "Multiple Scenarios": false, "Mobile Friendly": true, "Free to Use": true } },
      { name: "SSS Maternity", slug: "sss-maternity-benefit-calculator", features: { "DOLE-based Formula": false, "Tax Computation": false, "Multiple Scenarios": true, "Mobile Friendly": true, "Free to Use": true } },
    ],
  },
  "best-finance-calculators-philippines": {
    title: "Best Finance Calculators in the Philippines",
    metaDescription: "Compare the best financial calculators for Filipinos. VAT, time deposit, MP2, PWD discount, and more.",
    intro: "Money decisions can feel overwhelming, especially when you just want a quick and clear answer. This finance calculator comparison helps you find the right tool for taxes, savings, discounts, and everyday money planning in the Philippines.",
    featureHeaders: ["Chart Visualization", "Philippine Rates", "Tax Included", "Multiple Modes", "Free to Use"],
    items: [
      { name: "VAT Calculator PH", slug: "vat-calculator-philippines", features: { "Chart Visualization": false, "Philippine Rates": true, "Tax Included": true, "Multiple Modes": true, "Free to Use": true } },
      { name: "Pag-IBIG MP2", slug: "pag-ibig-mp2-calculator", features: { "Chart Visualization": true, "Philippine Rates": true, "Tax Included": true, "Multiple Modes": false, "Free to Use": true } },
      { name: "Time Deposit", slug: "time-deposit-calculator", features: { "Chart Visualization": true, "Philippine Rates": true, "Tax Included": true, "Multiple Modes": false, "Free to Use": true } },
      { name: "PWD Discount", slug: "pwd-discount-calculator", features: { "Chart Visualization": false, "Philippine Rates": true, "Tax Included": true, "Multiple Modes": true, "Free to Use": true } },
      { name: "Loan Calculator PH", slug: "loan-calculator-philippines", features: { "Chart Visualization": true, "Philippine Rates": true, "Tax Included": false, "Multiple Modes": false, "Free to Use": true } },
      { name: "BPI Credit to Cash", slug: "bpi-credit-to-cash-calculator", features: { "Chart Visualization": true, "Philippine Rates": true, "Tax Included": false, "Multiple Modes": false, "Free to Use": true } },
    ],
  },
};

export function getComparisonBySlug(slug: string) {
  return comparisonsData[slug];
}

export function getAllComparisons() {
  return Object.entries(comparisonsData).map(([slug, comparison]) => ({ slug, ...comparison }));
}
