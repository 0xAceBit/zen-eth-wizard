export type Asset = 'BTC' | 'ETH' | 'SOL' | 'LTC';

export type Market = {
  id: string;
  asset: Asset;
  question: string;
  strikePrice: number;
  currentPrice: number;
  expiresAt: number; // ms epoch
  totalUpStake: number; // zkLTC
  totalDownStake: number;
  participants: number;
};

const now = Date.now();

export const MARKETS: Market[] = [
  {
    id: 'btc-120k-jul',
    asset: 'BTC',
    question: 'Will BTC close above $120,000 by July 1?',
    strikePrice: 120000,
    currentPrice: 109840,
    expiresAt: now + 1000 * 60 * 60 * 24 * 18,
    totalUpStake: 142.5,
    totalDownStake: 88.2,
    participants: 312,
  },
  {
    id: 'eth-5k-aug',
    asset: 'ETH',
    question: 'Will ETH break $5,000 before August 15?',
    strikePrice: 5000,
    currentPrice: 4120,
    expiresAt: now + 1000 * 60 * 60 * 24 * 34,
    totalUpStake: 76.1,
    totalDownStake: 124.9,
    participants: 198,
  },
  {
    id: 'sol-300-jun',
    asset: 'SOL',
    question: 'Will SOL hold above $300 at end of June?',
    strikePrice: 300,
    currentPrice: 284,
    expiresAt: now + 1000 * 60 * 60 * 24 * 11,
    totalUpStake: 51.3,
    totalDownStake: 47.8,
    participants: 145,
  },
  {
    id: 'ltc-150-jul',
    asset: 'LTC',
    question: 'Will LTC reclaim $150 by July 31?',
    strikePrice: 150,
    currentPrice: 118.4,
    expiresAt: now + 1000 * 60 * 60 * 24 * 45,
    totalUpStake: 220.7,
    totalDownStake: 112.4,
    participants: 489,
  },
  {
    id: 'btc-100k-floor',
    asset: 'BTC',
    question: 'Will BTC stay above $100k floor through June?',
    strikePrice: 100000,
    currentPrice: 109840,
    expiresAt: now + 1000 * 60 * 60 * 24 * 9,
    totalUpStake: 301.2,
    totalDownStake: 64.5,
    participants: 522,
  },
  {
    id: 'eth-3500-floor',
    asset: 'ETH',
    question: 'Will ETH dip below $3,500 in next 7 days?',
    strikePrice: 3500,
    currentPrice: 4120,
    expiresAt: now + 1000 * 60 * 60 * 24 * 7,
    totalUpStake: 33.6,
    totalDownStake: 91.2,
    participants: 167,
  },
];

export function getMarket(id: string): Market | undefined {
  return MARKETS.find((m) => m.id === id);
}

// Deterministic mock price history (random walk seeded by asset)
export function priceHistory(asset: Asset, current: number, points = 30) {
  const seed = asset.charCodeAt(0) + asset.charCodeAt(1);
  let value = current * 0.92;
  const out: { t: number; price: number }[] = [];
  for (let i = 0; i < points; i++) {
    const noise = Math.sin(i * 0.7 + seed) * 0.015 + (Math.cos(i * 0.3 + seed) * 0.01);
    value = value * (1 + noise);
    out.push({ t: i, price: Math.round(value * 100) / 100 });
  }
  out[out.length - 1].price = current;
  return out;
}
