import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

type ToastKind = 'success' | 'error' | 'info';
type Toast = { id: number; msg: string; kind: ToastKind; href?: string };

let pushFn: ((t: Omit<Toast, 'id'>) => void) | null = null;

export function showToast(msg: string, kind: ToastKind = 'info', href?: string) {
  pushFn?.({ msg, kind, href });
}

export default function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    pushFn = (t) => {
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { ...t, id }]);
      setTimeout(() => setItems((prev) => prev.filter((p) => p.id !== id)), 6000);
    };
    return () => { pushFn = null; };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
      {items.map((t) => (
        <div key={t.id} className="card px-4 py-3 flex items-start gap-3 animate-slide-up">
          {t.kind === 'success' && <CheckCircle2 className="text-success shrink-0 mt-0.5" size={18} />}
          {t.kind === 'error' && <XCircle className="text-error shrink-0 mt-0.5" size={18} />}
          {t.kind === 'info' && <Info className="text-secondary shrink-0 mt-0.5" size={18} />}
          <div className="flex-1 text-sm">
            <div>{t.msg}</div>
            {t.href && (
              <a href={t.href} target="_blank" rel="noreferrer" className="text-primary underline text-xs mt-1 inline-block">
                View on explorer →
              </a>
            )}
          </div>
          <button onClick={() => setItems((prev) => prev.filter((p) => p.id !== t.id))} className="text-textSecondary hover:text-white">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
