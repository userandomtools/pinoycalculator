import type { MetadataRoute } from 'next';
import { calculators, categories } from '@/data/calculators';
import { getAllGuides } from '@/data/guides';
import { getAllComparisons } from '@/data/comparisons';

const SITE_URL = 'https://pinoycalculator.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().split('T')[0];

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/all-calculators`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/comparisons`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/author`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/calculators/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const calculatorPages: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${SITE_URL}/calculators/${calc.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = getAllGuides().map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const comparisonPages: MetadataRoute.Sitemap = getAllComparisons().map((c) => ({
    url: `${SITE_URL}/comparisons/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...calculatorPages,
    ...guidePages,
    ...comparisonPages,
  ];
}

