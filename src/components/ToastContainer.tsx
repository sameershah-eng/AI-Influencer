import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const icons = {
            success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
            error: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />,
            warning: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />,
            info: <Info className="w-4 h-4 text-indigo-600 shrink-0" />,
          };

          const borderColors = {
            success: 'border-emerald-200 bg-white',
            error: 'border-rose-200 bg-[#FFFBFB]',
            warning: 'border-amber-200 bg-[#FFFDF8]',
            info: 'border-indigo-100 bg-white',
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 26 }}
              className={`pointer-events-auto p-3.5 rounded-2xl border card-shadow-elevated ${borderColors[toast.type]} flex items-start gap-3`}
            >
              <div className="mt-0.5">{icons[toast.type]}</div>
              <div className="flex-1 pr-1">
                <div className="text-xs font-semibold text-[#16141F]">
                  {toast.title}
                </div>
                {toast.message && (
                  <div className="text-[11px] text-[#6E687A] mt-0.5 leading-snug">
                    {toast.message}
                  </div>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[#9992A4] hover:text-[#16141F] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
