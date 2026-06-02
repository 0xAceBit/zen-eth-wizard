import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { MARKETS } from '../data/markets';
import MarketCard from '../components/MarketCard';
import FaucetButton from '../components/FaucetButton';
import { useWallet } from '../contexts/WalletContext';
import { LITVM_NETWORK } from '../config/network';

export default function Landing() {
  const { connect, address, switchToLitVM, isOnLitVM } = useWallet();
  const featured = MARKETS.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="pt-20 pb-24 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="chip mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Live on LitVM Liteforge Testnet · Chain {LITVM_NETWORK.chainId}
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 bg-gradient-to-br from-white via-white to-primary bg-clip-text text-transparent">
            Trade the future<br />of crypto prices
          </h1>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto mb-8">
            Decentralized prediction markets on Litecoin's first EVM rollup. Stake native <span className="text-primary font-semibold">zkLTC</span> on whether BTC, ETH, SOL or LTC will hit your target — settled on-chain.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {!address ? (
              <button onClick={connect} className="btn-primary flex items-center gap-2">
                Connect & Add LitVM <ArrowRight size={16} />
              </button>
            ) : !isOnLitVM ? (
              <button onClick={switchToLitVM} className="btn-primary flex items-center gap-2">
                Switch to LitVM <ArrowRight size={16} />
              </button>
            ) : (
              <Link to="/markets" className="btn-primary flex items-center gap-2">
                Explore Markets <ArrowRight size={16} />
              </Link>
            )}
            <FaucetButton />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="grid sm:grid-cols-3 gap-4 mb-20">
        {[
          { icon: Shield, t: 'Trustless settlement', d: 'All stakes held in native zkLTC on LitVM — no custodian, no IOU tokens.' },
          { icon: Zap, t: 'Arbitrum Orbit speed', d: 'Sub-second confirmations on the LiteForge rollup, secured by Bitcoin PoW.' },
          { icon: TrendingUp, t: 'Real markets, real edge', d: 'Up/Down pools with transparent on-chain liquidity. Winners split the pot.' },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="card p-6">
            <Icon className="text-primary mb-3" size={22} />
            <h3 className="font-semibold mb-1">{t}</h3>
            <p className="text-sm text-textSecondary">{d}</p>
          </div>
        ))}
      </section>

      {/* Featured markets */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Hot markets</h2>
            <p className="text-sm text-textSecondary">Featured prediction pools open right now</p>
          </div>
          <Link to="/markets" className="text-sm text-primary hover:underline flex items-center gap-1">
            All markets <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((m) => <MarketCard key={m.id} m={m} />)}
        </div>
      </section>
    </div>
  );
}
