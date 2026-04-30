export type GuideCategory = "finance" | "salary" | "academic";

export interface GuideData {
  title: string;
  metaDescription: string;
  intro: string;
  category: GuideCategory;
  tags: string[];
  steps: { title: string; content: string }[];
  example: string;
  faqs: { q: string; a: string }[];
  ctaText: string;
  ctaLink: string;
  relatedGuides: { slug: string; title: string }[];
}

export const guidesData: Record<string, GuideData> = {
  "how-to-compute-13th-month-pay-philippines": {
    title: "How to Compute 13th Month Pay in the Philippines",
    metaDescription: "Learn how to compute your 13th month pay using the official DOLE formula. Step-by-step guide for Filipino employees.",
    intro: "If you have ever waited for December, checked your payslip, and thought, 'Parang kulang yata?' you are not the only one. A lot of employees in the Philippines get confused about 13th month pay because the rule sounds simple, but real-life situations like resignations, salary changes, and partial months make people second-guess the final amount. This guide breaks the process down in a clear, friendly way so you can understand where your number is coming from.",
    category: "salary",
    tags: ["13th month pay", "salary", "bonus", "dole", "employee benefits", "philippines", "payroll", "compensation"],
    steps: [
      { title: "Determine your monthly basic salary", content: "Start with your basic salary, which is your regular pay before deductions. This usually excludes overtime, holiday pay, night differential, commissions, and most allowances. If your monthly basic salary is ₱25,000, that is the base figure you should use for a simple estimate." },
      { title: "Count the months you actually worked", content: "Check how many months during the calendar year you rendered service. If you started in May, you worked 8 months from May to December. This step matters a lot for resigned, newly hired, or transferred employees who are expecting a prorated amount." },
      { title: "Compute the total basic salary earned", content: "Multiply your monthly basic salary by the months worked. For example, ₱25,000 × 8 months = ₱200,000. If your salary changed during the year, total the actual basic salary earned across each period instead of using one flat rate for the whole year." },
      { title: "Divide the total by 12", content: "The standard formula is simple: 13th Month Pay = Total Basic Salary Earned ÷ 12. Using the example above, ₱200,000 ÷ 12 = ₱16,666.67. This is the estimate many employees are looking for when they want to double-check what payroll released." },
      { title: "Review tax and company release schedule", content: "The first ₱90,000 of 13th month pay and other benefits combined is generally tax-exempt under current rules. Some companies release the full amount in December, while others split it into earlier partial payouts and a final year-end balance." },
    ],
    example: "Example 1: Maria earns ₱30,000 per month and worked all 12 months. Total basic salary = ₱360,000. 13th month pay = ₱360,000 ÷ 12 = ₱30,000.\n\nExample 2: Carlo earns ₱25,000 per month and resigned after 8 months. Total basic salary = ₱200,000. 13th month pay = ₱16,666.67.\n\nExample 3: Ana earned ₱20,000 for 6 months, then ₱24,000 for the next 6 months. Total basic salary = ₱120,000 + ₱144,000 = ₱264,000. 13th month pay = ₱22,000.",
    faqs: [
      { q: "Who is entitled to 13th month pay?", a: "Rank-and-file employees who have worked for at least one month during the calendar year are generally entitled to 13th month pay, whether they are regular, probationary, or contractual workers." },
      { q: "When should it be released?", a: "Employers must generally release 13th month pay on or before December 24. Some companies split it into two parts, but the full amount should still be completed within the required period." },
      { q: "Is overtime pay included?", a: "No, overtime pay is usually excluded because the computation is based on basic salary. That is also why holiday pay, night differential, and similar earnings are commonly left out." },
      { q: "What if I resigned mid-year?", a: "You are still entitled to a prorated 13th month pay based on the total basic salary you earned before leaving the company." },
      { q: "What if my salary changed during the year?", a: "Use the total actual basic salary earned across all months, then divide the total by 12. This gives a more accurate figure than using only your latest salary rate." },
      { q: "Why does my estimate not match my employer's figure exactly?", a: "The difference may come from payroll cutoffs, adjustments, previous partial releases, or items that are not counted as part of your basic salary. If the gap feels large, ask payroll for the detailed breakdown." },
    ],
    ctaText: "Use our 13th Month Pay Calculator to instantly compute your bonus.",
    ctaLink: "/calculators/13th-month-pay-calculator-philippines",
    relatedGuides: [
      { slug: "how-to-calculate-night-differential", title: "How to Calculate Night Differential Pay" },
      { slug: "how-to-calculate-vat-philippines", title: "How to Calculate VAT in the Philippines" },
    ],
  },
  "pag-ibig-mp2-savings-guide": {
    title: "How Pag-IBIG MP2 Savings Works",
    metaDescription: "Complete guide to Pag-IBIG MP2 savings in the Philippines. Learn how dividends work, contribution rules, and tips for maximizing your returns.",
    intro: "Pag-IBIG MP2 is one of those savings options people hear about from friends, coworkers, and finance videos all the time. It sounds simple on paper, but once you start asking practical questions like how much to contribute, when dividends are credited, or whether the money is locked in, the confusion starts. This guide walks you through the basics in a clearer and more realistic way so you can decide if MP2 fits your savings style.",
    category: "finance",
    tags: ["pag-ibig mp2", "savings", "dividends", "investment", "finance", "philippines", "hdmf", "time deposit alternative"],
    steps: [
      { title: "Understand what MP2 really is", content: "Pag-IBIG MP2 is a voluntary savings program separate from the regular Pag-IBIG contribution. Many people treat it like a disciplined medium-term savings option because the funds stay invested for 5 years and can earn annual dividends." },
      { title: "Check if you are eligible", content: "You generally need to be an active Pag-IBIG member to open an MP2 account. Before making plans, it helps to confirm the latest eligibility rules and account opening process so you do not prepare the wrong documents or assumptions." },
      { title: "Choose how much and how often to contribute", content: "You can contribute small or large amounts depending on your budget. Some savers contribute monthly because it feels manageable, while others add lump sums whenever they receive bonuses, side income, or extra cash." },
      { title: "Understand how dividends affect growth", content: "Your final amount depends not only on how much you save but also on the dividend rate declared for each year. The rate is not fixed forever, which is why calculators help give estimates instead of exact future guarantees." },
      { title: "Plan around the 5-year maturity period", content: "MP2 is easier to appreciate when you treat it as money you can leave alone. If you know you will need the funds soon for emergencies or tuition, a more flexible account may fit better. If you want a dedicated medium-term goal fund, MP2 can feel much more useful." },
    ],
    example: "Example 1: Juan contributes ₱5,000 monthly for 5 years at an assumed 7% annual dividend rate. Total contributions = ₱300,000. Estimated dividends = around ₱58,000. Estimated maturity value = around ₱358,000.\n\nExample 2: Lea contributes ₱2,000 monthly. Her total contributions are lower, but the example still shows how consistency matters more than waiting for the perfect amount before starting.",
    faqs: [
      { q: "Is MP2 safe?", a: "Many Filipinos consider MP2 one of the safer savings options because it is linked to Pag-IBIG and widely used for medium-term savings. That said, it is still smart to read the latest official rules before committing funds." },
      { q: "Can I withdraw before 5 years?", a: "MP2 is designed as a 5-year savings program, so it is best approached as money you can leave untouched. Early withdrawal is subject to current program rules and limited situations." },
      { q: "Are MP2 dividends taxable?", a: "MP2 dividends are generally tax-free, which is one of the reasons many savers compare it favorably against some other interest-earning options." },
      { q: "Can I open multiple MP2 accounts?", a: "Policies can change, so it is best to verify the latest guidance directly with Pag-IBIG. Many members focus first on understanding one account well before opening additional savings plans." },
      { q: "Is MP2 better than a time deposit?", a: "It depends on your goals. MP2 may offer attractive returns, while time deposits may be easier to compare bank-to-bank. The better option depends on your need for flexibility, predictability, and access to funds." },
      { q: "What if the dividend rate changes every year?", a: "That is normal. The rate is declared annually, so estimates are still useful for planning, but they should not be treated as guaranteed final results." },
    ],
    ctaText: "Use our Pag-IBIG MP2 Calculator to estimate your savings growth.",
    ctaLink: "/calculators/pag-ibig-mp2-calculator",
    relatedGuides: [
      { slug: "how-to-compute-13th-month-pay-philippines", title: "How to Compute 13th Month Pay" },
      { slug: "how-to-calculate-vat-philippines", title: "How to Calculate VAT in the Philippines" },
    ],
  },
  "how-to-compute-gwa-college": {
    title: "How to Calculate GWA for College Students in the Philippines",
    metaDescription: "Step-by-step guide on how to compute your General Weighted Average (GWA) for Philippine colleges and universities. Includes Latin honors criteria.",
    intro: "The General Weighted Average (GWA) is the standard measure of academic performance in Philippine colleges and universities. It's used for determining Latin honors, scholarship eligibility, and job applications. This guide teaches you exactly how to compute it.",
    category: "academic",
    tags: ["gwa", "gpa", "grades", "college", "academic", "students", "philippines", "weighted average"],
    steps: [
      { title: "Gather your grades and units", content: "List all your subjects with their corresponding grades and number of units. Most Philippine universities use a 1.0-5.0 scale where 1.0 is the highest and 5.0 is failing." },
      { title: "Multiply each grade by its units", content: "For each subject, multiply the grade by the number of units. Example: Math grade 1.5 × 3 units = 4.5 quality points." },
      { title: "Sum all quality points", content: "Add all the products from step 2. Total Quality Points = Σ(Grade × Units)." },
      { title: "Sum all units", content: "Add up the total number of units across all subjects. Total Units = Σ(Units)." },
      { title: "Divide to get GWA", content: "GWA = Total Quality Points ÷ Total Units. A lower GWA is better (closer to 1.0)." },
    ],
    example: "Sample grades:\n• Math: 1.50 (3 units) → 4.50\n• English: 1.75 (3 units) → 5.25\n• Science: 2.00 (5 units) → 10.00\n• History: 1.25 (3 units) → 3.75\n\nTotal quality points = 23.50\nTotal units = 14\nGWA = 23.50 ÷ 14 = 1.679\n\nThis qualifies for Cum Laude (1.46–1.75) at most schools.",
    faqs: [
      { q: "What GWA do I need for Latin honors?", a: "Typically: Summa Cum Laude 1.0–1.2, Magna Cum Laude 1.21–1.45, Cum Laude 1.46–1.75. Exact ranges vary by school." },
      { q: "Are PE and NSTP included in GWA?", a: "It depends on the school. Some exclude non-academic subjects from the honors computation. Check your university's policies." },
      { q: "What if I have an INC grade?", a: "Incomplete (INC) grades must be completed first. They may affect your GWA computation depending on your school's policy." },
      { q: "Is GWA the same as GPA?", a: "Not exactly. GWA uses the Philippine grading scale (1.0-5.0) while GPA typically uses the American 4.0 scale. DLSU uses a 0.0-4.0 GPA system." },
    ],
    ctaText: "Use our GWA Calculator to compute your average instantly.",
    ctaLink: "/calculators/gwa-calculator-philippines",
    relatedGuides: [
      { slug: "how-to-compute-13th-month-pay-philippines", title: "How to Compute 13th Month Pay" },
      { slug: "pag-ibig-mp2-savings-guide", title: "How Pag-IBIG MP2 Savings Works" },
    ],
  },
  "how-to-calculate-vat-philippines": {
    title: "How to Calculate VAT in the Philippines",
    metaDescription: "Learn how to compute 12% VAT in the Philippines. Covers VAT-inclusive and VAT-exclusive calculations with examples.",
    intro: "VAT looks simple until you are the one holding the receipt, supplier quote, or invoice and trying to figure out which number is the base amount and which number already includes tax. If you have ever had to pause and recompute because the total did not look right, this guide is for you. We will walk through the usual VAT situations in the Philippines using plain examples that are easier to follow.",
    category: "finance",
    tags: ["vat", "tax", "bir", "invoice", "business", "philippines", "finance", "12 percent"],
    steps: [
      { title: "Know the current VAT rate", content: "The standard VAT rate in the Philippines is 12%. This is the number used in most everyday VAT computations involving taxable goods and services." },
      { title: "Compute VAT when the amount is VAT-exclusive", content: "If the stated amount is the base price before tax, multiply that amount by 12% to get the VAT. Then add the VAT to the base amount to get the final total payable." },
      { title: "Compute VAT when the amount is VAT-inclusive", content: "If the amount already includes VAT, divide it by 1.12 to get the base price. Then subtract the base price from the total to get the VAT portion. This is where many people get confused, so it helps to do the steps slowly at first." },
      { title: "Double-check if the transaction is taxable", content: "Not every transaction follows the exact same VAT treatment. Some goods and services may be VAT-exempt or treated differently, so knowing the transaction type is just as important as knowing the formula." },
    ],
    example: "Example 1: VAT-exclusive amount = ₱1,000. VAT = ₱120. Total payable = ₱1,120.\n\nExample 2: VAT-inclusive amount = ₱1,120. Base price = ₱1,000. VAT = ₱120.\n\nExample 3: Supplier quote = ₱56,000 exclusive of VAT. VAT = ₱6,720. Final billed amount = ₱62,720.",
    faqs: [
      { q: "What is the VAT threshold?", a: "Businesses with sales beyond the applicable registration threshold may be required to register for VAT. Since rules can change, it is always safer to verify the latest threshold directly with official sources." },
      { q: "Are all goods subject to 12% VAT?", a: "No. Some products and services may be VAT-exempt or zero-rated. That is why it is important to identify the nature of the transaction before applying the formula." },
      { q: "Why do I divide by 1.12 for VAT-inclusive prices?", a: "Because the total already includes the 12% VAT. Dividing by 1.12 removes the VAT layer and reveals the original taxable base amount." },
      { q: "Can I use this for receipts and invoices?", a: "Yes. This is one of the most common uses of VAT computation, especially when checking supplier invoices, reimbursement claims, and official receipts." },
      { q: "What mistakes happen most often in VAT computation?", a: "The most common issues are mixing up VAT-inclusive and VAT-exclusive prices, applying VAT to the wrong base amount, and assuming every transaction is taxable without checking exemptions first." },
    ],
    ctaText: "Use our VAT Calculator to compute 12% VAT instantly.",
    ctaLink: "/calculators/vat-calculator-philippines",
    relatedGuides: [
      { slug: "how-to-compute-13th-month-pay-philippines", title: "How to Compute 13th Month Pay" },
      { slug: "pag-ibig-mp2-savings-guide", title: "How Pag-IBIG MP2 Savings Works" },
    ],
  },
  "how-to-calculate-night-differential": {
    title: "How to Calculate Night Differential Pay in the Philippines",
    metaDescription: "Learn how to compute night shift differential pay under the Philippine Labor Code. Step-by-step guide with examples.",
    intro: "Night differential sounds straightforward until you start checking your actual shift hours, daily rate, and overtime records. A lot of employees working late shifts wonder whether the extra pay on their payslip is correct, especially when schedules cross 10 PM or end after midnight. This guide explains the usual computation in a friendlier way so you can understand the numbers without getting lost in labor-code wording.",
    category: "salary",
    tags: ["night differential", "nsd", "labor code", "salary", "shift work", "philippines", "employee pay", "overtime"],
    steps: [
      { title: "Get your hourly rate", content: "Start by converting your daily rate into an hourly rate. For many workers, this means dividing the daily rate by 8 hours. If your daily rate is ₱600, your hourly rate is ₱75." },
      { title: "Compute the night differential per hour", content: "The minimum night differential is 10% of your regular hourly rate for work performed between 10:00 PM and 6:00 AM. Using the example above, ₱75 × 10% = ₱7.50 additional pay per night hour." },
      { title: "Count the exact hours covered by the night window", content: "Only the hours worked between 10 PM and 6 AM are generally counted. This is where many people get confused, especially if the shift starts before 10 PM or ends after 6 AM." },
      { title: "Multiply the night differential by the number of qualified hours", content: "If your additional night differential per hour is ₱7.50 and you worked 8 qualified hours, the total NSD is ₱60. That amount is on top of your regular pay, not a replacement for it." },
    ],
    example: "Example 1: Daily rate = ₱600. Hourly rate = ₱75. NSD per hour = ₱7.50. For 8 night hours, NSD = ₱60. Total pay for the shift = ₱660.\n\nExample 2: If your shift is 8 PM to 4 AM, only the hours from 10 PM to 4 AM usually qualify for NSD, which means 6 hours instead of the full shift.",
    faqs: [
      { q: "Is NSD mandatory?", a: "Yes, employees covered by the applicable labor rules are generally entitled to at least 10% additional pay for work performed between 10 PM and 6 AM." },
      { q: "Does NSD apply on holidays?", a: "It can, and it may interact with holiday or overtime rules depending on the work arrangement. This is one reason employees often review their payslip closely after holiday shifts." },
      { q: "What time is considered night shift?", a: "For night differential purposes, the common window is 10:00 PM to 6:00 AM." },
      { q: "Is the whole shift always covered?", a: "No. Only the hours that actually fall within the 10 PM to 6 AM window are usually counted for standard NSD computation." },
      { q: "Why does my payslip look different from my estimate?", a: "Differences can come from payroll cutoffs, overtime rules, holiday premiums, or employer-specific formatting. If the gap looks too large, it is worth asking for the computation details." },
    ],
    ctaText: "Use our Night Differential Calculator to compute your NSD pay.",
    ctaLink: "/calculators/night-differential-calculator",
    relatedGuides: [
      { slug: "how-to-compute-13th-month-pay-philippines", title: "How to Compute 13th Month Pay" },
    ],
  },
};

export function getGuideBySlug(slug: string): GuideData | undefined {
  return guidesData[slug];
}

export function getAllGuides() {
  return Object.entries(guidesData).map(([slug, guide]) => ({ slug, ...guide }));
}
