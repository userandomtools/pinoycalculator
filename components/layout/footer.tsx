import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { categories } from '@/data/calculators';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-heading text-lg font-bold text-foreground mb-3"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Calculator className="h-4 w-4 text-primary-foreground" />
              </div>
              Pinoy<span className="text-primary">Calculator</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pinoy Calculator provides free online calculators designed for Filipinos to calculate
              finance, salary, education metrics, gaming stats, and health data.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold mb-3">Popular</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/13th-month-pay-calculator-philippines"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  13th Month Pay
                </Link>
              </li>
              <li>
                <Link
                  href="/loan-calculator-philippines"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/vat-calculator-philippines"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  VAT Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/gwa-calculator-philippines"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GWA Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/mlbb-win-rate-calculator"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  MLBB Win Rate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/author"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Our Authors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Pinoy Calculator. All rights reserved. Smart Calculators for
          Filipinos.
        </div>
      </div>
    </footer>
  );
}
