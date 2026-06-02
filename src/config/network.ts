// LitVM Liteforge Testnet — https://liteforge.hub.caldera.xyz
export const LITVM_CHAIN_ID = 4441;
export const LITVM_CHAIN_ID_HEX = '0x1159';

export const LITVM_NETWORK = {
  chainId: LITVM_CHAIN_ID_HEX,
  chainName: 'LitVM Liteforge Testnet',
  nativeCurrency: {
    name: 'zkLTC',
    symbol: 'zkLTC',
    decimals: 18,
  },
  rpcUrls: ['https://liteforge.rpc.caldera.xyz/http'],
  blockExplorerUrls: ['https://liteforge.explorer.caldera.xyz'],
} as const;

export const LITVM_FAUCET_URL = 'https://liteforge.hub.caldera.xyz';
export const LITVM_EXPLORER = LITVM_NETWORK.blockExplorerUrls[0];

export const txUrl = (hash: string) => `${LITVM_EXPLORER}/tx/${hash}`;
export const addressUrl = (addr: string) => `${LITVM_EXPLORER}/address/${addr}`;
