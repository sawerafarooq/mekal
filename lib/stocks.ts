/**
 * Strong Buy stock list shown in the Stocks section of the classic app.
 *
 * Ported from public/invest.html. The 18 stocks are split across 3 pages
 * of 6 in the paginated UI, and drive both the stock cards and the
 * scrolling ticker tape at the top of the page.
 *
 * Prices + daily % change are placeholder values — the GitHub Actions
 * cron at `.github/workflows/update-stocks.yml` refreshes these daily
 * by rewriting `public/invest.html`. Once we port the stocks section to
 * Next.js, the cron will instead update this file (or fetch live data
 * via `/api/stocks`).
 */

export type Exchange = "NASDAQ" | "NYSE";

export type Stock = {
  ticker: string;
  name: string;
  exchange: Exchange;
  /** Short kid-friendly description of what the company does */
  description: string;
  /** Emoji shown on the stock card */
  emoji: string;
  /** Current price in USD (placeholder — updated by cron) */
  price: number;
  /** Daily change % (placeholder — updated by cron) */
  changePct: number;
  /** 1 = first page in paginated display, 2 = second page, etc. */
  page: 1 | 2 | 3;
};

export const STOCKS: readonly Stock[] = [
  // Page 1
  {
    ticker: "MSFT",
    name: "Microsoft",
    exchange: "NASDAQ",
    description:
      "They make Windows, Xbox, and the cloud! 54 out of 56 experts say BUY.",
    emoji: "💻",
    price: 442.5,
    changePct: 1.2,
    page: 1,
  },
  {
    ticker: "NVDA",
    name: "NVIDIA",
    exchange: "NASDAQ",
    description:
      "Super-fast chips for AI and games! 59 out of 63 experts say BUY.",
    emoji: "🤖",
    price: 185.3,
    changePct: 2.8,
    page: 1,
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    exchange: "NASDAQ",
    description:
      "The everything store + biggest cloud! 49 out of 57 experts say BUY.",
    emoji: "📦",
    price: 228.7,
    changePct: 0.9,
    page: 1,
  },
  {
    ticker: "GOOGL",
    name: "Alphabet",
    exchange: "NASDAQ",
    description: "Owns Google and YouTube! Top pick for 2026.",
    emoji: "🔍",
    price: 193.4,
    changePct: -0.3,
    page: 1,
  },
  {
    ticker: "MU",
    name: "Micron",
    exchange: "NASDAQ",
    description:
      "Memory chips for phones and PCs. 232% earnings growth predicted!",
    emoji: "🧠",
    price: 98.2,
    changePct: 3.1,
    page: 1,
  },
  {
    ticker: "AVGO",
    name: "Broadcom",
    exchange: "NASDAQ",
    description:
      "Chips that connect everything! Leading the $1 trillion chip boom!",
    emoji: "💡",
    price: 235.6,
    changePct: 0.7,
    page: 1,
  },

  // Page 2
  {
    ticker: "META",
    name: "Meta",
    exchange: "NASDAQ",
    description:
      "Instagram, WhatsApp, Facebook! Growing 24% every year. Building VR and AI!",
    emoji: "📱",
    price: 612.8,
    changePct: 1.5,
    page: 2,
  },
  {
    ticker: "THC",
    name: "Tenet Healthcare",
    exchange: "NYSE",
    description: "Runs hospitals. 15 analysts say Strong Buy! Top 5% of ALL stocks.",
    emoji: "🏥",
    price: 178.9,
    changePct: 1.8,
    page: 2,
  },
  {
    ticker: "VLO",
    name: "Valero",
    exchange: "NYSE",
    description: "Fuel for cars and planes! 7 out of 11 analysts say Strong Buy.",
    emoji: "⛽",
    price: 142.3,
    changePct: -0.5,
    page: 2,
  },
  {
    ticker: "AIR",
    name: "AAR Corp",
    exchange: "NYSE",
    description: "Fix and maintain airplanes! Top 1% rated analyst says Strong Buy.",
    emoji: "🛩",
    price: 74.1,
    changePct: 1.1,
    page: 2,
  },
  {
    ticker: "LRCX",
    name: "Lam Research",
    exchange: "NASDAQ",
    description: "Builds machines that make chips! BofA top pick for chip boom!",
    emoji: "🌡",
    price: 87.4,
    changePct: 2.2,
    page: 2,
  },
  {
    ticker: "KLAC",
    name: "KLA Corp",
    exchange: "NASDAQ",
    description: "Checks chips with super lasers! Every chip factory needs them.",
    emoji: "🔬",
    price: 821.5,
    changePct: 0.8,
    page: 2,
  },

  // Page 3
  {
    ticker: "CIEN",
    name: "Ciena",
    exchange: "NYSE",
    description: "Builds internet highways! Record-breaking results this year!",
    emoji: "🌊",
    price: 94.2,
    changePct: 2.6,
    page: 3,
  },
  {
    ticker: "ADI",
    name: "Analog Devices",
    exchange: "NASDAQ",
    description: "Tiny sensors in cars, phones, hospitals! BofA 2026 chip leader!",
    emoji: "🔌",
    price: 233.1,
    changePct: 0.4,
    page: 3,
  },
  {
    ticker: "CDNS",
    name: "Cadence Design",
    exchange: "NASDAQ",
    description: "Software that designs chips! Without them, no chips get built.",
    emoji: "🏗",
    price: 311.7,
    changePct: 1.0,
    page: 3,
  },
  {
    ticker: "ANAB",
    name: "AnaptysBio",
    exchange: "NASDAQ",
    description: "Special medicines to fight diseases! Top 2% analyst says Strong Buy.",
    emoji: "💉",
    price: 41.5,
    changePct: 4.1,
    page: 3,
  },
  {
    ticker: "MPC",
    name: "Marathon Petroleum",
    exchange: "NYSE",
    description: "Biggest fuel maker in America! Just upgraded to Strong Buy!",
    emoji: "🏭",
    price: 171.8,
    changePct: -0.2,
    page: 3,
  },
  {
    ticker: "NATR",
    name: "Nature's Sunshine",
    exchange: "NASDAQ",
    description:
      "Healthy vitamins! EVERY single analyst says Strong Buy — perfect score!",
    emoji: "🌿",
    price: 18.3,
    changePct: 1.4,
    page: 3,
  },
];

/** Total number of stock cards on each page of the paginated stocks UI */
export const STOCKS_PER_PAGE = 6;

/** Total number of pages in the paginated stocks UI */
export const TOTAL_PAGES = 3;

/**
 * All stocks filtered to a single page (1-indexed). Returns empty array
 * if the page is out of range.
 */
export function getStocksForPage(page: number): Stock[] {
  if (page < 1 || page > TOTAL_PAGES) return [];
  return STOCKS.filter((s) => s.page === page);
}

/** A stock's Yahoo Finance URL (for the "View on Yahoo Finance" link) */
export function yahooFinanceUrl(ticker: string): string {
  return `https://finance.yahoo.com/quote/${ticker}`;
}
