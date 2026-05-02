'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Menu, Search, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { searchCalculators } from '@/data/calculators';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mainNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/guides', label: 'Guides' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const calculatorCategories = [
  { href: '/finance', label: 'Finance' },
  { href: '/salary', label: 'Salary' },
  { href: '/gaming', label: 'Gaming' },
  { href: '/academic', label: 'Academic' },
  { href: '/engineering', label: 'Engineering' },
  { href: '/guides', label: 'Guides' },
  { href: '/comparisons', label: 'Comparisons' },
];

export function HeaderClient() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const results = searchQuery.length > 1 ? searchCalculators(searchQuery).slice(0, 6) : [];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
  }, [pathname]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-card/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-card border-b border-border'
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-bold text-foreground"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Calculator className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span>
            Pinoy<span className="text-primary">Calculator</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors outline-none">
              Calculators <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {calculatorCategories.map((cat) => (
                <DropdownMenuItem key={cat.href} asChild>
                  <Link href={cat.href} className="w-full cursor-pointer">
                    {cat.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {mounted && (theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
          </button>
          <button
            onClick={() => {
              setSearchOpen(!searchOpen);
              setSearchQuery('');
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle search"
          >
            {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card px-4 py-3">
          <div className="container">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="calc-input pl-10"
                autoFocus
              />
            </div>
            {results.length > 0 && (
              <div className="mt-2 space-y-1">
                {results.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <span className="font-medium text-foreground">{r.shortTitle}</span>
                    <span className="ml-2 text-muted-foreground capitalize">• {r.category}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="border-t border-border bg-card p-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            <span className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Calculators
            </span>
            {calculatorCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors pl-5"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
