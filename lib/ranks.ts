/**
 * 30 investor ranks — #1 is most aggressive (Legendary Investor),
 * #30 is most conservative (Piggy Bank Protector).
 *
 * Ported from public/invest.html. Each rank is triggered by a quiz
 * score threshold (`max` — score at or below this gets this rank)
 * and has a recommended allocation across 6 investment categories.
 *
 * The quiz has 10 questions × 4 points = max score 40, min 10.
 */

export type RiskLevel = "low" | "medium" | "high";

export type InvestmentCategory =
  | "piggy_bank"
  | "savings_account"
  | "gold"
  | "company_stocks"
  | "crypto"
  | "start_business";

export type Allocation = {
  category: InvestmentCategory;
  label: string;
  icon: string;
  color: string;
  pct: number;
};

export type Rank = {
  /** Position in the ordered list, 1 = best (most aggressive), 30 = safest */
  rank: number;
  /** Maximum quiz score that triggers this rank (ranks are walked low→high) */
  maxScore: number;
  name: string;
  emoji: string;
  risk: RiskLevel;
  description: string;
};

/**
 * Ordered from highest score (most aggressive) to lowest score (safest),
 * with `rank` numbered 1 (best) → 30.
 *
 * NOTE: For scoring, the legacy code walks a list sorted low→high. We keep
 * both orderings: `RANKS` below is ordered for display (#1 first), and
 * `findRankByScore()` handles the scoring lookup.
 */
export const RANKS: readonly Rank[] = [
  {
    rank: 1,
    maxScore: 99,
    name: "Legendary Investor",
    emoji: "👑🚀",
    risk: "high",
    description:
      "LEGENDARY! You scored the absolute maximum! You are the ultimate investing daredevil. Wall Street is shaking! Just remember — even legends diversify a little.",
  },
  {
    rank: 2,
    maxScore: 39,
    name: "Money Rocket",
    emoji: "🚀💰",
    risk: "high",
    description:
      "You ARE the money rocket! Maximum stocks, maximum risk, maximum adventure!",
  },
  {
    rank: 3,
    maxScore: 38,
    name: "Rocket Rider",
    emoji: "🚀",
    risk: "high",
    description:
      "Riding a money rocket! Almost zero safety net, pure growth energy!",
  },
  {
    rank: 4,
    maxScore: 37,
    name: "Moon Shooter",
    emoji: "🌙",
    risk: "high",
    description:
      "Shooting for the moon! You want your money to fly as high as possible!",
  },
  {
    rank: 5,
    maxScore: 36,
    name: "Fire Starter",
    emoji: "🔥",
    risk: "high",
    description:
      "You're on FIRE! Your portfolio is blazing hot with almost pure stocks. Maximum heat!",
  },
  {
    rank: 6,
    maxScore: 35,
    name: "Wolf of Wall Street",
    emoji: "🐺",
    risk: "high",
    description:
      "The Wolf of Wall Street! You're aggressive, fearless, and always hunting for the next big win.",
  },
  {
    rank: 7,
    maxScore: 34,
    name: "Diamond Hands",
    emoji: "💎",
    risk: "high",
    description:
      "Diamond hands! You NEVER sell, no matter how scary it gets. You hold forever!",
  },
  {
    rank: 8,
    maxScore: 33,
    name: "Thunder Trader",
    emoji: "⛈",
    risk: "high",
    description:
      "You trade like thunder — fast, loud, and powerful! Maximum aggression in your portfolio.",
  },
  {
    rank: 9,
    maxScore: 32,
    name: "Fearless Tiger",
    emoji: "🐅",
    risk: "high",
    description:
      "Fearless like a tiger! Almost all stocks. You believe in going big or going home.",
  },
  {
    rank: 10,
    maxScore: 31,
    name: "Power Player",
    emoji: "⚡",
    risk: "high",
    description:
      "A power player in the money game! You play to win and you're not holding back.",
  },
  {
    rank: 11,
    maxScore: 30,
    name: "Risk Ranger",
    emoji: "🎯",
    risk: "high",
    description:
      "You range into risky territory on purpose! You know the bigger the risk, the bigger the reward.",
  },
  {
    rank: 12,
    maxScore: 29,
    name: "Bold Adventurer",
    emoji: "🔥",
    risk: "high",
    description:
      "Not afraid of big moves! You go heavy on stocks for maximum growth.",
  },
  {
    rank: 13,
    maxScore: 28,
    name: "Trend Rider",
    emoji: "🎢",
    risk: "high",
    description:
      "You ride the trends like a roller coaster! Mostly stocks, barely any safety net.",
  },
  {
    rank: 14,
    maxScore: 27,
    name: "Stock Shark",
    emoji: "🦈",
    risk: "high",
    description:
      "You smell opportunity like a shark smells fish! Heavy on stocks, light on bonds.",
  },
  {
    rank: 15,
    maxScore: 26,
    name: "Market Surfer",
    emoji: "🏄",
    risk: "medium",
    description:
      "Riding the market waves like a pro surfer! You enjoy the ups and downs.",
  },
  {
    rank: 16,
    maxScore: 25,
    name: "Rising Star",
    emoji: "⭐",
    risk: "medium",
    description:
      "A rising star in investing! You lean towards growth and aren't scared of some risk.",
  },
  {
    rank: 17,
    maxScore: 24,
    name: "Profit Planner",
    emoji: "📋",
    risk: "medium",
    description:
      "You plan for profits! You've got a strategy and you're sticking to it.",
  },
  {
    rank: 18,
    maxScore: 23,
    name: "Growth Hunter",
    emoji: "🏹",
    risk: "medium",
    description:
      "Hunting for growth! Your portfolio is getting stock-heavy. Nice moves!",
  },
  {
    rank: 19,
    maxScore: 22,
    name: "Coin Collector",
    emoji: "🪙",
    risk: "medium",
    description:
      "You're collecting wins! More stocks than bonds now — you like to see your money grow.",
  },
  {
    rank: 20,
    maxScore: 21,
    name: "Growth Seeker",
    emoji: "🌻",
    risk: "medium",
    description:
      "You're seeking growth like a sunflower seeks the sun! Leaning more into stocks.",
  },
  {
    rank: 21,
    maxScore: 20,
    name: "Money Mapper",
    emoji: "🗺",
    risk: "medium",
    description:
      "You've mapped out your money journey! A solid mix of stocks and bonds.",
  },
  {
    rank: 22,
    maxScore: 19,
    name: "Balanced Explorer",
    emoji: "🧭",
    risk: "medium",
    description:
      "Perfect balance! Half safe, half growth. You explore but always have a backup plan.",
  },
  {
    rank: 23,
    maxScore: 18,
    name: "Wise Owl",
    emoji: "🦉",
    risk: "medium",
    description:
      "Wise like an owl! You think carefully and make balanced money decisions.",
  },
  {
    rank: 24,
    maxScore: 17,
    name: "Smart Cookie",
    emoji: "🍪",
    risk: "low",
    description:
      "One smart cookie! You're starting to balance safety with some growth.",
  },
  {
    rank: 25,
    maxScore: 16,
    name: "Savings Shield",
    emoji: "🛡",
    risk: "low",
    description:
      "You've got a shield around your savings! Mostly safe with a sprinkle of growth.",
  },
  {
    rank: 26,
    maxScore: 15,
    name: "Safe Keeper",
    emoji: "🔒",
    risk: "low",
    description:
      "Your money is locked up safe! You only take tiny risks with a small amount.",
  },
  {
    rank: 27,
    maxScore: 14,
    name: "Steady Turtle",
    emoji: "🐢",
    risk: "low",
    description:
      "Slow and steady wins the race! No rush, just safe and steady growth.",
  },
  {
    rank: 28,
    maxScore: 13,
    name: "Penny Guardian",
    emoji: "🪙",
    risk: "low",
    description:
      "Every penny is precious to you! You protect your money like a superhero.",
  },
  {
    rank: 29,
    maxScore: 12,
    name: "Careful Saver",
    emoji: "🛡️",
    risk: "low",
    description:
      "Super safe and smart! You keep almost everything in bonds and savings.",
  },
  {
    rank: 30,
    maxScore: 11,
    name: "Piggy Bank Protector",
    emoji: "🐖",
    risk: "low",
    description:
      "You guard your money like a dragon guards gold! Zero risk, maximum safety.",
  },
];

/**
 * Resolve a quiz score (sum of all answer values) to a rank.
 * The scoring walks from the lowest maxScore up — the first rank whose
 * maxScore is >= the score wins.
 */
export function findRankByScore(score: number): Rank {
  // Walk in ascending maxScore order so the lowest-scoring threshold wins first.
  const sorted = [...RANKS].sort((a, b) => a.maxScore - b.maxScore);
  return sorted.find((r) => score <= r.maxScore) ?? sorted[sorted.length - 1];
}

/**
 * Determine if a rank is an "Investor" (rank 1-19) or a "Saver" (rank 20-30).
 * This is the big-label shown at the top of the quiz result screen.
 */
export function investorOrSaver(rank: number): "INVESTOR" | "SAVER" {
  return rank <= 19 ? "INVESTOR" : "SAVER";
}

/**
 * Real-ish 3-category allocation per rank. Percentages are clean
 * multiples of 5/10/25, min 10%, max 50%. Total always sums to 100.
 */
export function getAllocation(rank: number): Allocation[] {
  const PIGGY: Omit<Allocation, "pct"> = {
    category: "piggy_bank",
    label: "Piggy Bank",
    icon: "🐖",
    color: "#90a4ae",
  };
  const SAVINGS: Omit<Allocation, "pct"> = {
    category: "savings_account",
    label: "Savings Account",
    icon: "🏦",
    color: "#4caf50",
  };
  const GOLD: Omit<Allocation, "pct"> = {
    category: "gold",
    label: "Gold",
    icon: "🥇",
    color: "#ffd700",
  };
  const STOCKS: Omit<Allocation, "pct"> = {
    category: "company_stocks",
    label: "Company Stocks",
    icon: "📈",
    color: "#a259ff",
  };
  const CRYPTO: Omit<Allocation, "pct"> = {
    category: "crypto",
    label: "Crypto",
    icon: "🪙",
    color: "#e91e63",
  };
  const BIZ: Omit<Allocation, "pct"> = {
    category: "start_business",
    label: "Start a Business",
    icon: "💡",
    color: "#ff3cac",
  };

  if (rank === 1) {
    return [
      { ...CRYPTO, pct: 50 },
      { ...BIZ, pct: 30 },
      { ...STOCKS, pct: 20 },
    ];
  }
  if (rank <= 5) {
    return [
      { ...CRYPTO, pct: 40 },
      { ...STOCKS, pct: 30 },
      { ...BIZ, pct: 30 },
    ];
  }
  if (rank <= 10) {
    return [
      { ...STOCKS, pct: 50 },
      { ...CRYPTO, pct: 30 },
      { ...BIZ, pct: 20 },
    ];
  }
  if (rank <= 14) {
    return [
      { ...STOCKS, pct: 50 },
      { ...CRYPTO, pct: 25 },
      { ...GOLD, pct: 25 },
    ];
  }
  if (rank <= 19) {
    return [
      { ...STOCKS, pct: 50 },
      { ...GOLD, pct: 30 },
      { ...SAVINGS, pct: 20 },
    ];
  }
  if (rank <= 23) {
    return [
      { ...GOLD, pct: 40 },
      { ...SAVINGS, pct: 30 },
      { ...STOCKS, pct: 30 },
    ];
  }
  if (rank <= 27) {
    return [
      { ...SAVINGS, pct: 50 },
      { ...GOLD, pct: 30 },
      { ...STOCKS, pct: 20 },
    ];
  }
  return [
    { ...SAVINGS, pct: 50 },
    { ...PIGGY, pct: 30 },
    { ...GOLD, pct: 20 },
  ];
}
