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

addToField("cochran-formula-calculator", "philippinesContext", "For business and market research in the Philippines, the Cochran formula is essential for determining statistically valid consumer survey sample sizes. Companies conducting brand awareness studies, customer satisfaction surveys, and product testing among Filipino consumers rely on proper sample size computation to produce actionable insights.");

addToField("mlbb-win-rate-calculator", "description", "The calculator is also valuable for content creators and streamers who need to track their stats across different heroes and game modes. Many Filipino MLBB content creators on YouTube and TikTok showcase their win rates as proof of expertise, and understanding the math behind win rate changes helps set realistic expectations for both creators and viewers. Esports analysts also use win rate calculations to evaluate player performance and team compositions during MPL drafts.");

addToField("mlbb-win-rate-calculator", "philippinesContext", "The Philippines has won multiple international MLBB tournaments including the Southeast Asian Games (SEA Games) esports gold medal and M-series world championships. Filipino teams like Blacklist International, ECHO, and Omega have dominated the MPL scene. The game's popularity extends beyond competitive play — it is a common social activity, with groups of friends and coworkers playing together during breaks and after work hours. Internet cafes (computer shops) across the Philippines remain popular venues for MLBB gaming sessions.");

addToField("electricity-bill-calculator-philippines", "description", "For households with solar panels, understanding your baseline electricity consumption helps calculate the payback period of your solar investment and determine the optimal system size. For renters negotiating shared utility costs with landlords or housemates, this calculator provides a transparent basis for splitting electricity expenses fairly based on actual consumption patterns.");

addToField("electricity-bill-calculator-philippines", "philippinesContext", "The Philippine government has been promoting renewable energy to reduce dependence on imported fossil fuels and lower electricity costs. The Renewable Energy Act (RA 9513) provides incentives for solar, wind, and biomass installations. The DOE target is to achieve 35% renewable energy share in the power mix by 2030. For consumers, rooftop solar panels with net metering offer the most direct path to reducing electricity bills, with typical payback periods of 5-7 years for properly sized systems.");

fs.writeFileSync(file, c);
console.log('Boost batch 5 complete');
