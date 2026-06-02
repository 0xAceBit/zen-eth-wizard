import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, TrendingUp, TrendingDown, Activity,
  Sparkles, Brain, Lock, BarChart3, Flame, Wallet, Coins, Trophy,
} from 'lucide-react';
import { motion } from 'framer-motion';
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

  return (
    <div className="relative">
      {/* Ambient gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[120px]" />
        <div className="absolute top-[600px] left-0 w-[400px] h-[400px] rounded-full bg-accent/15 blur-[120px]" />
      </div>

      {/* ============== HERO ============== */}
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="chip mb-6">
              <Sparkles size={12} />
              Live on LitVM Liteforge · Chain {LITVM_NETWORK.chainId}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6">
              <span className="bg-gradient-to-br from-white via-white to-textSecondary bg-clip-text text-transparent">
                Predict the Future with{' '}
              </span>
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                AI-Powered Markets
              </span>
              <span className="bg-gradient-to-br from-white to-textSecondary bg-clip-text text-transparent">
                {' '}on LitVM
              </span>
            </h1>
            <p className="text-base sm:text-lg text-textSecondary max-w-xl mb-8 leading-relaxed">
              Participate in decentralized prediction markets powered by LitVM. Forecast
              real-world events, discover market sentiment, and earn rewards through
              transparent, intelligent, and secure prediction infrastructure.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {primaryCta ? (
                <button onClick={primaryCta.onClick} className="btn-primary flex items-center gap-2">
                  {primaryCta.label} <ArrowRight size={16} />
                </button>
              ) : (
                <Link to="/markets" className="btn-primary flex items-center gap-2">
                  Start Predicting <ArrowRight size={16} />
                </Link>
              )}
              <Link to="/markets" className="btn-ghost flex items-center gap-2">
                Explore Markets
              </Link>
              <FaucetButton compact />
            </div>

            {/* Inline reassurance */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-textSecondary">
              <span className="flex items-center gap-1.5"><Lock size={12} className="text-success" /> Non-custodial</span>
              <span className="flex items-center gap-1.5"><Zap size={12} className="text-secondary" /> Sub-second settlement</span>
              <span className="flex items-center gap-1.5"><Coins size={12} className="text-primary" /> Native zkLTC stakes</span>
            </div>
          </motion.div>

          {/* Right: mock dashboard */}
          <HeroMock />
        </div>

        {/* Trust metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {[
            { k: 'Active Predictors', v: '24,718', sub: '+12.4% this week' },
            { k: 'Live Markets', v: '186', sub: 'Across 14 categories' },
            { k: 'Total Volume Predicted', v: '8.42M zkLTC', sub: 'Settled on-chain' },
            { k: 'Platform Uptime', v: '99.98%', sub: 'Last 90 days' },
          ].map((s) => (
            <div key={s.k} className="card p-5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-xs uppercase tracking-wider text-textSecondary font-mono mb-2">{s.k}</div>
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-br from-white to-textSecondary bg-clip-text text-transparent">{s.v}</div>
              <div className="text-[11px] text-success font-mono mt-1">{s.sub}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ============== KEY FEATURES ============== */}
      <Section
        eyebrow="Why Novyn"
        title="Built for the next era of forecasting"
        subtitle="A premium prediction stack — engineered on Litecoin's first zk-rollup."
      >
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { i: Brain, t: 'AI-Powered Insights', d: 'Models surface mispriced markets, sentiment shifts, and tail-risk signals in real time.' },
            { i: Shield, t: 'Trustless Settlement', d: 'Every stake escrowed in native zkLTC. No custodians, no IOU tokens, no off-chain promises.' },
            { i: Zap, t: 'LitVM Speed', d: 'Sub-second confirmations on the Liteforge rollup, secured by Bitcoin-aligned PoW.' },
            { i: BarChart3, t: 'Transparent Liquidity', d: 'Open up/down pools with on-chain order flow. Winners split the pot, pro rata.' },
            { i: Sparkles, t: 'Beautiful Trading UX', d: 'A dashboard built for traders — charts, sentiment, positions, all in one frame.' },
            { i: Lock, t: 'Non-custodial by Default', d: 'Your keys, your stakes, your rewards. Novyn never touches your funds.' },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="card p-6 hover:border-primary transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/30 flex items-center justify-center mb-4 group-hover:shadow-[0_0_24px_rgba(158,127,255,0.45)] transition-shadow">
                <Icon size={18} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1.5">{t}</h3>
              <p className="text-sm text-textSecondary leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============== TRENDING MARKETS ============== */}
      <Section
        eyebrow="Trending now"
        title="Hot prediction markets"
        subtitle="The pools with the deepest liquidity and sharpest debate."
        right={
          <Link to="/markets" className="text-sm text-primary hover:underline flex items-center gap-1">
            All markets <ArrowRight size={14} />
          </Link>
        }
      >
        <div className="grid md:grid-cols-3 gap-4">
          {trending.map((m) => <MarketCard key={m.id} m={m} />)}
        </div>
      </Section>

      {/* ============== HOW IT WORKS ============== */}
      <Section
        eyebrow="How it works"
        title="From signal to settled in four steps"
        subtitle="No accounts. No KYC. Just a wallet on LitVM."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { i: Wallet, n: '01', t: 'Connect & Add LitVM', d: 'One-click network add to MetaMask. We handle EIP-3085 for you.' },
            { i: Coins, n: '02', t: 'Fund with zkLTC', d: 'Grab testnet zkLTC from the Liteforge faucet in seconds.' },
            { i: TrendingUp, n: '03', t: 'Take a Position', d: 'Stake on UP or DOWN. Your funds enter the on-chain escrow pool.' },
            { i: Trophy, n: '04', t: 'Claim Rewards', d: 'When the market resolves, winners split the pot pro rata in zkLTC.' },
          ].map(({ i: Icon, n, t, d }) => (
            <div key={t} className="card p-6 relative overflow-hidden">
              <div className="absolute -top-3 -right-3 text-6xl font-black font-mono text-white/5 select-none">{n}</div>
              <Icon size={20} className="text-secondary mb-3 relative" />
              <h3 className="font-semibold mb-1 relative">{t}</h3>
              <p className="text-sm text-textSecondary relative leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============== PLATFORM PREVIEW ============== */}
      <Section
        eyebrow="Platform preview"
        title="An interface traders actually want to use"
        subtitle="Dense without being noisy. Beautiful without being slow."
      >
        <div className="card p-6 lg:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
          <div className="relative grid lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-3">Everything in one frame</h3>
              <p className="text-textSecondary mb-6 leading-relaxed">
                Live order flow, depth-of-pool, sentiment, and your active positions —
                all settled by LitVM smart contracts. No tabs to juggle.
              </p>
              <Link to="/markets" className="btn-primary inline-flex items-center gap-2">
                Open the app <ArrowRight size={16} />
              </Link>
            </div>
            <div className="lg:col-span-3">
              <PlatformPreviewMock />
            </div>
          </div>
        </div>
      </Section>

      {/* ============== FOOTER ============== */}
      <footer className="mt-24 pt-10 border-t border-border">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(158,127,255,0.5)]">
                <span className="text-white font-black text-sm">N</span>
              </div>
              <div className="font-bold tracking-tight">Novyn</div>
            </div>
            <p className="text-sm text-textSecondary leading-relaxed">
              AI-powered prediction markets on LitVM. Forecast, stake, settle — on-chain.
            </p>
          </div>
          <FooterCol title="Product" links={[
            { l: 'Markets', to: '/markets' },
            { l: 'Portfolio', to: '/portfolio' },
          ]} />
          <FooterCol title="LitVM" external links={[
            { l: 'Liteforge Hub', to: 'https://liteforge.hub.caldera.xyz' },
            { l: 'Explorer', to: 'https://liteforge.explorer.caldera.xyz' },
            { l: 'Faucet', to: 'https://liteforge.hub.caldera.xyz' },
          ]} />
          <FooterCol title="Network" links={[
            { l: `Chain ID ${LITVM_NETWORK.chainId}`, to: '#' },
            { l: 'Native token: zkLTC', to: '#' },
            { l: 'EVM compatible', to: '#' },
          ]} />
        </div>
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-textSecondary font-mono">
          <span>© {new Date().getFullYear()} Novyn. All rights reserved.</span>
          <span>Built on LitVM Liteforge Testnet</span>
        </div>
      </footer>
    </div>
  );
}

/* ---------- helpers ---------- */

function Section({
  eyebrow, title, subtitle, right, children,
}: {
  eyebrow: string; title: string; subtitle?: string; right?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="py-16"
    >
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="chip mb-3">{eyebrow}</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">{title}</h2>
          {subtitle && <p className="text-textSecondary mt-2 max-w-2xl">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </motion.section>
  );
}

function FooterCol({
  title, links, external,
}: { title: string; links: { l: string; to: string }[]; external?: boolean }) {
  return (
    <div>
      <div className="text-sm font-semibold mb-3">{title}</div>
      <ul className="space-y-2 text-sm text-textSecondary">
        {links.map((x) => (
          <li key={x.l}>
            {external ? (
              <a href={x.to} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{x.l}</a>
            ) : (
              <Link to={x.to} className="hover:text-primary transition-colors">{x.l}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- hero mock ---------- */

function HeroMock() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative h-[520px] hidden lg:block"
    >
      {/* Glow */}
      <div className="absolute inset-10 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 blur-3xl" />

      {/* Main dashboard card */}
      <div className="absolute inset-0 card p-5 backdrop-blur-xl bg-surface/40 border-white/10 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-mono text-textSecondary">LIVE · LitVM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-error/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
          </div>
        </div>

        {/* Featured market */}
        <div className="rounded-xl bg-black/40 border border-white/10 p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="chip font-mono text-[10px]">BTC/USD</span>
            <span className="text-[10px] text-textSecondary font-mono">resolves 18d</span>
          </div>
          <div className="font-semibold text-sm mb-3">BTC closes above $120,000 by July 1?</div>
          {/* Probability bar */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] text-success font-mono w-10">62%</span>
            <div className="flex-1 h-2 rounded-full overflow-hidden flex">
              <div className="bg-gradient-to-r from-success to-emerald-400" style={{ width: '62%' }} />
              <div className="bg-gradient-to-r from-error to-rose-500" style={{ width: '38%' }} />
            </div>
            <span className="text-[11px] text-error font-mono w-10 text-right">38%</span>
          </div>
          {/* Mini chart */}
          <Sparkline />
        </div>

        {/* Two rows of markets */}
        <div className="space-y-2">
          {[
            { a: 'ETH', q: 'ETH > $5,000 by Aug 15', p: 41, d: '+2.1%' },
            { a: 'SOL', q: 'SOL holds $300 EOM', p: 54, d: '-0.8%' },
            { a: 'LTC', q: 'LTC reclaims $150', p: 67, d: '+4.7%' },
          ].map((r) => (
            <div key={r.a} className="flex items-center gap-3 rounded-lg bg-black/30 border border-white/5 px-3 py-2">
              <span className="font-mono text-[10px] chip">{r.a}</span>
              <span className="text-xs flex-1 truncate">{r.q}</span>
              <span className="text-[11px] font-mono text-success">{r.p}%</span>
              <span className={`text-[10px] font-mono ${r.d.startsWith('+') ? 'text-success' : 'text-error'}`}>{r.d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating sentiment card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-6 top-32 card p-4 backdrop-blur-xl bg-surface/60 border-white/10 w-52 shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <Activity size={14} className="text-secondary" />
          <span className="text-xs font-semibold">Market Sentiment</span>
        </div>
        <div className="text-2xl font-black text-success mb-1">Bullish</div>
        <div className="text-[10px] font-mono text-textSecondary mb-2">AI confidence 87%</div>
        <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-secondary to-success" style={{ width: '87%' }} />
        </div>
      </motion.div>

      {/* Floating reward card */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -right-4 bottom-16 card p-4 backdrop-blur-xl bg-surface/60 border-white/10 w-56 shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <Trophy size={14} className="text-warning" />
          <span className="text-xs font-semibold">Potential Reward</span>
        </div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-black font-mono">+248.7</span>
          <span className="text-xs text-primary font-mono">zkLTC</span>
        </div>
        <div className="text-[10px] font-mono text-textSecondary">on 50 zkLTC stake · 4.97×</div>
      </motion.div>

      {/* Floating trending */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -right-2 top-4 card px-3 py-2 backdrop-blur-xl bg-surface/60 border-white/10 flex items-center gap-2 shadow-2xl"
      >
        <Flame size={12} className="text-accent" />
        <span className="text-[11px] font-mono">+312 traders · 1h</span>
      </motion.div>
    </motion.div>
  );
}

function Sparkline() {
  // simple SVG line
  const pts = [10, 14, 12, 18, 16, 22, 20, 28, 24, 32, 30, 38, 34, 42, 40];
  const max = Math.max(...pts);
  const w = 280, h = 50;
  const step = w / (pts.length - 1);
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - (p / max) * h}`).join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g1)" />
      <path d={path} stroke="#10b981" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function PlatformPreviewMock() {
  return (
    <div className="rounded-2xl bg-black/40 border border-white/10 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="chip font-mono text-[10px]">ETH/USD</span>
          <span className="text-xs text-textSecondary font-mono">Pool 218.4 zkLTC</span>
        </div>
        <span className="text-xs text-success font-mono flex items-center gap-1"><TrendingUp size={12} /> +3.2%</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 rounded-lg bg-black/40 border border-white/5 p-3">
          <Sparkline />
        </div>
        <div className="space-y-2">
          <div className="rounded-lg bg-success/10 border border-success/30 p-3">
            <div className="text-[10px] font-mono text-success">UP</div>
            <div className="text-lg font-black">58%</div>
          </div>
          <div className="rounded-lg bg-error/10 border border-error/30 p-3">
            <div className="text-[10px] font-mono text-error flex items-center gap-1"><TrendingDown size={10} /> DOWN</div>
            <div className="text-lg font-black">42%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
