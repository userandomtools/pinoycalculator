import * as fs from 'fs';
const file = './data/calculators.ts';
let c = fs.readFileSync(file, 'utf-8');

function boostDesc(slug: string, extra: string) {
  const re = new RegExp(`(slug: "${slug}",[\\s\\S]*?description: ")([^"]*)(")`, 'm');
  c = c.replace(re, (m, p1, p2, p3) => `${p1}${p2} ${extra}${p3}`);
}

boostDesc("time-deposit-calculator", "For Filipinos planning major purchases like a home down payment, wedding fund, or education expenses within 1-5 years, time deposits offer predictable returns without market risk. Unlike stocks or mutual funds that can lose value, a time deposit guarantees your principal plus a fixed interest rate. The 20% withholding tax is automatically handled by the bank, so the net amount credited to your account is your take-home earnings with no additional BIR filing required.");

boostDesc("pwd-discount-calculator", "The PWD discount has been expanded over the years through legislative amendments, and enforcement has improved significantly with DTI and NCDA conducting regular compliance monitoring. Caregivers and family members should understand the correct computation to advocate for the PWD when purchasing goods or services. This calculator is also useful for business owners who need to verify their cashier systems are computing the discount correctly to avoid DTI violations and customer complaints.");

boostDesc("bpi-credit-to-cash-calculator", "Before applying, compare the total cost of BPI Credit-to-Cash against alternatives: a BPI personal loan typically has lower effective interest rates for the same amount and term. However, Credit-to-Cash is faster to process (1-3 days vs 5-10 days for personal loans) and does not require additional documentation. For emergency cash needs under ₱50,000 with repayment within 6-12 months, Credit-to-Cash offers unmatched convenience despite the higher cost.");

fs.writeFileSync(file, c);
console.log('Boost batch 2 complete');
