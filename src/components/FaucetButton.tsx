import { Droplets } from 'lucide-react';
import { LITVM_FAUCET_URL } from '../config/network';
import { useWallet } from '../contexts/WalletContext';
import { showToast } from './Toaster';

export default function FaucetButton({ compact = false }: { compact?: boolean }) {
  const { address, connect, isOnLitVM, switchToLitVM } = useWallet();

  const handle = async () => {
    try {
      let addr = address;
      if (!addr) {
        await connect();
        addr = (window as any).ethereum && (await (window as any).ethereum.request({ method: 'eth_accounts' }))?.[0];
      }
      if (!isOnLitVM) {
        try { await switchToLitVM(); } catch {}
      }
      if (addr) {
        try {
          await navigator.clipboard.writeText(addr);
          showToast(`Address copied — paste into the faucet to receive zkLTC`, 'success');
        } catch {
          showToast(`Open the faucet and paste your address`, 'info');
        }
      }
      window.open(LITVM_FAUCET_URL, '_blank', 'noopener,noreferrer');
    } catch (e: any) {
      showToast(e?.message ?? 'Faucet error', 'error');
    }
  };

  return (
    <button onClick={handle} className={`btn-ghost flex items-center gap-2 text-sm ${compact ? '' : 'px-5 py-3'}`}>
      <Droplets size={16} className="text-secondary" />
      {compact ? 'Faucet' : 'Get zkLTC from Faucet'}
    </button>
  );
}
