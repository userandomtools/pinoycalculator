'use client';

import { useMemo } from "react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["hsl(168, 60%, 38%)", "hsl(38, 85%, 55%)", "hsl(210, 70%, 50%)", "hsl(340, 65%, 55%)"];

interface ChartProps {
  slug: string;
  results: Record<string, string | number>;
  values: Record<string, string | number>;
}

export const FinanceCharts = ({ slug, results, values }: ChartProps) => {
  const chartData = useMemo(() => {
    switch (slug) {
      case "loan-calculator-philippines":
      case "metrobank-car-loan-calculator":
      case "psbank-car-loan-calculator":
      case "afpslai-loan-calculator":
      case "psslai-loan-calculator":
      case "pag-ibig-multi-purpose-loan-calculator": {
        const P = Number(values.principal) || 0;
        const annualRate = Number(values.rate) || 0;
        const n = Number(values.term) || 1;
        const r = annualRate / 100 / 12;
        if (r === 0 || P === 0) return null;
        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        let balance = P;
        const schedule = [];
        for (let i = 1; i <= Math.min(n, 60); i++) {
          const interest = balance * r;
          const principalPaid = M - interest;
          balance = Math.max(0, balance - principalPaid);
          schedule.push({
            month: i,
            principal: Math.round(principalPaid),
            interest: Math.round(interest),
            balance: Math.round(balance),
          });
        }
        return { type: "amortization" as const, schedule, pieData: [
          { name: "Principal", value: Math.round(P) },
          { name: "Interest", value: Math.round(M * n - P) },
        ]};
      }
      case "pag-ibig-mp2-calculator": {
        const monthly = Number(values.monthly) || 0;
        const rate = (Number(values.rate) || 7) / 100;
        const years = Number(values.years) || 5;
        const r = rate / 12;
        const data = [];
        for (let y = 1; y <= years; y++) {
          const months = y * 12;
          const fv = monthly * ((Math.pow(1 + r, months) - 1) / r);
          const contrib = monthly * months;
          data.push({ year: `Year ${y}`, contributions: Math.round(contrib), total: Math.round(fv), dividends: Math.round(fv - contrib) });
        }
        return { type: "savings" as const, data };
      }
      case "time-deposit-calculator": {
        const deposit = Number(values.deposit) || 0;
        const rate = (Number(values.rate) || 0) / 100;
        const term = Number(values.term) || 365;
        if (deposit === 0) return null;
        const data = [];
        for (let d = 30; d <= term; d += 30) {
          const gross = deposit * rate * (d / 365);
          const tax = gross * 0.20;
          data.push({ day: `Day ${d}`, gross: Math.round(gross), net: Math.round(gross - tax), tax: Math.round(tax) });
        }
        return { type: "deposit" as const, data };
      }
      case "bpi-credit-to-cash-calculator":
      case "bdo-installment-calculator": {
        const amount = Number(values.amount) || 0;
        const rate = (Number(values.rate) || 1.29) / 100;
        const term = Number(values.term) || 12;
        if (amount === 0) return null;
        const totalInterest = amount * rate * term;
        return { type: "loan-breakdown" as const, pieData: [
          { name: "Principal", value: Math.round(amount) },
          { name: "Interest", value: Math.round(totalInterest) },
        ]};
      }
      default:
        return null;
    }
  }, [slug, values]);

  if (!chartData) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 mb-10">
      <h2 className="font-heading text-lg font-semibold mb-6">Visual Breakdown</h2>

      {chartData.type === "amortization" && (
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Amortization Schedule</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.schedule}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                  <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" tickFormatter={v => `₱${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => `₱${v.toLocaleString()}`} contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                  <Area type="monotone" dataKey="principal" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} name="Principal" />
                  <Area type="monotone" dataKey="interest" stackId="1" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.6} name="Interest" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Payment Breakdown</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData.pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {chartData.pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `₱${v.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {chartData.type === "savings" && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Savings Growth Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" tickFormatter={v => `₱${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `₱${v.toLocaleString()}`} contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                <Bar dataKey="contributions" stackId="a" fill={COLORS[0]} name="Contributions" radius={[0, 0, 0, 0]} />
                <Bar dataKey="dividends" stackId="a" fill={COLORS[1]} name="Dividends" radius={[4, 4, 0, 0]} />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {chartData.type === "deposit" && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Interest Growth Over Term</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" tickFormatter={v => `₱${v.toLocaleString()}`} />
                <Tooltip formatter={(v: number) => `₱${v.toLocaleString()}`} contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                <Area type="monotone" dataKey="net" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.4} name="Net Interest" />
                <Area type="monotone" dataKey="tax" stroke={COLORS[3]} fill={COLORS[3]} fillOpacity={0.3} name="Tax (20%)" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {chartData.type === "loan-breakdown" && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Payment Breakdown</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData.pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {chartData.pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `₱${v.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
