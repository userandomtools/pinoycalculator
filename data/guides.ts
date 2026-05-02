export type GuideCategory = "finance" | "salary" | "academic";

export interface GuideFAQ {
  q: string;
  a: string;
}

export interface GuideInfographic {
  title: string;
  format: string;
  dataPoints: string[];
  altText: string;
  placement: string;
}

export interface GuideData {
  title: string;
  metaDescription: string;
  intro: string;
  quickAnswer: {
    summary: string;
    targetAudience: string;
    keyTakeaway: string;
  };
  category: GuideCategory;
  tags: string[];
  steps: { title: string; content: string }[];
  keyConcepts?: { title: string; description: string }[];
  infographicIdeas?: GuideInfographic[];
  example: string;
  faqs: GuideFAQ[];
  editorialMethodology: string;
  disclaimer: string;
  ctaText: string;
  ctaLink: string;
  relatedGuides: { slug: string; title: string }[];
}

export const guidesData: Record<string, GuideData> = {
  "how-to-compute-13th-month-pay-philippines": {
    title: "Best Way to Compute 13th Month Pay Philippines 2026 (Accurate Guide)",
    metaDescription: "Learn how to compute your 13th month pay using the official DOLE formula for 2026. Expert step-by-step guide for Filipino employees and payroll managers.",
    intro: "If you have ever waited for December, checked your payslip, and thought, 'Parang kulang yata?' you are not the only one. A lot of employees in the Philippines get confused about 13th month pay because the rule sounds simple, but real-life situations like resignations, salary changes, and partial months make people second-guess the final amount. This expert guide breaks the process down in a clear, friendly way so you can understand where your number is coming from based on the latest DOLE labor standards for 2026.",
    quickAnswer: {
      summary: "The 13th month pay in the Philippines is computed by taking the total basic salary earned during the calendar year and dividing it by 12. Rank-and-file employees are entitled to this bonus regardless of their designation or employment status, provided they worked at least one month.",
      targetAudience: "Regular, probationary, and contractual employees in the Philippines.",
      keyTakeaway: "13th month pay is NOT a discretionary bonus; it is a mandatory benefit under Presidential Decree No. 851."
    },
    category: "salary",
    tags: ["13th month pay", "salary", "bonus", "dole", "employee benefits", "philippines", "payroll", "compensation"],
    steps: [
      { title: "Determine your monthly basic salary", content: "Start with your basic salary, which is your regular pay before deductions. This usually excludes overtime, holiday pay, night differential, commissions, and most allowances. For 2026, ensure you are using the base rate stated in your latest COE or contract." },
      { title: "Count the months you actually worked", content: "Check how many months during the calendar year you rendered service. This step matters a lot for resigned, newly hired, or transferred employees who are expecting a prorated amount." },
      { title: "Compute the total basic salary earned", content: "Sum up all basic salary payments received from January to December. If your salary changed (e.g., a promotion in July), add the actual amounts earned in each period." },
      { title: "Divide the total by 12", content: "The standard formula: 13th Month Pay = Total Basic Salary Earned / 12. For a ₱25,000 monthly basic worker who worked the full year, the math is (₱25,000 * 12) / 12 = ₱25,000." },
    ],
    keyConcepts: [
      { title: "Prorated Payment", description: "Resigned employees must receive their 13th month pay as part of their final clearance, computed based on time served during the year." },
      { title: "Tax Exemption", description: "Under the TRAIN Law, 13th month pay is tax-exempt up to a combined limit of ₱90,000 along with other bonuses." }
    ],
    infographicIdeas: [
      {
        title: "13th Month vs. Christmas Bonus",
        format: "Comparison Table",
        dataPoints: ["Mandatory vs. Discretionary", "Tax Rules", "Typical Release Dates"],
        altText: "Table showing the differences between mandatory 13th month pay and discretionary bonuses.",
        placement: "After the Intro"
      }
    ],
    example: "Example: Maria earns ₱30,000/mo and worked all 12 months. Total basic = ₱360,000. 13th month = ₱30,000.\nExample: Carlo earns ₱25,000/mo and resigned after 8 months. Total basic = ₱200,000. 13th month = ₱16,666.67.",
    faqs: [
      { q: "Who is entitled to 13th month pay?", a: "Rank-and-file employees who have worked for at least one month during the calendar year are entitled, regardless of their employment status." },
      { q: "When should it be released?", a: "By law, it must be paid on or before December 24 of each year." },
      { q: "Is overtime pay included in the computation?", a: "No, overtime, holiday pay, and night differential are generally excluded from the 'basic salary' definition for 13th month purposes." }
    ],
    editorialMethodology: "Verified against Presidential Decree No. 851 and latest DOLE Handbook on Workers' Statutory Monetary Benefits.",
    disclaimer: "This guide is for informational purposes. Consult your HR or a legal expert for specific payroll disputes.",
    ctaText: "Instantly compute your bonus with our 13th Month Pay Tool.",
    ctaLink: "/13th-month-pay-calculator-philippines",
    relatedGuides: [
      { slug: "how-to-calculate-night-differential", title: "Calculate Night Differential Pay" },
      { slug: "how-to-calculate-vat-philippines", title: "Calculate VAT in the Philippines" },
    ],
  },
  "pag-ibig-mp2-savings-guide": {
    title: "Best Guide to Pag-IBIG MP2 Savings 2026 (Free & Accurate Picks)",
    metaDescription: "The ultimate 2026 guide to Pag-IBIG MP2 savings. Learn how to maximize dividends, understand the 5-year lock-in, and compute your projected returns accurately.",
    intro: "Pag-IBIG MP2 is one of those savings options people hear about from friends and coworkers all the time. It sounds simple on paper, but once you start asking practical questions like how much to contribute, when dividends are credited, or whether the money is locked in, the confusion starts. This expert guide walks you through the 2026 rules for the Modified Pag-IBIG 2 program, helping you decide if it fits your long-term financial goals.",
    quickAnswer: {
      summary: "Pag-IBIG MP2 is a voluntary 5-year savings program that offers higher, tax-free dividends compared to regular savings. It is open to active Pag-IBIG members and former members with other sources of income.",
      targetAudience: "Filipino workers, OFWs, and retirees looking for low-risk, government-guaranteed savings.",
      keyTakeaway: "MP2 dividends are not fixed but historically outperform bank time deposits significantly."
    },
    category: "finance",
    tags: ["pag-ibig mp2", "savings", "dividends", "investment", "finance", "philippines", "hdmf", "time deposit alternative"],
    steps: [
      { title: "Check your regular Pag-IBIG membership", content: "You must be an active member (with at least 1 month contribution) or a former member with a source of income to open an MP2 account." },
      { title: "Open an account online", content: "Use the Virtual Pag-IBIG portal to generate an MP2 Account Number instantly. No need to visit a branch for the initial setup." },
      { title: "Set your contribution strategy", content: "Decide between monthly contributions or one-time lump sum deposits. Lump sums often earn more due to longer compounding." },
      { title: "Monitor annual dividend rates", content: "Pag-IBIG declares rates annually (usually around March/April). Rates for the past years have ranged between 5% and 8%." },
    ],
    infographicIdeas: [
      {
        title: "MP2 vs. Regular Savings",
        format: "Comparison Infographic",
        dataPoints: ["Dividend Rates", "Lock-in Periods", "Taxability"],
        altText: "Comparison of Pag-IBIG Regular Savings versus the Modified MP2 Savings program.",
        placement: "Inside the Quick Answer section"
      }
    ],
    example: "Example: Save ₱5,000 monthly for 5 years at an assumed 7% rate. Total principal: ₱300,000. Estimated maturity: ~₱358,000 tax-free.",
    faqs: [
      { q: "Is MP2 safe?", a: "Yes, it is 100% government-guaranteed, meaning your principal is safe and cannot be lost." },
      { q: "Can I withdraw early?", a: "Early withdrawal is allowed under specific conditions (e.g., retirement, disability, death, or unemployment) but may result in lower dividend payouts." }
    ],
    editorialMethodology: "Based on latest Pag-IBIG Fund (HDMF) circulars and historical dividend data.",
    disclaimer: "Dividend rates are not guaranteed and fluctuate based on the Fund's financial performance.",
    ctaText: "Estimate your MP2 growth with our free calculator.",
    ctaLink: "/pag-ibig-mp2-calculator",
    relatedGuides: [
      { slug: "how-to-compute-13th-month-pay-philippines", title: "Compute 13th Month Pay" },
    ],
  },
  "how-to-compute-gwa-college": {
    title: "Best Way to Calculate GWA for College 2026 (Free & Accurate)",
    metaDescription: "Master the General Weighted Average (GWA) calculation for 2026. Perfect for Philippine college students targeting Latin honors or scholarships.",
    intro: "The General Weighted Average (GWA) is the standard measure of academic performance in Philippine colleges and universities. It is used for determining Latin honors (Summa, Magna, Cum Laude), scholarship eligibility, and initial job applications. This guide teaches you exactly how to compute it using the standard weighted system employed by major universities like UP, UST, and DLSU.",
    quickAnswer: {
      summary: "GWA is computed by multiplying each subject grade by its units, summing these quality points, and dividing the total by the sum of units. A lower GWA is better in the standard 1.0-5.0 Philippine grading system.",
      targetAudience: "College students in the Philippines and academic applicants.",
      keyTakeaway: "Units matter as much as grades; a high grade in a 5-unit subject impacts your GWA more than a 1-unit subject."
    },
    category: "academic",
    tags: ["gwa", "gpa", "grades", "college", "academic", "students", "philippines", "weighted average"],
    steps: [
      { title: "List your grades and units", content: "Create a table with two columns: Grade and Number of Units for each subject." },
      { title: "Compute Quality Points", content: "Multiply Grade * Units for every subject. (e.g., Grade 1.25 * 3 Units = 3.75 Quality Points)." },
      { title: "Sum and Divide", content: "Divide the Total Quality Points by the Total Number of Units. Round to the decimal places required by your school (usually 4-5)." },
    ],
    example: "Math: 1.50 (3u) = 4.5. English: 1.00 (3u) = 3.0. Science: 2.00 (5u) = 10.0. Total QP: 17.5. Total Units: 11. GWA: 1.5909.",
    faqs: [
      { q: "What is the cut-off for Cum Laude?", a: "Commonly between 1.45 and 1.75, but every university has its own specific handbook rules." },
      { q: "Do failed grades count?", a: "Yes, failed grades (5.0) are usually included in the GWA computation unless the subject is retaken and replaced according to school policy." }
    ],
    editorialMethodology: "Aligned with CHED academic standards and common Philippine university grading handbooks.",
    disclaimer: "Always refer to your specific university's Registrar for the final official GWA computation for honors.",
    ctaText: "Compute your GWA instantly with our free tool.",
    ctaLink: "/gwa-calculator-philippines",
    relatedGuides: [],
  },
  "how-to-calculate-vat-philippines": {
    title: "Best Way to Calculate VAT in the Philippines 2026 (Free Guide)",
    metaDescription: "Expert 2026 guide on computing 12% VAT in the Philippines. Learn the formulas for VAT-inclusive and VAT-exclusive prices with real-world examples.",
    intro: "VAT looks simple until you are the one holding the receipt, supplier quote, or invoice and trying to figure out which number is the base amount and which number already includes tax. If you have ever had to pause and recompute because the total did not look right, this guide is for you. We will walk through the usual VAT situations in the Philippines using plain examples aligned with the latest BIR regulations for 2026.",
    quickAnswer: {
      summary: "In the Philippines, the standard VAT rate is 12%. To find the base price from a VAT-inclusive total, divide by 1.12. To find the total from a VAT-exclusive base, multiply by 1.12.",
      targetAudience: "Business owners, accountants, freelancers, and consumers in the Philippines.",
      keyTakeaway: "Understanding the difference between inclusive and exclusive prices prevents overpayment of taxes."
    },
    category: "finance",
    tags: ["vat", "tax", "bir", "invoice", "business", "philippines", "finance", "12 percent"],
    steps: [
      { title: "Identify the price type", content: "Determine if the price you have is 'VAT-Inclusive' (Total) or 'VAT-Exclusive' (Net)." },
      { title: "Extracting VAT", content: "Divide the Total Amount by 1.12 to get the base amount. The difference is the VAT." },
      { title: "Adding VAT", content: "Multiply the Net Amount by 0.12 to get the VAT amount. Add it to the Net to get the Total." },
    ],
    infographicIdeas: [
      {
        title: "The 1.12 Formula Explained",
        format: "Logic Tree",
        dataPoints: ["Inclusive -> Divide", "Exclusive -> Multiply"],
        altText: "Visual logic tree for deciding whether to divide or multiply for VAT calculations.",
        placement: "After the Steps"
      }
    ],
    example: "Inclusive: ₱1,120 / 1.12 = ₱1,000 Base, ₱120 VAT.\nExclusive: ₱1,000 * 0.12 = ₱120 VAT, ₱1,120 Total.",
    faqs: [
      { q: "What is the VAT threshold?", a: "The current mandatory VAT registration threshold is ₱3,000,000 in gross annual sales." },
      { q: "Is VAT the same as Sales Tax?", a: "While similar in effect for consumers, VAT is a value-added tax collected at each stage of production and distribution." }
    ],
    editorialMethodology: "Based on BIR Revenue Regulations and the Tax Reform for Acceleration and Inclusion (TRAIN) Law.",
    disclaimer: "Tax computations should be verified by a licensed CPA for official business compliance.",
    ctaText: "Compute 12% VAT instantly with our free tool.",
    ctaLink: "/vat-calculator-philippines",
    relatedGuides: [],
  },
  "how-to-calculate-night-differential": {
    title: "Best Way to Calculate Night Differential Pay 2026 (Accurate Picks)",
    metaDescription: "Learn how to compute night shift differential pay for 2026 under the Philippine Labor Code. Step-by-step guide for BPO and graveyard shift workers.",
    intro: "Night differential sounds straightforward until you start checking your actual shift hours, daily rate, and overtime records. A lot of employees working late shifts wonder whether the extra pay on their payslip is correct, especially when schedules cross 10 PM or end after midnight. This guide explains the current 2026 computation in a friendlier way so you can understand the numbers clearly.",
    quickAnswer: {
      summary: "Night Differential (NSD) is an additional 10% premium on top of an employee's regular hourly rate for work performed between 10:00 PM and 6:00 AM. It is a mandatory benefit under the Philippine Labor Code.",
      targetAudience: "BPO employees, healthcare workers, and graveyard shift staff in the Philippines.",
      keyTakeaway: "NSD applies to both regular and overtime hours falling within the 10 PM-6 AM window."
    },
    category: "salary",
    tags: ["night differential", "nsd", "labor code", "salary", "shift work", "philippines", "employee pay", "overtime"],
    steps: [
      { title: "Get your Hourly Rate", content: "Daily Rate / 8 = Hourly Rate. (e.g., ₱800 Daily / 8 = ₱100 Hourly)." },
      { title: "Identify NSD Hours", content: "Count how many hours you worked specifically between 10 PM and 6 AM." },
      { title: "Apply the 10% Premium", content: "NSD Amount = Hourly Rate * 10% * Night Hours. (e.g., ₱100 * 0.1 * 8 hours = ₱80 extra)." },
    ],
    example: "Shift 8 PM to 4 AM. Night hours: 10 PM to 4 AM (6 hours). Hourly rate ₱100. NSD = ₱100 * 10% * 6 = ₱60.00.",
    faqs: [
      { q: "Is NSD mandatory?", a: "Yes, it is a statutory benefit for almost all employees except those specifically excluded by law (e.g., government employees, domestic helpers)." },
      { q: "What if it's a Holiday?", a: "NSD is computed based on the holiday rate. If it's a Special Non-Working Day (130%), your NSD base is also 130%." }
    ],
    editorialMethodology: "Verified against the DOLE Handbook on Workers' Statutory Monetary Benefits.",
    disclaimer: "Payroll adjustments may vary per company policy as long as they exceed DOLE minimums.",
    ctaText: "Compute your NSD pay instantly with our free tool.",
    ctaLink: "/night-differential-calculator",
    relatedGuides: [],
  },
};

export function getGuideBySlug(slug: string): GuideData | undefined {
  return guidesData[slug];
}

export function getAllGuides() {
  return Object.entries(guidesData).map(([slug, guide]) => ({ slug, ...guide }));
}
