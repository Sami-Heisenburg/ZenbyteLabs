/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  success: (title: string, message: string, duration?: number) => void;
  error: (title: string, message: string, duration?: number) => void;
  info: (title: string, message: string, duration?: number) => void;
  warning: (title: string, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
  isLightMode?: boolean;
}

export function ToastProvider({ children, isLightMode = false }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((options: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...options, id };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const success = useCallback((title: string, message: string, duration = 4000) => {
    toast({ type: 'success', title, message, duration });
  }, [toast]);

  const error = useCallback((title: string, message: string, duration = 5000) => {
    toast({ type: 'error', title, message, duration });
  }, [toast]);

  const info = useCallback((title: string, message: string, duration = 4000) => {
    toast({ type: 'info', title, message, duration });
  }, [toast]);

  const warning = useCallback((title: string, message: string, duration = 4500) => {
    toast({ type: 'warning', title, message, duration });
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, removeToast, success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} isLightMode={isLightMode} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  isLightMode: boolean;
}

function ToastContainer({ toasts, removeToast, isLightMode }: ToastContainerProps) {
  return (
    <div 
      id="toast-container" 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onClose={removeToast} isLightMode={isLightMode} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastCardProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
  isLightMode: boolean;
  key?: string;
}

function ToastCard({ toast, onClose, isLightMode }: ToastCardProps) {
  const { id, type, title, message, duration = 4000 } = toast;

  // Auto-dismiss handler
  useState(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  });

  const iconMap: Record<ToastType, any> = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const colorMap: Record<ToastType, { text: string; bg: string; border: string; bar: string }> = {
    success: {
      text: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      bar: 'bg-emerald-500',
    },
    error: {
      text: 'text-rose-500',
      bg: 'bg-rose-500/11',
      border: 'border-rose-500/30',
      bar: 'bg-rose-500',
    },
    info: {
      text: 'text-brand-blue',
      bg: 'bg-brand-blue/10',
      border: 'border-brand-blue/30',
      bar: 'bg-brand-blue',
    },
    warning: {
      text: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      bar: 'bg-amber-500',
    },
  };

  const Icon = iconMap[type];
  const colors = colorMap[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', damping: 23, stiffness: 280 }}
      className={`pointer-events-auto relative w-full border rounded-xl overflow-hidden shadow-xl backdrop-blur-md flex p-4 transition-colors duration-300 ${
        isLightMode 
          ? 'bg-white/95 border-neutral-200' 
          : 'bg-zinc-950/90 border-white/10'
      }`}
    >
      {/* Icon frame */}
      <div className={`p-2 rounded-lg mr-3 flex-shrink-0 self-start ${colors.bg}`}>
        <Icon className={`w-4 h-4 ${colors.text}`} />
      </div>

      {/* Message structure */}
      <div className="flex-1 min-w-0 pr-2">
        <h5 className={`font-display text-xs font-semibold uppercase tracking-wider transition-colors ${
          isLightMode ? 'text-neutral-900' : 'text-white'
        }`}>
          {title}
        </h5>
        <p className={`font-sans text-xs mt-1 leading-relaxed transition-colors ${
          isLightMode ? 'text-neutral-600' : 'text-neutral-400'
        }`}>
          {message}
        </p>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => onClose(id)}
        className={`flex-shrink-0 self-start p-1 rounded-lg border transition-colors ${
          isLightMode 
            ? 'border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 text-neutral-400' 
            : 'border-white/5 hover:bg-white/5 hover:text-white text-neutral-500'
        }`}
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Expiry dynamic countdown strip */}
      <motion.div 
        className={`absolute bottom-0 left-0 h-[2.5px] ${colors.bar}`}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
      />
    </motion.div>
  );
}
