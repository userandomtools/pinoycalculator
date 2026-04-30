import { calculators } from "@/data/calculators";
import { getAllGuides } from "@/data/guides";
import { getAllComparisons } from "@/data/comparisons";

export type ContentType = "calculator" | "guide" | "comparison";

export interface TaxonomyMeta {
  tags: string[];
  topicHubs: string[];
}

const stopWords = new Set([
  "the", "and", "for", "with", "from", "that", "this", "your", "you", "how", "what", "why", "are", "into", "than",
  "using", "use", "guide", "calculator", "compute", "calculate", "philippines", "free", "step", "steps", "works", "work",
  "all", "can", "has", "have", "had", "its", "our", "their", "them", "under", "more", "most", "each", "per", "best",
]);

const normalizeLabel = (value: string) =>
  value
    .replace(/[-_/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());

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

const buildTags = (values: string[]) => Array.from(new Set(values.filter(Boolean).map(normalizeLabel))).slice(0, 12);

const buildTopicHubs = (category: string, tokens: string[]) => {
  const baseHub = normalizeLabel(category);
  const topicTokens = tokens.slice(0, 4).map(normalizeLabel);
  return Array.from(new Set([baseHub, ...topicTokens])).slice(0, 5);
};

const calculatorMeta = Object.fromEntries(
  calculators.map(calc => {
    const tokens = tokenize(
      calc.category,
      calc.shortTitle,
      calc.title,
      calc.description,
      calc.metaDescription,
      calc.formula,
      calc.philippinesContext,
      ...calc.relatedSlugs,
    );

    return [
      calc.slug,
      {
        tags: buildTags([calc.category, calc.shortTitle, ...tokens.slice(0, 10)]),
        topicHubs: buildTopicHubs(calc.category, tokens),
      },
    ];
  }),
) satisfies Record<string, TaxonomyMeta>;

const guideMeta = Object.fromEntries(
  getAllGuides().map(guide => {
    const tokens = tokenize(guide.title, guide.metaDescription, guide.intro, ...guide.tags);

    return [
      guide.slug,
      {
        tags: buildTags([guide.category, ...guide.tags, ...tokens.slice(0, 6)]),
        topicHubs: buildTopicHubs(guide.category, tokens),
      },
    ];
  }),
) satisfies Record<string, TaxonomyMeta>;

const comparisonMeta = Object.fromEntries(
  getAllComparisons().map(comparison => {
    const tokens = tokenize(
      comparison.title,
      comparison.metaDescription,
      comparison.intro,
      ...comparison.featureHeaders,
      ...comparison.items.flatMap(item => [item.name, item.slug, ...Object.keys(item.features), ...Object.values(item.features).map(String)]),
    );

    const category = comparison.title.toLowerCase().includes("salary")
      ? "salary"
      : comparison.title.toLowerCase().includes("finance") || comparison.title.toLowerCase().includes("loan")
        ? "finance"
        : "comparison";

    return [
      comparison.slug,
      {
        tags: buildTags([category, comparison.title, ...tokens.slice(0, 10)]),
        topicHubs: buildTopicHubs(category, tokens),
      },
    ];
  }),
) satisfies Record<string, TaxonomyMeta>;

export const contentTaxonomy: Record<ContentType, Record<string, TaxonomyMeta>> = {
  calculator: calculatorMeta,
  guide: guideMeta,
  comparison: comparisonMeta,
};

export function getTaxonomyMeta(type: ContentType, slug: string): TaxonomyMeta {
  return contentTaxonomy[type][slug] ?? { tags: [], topicHubs: [] };
}
