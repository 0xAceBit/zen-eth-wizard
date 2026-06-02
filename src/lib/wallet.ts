import { BrowserProvider } from 'ethers';
import { LITVM_CHAIN_ID_HEX, LITVM_NETWORK } from '../config/network';

export type Eip1193Provider = {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<any>;
  on?: (event: string, handler: (...a: any[]) => void) => void;
  removeListener?: (event: string, handler: (...a: any[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export function getInjected(): Eip1193Provider | null {
  if (typeof window === 'undefined') return null;
  return window.ethereum ?? null;
}

export function getProvider(): BrowserProvider | null {
  const eth = getInjected();
  if (!eth) return null;
  return new BrowserProvider(eth as any);
}

export async function requestAccounts(): Promise<string[]> {
  const eth = getInjected();
  if (!eth) throw new Error('No EVM wallet detected. Install MetaMask, Rabby, Coinbase Wallet or Rainbow.');
  const accounts: string[] = await eth.request({ method: 'eth_requestAccounts' });
  return accounts;
}

/**
 * One-click add LitVM network. Tries to switch first, and if the chain is
 * unknown (error 4902) it adds it with full RPC + native-token params.
 */
export async function ensureLitVMNetwork(): Promise<void> {
  const eth = getInjected();
  if (!eth) throw new Error('No EVM wallet detected.');
  try {
    await eth.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: LITVM_CHAIN_ID_HEX }],
    });
  } catch (err: any) {
    // 4902: chain not added yet
    if (err?.code === 4902 || err?.data?.originalError?.code === 4902) {
      await eth.request({
        method: 'wallet_addEthereumChain',
        params: [LITVM_NETWORK],
      });
    } else {
      throw err;
    }
  }
}

export function shortAddr(addr: string | null | undefined): string {
  if (!addr) return '';
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
