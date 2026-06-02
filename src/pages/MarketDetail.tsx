import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Clock, Users, ExternalLink } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { parseEther } from 'ethers';
import { formatDistanceToNowStrict } from 'date-fns';
import { getMarket, priceHistory } from '../data/markets';
import { useWallet } from '../contexts/WalletContext';
import { getProvider } from '../lib/wallet';
import { ESCROW_ADDRESS, ESCROW_IS_PLACEHOLDER } from '../config/markets';
import { txUrl, addressUrl } from '../config/network';
import FaucetButton from '../components/FaucetButton';
import { showToast } from '../components/Toaster';

type Side = 'UP' | 'DOWN';

export default function MarketDetail() {
  const { id } = useParams();
  const market = id ? getMarket(id) : undefined;
  const { address, isOnLitVM, balance, connect, switchToLitVM } = useWallet();
  const [side, setSide] = useState<Side>('UP');
  const [amount, setAmount] = useState('0.1');
  const [submitting, setSubmitting] = useState(false);

  const history = useMemo(() => market ? priceHistory(market.asset, market.currentPrice) : [], [market]);

  if (!market) {
    return (
      <div className="pt-20 text-center">
        <p className="text-textSecondary">Market not found.</p>
        <Link to="/markets" className="text-primary hover:underline">← Back to markets</Link>
      </div>
    );
  }

  const totalPool = market.totalUpStake + market.totalDownStake;
  const upOdds = totalPool ? totalPool / market.totalUpStake : 2;
  const downOdds = totalPool ? totalPool / market.totalDownStake : 2;
  const potentialReturn = parseFloat(amount || '0') * (side === 'UP' ? upOdds : downOdds);

  const placeStake = async () => {
    if (!address) { await connect(); return; }
    if (!isOnLitVM) { await switchToLitVM(); return; }
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) { showToast('Enter an amount of zkLTC to stake', 'error'); return; }
    const provider = getProvider();
    if (!provider) { showToast('No wallet provider', 'error'); return; }

    setSubmitting(true);
    try {
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: ESCROW_ADDRESS,
        value: parseEther(amount),
        // Encode side as a tiny data hint; real contracts would route by selector.
        data: '0x' + Buffer.from(`${market.id}:${side}`).toString('hex'),
      });
      showToast(`Stake submitted: ${amount} zkLTC ${side}`, 'success', txUrl(tx.hash));
      await tx.wait();
      showToast(`Confirmed on LitVM ✓`, 'success', txUrl(tx.hash));
    } catch (e: any) {
      showToast(e?.shortMessage || e?.message || 'Transaction failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-8 grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Link to="/markets" className="text-sm text-textSecondary hover:text-white flex items-center gap-1 mb-4">
          <ArrowLeft size={14} /> All markets
        </Link>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="chip font-mono">{market.asset}/USD</span>
            <span className="flex items-center gap-1 text-sm text-textSecondary">
              <Clock size={14} /> closes in {formatDistanceToNowStrict(market.expiresAt)}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{market.question}</h1>
          <div className="flex gap-6 text-sm font-mono text-textSecondary mb-6">
            <div>Strike <span className="text-white text-base">${market.strikePrice.toLocaleString()}</span></div>
            <div>Current <span className="text-white text-base">${market.currentPrice.toLocaleString()}</span></div>
            <div className="flex items-center gap-1"><Users size={12} /> {market.participants}</div>
          </div>

          <div className="h-64 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <YAxis domain={['dataMin', 'dataMax']} hide />
                <Tooltip
                  contentStyle={{ background: '#171717', border: '1px solid #2F2F2F', borderRadius: 8 }}
                  labelStyle={{ color: '#A3A3A3' }}
                  formatter={(v: any) => [`$${Number(v).toLocaleString()}`, 'Price']}
                />
                <Line type="monotone" dataKey="price" stroke="#9E7FFF" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6 mt-4">
          <h3 className="font-semibold mb-3">Pool composition</h3>
          <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-3">
            <div className="bg-success" style={{ width: `${(market.totalUpStake / totalPool) * 100}%` }} />
            <div className="bg-error" style={{ width: `${(market.totalDownStake / totalPool) * 100}%` }} />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm font-mono">
            <div className="flex items-center gap-2 text-success"><TrendingUp size={14} /> UP {market.totalUpStake.toFixed(2)} zkLTC · {upOdds.toFixed(2)}x</div>
            <div className="flex items-center gap-2 text-error justify-end"><TrendingDown size={14} /> DOWN {market.totalDownStake.toFixed(2)} zkLTC · {downOdds.toFixed(2)}x</div>
          </div>
          <p className="text-xs text-textSecondary mt-4">
            Escrow: <a href={addressUrl(ESCROW_ADDRESS)} target="_blank" rel="noreferrer" className="font-mono text-primary hover:underline inline-flex items-center gap-1">{ESCROW_ADDRESS.slice(0,10)}…{ESCROW_ADDRESS.slice(-6)} <ExternalLink size={10} /></a>
            {ESCROW_IS_PLACEHOLDER && <span className="ml-2 chip" style={{background:'rgba(245,158,11,0.12)', color:'#fbbf24', borderColor:'rgba(245,158,11,0.3)'}}>testnet placeholder</span>}
          </p>
        </div>
      </div>

      {/* Stake panel */}
      <aside className="lg:sticky lg:top-20 self-start">
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Place a stake</h3>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => setSide('UP')}
              className={`py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                side === 'UP' ? 'bg-success text-white' : 'bg-surface text-textSecondary border border-border hover:text-success'
              }`}
            >
              <TrendingUp size={16} /> UP · {upOdds.toFixed(2)}x
            </button>
            <button
              onClick={() => setSide('DOWN')}
              className={`py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                side === 'DOWN' ? 'bg-error text-white' : 'bg-surface text-textSecondary border border-border hover:text-error'
              }`}
            >
              <TrendingDown size={16} /> DOWN · {downOdds.toFixed(2)}x
            </button>
          </div>

          <label className="text-xs text-textSecondary uppercase tracking-wide font-mono">Amount (zkLTC)</label>
          <div className="relative mt-1 mb-3">
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="field pr-20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-primary">zkLTC</span>
          </div>
          <div className="flex gap-2 mb-4">
            {['0.1', '0.5', '1', 'MAX'].map((v) => (
              <button
                key={v}
                onClick={() => setAmount(v === 'MAX' ? balance : v)}
                className="flex-1 text-xs py-1.5 rounded bg-surface border border-border hover:border-primary font-mono"
              >
                {v}
              </button>
            ))}
          </div>

          <div className="text-sm flex justify-between mb-1 text-textSecondary">
            <span>Wallet</span>
            <span className="font-mono">{balance} zkLTC</span>
          </div>
          <div className="text-sm flex justify-between mb-4">
            <span>If you win</span>
            <span className="font-mono text-success">≈ {potentialReturn.toFixed(4)} zkLTC</span>
          </div>

          {!address ? (
            <button onClick={connect} className="btn-primary w-full">Connect Wallet</button>
          ) : !isOnLitVM ? (
            <button onClick={switchToLitVM} className="btn-danger w-full">Switch to LitVM</button>
          ) : (
            <button onClick={placeStake} disabled={submitting} className={`w-full ${side === 'UP' ? 'btn-success' : 'btn-danger'}`}>
              {submitting ? 'Confirming…' : `Stake ${amount || '0'} zkLTC ${side}`}
            </button>
          )}

          {address && parseFloat(balance) === 0 && (
            <div className="mt-3"><FaucetButton /></div>
          )}

          <p className="text-[11px] text-textSecondary mt-4">
            Stakes are sent as native zkLTC to the market escrow on LitVM. Winners split the pool pro-rata at resolution.
          </p>
        </div>
      </aside>
    </div>
  );
}
