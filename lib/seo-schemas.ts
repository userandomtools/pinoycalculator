const SITE_URL = "https://pinoycalculator.com";
const SITE_NAME = "Pinoy Calculator";

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Free online calculators for Filipinos. Calculate loans, salary, 13th month pay, VAT, GWA, gaming stats, and more.",
  inLanguage: "en-PH",
  areaServed: { "@type": "Country", name: "Philippines" },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/all-calculators?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  areaServed: { "@type": "Country", name: "Philippines" },
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@pinoycalculator.com",
    contactType: "customer support",
    areaServed: "PH",
    availableLanguage: "en",
  },
});

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  })),
});

export const getCalculatorSchema = (calc: { title: string; slug: string; metaDescription: string; category: string }) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: calc.title,
  url: `${SITE_URL}/${calc.slug}`,
  description: calc.metaDescription,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  areaServed: { "@type": "Country", name: "Philippines" },
  inLanguage: "en-PH",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "PHP",
  },
  author: {
    "@type": "Organization",
    name: SITE_NAME,
  },
});

export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const getArticleSchema = (article: {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  url: `${SITE_URL}/guides/${article.slug}`,
  inLanguage: "en-PH",
  datePublished: article.datePublished || "2025-01-15",
  dateModified: article.dateModified || new Date().toISOString().split("T")[0],
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guides/${article.slug}` },
});

export const getHowToSchema = (title: string, steps: { title: string; content: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: title,
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.content,
  })),
});
