import { Link } from 'react-router-dom';
import { Clock, TrendingUp, TrendingDown, Users } from 'lucide-react';
import { Market } from '../data/markets';
import { formatDistanceToNowStrict } from 'date-fns';

export default function MarketCard({ m }: { m: Market }) {
  const total = m.totalUpStake + m.totalDownStake;
  const upPct = total ? (m.totalUpStake / total) * 100 : 50;
  const downPct = 100 - upPct;

  return (
    <Link to={`/markets/${m.id}`} className="card p-card block hover:border-primary transition-colors group">
      <div className="flex items-center justify-between mb-3">
        <span className="chip font-mono">{m.asset}/USD</span>
        <span className="flex items-center gap-1 text-xs text-textSecondary">
          <Clock size={12} /> {formatDistanceToNowStrict(m.expiresAt)} left
        </span>
      </div>
      <h3 className="font-semibold leading-snug mb-1 group-hover:text-primary transition-colors">
        {m.question}
      </h3>
      <div className="text-xs text-textSecondary font-mono mb-4">
        Strike <span className="text-white">${m.strikePrice.toLocaleString()}</span>
        <span className="mx-2">·</span>
        Now <span className="text-white">${m.currentPrice.toLocaleString()}</span>
      </div>

      <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-3 bg-borderSubtle">
        <div className="bg-success transition-all" style={{ width: `${upPct}%` }} />
        <div className="bg-error transition-all" style={{ width: `${downPct}%` }} />
      </div>

      <div className="flex justify-between text-xs font-mono">
        <span className="flex items-center gap-1 text-success">
          <TrendingUp size={12} /> {upPct.toFixed(0)}% UP · {m.totalUpStake.toFixed(1)} zkLTC
        </span>
        <span className="flex items-center gap-1 text-error">
          {downPct.toFixed(0)}% DOWN · {m.totalDownStake.toFixed(1)} zkLTC <TrendingDown size={12} />
        </span>
      </div>
      <div className="mt-3 pt-3 border-t border-border flex items-center gap-1 text-xs text-textSecondary">
        <Users size={12} /> {m.participants} traders · pool {total.toFixed(1)} zkLTC
      </div>
    </Link>
  );
}
