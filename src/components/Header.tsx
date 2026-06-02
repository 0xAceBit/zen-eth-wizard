import { Link, useLocation } from 'react-router-dom';
import { Wallet, Droplets, AlertTriangle, LogOut } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { shortAddr } from '../lib/wallet';
import FaucetButton from './FaucetButton';

export default function Header() {
  const { address, isOnLitVM, balance, connecting, connect, disconnect, switchToLitVM } = useWallet();
  const { pathname } = useLocation();

  const navCls = (active: boolean) =>
    `text-sm font-medium transition-colors ${active ? 'text-white' : 'text-textSecondary hover:text-white'}`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(158,127,255,0.5)]">
            <span className="text-white font-black text-sm">N</span>
          </div>
          <div className="leading-tight">
            <div className="font-bold tracking-tight">Novyn</div>
            <div className="text-[10px] text-textSecondary font-mono">on LitVM</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/markets" className={navCls(pathname.startsWith('/markets'))}>Markets</Link>
          <Link to="/portfolio" className={navCls(pathname === '/portfolio')}>Portfolio</Link>
        </nav>

        <div className="flex items-center gap-2">
          <FaucetButton compact />
          {address && !isOnLitVM && (
            <button onClick={switchToLitVM} className="btn-danger flex items-center gap-2 text-sm">
              <AlertTriangle size={16} /> Switch to LitVM
            </button>
          )}
          {!address ? (
            <button onClick={connect} disabled={connecting} className="btn-primary flex items-center gap-2 text-sm">
              <Wallet size={16} /> {connecting ? 'Connecting…' : 'Connect Wallet'}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col items-end leading-tight px-3 py-1.5 rounded-lg bg-surface border border-border">
                <span className="text-xs text-textSecondary font-mono">{shortAddr(address)}</span>
                <span className="text-sm font-mono font-semibold">{balance} <span className="text-primary">zkLTC</span></span>
              </div>
              <button onClick={disconnect} className="btn-ghost p-2" title="Disconnect">
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
