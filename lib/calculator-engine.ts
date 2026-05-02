import { CalculatorDefinition } from "@/data/calculators";

type CalcValues = Record<string, number | string>;

export function computeCalculator(calc: CalculatorDefinition, values: CalcValues): Record<string, string | number> {
  const slug = calc.slug;

  switch (slug) {
    case "loan-calculator-philippines": {
      const P = Number(values.principal) || 0;
      const annualRate = Number(values.rate) || 0;
      const n = Number(values.term) || 1;
      const r = annualRate / 100 / 12;
      if (r === 0) {
        const monthly = P / n;
        return { "Monthly Payment": `₱${monthly.toFixed(2)}`, "Total Payment": `₱${P.toFixed(2)}`, "Total Interest": "₱0.00" };
      }
      const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = M * n;
      return { "Monthly Payment": `₱${M.toFixed(2)}`, "Total Payment": `₱${total.toFixed(2)}`, "Total Interest": `₱${(total - P).toFixed(2)}` };
    }

    case "vat-calculator-philippines": {
      const amount = Number(values.amount) || 0;
      const type = values.type || "exclusive";
      if (type === "exclusive") {
        const vat = amount * 0.12;
        return { "VAT Amount": `₱${vat.toFixed(2)}`, "VAT-Inclusive Price": `₱${(amount + vat).toFixed(2)}`, "Base Price": `₱${amount.toFixed(2)}` };
      } else {
        const base = amount / 1.12;
        const vat = amount - base;
        return { "VAT Amount": `₱${vat.toFixed(2)}`, "Base Price (VAT-Exclusive)": `₱${base.toFixed(2)}`, "VAT-Inclusive Price": `₱${amount.toFixed(2)}` };
      }
    }

    case "pag-ibig-mp2-calculator": {
      const monthly = Number(values.monthly) || 0;
      const rate = (Number(values.rate) || 7) / 100;
      const years = Number(values.years) || 5;
      const r = rate / 12;
      const n = years * 12;
      const fv = monthly * ((Math.pow(1 + r, n) - 1) / r);
      const totalContrib = monthly * n;
      return { "Total Contributions": `₱${totalContrib.toFixed(2)}`, "Estimated Total Value": `₱${fv.toFixed(2)}`, "Estimated Dividends": `₱${(fv - totalContrib).toFixed(2)}` };
    }

    case "time-deposit-calculator": {
      const deposit = Number(values.deposit) || 0;
      const rate = (Number(values.rate) || 0) / 100;
      const term = Number(values.term) || 365;
      const grossInterest = deposit * rate * (term / 365);
      const tax = grossInterest * 0.20;
      const netInterest = grossInterest - tax;
      return { "Gross Interest": `₱${grossInterest.toFixed(2)}`, "Tax (20%)": `₱${tax.toFixed(2)}`, "Net Interest": `₱${netInterest.toFixed(2)}`, "Total at Maturity": `₱${(deposit + netInterest).toFixed(2)}` };
    }

    case "pwd-discount-calculator": {
      const price = Number(values.originalPrice) || 0;
      const type = values.isVatInclusive || "inclusive";
      const base = type === "inclusive" ? price / 1.12 : price;
      const discount = base * 0.20;
      const finalPrice = base - discount;
      return { "Base Price (VAT-Exclusive)": `₱${base.toFixed(2)}`, "PWD Discount (20%)": `₱${discount.toFixed(2)}`, "Final Price": `₱${finalPrice.toFixed(2)}`, "Total Savings": `₱${(price - finalPrice).toFixed(2)}` };
    }

    case "bpi-credit-to-cash-calculator":
    case "bdo-installment-calculator":
    case "bdo-installment-card-calculator":
    case "home-credit-interest-rate-calculator": {
      const amount = Number(values.amount) || 0;
      const rate = (Number(values.rate) || 1.29) / 100;
      const term = Number(values.term) || 12;
      const totalInterest = amount * rate * term;
      const monthlyPayment = (amount + totalInterest) / term;
      return { "Monthly Payment": `₱${monthlyPayment.toFixed(2)}`, "Total Interest": `₱${totalInterest.toFixed(2)}`, "Total Amount Payable": `₱${(amount + totalInterest).toFixed(2)}` };
    }

    case "13th-month-pay-calculator-philippines": {
      const salary = Number(values.monthlySalary) || 0;
      const months = Number(values.monthsWorked) || 12;
      const thirteenth = (salary * months) / 12;
      return { "13th Month Pay": `₱${thirteenth.toFixed(2)}`, "Total Basic Salary Earned": `₱${(salary * months).toFixed(2)}`, "Months Worked": `${months}` };
    }

    case "night-differential-calculator": {
      const daily = Number(values.dailyRate) || 0;
      const hours = Number(values.nightHours) || 0;
      const hourlyRate = daily / 8;
      const nsd = hourlyRate * 0.10 * hours;
      return { "Hourly Rate": `₱${hourlyRate.toFixed(2)}`, "NSD per Hour": `₱${(hourlyRate * 0.10).toFixed(2)}`, "Total NSD Pay": `₱${nsd.toFixed(2)}`, "Total Night Pay": `₱${(daily + nsd).toFixed(2)}` };
    }

    case "sss-maternity-benefit-calculator": {
      const credit = Number(values.monthlySalaryCredit) || 0;
      const type = values.deliveryType || "normal";
      const dailyAllowance = (credit * 6) / 180;
      let days = 105;
      if (type === "solo") days = 120;
      const total = dailyAllowance * days;
      return { "Daily Allowance": `₱${dailyAllowance.toFixed(2)}`, "Leave Days": `${days} days`, "Total Maternity Benefit": `₱${total.toFixed(2)}` };
    }

    case "gwa-calculator-philippines":
    case "dlsu-gpa-calculator": {
      try {
        const gradesArr = JSON.parse(String(values.grades || "[]"));
        let totalUnits = 0;
        let weightedSum = 0;
        for (const g of gradesArr) {
          const grade = Number(g.grade);
          const units = Number(g.units);
          if (!isNaN(grade) && !isNaN(units) && units > 0) {
            totalUnits += units;
            weightedSum += (grade * units);
          }
        }
        if (totalUnits === 0) return { "Status": "Please add valid grades and units in the table." };
        const gwa = weightedSum / totalUnits;
        const resultLabel = slug === "dlsu-gpa-calculator" ? "Your GPA" : "Your GWA";
        return { [resultLabel]: gwa.toFixed(3), "Total Units": `${totalUnits}` };
      } catch (e) {
        return { "Status": "Please add subjects to calculate." };
      }
    }

    case "slovin-formula-calculator": {
      const N = Number(values.population) || 1;
      const e = Number(values.margin) || 0.05;
      const n = Math.ceil(N / (1 + N * e * e));
      return { "Required Sample Size": `${n} respondents`, "Population": `${N}`, "Margin of Error": `${(e * 100).toFixed(1)}%` };
    }

    case "cochran-formula-calculator": {
      const z = Number(values.z) || 1.96;
      const p = Number(values.p) || 0.5;
      const e = Number(values.e) || 0.05;
      const q = 1 - p;
      const n = Math.ceil((z * z * p * q) / (e * e));
      return { "Required Sample Size": `${n} respondents`, "Z-Score": `${z}`, "Proportion (p)": `${p}`, "Margin of Error": `${(e * 100).toFixed(1)}%` };
    }

    case "waist-to-hip-ratio-calculator": {
      const waist = Number(values.waist) || 0;
      const hip = Number(values.hip) || 1;
      const gender = values.gender || "male";
      const whr = waist / hip;
      let risk = "Low Risk";
      if (gender === "male" && whr >= 0.90) risk = "High Risk";
      else if (gender === "male" && whr >= 0.85) risk = "Moderate Risk";
      else if (gender === "female" && whr >= 0.85) risk = "High Risk";
      else if (gender === "female" && whr >= 0.80) risk = "Moderate Risk";
      return { "Waist-to-Hip Ratio": whr.toFixed(3), "Health Risk": risk };
    }

    case "vo2-max-calculator": {
      const distance = Number(values.distance) || 0;
      const vo2 = (distance - 504.9) / 44.73;
      let level = "Poor";
      if (vo2 >= 50) level = "Excellent";
      else if (vo2 >= 40) level = "Good";
      else if (vo2 >= 35) level = "Average";
      else if (vo2 >= 25) level = "Below Average";
      return { "VO2 Max": `${vo2.toFixed(1)} ml/kg/min`, "Fitness Level": level };
    }

    case "mlbb-win-rate-calculator": {
      const total = Number(values.totalMatches) || 0;
      const wins = Number(values.wins) || 0;
      const target = (Number(values.targetWR) || 60) / 100;
      const currentWR = total > 0 ? (wins / total) * 100 : 0;
      let winsNeeded = 0;
      if (currentWR / 100 < target && target < 1) {
        winsNeeded = Math.ceil((target * total - wins) / (1 - target));
      }
      return { "Current Win Rate": `${currentWR.toFixed(2)}%`, "Wins Needed for Target": winsNeeded > 0 ? `${winsNeeded} consecutive wins` : "Already achieved!", "Losses": `${total - wins}` };
    }

    case "axie-infinity-energy-calculator": {
      const count = Number(values.axieCount) || 3;
      let energy = 20;
      if (count >= 20) energy = 60;
      else if (count >= 10) energy = 40;
      return { "Daily Energy": `${energy}`, "Arena Matches per Day": `${energy}`, "Number of Axies": `${count}` };
    }

    case "ragnarok-stat-calculator": {
      const stats = { str: Number(values.str) || 1, agi: Number(values.agi) || 1, vit: Number(values.vit) || 1, int: Number(values.int) || 1, dex: Number(values.dex) || 1, luk: Number(values.luk) || 1 };
      let totalPoints = 0;
      for (const val of Object.values(stats)) {
        for (let i = 2; i <= val; i++) {
          totalPoints += Math.floor((i - 1) / 10) + 2;
        }
      }
      const atk = Math.floor(stats.str) + Math.floor(stats.str / 10) * Math.floor(stats.str / 10);
      const aspd = stats.agi;
      const maxHp = stats.vit * 100;
      return { "Total Stat Points Used": `${totalPoints}`, "Bonus ATK (from STR)": `${atk}`, "ASPD Modifier (AGI)": `${aspd}`, "HP Modifier (VIT×100)": `${maxHp}` };
    }

    case "bnb-to-php-calculator": {
      const bnb = Number(values.bnb) || 0;
      const rate = Number(values.rate) || 35000;
      const php = bnb * rate;
      return { "PHP Value": `₱${php.toFixed(2)}`, "Exchange Rate": `₱${rate.toLocaleString()} per BNB` };
    }

    case "engine-displacement-calculator": {
      const bore = Number(values.bore) || 0;
      const stroke = Number(values.stroke) || 0;
      const cylinders = Number(values.cylinders) || 1;
      const displacement = (Math.PI / 4) * Math.pow(bore, 2) * stroke * cylinders / 1000;
      return { "Engine Displacement": `${displacement.toFixed(1)} CC`, "Liters": `${(displacement / 1000).toFixed(2)} L`, "Cylinders": `${cylinders}` };
    }

    case "bdo-installment-calculator": {
      const amount = Number(values.amount) || 0;
      const rate = (Number(values.rate) || 1.5) / 100;
      const term = Number(values.term) || 12;
      const totalInterest = amount * rate * term;
      const monthlyPayment = (amount + totalInterest) / term;
      return { "Monthly Payment": `₱${monthlyPayment.toFixed(2)}`, "Total Interest": `₱${totalInterest.toFixed(2)}`, "Total Amount Payable": `₱${(amount + totalInterest).toFixed(2)}` };
    }

    case "metrobank-car-loan-calculator":
    case "psbank-car-loan-calculator":
    case "afpslai-loan-calculator":
    case "psslai-loan-calculator":
    case "pag-ibig-multi-purpose-loan-calculator":
    case "landbank-salary-loan-calculator":
    case "metrobank-auto-loan-calculator":
    case "rcbc-car-loan-calculator":
    case "cimb-bank-personal-loan-calculator":
    case "eastwest-personal-loan-calculator":
    case "metrobank-home-loan-calculator": {
      const P = Number(values.principal) || 0;
      const annualRate = Number(values.rate) || 0;
      const n = Number(values.term) || 1;
      const r = annualRate / 100 / 12;
      if (r === 0) {
        const monthly = P / n;
        return { "Monthly Payment": `₱${monthly.toFixed(2)}`, "Total Payment": `₱${P.toFixed(2)}`, "Total Interest": "₱0.00" };
      }
      const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = M * n;
      return { "Monthly Payment": `₱${M.toFixed(2)}`, "Total Payment": `₱${total.toFixed(2)}`, "Total Interest": `₱${(total - P).toFixed(2)}` };
    }

    case "raosoft-sample-size-calculator": {
      const N = Number(values.population) || 10000;
      const conf = Number(values.confidence) || 95;
      const margin = (Number(values.margin) || 5) / 100;
      const p = (Number(values.response) || 50) / 100;
      const zMap: Record<number, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };
      const z = zMap[conf] || 1.96;
      const x = z * z * p * (1 - p) / (margin * margin);
      const n = Math.ceil(N * x / (N - 1 + x));
      return { "Required Sample Size": `${n} respondents`, "Population": `${N}`, "Confidence Level": `${conf}%`, "Margin of Error": `${(margin * 100).toFixed(0)}%` };
    }

    case "arknights-recruitment-calculator": {
      const hours = Number(values.hours) || 9;
      const stars = Number(values.guaranteedStars) || 3;
      let minRarity = 3;
      if (hours >= 9 && stars >= 6) minRarity = 6;
      else if (hours >= 9 && stars >= 5) minRarity = 5;
      else if (hours >= 7.67) minRarity = 4;
      return { "Minimum Guaranteed Rarity": `${minRarity}★`, "Recruitment Time": `${hours} hours`, "Tip": minRarity >= 5 ? "Great tag combination! Don't refresh." : "Consider using longer timer for better results." };
    }

    case "excel-formula-age-calculator": {
      const y = Number(values.birthYear) || 2000;
      const m = Number(values.birthMonth) || 1;
      const d = Number(values.birthDay) || 1;
      const birth = new Date(y, m - 1, d);
      const today = new Date();
      let ageYears = today.getFullYear() - birth.getFullYear();
      let ageMonths = today.getMonth() - birth.getMonth();
      let ageDays = today.getDate() - birth.getDate();
      if (ageDays < 0) { ageMonths--; ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
      if (ageMonths < 0) { ageYears--; ageMonths += 12; }
      return { "Age": `${ageYears} years, ${ageMonths} months, ${ageDays} days`, "Excel Formula": `=DATEDIF("${m}/${d}/${y}", TODAY(), "Y")`, "Total Days": `${Math.floor((today.getTime() - birth.getTime()) / 86400000)} days` };
    }

    case "differential-equation-calculator": {
      const k = Number(values.k) || 0;
      const y0 = Number(values.y0) || 1;
      const x = Number(values.x) || 0;
      const result = y0 * Math.exp(k * x);
      return { "Solution": `y(${x}) = ${result.toFixed(4)}`, "General Form": `y = ${y0} × e^(${k}x)`, "Rate Constant (k)": `${k}` };
    } {
      const budget = Number(values.budget) || 0;
      if (budget >= 1500) return { "Recommendation": "Casio fx-991ES PLUS (~₱1,350) or Canon F-718SGA (~₱800)", "Budget Status": "Great budget for a quality scientific calculator", "Tip": "Both are PRC-approved for board exams" };
      if (budget >= 700) return { "Recommendation": "Casio fx-82ES PLUS (~₱750) or Canon F-715SG (~₱600)", "Budget Status": "Good for basic scientific calculator", "Tip": "These cover most school and exam needs" };
      return { "Recommendation": "Look for sale prices on Shopee/Lazada", "Budget Status": `₱${budget} — consider saving up to ₱700+`, "Tip": "Check National Bookstore for student discounts" };
    } {
      return { "Notice": "For security, use official Huawei support", "Huawei PH Hotline": "1-800-8-8288463", "Tip": "Visit an authorized Huawei service center for device unlocking" };
    } {
      const exam = values.examType || "engineering";
      return { "PRC Rule": "Non-programmable scientific calculators ONLY", "Top Picks": "Casio fx-991ES PLUS, Casio fx-82ES PLUS, Canon F-718SGA", "Exam Type": exam === "engineering" ? "Engineering boards — Casio fx-991ES PLUS recommended" : "Standard board exam — any non-programmable calculator" };
    } {
      const term = values.term || "calculator";
      const translations: Record<string, string> = {
        calculator: "Kalkulador / Pantaya",
        math: "Matematika",
        addition: "Pagdaragdag",
        subtraction: "Pagbabawas",
      };
      return { "Tagalog Translation": translations[term as string] || "Kalkulador", "English Term": String(term), "Note": "Kalkulador is the most commonly used Filipino term for calculator" };
    }

    case "k-map-calculator": {
      const vars = Number(values.variables) || 2;
      const minterms = String(values.minterms || "").split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      const maxMinterm = Math.pow(2, vars) - 1;
      const validMinterms = minterms.filter(m => m >= 0 && m <= maxMinterm);
      return { "Variables": `${vars}`, "Valid Minterms": validMinterms.join(", ") || "None entered", "Max Minterm": `${maxMinterm}`, "Tip": `For ${vars} variables, minterms range from 0 to ${maxMinterm}. Group adjacent 1s in powers of 2.` };
    } {
      const amount = Number(values.amount) || 0;
      const type = values.type || "exclusive";
      if (type === "exclusive") {
        const vat = amount * 0.12;
        return { "VAT Amount": `₱${vat.toFixed(2)}`, "VAT-Inclusive Price": `₱${(amount + vat).toFixed(2)}`, "Base Price": `₱${amount.toFixed(2)}` };
      } else {
        const base = amount / 1.12;
        const vat = amount - base;
        return { "VAT Amount": `₱${vat.toFixed(2)}`, "Base Price": `₱${base.toFixed(2)}`, "VAT-Inclusive Price": `₱${amount.toFixed(2)}` };
      }
    } {
      const budget = Number(values.budget) || 0;
      if (budget >= 1500) return { "Recommendation": "Casio fx-991ES PLUS (~₱1,350)", "Budget Status": "Great budget for a top-tier non-programmable calculator", "PRC Status": "PRC-Approved ✓" };
      if (budget >= 700) return { "Recommendation": "Casio fx-82ES PLUS (~₱750) or Canon F-718SGA (~₱800)", "Budget Status": "Good for a reliable non-programmable calculator", "PRC Status": "PRC-Approved ✓" };
      return { "Recommendation": "Check Shopee/Lazada for deals", "Budget Status": `₱${budget} — save up to ₱700+`, "PRC Status": "Ensure any purchase is non-programmable" };
    }

    case "paracetamol-dosage-calculator": {
      const weight = Number(values.weight) || 0;
      const ageGroup = values.ageGroup || "child";
      if (ageGroup === "child") {
        const minDose = weight * 10;
        const maxDose = weight * 15;
        const maxDaily = weight * 60;
        return { "Recommended Dose": `${minDose}-${maxDose} mg per dose`, "Max Daily Dose": `${maxDaily} mg/day`, "Frequency": "Every 4-6 hours (max 5 doses/day)", "Warning": "Consult a doctor for children under 2" };
      }
      return { "Recommended Dose": "500-1,000 mg per dose", "Max Daily Dose": "4,000 mg/day", "Frequency": "Every 4-6 hours (max 4 doses/day)", "Note": "Do not exceed maximum daily dose" };
    }

    case "co-amoxiclav-pediatric-dose-calculator": {
      const weight = Number(values.weight) || 0;
      const severity = values.severity || "mild";
      const dosePerDay = severity === "severe" ? 45 : 25;
      const totalDaily = weight * dosePerDay;
      const perDose = totalDaily / 2;
      return { "Total Daily Dose": `${totalDaily} mg/day`, "Per Dose (every 12h)": `${perDose} mg`, "Dose Basis": `${dosePerDay} mg/kg/day`, "Warning": "Always consult a physician before giving antibiotics" };
    }

    case "cronbachs-alpha-calculator": {
      const k = Number(values.items) || 2;
      const avgVar = Number(values.avgVariance) || 0;
      const totalVar = Number(values.totalVariance) || 1;
      const sumItemVar = avgVar * k;
      const alpha = (k / (k - 1)) * (1 - sumItemVar / totalVar);
      let interpretation = "Unacceptable";
      if (alpha >= 0.9) interpretation = "Excellent";
      else if (alpha >= 0.8) interpretation = "Good";
      else if (alpha >= 0.7) interpretation = "Acceptable";
      else if (alpha >= 0.6) interpretation = "Questionable";
      else if (alpha >= 0.5) interpretation = "Poor";
      return { "Cronbach's Alpha": alpha.toFixed(4), "Interpretation": interpretation, "Number of Items": `${k}`, "Sum of Item Variances": sumItemVar.toFixed(2) };
    }
      return { note: "Use the grade table below to enter subjects." };

    case "electricity-bill-calculator-philippines": {
      const kwh = Number(values.kwh) || 0;
      const rate = Number(values.ratePerKwh) || 11.5;
      const bill = kwh * rate;
      return { "Estimated Bill": `₱${bill.toFixed(2)}`, "kWh Consumed": `${kwh} kWh`, "Rate per kWh": `₱${rate.toFixed(2)}`, "Note": "Actual bill includes generation, transmission, and other charges" };
    }

    case "nether-portal-calculator": {
      const x = Number(values.overworldX) || 0;
      const z = Number(values.overworldZ) || 0;
      return { "Nether X": `${Math.floor(x / 8)}`, "Nether Z": `${Math.floor(z / 8)}`, "Overworld X": `${x}`, "Overworld Z": `${z}`, "Tip": "Build your Nether portal at these exact coordinates for a perfect link" };
    }

    case "pack-per-year-calculator": {
      const packs = Number(values.packsPerDay) || 0;
      const years = Number(values.years) || 0;
      const packYears = packs * years;
      let risk = "Low";
      if (packYears >= 30) risk = "Very High";
      else if (packYears >= 20) risk = "High";
      else if (packYears >= 10) risk = "Moderate";
      return { "Pack-Years": packYears.toFixed(1), "Risk Level": risk, "Total Cigarettes (est.)": `${Math.round(packYears * 365 * 20).toLocaleString()}` };
    }

    case "sss-sickness-benefit-calculator": {
      const credit = Number(values.monthlySalaryCredit) || 0;
      const days = Number(values.sickDays) || 0;
      const dailyCredit = (credit * 6) / 180;
      const dailyAllowance = dailyCredit * 0.90;
      const total = dailyAllowance * days;
      return { "Daily Salary Credit": `₱${dailyCredit.toFixed(2)}`, "Daily Allowance (90%)": `₱${dailyAllowance.toFixed(2)}`, "Total Sickness Benefit": `₱${total.toFixed(2)}`, "Sick Days": `${days} days` };
    }

    case "toll-calculator-philippines": {
      const expressway = values.expressway || "nlex";
      const vehicleClass = Number(values.vehicleClass) || 1;
      const distance = Number(values.distance) || 0;
      const rates: Record<string, number[]> = { nlex: [3.5, 5.5, 7.5], slex: [3.8, 5.8, 7.8], tplex: [2.5, 4.0, 5.5], skyway: [4.0, 6.0, 8.0] };
      const ratePerKm = (rates[expressway as string] || rates.nlex)[vehicleClass - 1] || 3.5;
      const toll = distance * ratePerKm;
      return { "Estimated Toll": `₱${toll.toFixed(2)}`, "Rate per km": `₱${ratePerKm.toFixed(2)}`, "Distance": `${distance} km`, "Note": "Actual toll may vary. Check expressway website for exact rates." };
    }

    case "aquarium-gallon-calculator": {
      const l = Number(values.length) || 0;
      const w = Number(values.width) || 0;
      const h = Number(values.height) || 0;
      const cubicInches = l * w * h;
      const gallons = cubicInches / 231;
      const liters = gallons * 3.78541;
      return { "Volume (Gallons)": `${gallons.toFixed(1)} gal`, "Volume (Liters)": `${liters.toFixed(1)} L`, "Cubic Inches": `${cubicInches.toFixed(0)} cu in` };
    }

    case "bore-stroke-calculator": {
      const bore = Number(values.bore) || 0;
      const stroke = Number(values.stroke) || 0;
      const cylinders = Number(values.cylinders) || 1;
      const displacement = (Math.PI / 4) * Math.pow(bore, 2) * stroke * cylinders / 1000;
      return { "Engine Displacement": `${displacement.toFixed(1)} CC`, "Liters": `${(displacement / 1000).toFixed(2)} L`, "Bore/Stroke Ratio": (bore / stroke).toFixed(3) };
    }

    case "dog-pregnancy-calculator": {
      const m = Number(values.breedingMonth) || 1;
      const d = Number(values.breedingDay) || 1;
      const y = Number(values.breedingYear) || 2026;
      const breeding = new Date(y, m - 1, d);
      const due = new Date(breeding.getTime() + 63 * 86400000);
      const vet = new Date(breeding.getTime() + 28 * 86400000);
      return { "Expected Due Date": due.toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" }), "First Vet Visit (Day 28)": vet.toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" }), "Gestation Period": "63 days (average)" };
    }

    case "gaussian-elimination-calculator": {
      const a11 = Number(values.a11) || 1;
      const a12 = Number(values.a12) || 0;
      const b1 = Number(values.b1) || 0;
      const a21 = Number(values.a21) || 0;
      const a22 = Number(values.a22) || 1;
      const b2 = Number(values.b2) || 0;
      const det = a11 * a22 - a12 * a21;
      if (Math.abs(det) < 1e-10) return { "Result": "No unique solution (determinant = 0)", "Determinant": "0" };
      const x = (b1 * a22 - b2 * a12) / det;
      const y = (a11 * b2 - a21 * b1) / det;
      return { "x": x.toFixed(4), "y": y.toFixed(4), "Determinant": det.toFixed(4), "Verification": `${a11}(${x.toFixed(2)}) + ${a12}(${y.toFixed(2)}) = ${(a11 * x + a12 * y).toFixed(2)}` };
    }

    case "angel-number-calculator": {
      const y = Number(values.birthYear) || 2000;
      const m = Number(values.birthMonth) || 1;
      const d = Number(values.birthDay) || 1;
      let sum = `${m}${d}${y}`.split("").reduce((a, c) => a + parseInt(c), 0);
      while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = String(sum).split("").reduce((a, c) => a + parseInt(c), 0);
      }
      const meanings: Record<number, string> = { 1: "Leadership & New Beginnings", 2: "Balance & Partnership", 3: "Creativity & Expression", 4: "Stability & Foundation", 5: "Change & Freedom", 6: "Love & Responsibility", 7: "Spirituality & Wisdom", 8: "Abundance & Power", 9: "Completion & Humanitarianism", 11: "Master Number – Intuition", 22: "Master Number – Master Builder", 33: "Master Number – Master Teacher" };
      return { "Your Angel Number": `${sum}`, "Meaning": meanings[sum] || "Unique path", "Birthday": `${m}/${d}/${y}` };
    }

    case "sun-moon-rising-sign-calculator": {
      const m = Number(values.birthMonth) || 1;
      const d = Number(values.birthDay) || 1;
      const h = Number(values.birthHour) || 12;
      const signs = ["Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius"];
      const sunDates = [[20,19,21,20,21,21,23,23,23,23,22,22]]; // approx start dates
      const cutoffs = [20,19,21,20,21,21,23,23,23,23,22,22];
      const sunIdx = d >= cutoffs[m-1] ? m % 12 : (m + 11) % 12;
      const sunSign = signs[sunIdx];
      // Moon estimate: shifts ~every 2.5 days through zodiac
      const dayOfYear = Math.floor((Date.UTC(2000, m-1, d) - Date.UTC(2000, 0, 1)) / 86400000);
      const moonIdx = Math.floor((dayOfYear * 12 / 28.5 + 3) % 12);
      const moonSign = signs[moonIdx];
      // Rising estimate: changes every ~2 hours
      const risingIdx = (sunIdx + Math.floor(h / 2)) % 12;
      const risingSign = signs[risingIdx];
      return { "☀️ Sun Sign": sunSign, "🌙 Moon Sign (estimated)": moonSign, "⬆️ Rising Sign (estimated)": risingSign, "Note": "For exact Moon & Rising, a full natal chart with birth location is recommended." };
    }

    case "lilith-sign-calculator": {
      const m = Number(values.birthMonth) || 1;
      const d = Number(values.birthDay) || 1;
      const y = Number(values.birthYear) || 2000;
      const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
      // Lilith cycle ~8.85 years = ~3231 days
      const refDate = new Date(2000, 0, 1); // Lilith was ~Libra start of 2000
      const birthDate = new Date(y, m - 1, d);
      const daysDiff = (birthDate.getTime() - refDate.getTime()) / 86400000;
      const cycleDays = 3231;
      const posInCycle = ((daysDiff % cycleDays) + cycleDays) % cycleDays;
      const lilithIdx = (6 + Math.floor(posInCycle / (cycleDays / 12))) % 12; // offset from Libra
      const lilithSign = signs[lilithIdx];
      const meanings: Record<string, string> = {
        "Aries": "Raw independence, anger at being controlled, fierce self-assertion",
        "Taurus": "Sensual desires, attachment to security, fear of loss",
        "Gemini": "Forbidden knowledge, taboo communication, dual nature",
        "Cancer": "Deep emotional needs, fear of abandonment, maternal shadow",
        "Leo": "Craving recognition, creative power, fear of being unseen",
        "Virgo": "Perfectionism shadow, service vs. self, body image wounds",
        "Libra": "Relationship power dynamics, beauty obsession, codependency",
        "Scorpio": "Intense sexuality, power/control issues, transformation through shadow",
        "Sagittarius": "Rebellious beliefs, freedom at all costs, dogmatic shadow",
        "Capricorn": "Ambition shadow, authority issues, fear of vulnerability",
        "Aquarius": "Radical individuality, alienation, rejection of norms",
        "Pisces": "Escapism, victim/savior patterns, spiritual shadow"
      };
      return { "🌑 Lilith Sign": lilithSign, "Shadow Theme": meanings[lilithSign] || "Unique shadow expression", "Cycle": "~9 months per sign" };
    }

    case "chiron-sign-calculator": {
      const m = Number(values.birthMonth) || 1;
      const d = Number(values.birthDay) || 1;
      const y = Number(values.birthYear) || 2000;
      // Chiron sign periods (approximate)
      const chironPeriods: [number, number, string, string][] = [
        [1968, 1977, "Aries", "Wounds around identity, self-worth, and the right to exist"],
        [1977, 1984, "Taurus", "Wounds around material security, self-worth, and body"],
        [1984, 1988, "Gemini", "Wounds around communication, learning, and being heard"],
        [1988, 1991, "Cancer", "Wounds around home, family, and emotional safety"],
        [1991, 1993, "Leo", "Wounds around creativity, self-expression, and recognition"],
        [1993, 1995, "Virgo", "Wounds around perfectionism, health, and feeling useful"],
        [1995, 1997, "Libra", "Wounds around relationships, fairness, and compromise"],
        [1997, 1999, "Scorpio", "Wounds around trust, intimacy, and power"],
        [1999, 2001, "Sagittarius", "Wounds around belief, meaning, and freedom"],
        [2001, 2005, "Capricorn", "Wounds around authority, achievement, and structure"],
        [2005, 2011, "Aquarius", "Wounds around belonging, individuality, and community"],
        [2011, 2019, "Pisces", "Wounds around spirituality, boundaries, and escapism"],
        [2019, 2027, "Aries", "Wounds around identity, courage, and self-assertion"],
      ];
      let chironSign = "Unknown";
      let woundTheme = "Calculate with a valid birth year";
      for (const [start, end, sign, theme] of chironPeriods) {
        if (y >= start && y < end) {
          chironSign = sign;
          woundTheme = theme;
          break;
        }
      }
      if (y < 1968) {
        // Approximate for older dates using ~50 year cycle
        const adjusted = y + Math.ceil((1968 - y) / 50) * 50;
        for (const [start, end, sign, theme] of chironPeriods) {
          if (adjusted >= start && adjusted < end) { chironSign = sign; woundTheme = theme; break; }
        }
      }
      return { "🔑 Chiron Sign": chironSign, "Core Wound": woundTheme, "Healing Gift": `You help others heal ${chironSign} themes through your own experience`, "Chiron Return": "~Age 50-51" };
    }

    default:
      return { result: "Calculator not implemented yet." };
  }
}
