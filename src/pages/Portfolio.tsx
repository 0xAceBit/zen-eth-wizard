import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ExternalLink } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { shortAddr } from '../lib/wallet';
import { addressUrl, txUrl } from '../config/network';
import FaucetButton from '../components/FaucetButton';
import { MARKETS } from '../data/markets';

export default function Portfolio() {
  const { address, balance, isOnLitVM, connect, switchToLitVM } = useWallet();

  const [positions, setPositions] = useState<{ id: string; side: 'UP' | 'DOWN'; amount: number; txHash?: string }[]>([]);

  useEffect(() => {
    if (address) {
      try {
        const localKey = `novyn_positions_${address.toLowerCase()}`;
        const existingRaw = localStorage.getItem(localKey);
        if (existingRaw) {
          setPositions(JSON.parse(existingRaw));
        } else {
          setPositions([]);
        }
      } catch (err) {
        console.error('Failed to load local positions:', err);
      }
    } else {
      setPositions([]);
    }
  }, [address]);

  if (!address) {
    return (
      <div className="pt-24 text-center max-w-md mx-auto">
        <Wallet className="mx-auto mb-4 text-primary" size={36} />
        <h1 className="text-2xl font-bold mb-2">Connect to view your portfolio</h1>
        <p className="text-textSecondary mb-6">See your active positions and zkLTC balance on LitVM.</p>
        <button onClick={connect} className="btn-primary">Connect Wallet</button>
      </div>
    );
  }
  return (
    <div className="pt-10">
      <h1 className="text-3xl font-bold mb-1">Your portfolio</h1>
      <p className="text-textSecondary mb-6">LitVM Liteforge Testnet · zkLTC</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <div className="text-xs text-textSecondary uppercase tracking-wide font-mono mb-1">Address</div>
          <a href={addressUrl(address)} target="_blank" rel="noreferrer" className="font-mono text-lg flex items-center gap-1 hover:text-primary">
            {shortAddr(address)} <ExternalLink size={14} />
          </a>
        </div>
        <div className="card p-5">
          <div className="text-xs text-textSecondary uppercase tracking-wide font-mono mb-1">Balance</div>
          <div className="text-2xl font-bold font-mono">{balance} <span className="text-primary text-base">zkLTC</span></div>
        </div>
        <div className="card p-5 flex flex-col gap-2">
          <div className="text-xs text-textSecondary uppercase tracking-wide font-mono">Network</div>
          {isOnLitVM ? (
            <div className="text-success font-semibold">LitVM Liteforge ✓</div>
          ) : (
            <button onClick={switchToLitVM} className="btn-danger text-sm">Switch to LitVM</button>
          )}
          <FaucetButton compact />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Open positions</h2>
      {positions.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-textSecondary mb-4">No positions yet. Pick a market and place your first zkLTC stake.</p>
          <Link to="/markets" className="btn-primary inline-block">Browse markets</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {positions.map((p) => {
            const m = MARKETS.find(x => x.id === p.id);
            return (
              <Link to={`/markets/${p.id}`} key={p.id} className="card p-4 hover:border-primary">
                <div className="text-sm">{m?.question}</div>
                <div className="font-mono mt-2">{p.amount} zkLTC · {p.side}</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
