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

addToField("afpslai-loan-calculator", "description", "Beyond computing the monthly amortization, this tool helps borrowers prepare for loan renewals. AFPSLAI allows members to renew their loans after a certain number of payments have been made. By tracking your monthly payments and understanding how much principal has been paid down, you can estimate your net proceeds for a loan top-up. The calculator is an indispensable tool for financial planning, ensuring that military and police personnel do not over-borrow and remain compliant with the mandatory net take-home pay rules set by the government.");
addToField("afpslai-loan-calculator", "philippinesContext", "AFPSLAI's contribution to the financial well-being of uniformed personnel cannot be overstated. By providing a safe and affordable alternative to informal lenders and high-interest loan sharks, it helps protect the financial security of those who serve the country. Furthermore, the mandatory Capital Contribution retention on loans forces members to build their savings over time. These savings earn annual dividends that often outpace inflation and regular bank interest rates, providing a secondary layer of financial security for members upon their retirement or separation from service.");

addToField("cimb-bank-personal-loan-calculator", "description", "For many Filipinos, securing a personal loan from a traditional bank is a daunting process marred by strict documentary requirements and long waiting times. CIMB eliminates these barriers through a seamless digital interface, making credit accessible even to individuals who are unbanked or underbanked. However, this ease of access requires borrowers to be highly financially literate. Using this calculator before opening the CIMB app allows you to play with different loan amounts and terms, providing a realistic view of how the monthly payment will affect your cash flow. It empowers borrowers to make informed, data-driven decisions rather than impulsively accepting the maximum approved loan amount.");
addToField("cimb-bank-personal-loan-calculator", "philippinesContext", "The rapid growth of CIMB Bank in the Philippines is indicative of a massive shift towards digital banking and financial inclusion. Partnering with GCash to offer GSave has given CIMB an unparalleled reach into the Filipino populace, tapping into millions of verified GCash users. The data generated from e-wallet transactions serves as alternative credit scoring data, enabling CIMB to assess the creditworthiness of individuals lacking formal banking histories. While the BSP actively monitors these digital lending practices to protect consumers from predatory interest rates, borrowers are still responsible for understanding the true cost of their loans. Tools like this calculator bridge the gap between digital convenience and financial responsibility.");

addToField("eastwest-personal-loan-calculator", "description", "Many borrowers make the mistake of focusing solely on the monthly payment amount without considering the total interest cost over the life of the loan. This calculator prevents that oversight by explicitly displaying the total amount payable and the total interest charged. For example, stretching a loan over 36 months to achieve a lower monthly payment might result in paying tens of thousands of pesos more in interest compared to a 12-month term. By visualizing these trade-offs, borrowers can choose the most cost-effective term that their budget allows. Furthermore, it helps in comparing EastWest's offer against other banks or digital lenders, ensuring you secure the best possible deal.");
addToField("eastwest-personal-loan-calculator", "philippinesContext", "EastWest Bank's tiered interest rate strategy is a common practice among Philippine universal banks aimed at mitigating risk. By offering significantly lower rates to existing principal credit cardholders, banks reward proven financial discipline. For non-cardholders, the higher rates act as a buffer against potential defaults. The Philippine personal loan market is highly competitive, with banks constantly adjusting their rates and promotional offers to attract prime borrowers. The BSP's push for the Credit Information Corporation (CIC) has centralized credit data, allowing banks like EastWest to make faster and more accurate lending decisions. For the Filipino consumer, maintaining a clean credit record is more important than ever, as it directly impacts the interest rates they will be offered on future personal loans, auto loans, and mortgages.");

fs.writeFileSync(file, c);
console.log('Boost batch 8 done');
