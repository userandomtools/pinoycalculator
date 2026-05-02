import * as fs from 'fs';
const file = './data/calculators.ts';
let c = fs.readFileSync(file, 'utf-8');

function boostDesc(slug: string, extra: string) {
  const re = new RegExp(`(slug: "${slug}",[\\s\\S]*?description: ")([^"]*)(")`, 'm');
  c = c.replace(re, (m, p1, p2, p3) => `${p1}${p2} ${extra}${p3}`);
}

function boostContext(slug: string, extra: string) {
  const re = new RegExp(`(slug: "${slug}",[\\s\\S]*?philippinesContext: ")([^"]*)(")`, 'm');
  c = c.replace(re, (m, p1, p2, p3) => `${p1}${p2} ${extra}${p3}`);
}

boostDesc("night-differential-calculator", "The Philippine BPO industry employs over 1.3 million workers, with roughly 70% working night shifts to align with US and European business hours. For these workers, NSD is not just a bonus — it is a core part of their expected compensation. Understanding NSD computation also helps employees in hospitals, hotels, security agencies, restaurants, and 24-hour retail operations who regularly work overnight schedules. If you are negotiating a job offer that involves night work, knowing your NSD entitlement upfront helps you evaluate whether the total package meets your financial needs.");
boostContext("night-differential-calculator", "DOLE regularly conducts labor inspections to ensure NSD compliance. In 2023, DOLE reported that NSD non-compliance was among the top 5 most common labor violations found during inspections. Workers in the informal sector and small businesses are most likely to miss out on NSD. DOLE's hotline 1349 accepts complaints about unpaid NSD and typically resolves them within 30 days through the Single Entry Approach (SEnA) mediation process.");

boostDesc("sss-maternity-benefit-calculator", "The expanded maternity leave applies to all female workers in the private sector, including those in the informal economy, domestic workers (kasambahay), and OFW members. For the first four live birth deliveries, the full 105 days are credited. For every subsequent delivery beyond the fourth, the benefit still applies. The law represents a significant improvement from the previous system that only allowed 60 days for normal delivery and 78 days for cesarean section. Planning ahead is essential because the benefit amount depends on your salary credit history in the months leading up to delivery.");
boostContext("sss-maternity-benefit-calculator", "SSS maternity benefit claims are among the most frequently filed benefits in the Philippine social security system, with over 400,000 claims processed annually. To maximize your benefit, ensure your SSS contributions are up to date and at the highest salary bracket your income supports. Self-employed and voluntary members should maintain consistent contributions for at least 6 months before the expected delivery semester. The SSS My.SSS portal allows members to check their contribution history and track maternity benefit claim status online.");

boostDesc("pag-ibig-mp2-calculator", "For Filipinos looking for a savings vehicle that combines safety, competitive returns, and tax efficiency, MP2 stands out as one of the strongest options available from any government financial institution. The program is particularly popular among teachers, government employees, OFWs, and middle-income earners who want better returns than a bank savings account without the volatility of the stock market. Financial literacy advocates in the Philippines frequently cite MP2 as the ideal first investment for beginners because of its simplicity and government backing.");
boostContext("pag-ibig-mp2-calculator", "The Pag-IBIG Fund reported total MP2 collections exceeding ₱100 billion in recent years, reflecting growing awareness of the program. Member enrollment has increased significantly as financial literacy content creators on YouTube and social media have highlighted MP2 as one of the best low-risk investments for Filipinos. The fund primarily invests in government securities, corporate bonds, housing loans, and real estate development, maintaining a diversified portfolio that supports consistent dividend payments. Members can track their MP2 balance and contribution history through the Virtual Pag-IBIG portal at pagibigfund.gov.ph.");

fs.writeFileSync(file, c);
console.log('Boost complete');
