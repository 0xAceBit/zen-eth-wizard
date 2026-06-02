import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { formatEther } from 'ethers';
import { ensureLitVMNetwork, getInjected, getProvider, requestAccounts } from '../lib/wallet';
import { LITVM_CHAIN_ID } from '../config/network';

type WalletState = {
  address: string | null;
  chainId: number | null;
  balance: string; // in zkLTC, human-readable
  isOnLitVM: boolean;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchToLitVM: () => Promise<void>;
  refreshBalance: () => Promise<void>;
};

const WalletContext = createContext<WalletState | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [connecting, setConnecting] = useState(false);

  const isOnLitVM = chainId === LITVM_CHAIN_ID;

  const refreshChain = useCallback(async () => {
    const p = getProvider();
    if (!p) return;
    try {
      const net = await p.getNetwork();
      setChainId(Number(net.chainId));
    } catch {}
  }, []);

  const refreshBalance = useCallback(async () => {
    const p = getProvider();
    if (!p || !address) { setBalance('0'); return; }
    try {
      const bal = await p.getBalance(address);
      setBalance(parseFloat(formatEther(bal)).toFixed(4));
    } catch {
      setBalance('0');
    }
  }, [address]);

  const connect = useCallback(async () => {
    setConnecting(true);
    try {
      const accts = await requestAccounts();
      setAddress(accts[0] ?? null);
      await ensureLitVMNetwork();
      await refreshChain();
    } finally {
      setConnecting(false);
    }
  }, [refreshChain]);

  const switchToLitVM = useCallback(async () => {
    await ensureLitVMNetwork();
    await refreshChain();
  }, [refreshChain]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setBalance('0');
  }, []);

  // Restore previously connected account silently
  useEffect(() => {
    const eth = getInjected();
    if (!eth) return;
    eth.request({ method: 'eth_accounts' })
      .then((accs: string[]) => { if (accs?.[0]) setAddress(accs[0]); })
      .catch(() => {});
    refreshChain();
  }, [refreshChain]);

  // Event listeners
  useEffect(() => {
    const eth = getInjected();
    if (!eth?.on) return;
    const onAccounts = (accs: string[]) => setAddress(accs[0] ?? null);
    const onChain = (cid: string) => setChainId(parseInt(cid, 16));
    eth.on('accountsChanged', onAccounts);
    eth.on('chainChanged', onChain);
    return () => {
      eth.removeListener?.('accountsChanged', onAccounts);
      eth.removeListener?.('chainChanged', onChain);
    };
  }, []);

  useEffect(() => { refreshBalance(); }, [address, chainId, refreshBalance]);

  const value = useMemo<WalletState>(() => ({
    address, chainId, balance, isOnLitVM, connecting,
    connect, disconnect, switchToLitVM, refreshBalance,
  }), [address, chainId, balance, isOnLitVM, connecting, connect, disconnect, switchToLitVM, refreshBalance]);

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}
