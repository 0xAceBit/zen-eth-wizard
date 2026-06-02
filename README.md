# Novyn Wizard

A React + Vite prediction market demo for LitVM Liteforge Testnet.

This app is a UI prototype for an AI-powered prediction market experience. It lets users connect an injected EVM wallet, switch to the LitVM Liteforge testnet, browse mock markets, and place stakes in native `zkLTC` using a placeholder escrow flow.

## Key features

- React 18 + Vite + TypeScript front-end
- Tailwind CSS styling
- Wallet connect via injected `window.ethereum`
- LiteVM Liteforge Testnet network detection and auto-add/switch
- Market browsing and filtering by asset
- Market detail page with simulated price history
- Stake placement using native `zkLTC` transfers to a placeholder escrow address
- LocalStorage portfolio tracking for open positions
- Toast notifications for transaction status

## Pages

- `/` — Landing page with intro content, feature summaries, and trending markets
- `/markets` — Market listing with asset filters
- `/markets/:id` — Individual market detail and stake panel
- `/portfolio` — Connected wallet portfolio view, showing locally stored positions

## Architecture overview

- `src/App.tsx` — App shell and router configuration
- `src/main.tsx` — Root render, `BrowserRouter`, and `WalletProvider`
- `src/contexts/WalletContext.tsx` — Wallet state, address, chain, balance, connect/disconnect, and LitVM switching
- `src/lib/wallet.ts` — EVM wallet helpers, provider creation, network switching, and address formatting
- `src/config/network.ts` — LitVM chain config, explorer URL helpers, and faucet link
- `src/config/markets.ts` — Placeholder escrow address and `ESCROW_IS_PLACEHOLDER` flag
- `src/data/markets.ts` — Static market definitions and deterministic mock price history
- `src/pages/*` — Landing, Markets, MarketDetail, Portfolio UI pages
- `src/components/*` — UI primitives such as `Header`, `FaucetButton`, `MarketCard`, and `Toaster`

## Getting started

### Prerequisites

- Node.js 18+ installed
- Wallet extension such as MetaMask, Rabby, Rainbow, or Coinbase Wallet
- Access to the LitVM Liteforge testnet RPC

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local development URL shown by Vite.

### Build for production

```bash
npm run build
```

## Network and wallet details

- Target chain: `LitVM Liteforge Testnet`
- Chain ID: `4441`
- Native currency: `zkLTC`
- RPC URL: `https://liteforge.rpc.caldera.xyz/http`
- Explorer: `https://liteforge.explorer.caldera.xyz`
- Faucet link: `https://liteforge.hub.caldera.xyz`

## Important implementation notes

- Market data is static and mocked in `src/data/markets.ts`.
- `src/pages/MarketDetail.tsx` sends a native `zkLTC` transaction to `src/config/markets.ts`'s placeholder escrow address.
- Position history is stored only in browser `localStorage` under the key `novyn_positions_<lowercase address>`.
- `src/lib/wallet.ts` adds the LiteVM network if the wallet does not already have it.
- `main.tsx` adds a global `Buffer` polyfill for browser compatibility.

## Future improvements

- Replace placeholder escrow address with a deployed prediction market contract
- Add real market settlement, price feeds, and contract-backed resolution
- Persist positions with an on-chain or backend storage layer
- Add pagination, search, and real-time market updates

## Scripts

- `npm run dev` — Start the Vite development server
- `npm run build` — Compile TypeScript and build production assets
- `npm run preview` — Preview the production build locally

## Dependencies

- `react`, `react-dom`, `react-router-dom`
- `ethers`
- `tailwindcss`, `postcss`, `autoprefixer`
- `framer-motion`, `lucide-react`, `recharts`
- `typescript`, `vite`
