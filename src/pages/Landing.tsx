import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, TrendingUp, TrendingDown, Activity,
  Sparkles, Brain, Lock, BarChart3, Flame, Wallet, Coins, Trophy,
  Clock, ArrowUpRight, BarChart2, CheckCircle2, ChevronRight, Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MARKETS } from '../data/markets';
import MarketCard from '../components/MarketCard';
import FaucetButton from '../components/FaucetButton';
import { useWallet } from '../contexts/WalletContext';
import { LITVM_NETWORK } from '../config/network';

export default function Landing() {
  const { connect, address, switchToLitVM, isOnLitVM } = useWallet();
  const trending = MARKETS.slice(0, 3);

  const primaryCta = !address
    ? { label: 'Start Predicting', onClick: connect }
    : !isOnLitVM
    ? { label: 'Switch to LitVM', onClick: switchToLitVM }
    : null;

  // Handle smooth scroll to trending markets
  const scrollToMarkets = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('trending-markets');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-x-hidden pt-4">

      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 z-10 flex flex-col text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="chip mb-6">
                <Activity size={13} className="text-primary" />
                <span>LitVM Rollup · Live Testnet</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.08] mb-6 text-textPrimary">
                <span>
                  Predict the Future with
                </span>
                <br />
                <span className="text-primary">
                  AI-Powered Markets
                </span>
                <span>
                  {' '}on LitVM
                </span>
              </h1>

              <p className="text-base sm:text-lg text-textSecondary max-w-xl mb-8 leading-relaxed">
                Participate in decentralized prediction markets powered by LitVM. Forecast
                real-world events, discover market sentiment, and earn rewards through
                transparent, intelligent, and secure prediction infrastructure.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                {primaryCta ? (
                  <button 
                    onClick={primaryCta.onClick} 
                    className="btn-primary group flex items-center gap-2.5 px-6 py-3.5 text-sm"
                  >
                    <span>{primaryCta.label}</span> 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <Link 
                    to="/markets" 
                    className="btn-primary group flex items-center gap-2.5 px-6 py-3.5 text-sm"
                  >
                    <span>Start Predicting</span> 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                
                <a 
                  href="#trending-markets" 
                  onClick={scrollToMarkets} 
                  className="btn-ghost flex items-center gap-2 px-6 py-3.5 text-sm"
                >
                  Explore Markets
                </a>
                
                <FaucetButton compact />
              </div>

              {/* Instant Trust Pillars */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-borderSubtle text-xs text-textSecondary font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span>Non-Custodial Escrows</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>Sub-Second Rollup Settlement</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Native zkLTC Stake Pools</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Futuristic Dashboard Mockup */}
          <div className="lg:col-span-6 relative flex justify-center items-center w-full min-h-[460px] lg:min-h-[540px]">
            <HeroMock />
          </div>
        </div>

        {/* ==================== 1.1 TRUST METRICS BAR ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Active Predictors', value: '24,718', change: '+12.4% this week', desc: 'Verified unique users' },
            { label: 'Live Markets', value: '186', change: 'Across 4 major assets', desc: 'Fully collateralized pools' },
            { label: 'Total Volume Predicted', value: '8,429,150 zkLTC', change: 'Settled on Liteforge', desc: 'Secured by PoW consensus' },
            { label: 'Platform Uptime', value: '99.98%', change: 'Last 90 days', desc: 'Distributed zk-node network' },
          ].map((item) => (
            <div 
              key={item.label} 
              className="card relative p-card-lg overflow-hidden"
            >
              <span className="block text-[11px] font-mono font-semibold text-textSecondary mb-2">
                {item.label}
              </span>
              
              <span className="block text-2xl sm:text-3xl font-extrabold text-textPrimary">
                {item.value}
              </span>
              
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[11px] font-semibold text-success font-mono bg-success/10 px-1.5 py-0.5 rounded">
                  {item.change}
                </span>
                <span className="text-[10px] text-textSecondary">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ==================== 2. KEY FEATURES SECTION ==================== */}
      <Section
        id="features"
        eyebrow="Key Advantages"
        title="Unleashing the Power of AI + Rollups"
        subtitle="Novyn merges Liteforge's sub-second rollup architecture with high-fidelity predictive intelligence."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Brain,
              title: 'AI-Powered Market Signals',
              desc: 'Intelligent LLM agents active on-chain, constantly crawling social sentiment, price signals, and news feeds to flag pool inefficiencies.',
              iconColor: 'text-primary'
            },
            {
              icon: Shield,
              title: 'Trustless Collateral Pools',
              desc: 'Every stake is automatically locked in transparent smart escrows. Settle natively with zkLTC without trusting central bridges.',
              iconColor: 'text-secondary'
            },
            {
              icon: Zap,
              title: 'Sub-Second Transactions',
              desc: 'Experience immediate trades. LitVM virtual machine delivers lightning-quick transactions on the Liteforge chain with gas-free mints.',
              iconColor: 'text-accent'
            },
            {
              icon: BarChart3,
              title: 'Dynamic Liquidity Escrow',
              desc: 'Open stake metrics with an intuitive AMM model. Stake rewards automatically compound and winners divide pools proportionally.',
              iconColor: 'text-success'
            },
            {
              icon: Sparkles,
              title: 'Deep Sentiment Index',
              desc: 'View comprehensive real-time order sheets, historical charts, price standard deviations, and consensus forecasts in a single frame.',
              iconColor: 'text-warning'
            },
            {
              icon: Lock,
              title: 'Non-Custodial & Sovereign',
              desc: 'Connect your MetaMask or EVM-compatible wallet. Your funds, keys, stake parameters, and rewards remain entirely under your control.',
              iconColor: 'text-primary'
            }
            ].map((feat) => (
            <div 
              key={feat.title} 
              className="card relative p-card-lg overflow-hidden group hover:border-primary/40"
            >
              <div className={`w-11 h-11 rounded-control bg-surfaceElevated border border-border flex items-center justify-center mb-5 ${feat.iconColor}`}>
                <feat.icon size={20} />
              </div>
              
              <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
                {feat.title}
              </h3>
              
              <p className="text-sm text-textSecondary leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ==================== 3. TRENDING MARKETS SECTION ==================== */}
      <Section
        id="trending-markets"
        eyebrow="Live Pools"
        title="Trending Prediction Markets"
        subtitle="The hot zones with deep liquidity, tight spreads, and active forecast battles."
        right={
          <Link 
            to="/markets" 
            className="group inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-white transition-colors"
          >
            <span>View all live markets</span>
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        }
      >
        <div className="grid md:grid-cols-3 gap-6">
          {trending.map((m) => (
            <div key={m.id} className="relative group">
              <MarketCard m={m} />
            </div>
          ))}
        </div>
      </Section>

      {/* ==================== 4. HOW IT WORKS SECTION ==================== */}
      <Section
        id="how-it-works"
        eyebrow="Onboarding"
        title="From Signal to Settled in Minutes"
        subtitle="No custodial accounts, no complex sign-ups. Connect your wallet and forecast natively on LitVM."
      >
        <div className="relative">
          {/* Connecting dashed line for desktop */}
          <div aria-hidden="true" className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[1px] border-t border-dashed border-border -translate-y-1/2 -z-10" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Connect Wallet',
                desc: 'Instantly connect via MetaMask. Our platform autodetects your state and configures the LitVM RPC parameters.',
                icon: Wallet,
                iconColor: 'text-primary'
              },
              {
                step: '02',
                title: 'Claim zkLTC Faucet',
                desc: 'Need testnet coins? Grab free zkLTC gas tokens directly inside the dashboard to power your transactions.',
                icon: Coins,
                iconColor: 'text-secondary'
              },
              {
                step: '03',
                title: 'Take Your Position',
                desc: 'Choose your side: stake on UP or DOWN. Escrow your zkLTC in the secure, verifiable smart contract pool.',
                icon: TrendingUp,
                iconColor: 'text-accent'
              },
              {
                step: '04',
                title: 'Claim Rewards',
                desc: 'When the market expires, resolution occurs instantly. Winners divide the pool pot proportionally, settled in zkLTC.',
                icon: Trophy,
                iconColor: 'text-success'
              }
            ].map((step) => (
              <div 
                key={step.step} 
                className="card relative p-card-lg overflow-hidden group hover:border-primary/40 transition-colors duration-200"
              >
                {/* Numeric background badge */}
                <div className="absolute top-1 right-2 text-7xl font-black font-mono text-white/[0.03] select-none pointer-events-none">
                  {step.step}
                </div>

                <div className={`w-10 h-10 rounded-control bg-surfaceElevated border border-border flex items-center justify-center mb-4 ${step.iconColor}`}>
                  <step.icon size={18} />
                </div>

                <h4 className="text-base font-bold mb-1.5">
                  {step.title}
                </h4>

                <p className="text-xs text-textSecondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ==================== 5. PLATFORM PREVIEW SECTION ==================== */}
      <Section
        id="preview"
        eyebrow="Platform Preview"
        title="Dense Terminal, Intuitive Trading"
        subtitle="Designed for quick-executing prediction traders. Track depth, leverage high-fidelity charting, and manage positions."
      >
        <div className="card p-card-lg lg:p-10 relative overflow-hidden">
          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary mb-3">
                <Server size={12} />
                <span>Consolidated Trading Frame</span>
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
                Everything you need in a single dashboard
              </h3>
              
              <p className="text-sm text-textSecondary mb-6 leading-relaxed">
                Skip jumping between block explorers, portfolio pages, and order flow trackers. 
                Novyn renders live pool depth, automated consensus estimates, AI standard deviation metrics, 
                and your historical trade logs inside a unified web console.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Live AMM constant product pool ratios',
                  'Deterministic asset price tracking feed',
                  'Instant EVM smart contract settlements',
                  'Transparent pool sharing math (zkLTC)'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs font-medium text-neutral-300">
                    <CheckCircle2 size={14} className="text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/markets" 
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <span>Launch Trading App</span> 
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="lg:col-span-7">
              <PlatformPreviewMock />
            </div>
          </div>
        </div>
      </Section>

      {/* ==================== 6. FOOTER ==================== */}
      <footer className="mt-24 pt-16 border-t border-borderSubtle relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-control bg-surfaceElevated border border-border flex items-center justify-center">
                <span className="text-primary font-black text-sm">N</span>
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-white">Novyn</span>
                <div className="text-[10px] text-textSecondary font-mono">Prediction Markets</div>
              </div>
            </div>
            <p className="text-xs text-textSecondary leading-relaxed mb-4">
              AI-powered decentralized prediction markets engineered on Litecoin's first zk-rollup (LitVM). 
              Fast, transparent, secure, and non-custodial.
            </p>
            <div className="flex items-center gap-3">
              {['Twitter', 'Discord', 'Github'].map((social) => (
                <a key={social} href="#" className="text-xs text-textSecondary hover:text-white transition-colors font-mono">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <FooterCol title="Markets" links={[
            { label: 'All Prediction Markets', to: '/markets' },
            { label: 'BTC Asset Pools', to: '/markets' },
            { label: 'ETH Asset Pools', to: '/markets' },
            { label: 'LTC Asset Pools', to: '/markets' },
          ]} />
          
          <FooterCol title="LitVM Ecosystem" external links={[
            { label: 'Liteforge Hub Portal', to: 'https://liteforge.hub.caldera.xyz' },
            { label: 'Rollup Block Explorer', to: 'https://liteforge.explorer.caldera.xyz' },
            { label: 'LitVM Testnet Faucet', to: 'https://liteforge.hub.caldera.xyz' },
            { label: 'Caldera Sandbox', to: 'https://liteforge.hub.caldera.xyz' },
          ]} />
          
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold text-white mb-4 font-mono">
              Network Status
            </span>
            <ul className="space-y-2.5 text-xs text-textSecondary font-mono">
              <li className="flex items-center justify-between">
                <span>Chain ID:</span>
                <span className="text-white font-semibold">{LITVM_NETWORK.chainId}</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Native Stake:</span>
                <span className="text-primary font-semibold">zkLTC</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Block Time:</span>
                <span className="text-secondary font-semibold">&lt; 1.0s</span>
              </li>
              <li className="flex items-center justify-between">
                <span>System Health:</span>
                <span className="text-success font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span>Optimal</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-borderSubtle py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-textSecondary font-mono">
          <span>© {new Date().getFullYear()} Novyn. Securely settled on LitVM Testnet.</span>
          <span className="flex items-center gap-3">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ==================== helpers ==================== */

function Section({
  eyebrow, title, subtitle, right, children, id
}: {
  eyebrow: string; title: string; subtitle?: string; right?: React.ReactNode; children: React.ReactNode; id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="py-16 sm:py-24 border-t border-borderSubtle first:border-0"
    >
      <div className="flex items-end justify-between flex-wrap gap-6 mb-10 text-left">
        <div>
          <span className="chip mb-3">{eyebrow}</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && <p className="text-textSecondary mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">{subtitle}</p>}
        </div>
        {right && <div className="flex items-center">{right}</div>}
      </div>
      {children}
    </motion.section>
  );
}

function FooterCol({
  title, links, external,
}: { title: string; links: { label: string; to: string }[]; external?: boolean }) {
  return (
    <div className="flex flex-col text-left">
      <span className="text-sm font-bold text-white mb-4 uppercase tracking-wider font-mono">
        {title}
      </span>
      <ul className="space-y-2.5 text-xs text-textSecondary">
        {links.map((x) => (
          <li key={x.label}>
            {external ? (
              <a 
                href={x.to} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <span>{x.label}</span>
                <ArrowUpRight size={10} className="opacity-50" />
              </a>
            ) : (
              <Link to={x.to} className="hover:text-primary transition-colors">{x.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==================== HERO DYNAMIC TERMINAL MOCKUP ==================== */

function HeroMock() {
  const [outcome, setOutcome] = useState<'yes' | 'no'>('yes');
  const [stake, setStake] = useState<number>(50);
  const [liveTraders, setLiveTraders] = useState<number>(312);

  // Simulated live metrics ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTraders((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const yesProb = 64;
  const noProb = 100 - yesProb;
  const multiplier = outcome === 'yes' ? (100 / yesProb) : (100 / noProb);
  const potentialPayout = stake * multiplier;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative w-full max-w-[500px] h-[520px] select-none"
    >
      {/* ==================== Main Console Panel ==================== */}
      <div className="absolute inset-0 card p-card-lg bg-surface/95 overflow-hidden flex flex-col justify-between">
        
        {/* Header Tab bar */}
        <div className="flex items-center justify-between pb-3 border-b border-borderSubtle">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-[10px] font-mono text-primary font-bold">LITEFORGE · LITVM</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Dynamic Trading Terminal Widget */}
        <div className="flex-1 my-4 flex flex-col justify-between">
          
          {/* Active Featured Market Section */}
          <div className="rounded-card bg-background border border-borderSubtle p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="chip text-[9px] font-bold px-2 py-0.5">LTC POOL #150</span>
              <span className="text-[10px] text-textSecondary font-mono flex items-center gap-1">
                <Clock size={10} className="text-secondary" />
                <span>18 days left</span>
              </span>
            </div>
            
            <h4 className="text-xs font-bold text-white mb-3 text-left">
              Will LTC reclaim $150 by July 31?
            </h4>

            {/* YES / NO Active Toggle Controls */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button 
                onClick={() => setOutcome('yes')} 
                className={`py-2 px-3 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 ${
                  outcome === 'yes' 
                    ? 'bg-success/15 text-success border border-success/40' 
                    : 'bg-surface text-textSecondary border border-border hover:text-white'
                }`}
              >
                <span>YES</span>
                <span className="text-[10px] font-normal text-success/70">{yesProb}%</span>
              </button>
              <button 
                onClick={() => setOutcome('no')} 
                className={`py-2 px-3 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 ${
                  outcome === 'no' 
                    ? 'bg-error/15 text-error border border-error/40' 
                    : 'bg-surface text-textSecondary border border-border hover:text-white'
                }`}
              >
                <span>NO</span>
                <span className="text-[10px] font-normal text-error/70">{noProb}%</span>
              </button>
            </div>

            {/* Slider Stake simulation */}
            <div className="mb-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-textSecondary mb-1.5">
                <span>Staking stake amount:</span>
                <span className="text-white font-bold">{stake} zkLTC</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="250" 
                step="10"
                value={stake} 
                onChange={(e) => setStake(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary" 
              />
            </div>
            
            {/* Probability spline chart */}
            <div className="mt-2 h-14 relative w-full overflow-hidden">
              <Sparkline active={outcome} />
            </div>
          </div>

          {/* Nested mini ledger rows */}
          <div className="space-y-1.5">
            {[
              { asset: 'BTC', query: 'BTC closes above $120,000 by July 1?', prob: 62, status: 'text-success' },
              { asset: 'ETH', query: 'ETH break $5,000 before August 15?', prob: 41, status: 'text-success' },
              { asset: 'SOL', query: 'SOL holds above $300 at end of June?', prob: 54, status: 'text-error' }
            ].map((row) => (
              <div key={row.asset} className="flex items-center justify-between rounded-control bg-background border border-borderSubtle px-3 py-1.5 text-xs text-left">
                <span className="font-mono text-[9px] bg-surfaceElevated px-1.5 py-0.5 rounded-control text-neutral-300 font-bold border border-border">{row.asset}</span>
                <span className="flex-1 truncate mx-3 text-neutral-300 text-[11px]">{row.query}</span>
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span className="text-white font-semibold">{row.prob}%</span>
                  <span className={row.status}>{row.status.includes('success') ? '▲' : '▼'}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer info log */}
        <div className="flex justify-between items-center text-[10px] font-mono text-textSecondary pt-2.5 border-t border-borderSubtle">
          <span>TX LIMITS: Unlimited</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            <span>GAS: 0 zkLTC</span>
          </span>
        </div>

      </div>

      {/* ==================== 1. Floating AI Sentiment Card (Left) ==================== */}
      <motion.div className="absolute -left-8 top-[140px] w-[180px] p-3.5 glass-panel z-20">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={14} className="text-secondary" />
          <span className="text-[10px] font-bold text-white font-mono">AI Sentiment</span>
        </div>
        <div className="text-xl font-extrabold text-secondary leading-none">Bullish Bias</div>
        <div className="text-[9px] font-mono text-textSecondary mt-1.5 mb-2">Confidence level: 87.4%</div>
        
        {/* Animated Gauge */}
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-primary transition-all duration-1000" style={{ width: '87.4%' }} />
        </div>
      </motion.div>

      {/* ==================== 2. Floating Potential Reward Card (Right Bottom) ==================== */}
      <motion.div className="absolute -right-6 bottom-[40px] w-[210px] p-4 panel-accent border-primary/20 z-20">
        <div className="flex items-center gap-2 mb-2">
          <Trophy size={14} className="text-accent" />
          <span className="text-[10px] font-bold text-white font-mono">Forecast Yield</span>
        </div>
        
        <div className="flex items-baseline gap-1 leading-none mb-1">
          <span className="text-2xl font-black font-mono text-white">+{potentialPayout.toFixed(1)}</span>
          <span className="text-xs text-primary font-mono font-bold">zkLTC</span>
        </div>
        
        <div className="text-[9px] font-mono text-textSecondary leading-normal">
          For a <span className="text-white font-bold">{stake} zkLTC</span> stake in outcome <span className="text-accent font-bold uppercase">{outcome}</span> ({multiplier.toFixed(2)}x yield)
        </div>
      </motion.div>

      {/* ==================== 3. Floating Hot Signal Card (Right Top) ==================== */}
      <motion.div className="absolute -right-2 top-2 p-2.5 rounded-card glass-panel flex items-center gap-2 z-20">
        <Flame size={14} className="text-accent" />
        <span className="text-[9px] font-mono text-neutral-300 font-semibold">
          +{liveTraders} ACTIVE FORECASTERS
        </span>
      </motion.div>

    </motion.div>
  );
}

function Sparkline({ active }: { active: 'yes' | 'no' }) {
  const pts = [20, 25, 23, 30, 28, 38, 35, 45, 40, 52, 48, 55, 52, 60, 64];
  const max = Math.max(...pts);
  const w = 340, h = 60;
  const step = w / (pts.length - 1);
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - (p / max) * h}`).join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  const lineColor = active === 'yes' ? '#00C076' : '#E05252';
  const gradId = active === 'yes' ? 'yesGrad' : 'noGrad';

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.16" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} className="transition-all duration-500" />
      <path d={path} stroke={lineColor} strokeWidth="2" fill="none" className="transition-all duration-500" />
      
      <circle 
        cx={w} 
        cy={h - (pts[pts.length - 1] / max) * h} 
        r="3" 
        fill={lineColor} 
      />
    </svg>
  );
}

/* ==================== PLATFORM PREVIEW WIDGET ==================== */

function PlatformPreviewMock() {
  const [simulatedTrades, setSimulatedTrades] = useState<{ id: string; tx: string; pool: string; time: string; side: 'UP' | 'DOWN'; value: string }[]>([
    { id: '1', tx: 'tx_a38b...', pool: 'LTC Reclaim $150', time: 'Just now', side: 'UP', value: '45.0 zkLTC' },
    { id: '2', tx: 'tx_fe12...', pool: 'BTC closes $120k', time: '1s ago', side: 'UP', value: '120.0 zkLTC' },
    { id: '3', tx: 'tx_320f...', pool: 'ETH breaks $5k', time: '3s ago', side: 'DOWN', value: '15.0 zkLTC' },
    { id: '4', tx: 'tx_bc87...', pool: 'SOL holds $300', time: '6s ago', side: 'UP', value: '62.5 zkLTC' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const txHash = 'tx_' + Math.random().toString(16).substring(2, 6) + '...';
      const pools = ['BTC closes $120k', 'ETH breaks $5k', 'SOL holds $300', 'LTC Reclaim $150'];
      const randomPool = pools[Math.floor(Math.random() * pools.length)];
      const sides: ('UP' | 'DOWN')[] = ['UP', 'DOWN'];
      const randomSide = sides[Math.floor(Math.random() * sides.length)];
      const randomVal = (Math.floor(Math.random() * 80) + 5).toFixed(1) + ' zkLTC';

      setSimulatedTrades((prev) => [
        { id: Date.now().toString(), tx: txHash, pool: randomPool, time: 'Just now', side: randomSide, value: randomVal },
        ...prev.slice(0, 3).map(item => {
          if (item.time === 'Just now') return { ...item, time: '1s ago' };
          if (item.time === '1s ago') return { ...item, time: '3s ago' };
          if (item.time === '3s ago') return { ...item, time: '6s ago' };
          return item;
        })
      ]);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card p-card-lg flex flex-col text-left">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="chip font-mono text-[10px] px-2 py-0.5">LTC/USD POOL</span>
          <span className="text-xs text-textSecondary font-mono">Current Pool: 333.1 zkLTC</span>
        </div>
        <span className="text-xs text-success font-mono flex items-center gap-1">
          <TrendingUp size={12} /> 
          <span>+4.2% activity</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Dynamic mini-chart */}
        <div className="md:col-span-8 rounded-card bg-background border border-borderSubtle p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs font-mono text-textSecondary mb-2">
            <span>Probability spline path (24h)</span>
            <span className="text-success">67% Consensus YES</span>
          </div>
          <div className="h-32 relative">
            <svg viewBox="0 0 300 100" className="w-full h-full">
              <defs>
                <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00C076" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#00C076" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 80 Q 50 70 100 65 T 200 40 T 300 33 L 300 100 L 0 100 Z" fill="url(#chartGrad)" />
              <path d="M 0 80 Q 50 70 100 65 T 200 40 T 300 33" stroke="#00C076" strokeWidth="2" fill="none" />
              <circle cx="300" cy="33" r="3" fill="#00C076" />
            </svg>
          </div>
        </div>

        {/* Outcome stakes overview */}
        <div className="md:col-span-4 space-y-2">
          <div className="rounded-card bg-success/5 border border-success/20 p-3 flex flex-col justify-between h-[62px]">
            <div className="text-[10px] font-mono text-success font-semibold">UP POOL</div>
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-extrabold font-mono">67%</span>
              <span className="text-[10px] text-textSecondary">220.7 zkLTC</span>
            </div>
          </div>
          <div className="rounded-card bg-error/5 border border-error/20 p-3 flex flex-col justify-between h-[62px]">
            <div className="text-[10px] font-mono text-error font-semibold">DOWN POOL</div>
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-extrabold font-mono">33%</span>
              <span className="text-[10px] text-textSecondary">112.4 zkLTC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Transaction Ledger Stream */}
      <div className="mt-5 pt-4 border-t border-borderSubtle">
        <h4 className="text-xs font-mono font-bold text-white mb-2.5">
          LIVE TRANSACTION LEDGER (LITEFORGE ROLLUP)
        </h4>
        <div className="space-y-1.5 h-32 overflow-hidden relative">
          
          <AnimatePresence>
            {simulatedTrades.map((trade) => (
              <motion.div
                key={trade.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between text-[11px] font-mono border-b border-borderSubtle pb-1"
              >
                <span className="text-primary font-bold">{trade.tx}</span>
                <span className="text-neutral-400 truncate max-w-[120px]">{trade.pool}</span>
                <span className={`px-1.5 py-0.5 rounded-control font-bold text-[9px] ${trade.side === 'UP' ? 'bg-success/15 text-success' : 'bg-error/15 text-error'}`}>
                  {trade.side}
                </span>
                <span className="text-white font-semibold">{trade.value}</span>
                <span className="text-textSecondary text-[10px]">{trade.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
