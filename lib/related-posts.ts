import { calculators } from "@/data/calculators";
import { getAllGuides } from "@/data/guides";
import { getAllComparisons } from "@/data/comparisons";
import { getTaxonomyMeta } from "@/data/content-taxonomy";

export type RelatedPostType = "calculator" | "guide" | "comparison";

export interface RelatedPost {
  type: RelatedPostType;
  slug: string;
  title: string;
  description: string;
  category: string;
  href: string;
  badgeLabel: string;
}

interface IndexedPost extends RelatedPost {
  keywords: string[];
  tags: string[];
  topicHubs: string[];
  relatedSlugs: string[];
  linkedCalculatorSlug?: string;
  linkedContentSlugs?: string[];
}

const stopWords = new Set([
  "the", "and", "for", "with", "from", "that", "this", "your", "you", "how", "what", "why", "are", "into", "than",
  "using", "use", "guide", "calculator", "compute", "calculate", "philippines", "free", "step", "steps", "works", "work",
  "all", "can", "has", "have", "had", "its", "our", "their", "them", "under", "more", "most", "each", "per",
]);

const tokenize = (...segments: Array<string | undefined>) => {
  const tokens = segments
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(token => token.length > 2 && !stopWords.has(token));

  return Array.from(new Set(tokens));
};

const guideIndex: IndexedPost[] = getAllGuides().map(guide => {
  const taxonomy = getTaxonomyMeta("guide", guide.slug);

  return {
    type: "guide",
    slug: guide.slug,
    title: guide.title,
    description: guide.metaDescription,
    category: guide.category,
    href: `/guides/${guide.slug}`,
    badgeLabel: "Guide",
    tags: tokenize(guide.category, ...guide.tags, ...taxonomy.tags),
    topicHubs: tokenize(...taxonomy.topicHubs),
    keywords: tokenize(
      guide.title,
      guide.metaDescription,
      guide.intro,
      ...guide.steps.map(step => `${step.title} ${step.content}`),
      ...guide.faqs.map(faq => `${faq.q} ${faq.a}`),
      guide.example,
    ),
    relatedSlugs: guide.relatedGuides.map(item => item.slug),
    linkedCalculatorSlug: guide.ctaLink.replace("/calculators/", ""),
  };
});

const calculatorIndex: IndexedPost[] = calculators.map(calc => {
  const taxonomy = getTaxonomyMeta("calculator", calc.slug);

  return {
    type: "calculator",
    slug: calc.slug,
    title: calc.title,
    description: calc.metaDescription,
    category: calc.category,
    href: `/calculators/${calc.slug}`,
    badgeLabel: "Tool",
    tags: tokenize(
      calc.category,
      calc.shortTitle,
      calc.title,
      ...taxonomy.tags,
      ...calc.fields.map(field => `${field.label} ${field.placeholder ?? ""} ${field.prefix ?? ""} ${field.suffix ?? ""}`),
    ),
    topicHubs: tokenize(...taxonomy.topicHubs),
    keywords: tokenize(
      calc.title,
      calc.shortTitle,
      calc.metaDescription,
      calc.description,
      calc.formula,
      calc.formulaExplanation,
      calc.exampleCalculation,
      calc.philippinesContext,
      ...calc.faqs.map(faq => `${faq.question} ${faq.answer}`),
      ...calc.references.map(reference => reference.title),
    ),
    relatedSlugs: calc.relatedSlugs,
  };
});

const comparisonIndex: IndexedPost[] = getAllComparisons().map(comparison => {
  const taxonomy = getTaxonomyMeta("comparison", comparison.slug);

  return {
    type: "comparison",
    slug: comparison.slug,
    title: comparison.title,
    description: comparison.metaDescription,
    category: taxonomy.topicHubs[0]?.toLowerCase() ?? "comparison",
    href: `/comparisons/${comparison.slug}`,
    badgeLabel: "Comparison",
    tags: tokenize(comparison.title, comparison.metaDescription, ...taxonomy.tags),
    topicHubs: tokenize(...taxonomy.topicHubs),
    keywords: tokenize(
      comparison.title,
      comparison.metaDescription,
      comparison.intro,
      ...comparison.featureHeaders,
      ...comparison.items.flatMap(item => [item.name, item.slug, ...Object.keys(item.features), ...Object.values(item.features).map(String)]),
    ),
    relatedSlugs: comparison.items.map(item => item.slug),
    linkedContentSlugs: comparison.items.map(item => item.slug),
  };
});

const contentIndex: IndexedPost[] = [...calculatorIndex, ...guideIndex, ...comparisonIndex];

const countShared = (left: string[], right: string[]) => {
  const values = new Set(left);
  let count = 0;

  for (const item of right) {
    if (values.has(item)) {
      count += 1;
    }
  }

  return count;
};

const scorePost = (current: IndexedPost, candidate: IndexedPost) => {
  let score = 0;

  if (current.relatedSlugs.includes(candidate.slug)) score += 120;
  if (current.linkedContentSlugs?.includes(candidate.slug)) score += 100;
  if (candidate.linkedContentSlugs?.includes(current.slug)) score += 65;
  if (current.linkedCalculatorSlug === candidate.slug) score += 90;
  if (candidate.linkedCalculatorSlug === current.slug) score += 60;
  if (current.category === candidate.category) score += 48;

  const sharedTags = countShared(current.tags, candidate.tags);
  const sharedTopicHubs = countShared(current.topicHubs, candidate.topicHubs);
  const sharedKeywords = countShared(current.keywords, candidate.keywords);

  score += sharedTopicHubs * 20;
  score += sharedTags * 14;
  score += Math.min(sharedKeywords, 10) * 5;

  if (current.type !== candidate.type) score += 8;

  return score;
};

export function getRelatedPosts({
  type,
  slug,
  limit = 12,
}: {
  type: RelatedPostType;
  slug: string;
  limit?: number;
}): RelatedPost[] {
  const current = contentIndex.find(item => item.type === type && item.slug === slug);

  if (!current) {
    return [];
  }

  const minimum = Math.max(limit, 12);
  const otherTypeSource = contentIndex.filter(item => item.type !== type);
  const sameTypeSource = contentIndex.filter(item => item.type === type);

  const rankEntries = (items: IndexedPost[]) =>
    items
      .filter(item => !(item.type === type && item.slug === slug))
      .map(item => ({ item, score: scorePost(current, item) }))
      .sort((left, right) => right.score - left.score || left.item.title.localeCompare(right.item.title));

  const otherTypeRanked = rankEntries(otherTypeSource);
  const sameTypeRanked = rankEntries(sameTypeSource);
  const guaranteedOtherType = Math.min(otherTypeRanked.length, Math.max(2, Math.min(4, Math.floor(minimum / 3))));

  const primarySelection = [
    ...otherTypeRanked.slice(0, guaranteedOtherType),
    ...sameTypeRanked,
    ...otherTypeRanked.slice(guaranteedOtherType),
  ];

  const fallbackSelection = contentIndex
    .filter(item => !(item.type === type && item.slug === slug))
    .map(item => ({ item, score: scorePost(current, item) }))
    .sort((left, right) => right.score - left.score || left.item.title.localeCompare(right.item.title));

  const uniqueSelection = Array.from(
    new Map([...primarySelection, ...fallbackSelection].map(entry => [`${entry.item.type}-${entry.item.slug}`, entry])).values(),
  ).slice(0, minimum);

  return uniqueSelection.map(({ item }) => ({
    type: item.type,
    slug: item.slug,
    title: item.title,
    description: item.description,
    category: item.category,
    href: item.href,
    badgeLabel: item.badgeLabel,
  }));
}
