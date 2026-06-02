import { useState } from 'react';
import { MARKETS, Asset } from '../data/markets';
import MarketCard from '../components/MarketCard';

const ASSETS: (Asset | 'ALL')[] = ['ALL', 'BTC', 'ETH', 'SOL', 'LTC'];

export default function Markets() {
  const [filter, setFilter] = useState<Asset | 'ALL'>('ALL');
  const list = filter === 'ALL' ? MARKETS : MARKETS.filter((m) => m.asset === filter);

  return (
    <div className="pt-10">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Prediction Markets</h1>
          <p className="text-textSecondary">All stakes denominated in native <span className="text-primary">zkLTC</span> on LitVM</p>
        </div>
        <div className="flex gap-2">
          {ASSETS.map((a) => (
            <button
              key={a}
              onClick={() => setFilter(a)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-colors ${
                filter === a ? 'bg-primary text-white' : 'bg-surface text-textSecondary hover:text-white border border-border'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((m) => <MarketCard key={m.id} m={m} />)}
      </div>
    </div>
  );
}
