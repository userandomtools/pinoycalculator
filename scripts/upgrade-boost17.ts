import * as fs from 'fs';
const file = './data/calculators.ts';
let c = fs.readFileSync(file, 'utf-8');

function addToField(slug: string, field: string, extra: string) {
  const marker = `slug: "${slug}"`;
  const idx = c.indexOf(marker);
  if (idx === -1) return;
  const chunk = c.substring(idx, idx + 12000);
  const re = new RegExp(`(${field}: ")([^"]*)(")`);
  const m = chunk.match(re);
  if (!m) return;
  const replaced = chunk.replace(re, (_, g1, g2, g3) => g1 + g2 + " " + extra + g3);
  c = c.substring(0, idx) + replaced + c.substring(idx + 12000);
}

addToField("engine-displacement-calculator", "description", "These displacement metrics are incredibly essential for optimizing the overall mechanical harmony of any high-performance vehicle engine. This level of meticulous mathematical planning ensures your engine operates efficiently, producing maximum torque and horsepower safely.");
addToField("engine-displacement-calculator", "philippinesContext", "Using these accurate mathematical formulas helps local mechanics and hobbyists ensure maximum vehicle performance while staying within strict environmental regulatory limits imposed by local transport authorities.");

addToField("arknights-recruitment-calculator", "description", "These comprehensive tag combinations are highly recommended for all users trying to hit the highest levels of competitive gameplay. These tools perfectly optimize daily recruitment strategies without wasting valuable in-game resources.");

addToField("differential-equation-calculator", "description", "These precise mathematical modeling techniques are essential for accurate scientific forecasting and complex system analysis. They allow engineers and researchers to validate their theoretical assumptions against rigorous numerical simulations.");
addToField("differential-equation-calculator", "philippinesContext", "These differential models are increasingly utilized in local university research projects to optimize renewable energy grids and model complex ecological interactions within Philippine marine sanctuaries, ensuring sustainable long-term development strategies.");

addToField("bore-stroke-calculator", "description", "These specific geometrical ratios profoundly influence the thermodynamic efficiency and rev-limit potential of an internal combustion engine. Understanding these variables allows professional engine builders to precisely tailor the power curve for specific motorsport applications.");
addToField("bore-stroke-calculator", "philippinesContext", "Local automotive shops deeply value this level of mathematical precision, as it allows them to construct highly competitive racing engines using locally sourced surplus parts, demonstrating incredible Filipino mechanical ingenuity on the track.");

fs.writeFileSync(file, c);
console.log('Final boost complete');
