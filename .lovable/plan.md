## Goal

Replace the current TanStack Start scaffold with the uploaded Vite + React + Tailwind setup, and build CryptoOracle — a crypto price prediction markets dApp wired to **LitVM Liteforge Testnet** from day one, using **zkLTC** (native token) for all stakes. No USDC anywhere.

## LitVM Network Constants

Pulled from Caldera / ChainList:

- Chain name: `LitVM Liteforge Testnet`
- Chain ID: `4441` (hex `0x1159`)
- RPC: `https://liteforge.rpc.caldera.xyz/http`
- Native token: `zkLTC` (18 decimals, symbol `zkLTC`)
- Explorer: `https://liteforge.explorer.caldera.xyz`
- Faucet / Hub: `https://liteforge.hub.caldera.xyz`

These will live in `src/config/network.ts` as a single source of truth.

## Scope of changes

### 1. Project structure — migrate to Vite

- Delete TanStack Start scaffold: `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`, `src/routes/`, `src/lib/{config.server,error-capture,error-page,lovable-error-reporting,api}*`, `src/styles.css`.
- Keep `src/components/ui/*` shadcn primitives we'll reuse (button, card, dialog, badge, input, tabs, sonner, tooltip).
- Add Vite project files from uploads: `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.js`, `postcss.config.js`, updated `package.json`.
- New entry: `src/main.tsx`, `src/App.tsx`, `src/index.css` (Tailwind directives + the dark theme tokens used by the shadcn primitives).

### 2. Wallet + network layer (`src/lib/wallet.ts`, `src/contexts/WalletContext.tsx`)

- ethers v6 BrowserProvider over `window.ethereum`.
- `connectWallet()` — request accounts, then auto-call `ensureLitVMNetwork()`.
- `ensureLitVMNetwork()` — try `wallet_switchEthereumChain` to `0x1159`; on error code `4902` (unknown chain) call `wallet_addEthereumChain` with the full LitVM params (chain name, RPC, native currency, explorer). This is the **one-click add network**.
- `WalletContext` exposes: `address`, `chainId`, `balance` (zkLTC, formatted), `isOnLitVM`, `connect()`, `disconnect()`, `refreshBalance()`.
- Listen to `accountsChanged` and `chainChanged`.

### 3. Faucet integration

- `<FaucetButton />` component. When clicked:
  - If wallet not connected → connect first.
  - If not on LitVM → auto-switch/add.
  - Open `https://liteforge.hub.caldera.xyz` in a new tab with the user's address copied to clipboard + a toast: "Address copied — paste into the faucet".
- Surfaced in the header next to Connect Wallet and on an empty-balance state in the markets/portfolio views.

### 4. Prediction markets — zkLTC only

- Remove every reference to USDC / mock USDC contracts / approve flows. All stakes are **native zkLTC** sent via `signer.sendTransaction({ value })` to a per-market escrow address (configurable; defaults to a placeholder address in `src/config/markets.ts` with a clear `TODO_DEPLOYED_CONTRACT` flag).
- Market shape: `{ id, asset (BTC/ETH/SOL/LTC), strikePrice, expiry, totalUpStake, totalDownStake, status }`. Seeded list in `src/data/markets.ts` (UI-only — resolution price feeds are mocked but values displayed in zkLTC).
- Pages (React Router v6):
  - `/` Landing — hero, LitVM badge, "Add LitVM to Wallet" + "Get zkLTC" CTAs, live markets preview.
  - `/markets` — grid of active markets, filter by asset.
  - `/markets/:id` — chart (Recharts), Up/Down stake form denominated in zkLTC, pool stats, your position.
  - `/portfolio` — connected wallet's positions + zkLTC balance + claim button on resolved markets.
- Trade flow: user enters zkLTC amount → confirms in wallet → `sendTransaction` to escrow → optimistic UI + toast with explorer link `https://liteforge.explorer.caldera.xyz/tx/<hash>`.

### 5. Header / Network indicator

- Shows current chain. If not 4441, red "Wrong network — Switch to LitVM" button that triggers `ensureLitVMNetwork()`.
- Connect button shows truncated address + zkLTC balance once connected.

### 6. Styling

Use the uploaded `tailwind.config.js` palette (primary `#9E7FFF`, dark background `#171717`, accents). Keep the design dark, with the hero gradient already defined. Inter + JetBrains Mono fonts already wired in `index.html`.

## Out of scope (call out explicitly)

- No real smart-contract deployment. Escrow address is a placeholder constant; the app is wired correctly to send zkLTC and read receipts, but settlement logic is mocked client-side until contracts are provided.
- No backend / database — fully client-side, no Lovable Cloud needed.
- Price oracles for resolution are mocked (random walk seeded by asset) — swap in real Pyth/Chainlink once available on LitVM.

## Technical notes

- `package.json` from upload is used as-is; will run `bun install` after writing files.
- shadcn UI components currently in `src/components/ui` were generated for Radix and will work as-is in a plain Vite app — they don't depend on TanStack Start. Will keep `src/lib/utils.ts` (`cn` helper).
- `vite.config.ts` keeps `define: { global: 'globalThis' }` for ethers compatibility.
- One-click add network uses EIP-3085 (`wallet_addEthereumChain`) + EIP-3326 (`wallet_switchEthereumChain`) — works in MetaMask, Rabby, Coinbase Wallet, Rainbow.
