import { useEffect } from 'react';

export default function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-emerald-500 text-white',
    error: 'bg-rose-500 text-white',
    info: 'bg-slate-800 text-white',
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 shadow-lg transition-all animate-bounce-in ${styles[type] || styles.info}`}>
      <span className="text-lg">{type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️'}</span>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}