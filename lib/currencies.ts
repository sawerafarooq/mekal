/**
 * Currencies supported by the app.
 *
 * Source of truth for currency symbols, country-to-currency mapping,
 * and rough FX multipliers (USD = 1) used to scale kid-facing amounts
 * (allowance slider, savings goals) per region.
 *
 * NOTE: We do NOT do real FX conversion anywhere. The multipliers are used
 * only to produce "roughly realistic" numbers per region so a kid in India
 * sees ~₹4,000/week allowance rather than ~₹50/week. Exact values don't
 * matter — they're educational guides, not financial calculations.
 */

export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "INR"
  | "PKR"
  | "JPY"
  | "CNY"
  | "AUD"
  | "CAD"
  | "AED"
  | "SAR"
  | "TRY"
  | "BRL"
  | "ZAR"
  | "MXN"
  | "SGD"
  | "HKD"
  | "CHF"
  | "NZD";

export type Currency = {
  code: CurrencyCode;
  symbol: string;
  name: string;
  /** ISO 3166-1 alpha-2 country codes that default to this currency */
  countries: string[];
};

export const CURRENCIES: readonly Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", countries: ["US"] },
  {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    countries: [
      "DE",
      "FR",
      "IT",
      "ES",
      "NL",
      "BE",
      "AT",
      "IE",
      "PT",
      "FI",
      "GR",
      "LU",
      "SK",
      "SI",
      "LT",
      "LV",
      "EE",
      "MT",
      "CY",
      "HR",
    ],
  },
  { code: "GBP", symbol: "£", name: "British Pound", countries: ["GB"] },
  { code: "INR", symbol: "₹", name: "Indian Rupee", countries: ["IN"] },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee", countries: ["PK"] },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", countries: ["JP"] },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", countries: ["CN"] },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", countries: ["AU"] },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", countries: ["CA"] },
  { code: "AED", symbol: "AED ", name: "UAE Dirham", countries: ["AE"] },
  { code: "SAR", symbol: "SAR ", name: "Saudi Riyal", countries: ["SA"] },
  { code: "TRY", symbol: "₺", name: "Turkish Lira", countries: ["TR"] },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", countries: ["BR"] },
  { code: "ZAR", symbol: "R", name: "South African Rand", countries: ["ZA"] },
  { code: "MXN", symbol: "Mex$", name: "Mexican Peso", countries: ["MX"] },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", countries: ["SG"] },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", countries: ["HK"] },
  { code: "CHF", symbol: "CHF ", name: "Swiss Franc", countries: ["CH"] },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", countries: ["NZ"] },
];

/** Rough USD multipliers for scaling amounts. Not real FX. */
export const FX_MULTIPLIER: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83,
  PKR: 280,
  JPY: 150,
  CNY: 7.2,
  AUD: 1.55,
  CAD: 1.35,
  AED: 3.67,
  SAR: 3.75,
  TRY: 40,
  BRL: 5,
  ZAR: 19,
  MXN: 20,
  SGD: 1.35,
  HKD: 7.8,
  CHF: 0.88,
  NZD: 1.68,
};

export const DEFAULT_CURRENCY: Currency = CURRENCIES[0];

/**
 * Look up a currency by its code. Returns USD if not found.
 */
export function findCurrencyByCode(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? DEFAULT_CURRENCY;
}

/**
 * Look up the default currency for a country. Returns USD if not found.
 */
export function findCurrencyByCountry(countryCode: string): Currency {
  const upper = countryCode.toUpperCase();
  return (
    CURRENCIES.find((c) => c.countries.includes(upper)) ?? DEFAULT_CURRENCY
  );
}

/**
 * Format a plain number as a money string in the given currency. Rounds,
 * inserts thousands separators. Does NOT do any FX conversion.
 */
export function formatMoney(amount: number, currency: Currency): string {
  return currency.symbol + Math.round(amount).toLocaleString("en-US");
}

/**
 * Scale a USD amount to the given currency using rough FX multiplier and
 * round to "clean retail" numbers so the display looks natural.
 */
export function scaleFromUSD(usd: number, code: CurrencyCode): number {
  const multiplier = FX_MULTIPLIER[code] ?? 1;
  const raw = usd * multiplier;
  if (raw >= 10000) return Math.round(raw / 1000) * 1000;
  if (raw >= 1000) return Math.round(raw / 100) * 100;
  if (raw >= 100) return Math.round(raw / 10) * 10;
  return Math.round(raw);
}
