/**
 * Build-time sitemap generator.
 * Run: npx tsx scripts/generate-sitemap.ts
 * Outputs to public/sitemap.xml
 */

const SITE_URL = "https://pinoycalculator.com";
const today = new Date().toISOString().split("T")[0];

// All calculator slugs (excluding category slugs)
const categorySlugs = ["finance", "salary", "gaming", "academic", "health", "crypto", "engineering", "utilities"];

const calculatorSlugs = [
  "loan-calculator-philippines", "vat-calculator-philippines", "pag-ibig-mp2-calculator",
  "time-deposit-calculator", "pwd-discount-calculator", "bpi-credit-to-cash-calculator",
  "bdo-installment-calculator", "home-credit-interest-rate-calculator",
  "landbank-salary-loan-calculator", "metrobank-auto-loan-calculator",
  "metrobank-home-loan-calculator", "rcbc-car-loan-calculator",
  "cimb-bank-personal-loan-calculator", "eastwest-personal-loan-calculator",
  "pag-ibig-mpl-calculator", "afpslai-loan-calculator", "psslai-loan-calculator",
  "psbank-car-loan-calculator", "pag-ibig-multi-purpose-loan-calculator",
  "13th-month-pay-calculator-philippines", "night-differential-calculator",
  "sss-contribution-calculator", "sss-maternity-benefit-calculator",
  "sss-sickness-benefit-calculator", "philhealth-contribution-calculator",
  "mlbb-win-rate-calculator", "axie-infinity-energy-calculator",
  "ragnarok-stat-calculator", "arknights-recruitment-calculator",
  "nether-portal-calculator",
  "gwa-calculator-philippines", "dlsu-gpa-calculator", "gpa-calculator-philippines",
  "slovin-formula-calculator", "cochran-formula-calculator", "raosoft-sample-size-calculator",
  "cronbachs-alpha-calculator", "gaussian-elimination-calculator", "k-map-calculator",
  "general-weighted-average-calculator",
  "bmi-calculator-philippines", "waist-to-hip-ratio-calculator", "vo2-max-calculator",
  "paracetamol-dosage-calculator", "co-amoxiclav-pediatric-dose-calculator",
  "dog-pregnancy-calculator", "canine-pregnancy-calculator", "pack-per-year-calculator",
  "age-calculator", "electricity-bill-calculator-philippines",
  "toll-calculator-philippines", "aquarium-gallon-calculator",
  "angel-number-calculator", "sun-moon-rising-sign-calculator",
  "lilith-sign-calculator", "chiron-sign-calculator",
  "engine-displacement-calculator", "engine-cc-calculator", "bore-stroke-calculator",
  "bnb-to-php-calculator",
  "differential-equation-calculator", "excel-formula-age-calculator",
  "mp2-savings-calculator", "ml-wr-calculator", "axie-calculator-energy",
  "ro-stat-calculator", "gwa-calculator-college",
  "13th-month-calculator", "sss-maternity-calculator", "bdo-installment-card-calculator",
  "how-to-compute-13th-month-pay-calculator", "how-to-calculate-13th-month",
  "13th-month-pay-calculation-dole",
  "scientific-calculator-price-philippines", "huawei-code-calculator",
  "prc-approved-calculator-guide", "tagalog-of-calculator",
  "canon-scientific-calculator-guide", "casio-calculator-watch-guide",
  "non-programmable-calculator-guide", "philippine-vat-calculator",
  "metrobank-car-loan-calculator",
];

// Remove duplicates
const uniqueCalcSlugs = [...new Set(calculatorSlugs)];

const guideSlugs = [
  "how-to-compute-13th-month-pay-philippines",
  "pag-ibig-mp2-savings-guide",
  "how-to-compute-gwa-college",
  "how-to-calculate-vat-philippines",
  "how-to-calculate-night-differential",
];

const comparisonSlugs = [
  "best-loan-calculators-philippines",
  "best-salary-calculators-philippines",
  "best-finance-calculators-philippines",
];

const staticPages = [
  { path: "/", priority: "1.0", freq: "weekly" },
  { path: "/all-calculators", priority: "0.9", freq: "weekly" },
  { path: "/guides", priority: "0.9", freq: "weekly" },
  { path: "/comparisons", priority: "0.8", freq: "monthly" },
  { path: "/about", priority: "0.5", freq: "monthly" },
  { path: "/contact", priority: "0.5", freq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", freq: "yearly" },
  { path: "/terms-of-service", priority: "0.3", freq: "yearly" },
  { path: "/disclaimer", priority: "0.3", freq: "yearly" },
  { path: "/author", priority: "0.7", freq: "monthly" },
  { path: "/author/ziven-borceg", priority: "0.7", freq: "monthly" },
  { path: "/author/ripion-chakma", priority: "0.7", freq: "monthly" },
];

function urlEntry(loc: string, priority: string, changefreq: string) {
  return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const entries: string[] = [];

// Static pages
staticPages.forEach(p => entries.push(urlEntry(p.path, p.priority, p.freq)));

// Category pages
categorySlugs.forEach(s => entries.push(urlEntry(`/${s}`, "0.8", "weekly")));

// Calculator pages
uniqueCalcSlugs.forEach(s => entries.push(urlEntry(`/${s}`, "0.8", "monthly")));

// Guide pages
guideSlugs.forEach(s => entries.push(urlEntry(`/guides/${s}`, "0.8", "monthly")));

// Comparison pages
comparisonSlugs.forEach(s => entries.push(urlEntry(`/comparisons/${s}`, "0.7", "monthly")));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

writeFileSync(resolve(__dirname, "../public/sitemap.xml"), sitemap, "utf-8");
console.log(`✅ Sitemap generated with ${entries.length} URLs`);
