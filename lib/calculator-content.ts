// Programmatic content engine for calculator pages.
// Generates SEO/AEO-friendly sections derived from each calculator's metadata,
// plus a hand-written overrides system for high-priority calculators.

import type { CalculatorDefinition } from "@/data/calculators";

export interface CalculatorContent {
  whoShouldUse: string[];
  whyUseful: string[];
  howToSteps: string[];
  longTailKeywords: { keyword: string; explanation: string }[];
  extraFaqs: { question: string; answer: string }[];
  internalLinks: { slug: string; anchor: string }[];
}

export interface CalculatorContentOverride {
  intro?: string; // replaces calc.description in the hero block
  whoShouldUse?: string[];
  whyUseful?: string[];
  howToSteps?: string[];
  longTailKeywords?: { keyword: string; explanation: string }[];
  extraFaqs?: { question: string; answer: string }[];
  internalLinks?: { slug: string; anchor: string }[];
}

// ---------- Generic helpers ----------

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const audienceByCategory = (cat: string): string[] => {
  switch (cat) {
    case "finance":
      return [
        "Filipino borrowers comparing personal, car, or housing loans",
        "OFWs and remittance-receiving families budgeting monthly cash flow",
        "Small business owners and freelancers handling supplier quotes and invoices",
      ];
    case "salary":
      return [
        "Employees verifying payroll, benefits, or 13th month pay",
        "HR officers and bookkeepers double-checking computations against DOLE rules",
        "Job seekers comparing offers and take-home pay",
      ];
    case "academic":
      return [
        "College and senior high school students computing grades or research samples",
        "Thesis writers preparing methodology chapters for Philippine universities",
        "Faculty and researchers validating quick computations before publishing",
      ];
    case "health":
      return [
        "Parents and caregivers checking safe medication or fitness metrics",
        "Filipino patients tracking health indicators recommended by clinics",
        "Coaches and gym-goers monitoring progress over time",
      ];
    case "gaming":
      return [
        "Filipino gamers planning builds, ranks, or in-game economy",
        "Content creators preparing guides for Philippine gaming communities",
        "Beginners trying to understand stat scaling without trial-and-error",
      ];
    case "crypto":
      return [
        "Filipino crypto users converting and tracking PHP equivalents",
        "Traders verifying P2P offers before sending funds",
        "Beginners learning how token values translate to peso amounts",
      ];
    case "engineering":
      return [
        "Mechanics, riders, and motorcycle owners checking engine specs",
        "Engineering students validating quick calculations",
        "Technical buyers comparing equipment before purchase",
      ];
    default:
      return [
        "Filipino students, professionals, and everyday users who need a fast answer",
        "Anyone double-checking a manual calculation before making a decision",
        "Readers who prefer clear results over scrolling through long formulas",
      ];
  }
};

const whyUsefulByCategory = (cat: string): string[] => {
  switch (cat) {
    case "finance":
      return [
        "Removes guesswork before you commit to a loan, deposit, or supplier quote.",
        "Lets you sanity-check what a bank, lender, or seller is actually charging.",
        "Gives Philippines-specific context so the numbers match local rates and rules.",
      ];
    case "salary":
      return [
        "Confirms whether your payslip or HR computation follows DOLE guidelines.",
        "Helps you plan around expected take-home pay or benefits.",
        "Useful for comparing offers and timing big purchases around payday.",
      ];
    case "academic":
      return [
        "Speeds up grade and research-related computations during deadlines.",
        "Helps you defend your numbers in front of advisers or panelists.",
        "Reduces small math errors that affect final outputs.",
      ];
    case "health":
      return [
        "Gives a quick reference based on weight, age, or measurements.",
        "Useful before consulting a doctor, pharmacist, or coach.",
        "Helps you track changes over time without complicated tools.",
      ];
    case "gaming":
      return [
        "Saves resources, energy, or in-game currency from poor decisions.",
        "Helps you plan progression more efficiently.",
        "Useful for comparing builds, stats, or returns.",
      ];
    default:
      return [
        "Gives a fast, reliable answer without spreadsheet setup.",
        "Helps you double-check a manual calculation in seconds.",
        "Optimized for Philippine context where applicable.",
      ];
  }
};

const longTailFor = (calc: CalculatorDefinition): { keyword: string; explanation: string }[] => {
  const base = calc.shortTitle.toLowerCase();
  const cat = calc.category;
  return [
    {
      keyword: `${base} Philippines free online`,
      explanation: `Filipino searchers often add "free online" because they want a working tool without sign-up. Targeting this phrase captures users who already know what they need and just want a fast result they can trust.`,
    },
    {
      keyword: `how to use ${base} for beginners`,
      explanation: `New users frequently search for guided walkthroughs. Ranking for this phrase helps capture readers at the top of the funnel who will likely return for related ${cat} calculators once they trust the explanation.`,
    },
    {
      keyword: `${base} formula explained`,
      explanation: `People want to understand the logic, not just the answer. This long-tail phrase has clear informational intent and pairs well with featured snippets and AI Overview answers.`,
    },
    {
      keyword: `${base} example computation Philippines`,
      explanation: `Example-based queries convert well because users are typically validating a real number. Including a realistic Philippine peso example makes this phrase highly answerable in 2-3 sentences.`,
    },
    {
      keyword: `is the ${base} accurate`,
      explanation: `Trust queries are growing as users compare multiple calculators. Addressing accuracy and limitations directly improves dwell time, lowers bounce rate, and signals expertise to both Google and AI engines.`,
    },
  ];
};

const internalLinksFor = (calc: CalculatorDefinition): { slug: string; anchor: string }[] => {
  return calc.relatedSlugs.slice(0, 5).map(s => ({
    slug: s,
    anchor: anchorFromSlug(s),
  }));
};

const anchorFromSlug = (slug: string): string => {
  const cleaned = slug.replace(/-/g, " ").replace(/calculator/gi, "calculator");
  // Ensure "Philippines" / "PH" wording for regional intent on common slugs
  if (slug.includes("philippines") && !/ph/i.test(cleaned)) return cap(cleaned);
  return cap(cleaned) + (slug.includes("philippines") ? "" : " (PH guide)");
};

const stepsFromFields = (calc: CalculatorDefinition): string[] => {
  const inputSteps = calc.fields
    .filter(f => f.type !== "text")
    .map(f => `Enter your ${f.label.replace(/\s*\(.*?\)\s*/g, "").toLowerCase()}. Use the format hinted in the field so the result stays accurate.`);
  return [
    `Open the ${calc.shortTitle} above on this page.`,
    ...inputSteps,
    `Tap "Calculate" to instantly see your result. The output appears in a clearly labeled card below the form.`,
    `Compare the result with your real-world figures (payslip, official receipt, lender quote, school record, etc.) before making a decision.`,
    `If the numbers do not match, recheck your inputs or scroll to the formula section to confirm the logic.`,
  ];
};

const genericFaqsFor = (calc: CalculatorDefinition): { question: string; answer: string }[] => {
  return [
    {
      question: `Is the ${calc.shortTitle} free to use?`,
      answer: `Yes. The ${calc.shortTitle} on Pinoy Calculator is completely free, requires no sign-up, and works on mobile and desktop. You can use it as many times as you want without limits.`,
    },
    {
      question: `Are the results from this ${calc.shortTitle} accurate?`,
      answer: `The tool uses the standard ${calc.shortTitle.toLowerCase()} formula and rounds to a sensible number of decimals. For binding decisions (loan applications, payroll filings, medical doses), always confirm with your bank, HR, or licensed professional.`,
    },
    {
      question: `Can I use this calculator on mobile?`,
      answer: `Yes. The page is mobile-first and the form is designed to fit small screens. Inputs use the numeric keyboard where applicable so you can type values without zooming in.`,
    },
    {
      question: `Does this tool save my data?`,
      answer: `No. The ${calc.shortTitle} runs entirely in your browser. We do not store the values you enter, and nothing is sent to a server when you press Calculate.`,
    },
  ];
};

// ---------- Hand-written overrides for top 8 calculators ----------

const overrides: Record<string, CalculatorContentOverride> = {
  "loan-calculator-philippines": {
    intro:
      "The Loan Calculator Philippines helps you see the real monthly cost of borrowing before you sign anything. Whether you are looking at a personal loan, a bank salary loan, a car loan, or a housing loan, the math behind the offer is often hidden inside fine print and add-on rates. This tool reveals what you would actually pay each month, how much goes to interest, and how the total balloons over the loan term.",
    whoShouldUse: [
      "Filipinos comparing personal, car, or housing loan offers from BDO, BPI, Metrobank, RCBC, and digital lenders",
      "OFW families managing remittance budgets while paying off existing loans",
      "First-time borrowers who want to avoid being trapped by add-on interest disclosures",
      "Small business owners stress-testing repayment capacity before borrowing for inventory or expansion",
    ],
    whyUseful: [
      "Shows total interest paid, not just the marketed monthly rate.",
      "Lets you stress-test different loan terms in seconds.",
      "Catches red flags in lender quotes that look cheap on the surface.",
      "Helps you decide if a longer term is really worth the lower monthly payment.",
    ],
    longTailKeywords: [
      { keyword: "loan calculator Philippines monthly amortization", explanation: "Captures borrowers who already know the term 'amortization' and are comparing lenders. High intent and a frequent AI-overview query." },
      { keyword: "diminishing balance loan calculator Philippines", explanation: "Targets users who suspect add-on rates and want a fairer comparison. Low competition and excellent for content authority." },
      { keyword: "personal loan computation Philippines example", explanation: "Conversational query ideal for AI engines. Pairs naturally with the worked example shown on this page." },
      { keyword: "how much interest will I pay on a 500000 loan", explanation: "Highly specific, voice-search-friendly query. Easy to answer in 2-3 sentences using the calculator output." },
      { keyword: "is 12 percent interest high for a personal loan PH", explanation: "Trust query with rising volume. Answering directly improves dwell time and AdSense viewability." },
    ],
    extraFaqs: [
      { question: "What is the difference between add-on and diminishing interest in the Philippines?", answer: "Add-on interest charges the full rate on the original principal for the entire term, so your effective rate is much higher than advertised. Diminishing balance charges interest only on the remaining balance, which is how this calculator computes results. Most BSP-regulated banks use diminishing; many appliance and motorcycle dealers still use add-on." },
      { question: "How do banks in the Philippines decide my loan interest rate?", answer: "Banks look at your income, employment tenure, debt-to-income ratio, credit standing, and the loan product. Salary loans for payroll account holders usually get the lowest rates. Unsecured personal loans for non-account holders sit at the higher end of the 6-30% range." },
      { question: "Can I prepay my loan to save on interest?", answer: "Most Philippine lenders allow prepayment, but some charge a pre-termination fee equal to a percentage of the unpaid balance. Always check the disclosure statement. If there is no fee, paying extra principal early significantly reduces total interest." },
    ],
  },
  "vat-calculator-philippines": {
    intro:
      "The VAT Calculator Philippines instantly computes 12% Value Added Tax for any amount, whether the price is VAT-exclusive or VAT-inclusive. Use it before issuing official receipts, validating supplier invoices, or computing the gross amount on a contract. The tool removes the back-and-forth math that trips up freelancers, small business owners, and bookkeepers who deal with VAT every week.",
    whoShouldUse: [
      "Self-employed professionals and freelancers issuing official receipts",
      "Small business owners reconciling supplier invoices with BIR filings",
      "Sales staff preparing quotations that need to show base price plus VAT",
      "Buyers verifying whether a posted price already includes VAT",
    ],
    whyUseful: [
      "Distinguishes between VAT-exclusive and VAT-inclusive amounts so you do not double-charge.",
      "Prevents costly errors on official receipts and BIR forms.",
      "Saves time on repetitive 12% computations during invoicing days.",
      "Useful for quickly checking whether a quote is fair before approving payment.",
    ],
    longTailKeywords: [
      { keyword: "how to compute 12% VAT Philippines", explanation: "Highest-intent informational query for VAT in PH. Direct answer with a worked example wins the snippet." },
      { keyword: "VAT inclusive vs exclusive Philippines example", explanation: "Common confusion point for first-time business owners. Answering side-by-side improves session duration." },
      { keyword: "extract VAT from total amount Philippines", explanation: "Specific reverse-VAT query with low competition. Excellent for capturing bookkeepers." },
      { keyword: "BIR VAT computation freelancer", explanation: "Targets a growing segment. Pairs with internal links to other tax-related tools." },
      { keyword: "is VAT included in the price Philippines", explanation: "Voice-search-friendly. Easy to answer with a 2-sentence response that links back to the tool." },
    ],
    extraFaqs: [
      { question: "Who is required to charge 12% VAT in the Philippines?", answer: "VAT-registered businesses with annual gross sales above ₱3,000,000 must charge 12% VAT on most goods and services. Below the threshold, businesses may opt to register as non-VAT and pay percentage tax instead. Mixed transactions and exports follow special rules under the National Internal Revenue Code." },
      { question: "Are all goods and services subject to 12% VAT?", answer: "No. Some are VAT-exempt (basic food, agricultural products, books, healthcare services) and some are zero-rated (exports, services to non-residents paid in foreign currency). Always check the latest BIR Revenue Regulations before issuing a VAT-exempt receipt." },
    ],
  },
  "pag-ibig-multi-purpose-loan-calculator": {
    intro:
      "The Pag-IBIG Multi-Purpose Loan (MPL) Calculator estimates your monthly amortization based on the official 10.5% per annum rate. It is meant for active Pag-IBIG members planning to borrow for tuition, home repairs, livelihood capital, or emergencies. The calculator uses the same diminishing balance method Pag-IBIG applies, so the result closely matches what your branch will quote during application.",
    whoShouldUse: [
      "Active Pag-IBIG members with at least 24 monthly contributions",
      "OFWs planning to borrow against their Pag-IBIG savings while abroad",
      "Government and private employees needing short-term funds for tuition or medical bills",
      "Anyone deciding between an MPL and a Calamity Loan after a disaster",
    ],
    whyUseful: [
      "Uses the actual 10.5% Pag-IBIG MPL rate so the estimate is realistic.",
      "Shows how the term length affects total interest paid.",
      "Helps you decide how much to borrow against your Total Accumulated Value (TAV).",
      "Reduces back-and-forth at the Pag-IBIG branch.",
    ],
    longTailKeywords: [
      { keyword: "Pag-IBIG MPL monthly amortization calculator", explanation: "High-intent query from active members preparing their application. Strong AdSense match for finance ads." },
      { keyword: "Pag-IBIG multi purpose loan 80000 monthly", explanation: "Specific peso amount that members commonly search. Easy to answer with the calculator output." },
      { keyword: "how much can I borrow from Pag-IBIG MPL", explanation: "Conversational AI query. Answer directly using the 80%-of-TAV rule." },
      { keyword: "Pag-IBIG MPL vs salary loan comparison", explanation: "Bridges to internal links to bank salary loan calculators. Excellent for topical authority." },
      { keyword: "Pag-IBIG MPL requirements 2025", explanation: "Year-tagged query with yearly refresh value. Low competition outside official Pag-IBIG pages." },
    ],
    extraFaqs: [
      { question: "How much can I borrow from the Pag-IBIG Multi-Purpose Loan?", answer: "Active members can borrow up to 80% of their Total Accumulated Value (TAV), which is your member savings plus employer counterpart and dividends. The exact amount appears in your Virtual Pag-IBIG account. The cap rises with longer membership tenure and consistent contributions." },
      { question: "What is the current Pag-IBIG MPL interest rate?", answer: "As of the latest Pag-IBIG circular, the MPL interest rate is 10.5% per annum, computed on a diminishing balance. The repayment term is up to 24 months (or up to 36 months for renewals under specific conditions). Always confirm with your branch or Virtual Pag-IBIG before applying." },
      { question: "How long does Pag-IBIG MPL approval take?", answer: "Online applications through Virtual Pag-IBIG are typically processed within a few working days. Disbursement is via LANDBANK Cash Card, payroll account, or check pickup, depending on your registered preference. Expect slightly longer processing if there are document discrepancies." },
    ],
  },
  "pag-ibig-mp2-calculator": {
    intro:
      "The Pag-IBIG MP2 Calculator estimates how much your modified savings will grow over 5 years using the latest declared dividend rate. MP2 is a voluntary savings program separate from your regular Pag-IBIG contributions. Unlike a regular savings account, MP2 dividends are tax-free and historically higher than time deposit rates, making it one of the most popular low-risk options for Filipino savers.",
    whoShouldUse: [
      "Active Pag-IBIG members and pensioners looking for tax-free passive returns",
      "OFWs building a 5-year savings goal alongside remittances",
      "Conservative savers comparing MP2 against bank time deposits",
      "Parents saving for tuition with a fixed maturity date",
    ],
    whyUseful: [
      "Shows projected maturity value using realistic dividend rates.",
      "Lets you compare lump-sum vs. monthly contribution strategies.",
      "Tax-free dividends mean the gross figure is also the net.",
      "Helps you visualize the power of compounding over 5 years.",
    ],
    longTailKeywords: [
      { keyword: "Pag-IBIG MP2 dividend rate 2025", explanation: "Yearly refresh query with strong volume. Pair with the latest declared rate." },
      { keyword: "MP2 vs time deposit Philippines", explanation: "Comparison query that opens internal links to the time deposit calculator. Excellent for topical clusters." },
      { keyword: "MP2 lump sum or monthly which is better", explanation: "High-engagement question with no single answer. Strong dwell time potential." },
      { keyword: "how to compute MP2 maturity value", explanation: "Tutorial intent. Pairs with the formula section." },
      { keyword: "is Pag-IBIG MP2 worth it OFW", explanation: "Trust + audience-specific query. Great for AI-overview answers." },
    ],
    extraFaqs: [
      { question: "Is the Pag-IBIG MP2 dividend rate guaranteed?", answer: "No. Dividends are declared annually based on Pag-IBIG Fund's net income from member loans and investments. Historically, MP2 has paid 6-8% per year, but the rate is not contractually fixed. Past performance is a useful guide but not a guarantee of future earnings." },
      { question: "Can I withdraw my MP2 savings before 5 years?", answer: "Pre-termination is allowed under specific conditions (death, total disability, retirement, permanent migration), but otherwise the funds are locked for the full 5-year term. Pre-terminated accounts may also receive lower dividend rates compared to those held until maturity." },
    ],
  },
  "13th-month-pay-calculator-philippines": {
    intro:
      "The 13th Month Pay Calculator Philippines computes the legally required bonus that all rank-and-file employees must receive by December 24 each year. The calculation follows DOLE guidelines: total basic salary earned during the calendar year divided by 12. This tool helps both employees and HR officers verify whether the amount on the payslip is correct, especially for staff who joined mid-year, took unpaid leave, or had salary adjustments.",
    whoShouldUse: [
      "Rank-and-file employees verifying their December 13th month pay",
      "HR officers and bookkeepers preparing payroll for the cutoff",
      "New hires who joined mid-year and want to estimate a prorated amount",
      "Workers on maternity leave or extended unpaid absence checking adjustments",
    ],
    whyUseful: [
      "Follows the exact DOLE formula so the number matches official payroll.",
      "Handles prorated computations for mid-year hires or resignations.",
      "Gives a quick sanity check before the December cutoff.",
      "Useful for budgeting holiday spending in advance.",
    ],
    longTailKeywords: [
      { keyword: "13th month pay computation prorated", explanation: "High-volume query every November-December. Captures employees who joined mid-year." },
      { keyword: "is 13th month pay taxable Philippines", explanation: "Trust query with a clear cutoff answer (₱90,000 exemption). Strong AI-overview potential." },
      { keyword: "13th month pay DOLE formula 2025", explanation: "Year-tagged for annual refresh. Easy to rank with updated guidance." },
      { keyword: "when is 13th month pay released Philippines", explanation: "Timing query that spikes every December. Easy to answer with the December 24 deadline." },
      { keyword: "how to compute 13th month for resigned employee", explanation: "Niche but high-intent. Captures HR users at moment of need." },
    ],
    extraFaqs: [
      { question: "Is 13th month pay taxable in the Philippines?", answer: "Under the TRAIN Law, 13th month pay and other bonuses are tax-exempt up to ₱90,000 per year. Any amount above the threshold is added to your taxable income and taxed at your regular rate. Most rank-and-file employees fall well below the cap." },
      { question: "Do resigned employees still get 13th month pay?", answer: "Yes. Employees who resigned before December are entitled to a prorated 13th month pay based on the basic salary they actually earned during their stay that year. The amount must be released as part of the final pay, typically within 30 days of separation as required by DOLE Labor Advisory No. 06-20." },
    ],
  },
  "sss-maternity-benefit-calculator": {
    intro:
      "The SSS Maternity Benefit Calculator estimates the cash benefit a qualified SSS member will receive under the Expanded Maternity Leave Law (RA 11210). The benefit covers 105 days for live births (with an extra 15 days for solo parents) and 60 days for miscarriage or emergency termination. This tool gives expectant mothers and HR officers a clear estimate before the benefit is filed with SSS.",
    whoShouldUse: [
      "Expectant mothers planning their maternity budget",
      "HR officers preparing advance payment to qualified employees",
      "Self-employed and voluntary SSS members verifying their benefit",
      "Solo parents confirming the additional 15-day allocation",
    ],
    whyUseful: [
      "Reflects the 105/120-day Expanded Maternity Leave coverage.",
      "Uses the average monthly salary credit (AMSC) method SSS applies.",
      "Helps HR plan the cash advance and reimbursement timeline.",
      "Lets members confirm whether their SSS contributions qualify them.",
    ],
    longTailKeywords: [
      { keyword: "SSS maternity benefit 105 days computation", explanation: "Direct legal query with high intent from new mothers and HR." },
      { keyword: "SSS maternity benefit solo parent extra 15 days", explanation: "Niche but legally important. Easy to answer authoritatively." },
      { keyword: "how much is SSS maternity benefit 2025", explanation: "Year-tagged. Captures users at the start of pregnancy planning." },
      { keyword: "voluntary SSS member maternity benefit Philippines", explanation: "Specific audience often missed by generic articles." },
      { keyword: "average monthly salary credit AMSC SSS maternity", explanation: "Technical query. Builds authority by explaining the input clearly." },
    ],
    extraFaqs: [
      { question: "What are the SSS contribution requirements for maternity benefit?", answer: "You must have paid at least three monthly SSS contributions within the 12-month period immediately preceding the semester of childbirth, miscarriage, or emergency termination of pregnancy. Coverage applies to employed, self-employed, voluntary, OFW, and non-working spouse members." },
      { question: "Can the father use part of the SSS maternity leave?", answer: "Under the Expanded Maternity Leave Law, the qualified female worker may transfer up to 7 days of her 105-day paid leave to the child's father, regardless of marital status, or to an alternate caregiver if the father is absent. This is in addition to the 7-day Paternity Leave under RA 8187." },
    ],
  },
  "paracetamol-dosage-calculator": {
    intro:
      "The Paracetamol Dosage Calculator estimates a safe single dose based on body weight, following the standard 10-15 mg/kg guideline for children and the typical 500-1,000 mg adult dose. It is meant as a quick reference for parents, caregivers, and patients in the Philippines who want to double-check before giving syrup or tablets. It is not a substitute for advice from a licensed pediatrician, internist, or pharmacist.",
    whoShouldUse: [
      "Parents giving Biogesic, Tempra, Calpol, or generic paracetamol to children",
      "Caregivers managing fever or pain at home",
      "Adults converting between syrup, drops, and tablet strengths",
      "Nurses and barangay health workers giving quick reference checks",
    ],
    whyUseful: [
      "Reduces accidental under- or over-dosing in children.",
      "Helps convert between syrup mg/5 mL and drops mg/0.6 mL.",
      "Reminds users of the 4-6 hour interval and daily maximum.",
      "Supports decisions during late-night fever situations when clinics are closed.",
    ],
    longTailKeywords: [
      { keyword: "paracetamol dose by weight Philippines", explanation: "High intent from worried parents. Direct answer wins both Google and AI Overview." },
      { keyword: "Biogesic syrup dosage for kids by age", explanation: "Brand-specific PH query with massive volume. Note the disclaimer to consult a doctor." },
      { keyword: "max paracetamol per day adult Philippines", explanation: "Safety query. Concise answer (4,000 mg/day) wins the snippet." },
      { keyword: "paracetamol drops vs syrup difference", explanation: "Common confusion point for first-time parents." },
      { keyword: "is it safe to give paracetamol every 4 hours", explanation: "Voice-search-friendly query with strong AI-overview potential." },
    ],
    extraFaqs: [
      { question: "When should I bring my child to the doctor instead of giving more paracetamol?", answer: "Seek medical attention if fever lasts more than 3 days, exceeds 39.5°C despite medication, is accompanied by rash, seizures, difficulty breathing, dehydration, or persistent vomiting, or if your child is under 3 months old. Always follow the advice of your pediatrician and never exceed the maximum daily dose." },
      { question: "Can I combine paracetamol with ibuprofen?", answer: "Some doctors prescribe alternating paracetamol and ibuprofen for high or persistent fever, but this should only be done under medical supervision. The two medicines have different mechanisms and maximum doses, and combining them without guidance can mask warning signs of more serious illness." },
    ],
  },
  "electricity-bill-calculator-philippines": {
    intro:
      "The Electricity Bill Calculator Philippines estimates your monthly Meralco (or other distribution utility) bill from your kWh consumption. It applies a typical residential rate to give you a quick projection before the actual bill arrives. Use it to check whether your appliances are pushing your bill higher than expected, or to plan budget adjustments after a rate hike announcement.",
    whoShouldUse: [
      "Meralco residential customers checking expected charges",
      "Households preparing for summer when consumption spikes",
      "Tenants verifying sub-meter readings against landlord billing",
      "Small businesses and home offices estimating utility expenses",
    ],
    whyUseful: [
      "Gives a fast estimate without waiting for the printed bill.",
      "Helps spot abnormal consumption from faulty appliances.",
      "Useful for budgeting before announced rate increases.",
      "Lets tenants check sub-meter charges for fairness.",
    ],
    longTailKeywords: [
      { keyword: "Meralco bill computation per kWh 2025", explanation: "Year-tagged, high-volume query. Easy to refresh with current rates." },
      { keyword: "how much is 300 kWh electricity bill Philippines", explanation: "Specific consumption query that fits voice search and AI Overviews." },
      { keyword: "aircon kWh consumption per hour Philippines", explanation: "Captures summer-spike traffic. Bridges to appliance-specific content." },
      { keyword: "why is my Meralco bill so high this month", explanation: "Frustration-driven query with strong dwell-time potential. Respond with diagnostic checklist." },
      { keyword: "estimate electricity bill before due date", explanation: "Action-oriented query. Direct match for the calculator's value proposition." },
    ],
    extraFaqs: [
      { question: "Why does my Meralco bill change even if my consumption is similar?", answer: "Meralco's per-kWh rate fluctuates monthly because of generation charges from power producers, transmission costs, system loss, and government taxes. Even with identical kWh, your bill can rise or fall by ₱100-₱500 depending on the prevailing rates approved by the Energy Regulatory Commission (ERC)." },
      { question: "Which appliances consume the most electricity in a Filipino household?", answer: "The biggest contributors are inverter and non-inverter air conditioners, refrigerators, electric water heaters, and clothes dryers. Aircon alone can account for 40-60% of a household's bill during summer. Switching to inverter models, cleaning filters monthly, and using timers can meaningfully reduce monthly consumption." },
    ],
  },
};

// ---------- Public API ----------

export const buildCalculatorContent = (calc: CalculatorDefinition): CalculatorContent => {
  const o = overrides[calc.slug] ?? {};
  return {
    whoShouldUse: o.whoShouldUse ?? audienceByCategory(calc.category),
    whyUseful: o.whyUseful ?? whyUsefulByCategory(calc.category),
    howToSteps: o.howToSteps ?? stepsFromFields(calc),
    longTailKeywords: o.longTailKeywords ?? longTailFor(calc),
    extraFaqs: o.extraFaqs ?? genericFaqsFor(calc),
    internalLinks: o.internalLinks ?? internalLinksFor(calc),
  };
};

export const getIntroOverride = (slug: string): string | undefined => overrides[slug]?.intro;

export const hasDeepOverride = (slug: string): boolean => Boolean(overrides[slug]);
