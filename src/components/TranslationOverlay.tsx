/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { Terminal, Cpu, Layers, RefreshCw, CheckCircle2 } from 'lucide-react';

interface TranslationOverlayProps {
  isLightMode?: boolean;
}

export default function TranslationOverlay({ isLightMode = false }: TranslationOverlayProps) {
  const { isTranslating, pendingLanguage, language } = useLanguage();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isTranslating) {
      setStep(0);
      const t1 = setTimeout(() => setStep(1), 220);
      const t2 = setTimeout(() => setStep(2), 480);
      const t3 = setTimeout(() => setStep(3), 750);
      const t4 = setTimeout(() => setStep(4), 950);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    } else {
      setStep(0);
    }
  }, [isTranslating]);

  // Determine label texts based on transition state
  const targetLangLabel = pendingLanguage === 'bn' ? 'BENGALI (বাংলা)' : 'ENGLISH (US)';
  const currentLangLabel = language === 'bn' ? 'বাংলা' : 'EN';
  const targetLabelShort = pendingLanguage === 'bn' ? 'BN' : 'EN';

  const systemLogs = [
    { text: 'Establishing secure decryption gateway...', completed: step >= 1 },
    { text: `Compiling lexicons for target standard ${targetLangLabel}...`, completed: step >= 2 },
    { text: 'Hydrating UI tree structures & layout metrics...', completed: step >= 3 },
    { text: `Synchronizing multi-layer views in ${targetLabelShort}...`, completed: step >= 4 },
  ];

  return (
    <AnimatePresence>
      {isTranslating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md transition-colors ${
            isLightMode 
              ? 'bg-neutral-150/75 border-neutral-300' 
              : 'bg-[#030303]/85 border-white/5'
          }`}
        >
          {/* Futuristic grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

          {/* Interactive Core Slate */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`w-full max-w-lg rounded-2xl border p-6 relative overflow-hidden shadow-2xl ${
              isLightMode
                ? 'bg-white border-neutral-200/90 text-neutral-900 shadow-neutral-200/50'
                : 'bg-[#09090b] border-white/10 text-white shadow-[#000000]/80'
            }`}
          >
            {/* Pulsing neon accent bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-blue via-brand-navy to-brand-purple" />

            {/* Glowing top ambient light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-brand-blue/10 rounded-full blur-xl pointer-events-none" />

            {/* Header with spinning router */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
              <div className="flex items-center space-x-2.5">
                <div className={`p-2 rounded-lg ${isLightMode ? 'bg-neutral-100 text-brand-blue' : 'bg-white/5 text-brand-blue'}`}>
                  <RefreshCw className="w-4 h-4 animate-spin text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase">
                    SYSTEM SYNC PIPELINE
                  </h3>
                  <p className="text-[10px] font-mono opacity-60">
                    Routing {currentLangLabel} → {targetLabelShort}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1.5 self-start text-[9px] font-mono px-2 py-0.5 rounded bg-brand-blue/10 border border-brand-blue/20 text-brand-blue uppercase font-bold tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-ping" />
                Active
              </div>
            </div>

            {/* Simulated HUD Terminal Display */}
            <div className={`rounded-xl p-4 font-mono text-[11px] leading-relaxed mb-5 border relative overflow-hidden ${
              isLightMode 
                ? 'bg-neutral-50 border-neutral-150 text-neutral-700' 
                : 'bg-black/40 border-white/5 text-neutral-400'
            }`}>
              <div className="flex justify-between items-center text-[10px] uppercase opacity-40 border-b border-white/5 pb-2 mb-3">
                <span>Operation Core Log</span>
                <span>Port 3000 // Ingress</span>
              </div>

              <div className="space-y-2.5">
                {systemLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    {log.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5 animate-scale-up" />
                    ) : (
                      <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
                        {idx === step ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />
                        ) : (
                          <div className={`w-1.5 h-1.5 rounded-full ${isLightMode ? 'bg-neutral-200' : 'bg-neutral-800'}`} />
                        )}
                      </div>
                    )}
                    <span className={`transition-all ${log.completed ? 'text-brand-blue/90 font-medium' : idx === step ? 'text-white' : 'opacity-40'}`}>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro progress status slider bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono opacity-65">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-brand-purple" /> Code Engine Compiled
                </span>
                <span className="font-bold">{Math.min(100, Math.round(step * 25))}%</span>
              </div>
              <div className={`h-1.5 w-full rounded-full overflow-hidden ${isLightMode ? 'bg-neutral-100' : 'bg-neutral-900'}`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-blue via-brand-navy to-brand-purple"
                  initial={{ width: '0%' }}
                  animate={{ width: `${step * 25}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>

            {/* Aesthetic safety stamp */}
            <div className="mt-5 flex justify-between items-center text-[9px] font-mono opacity-40">
              <span className="flex items-center gap-1">
                <Layers className="w-2.5 h-2.5" /> SECURE LEXICAL HANDOVER
              </span>
              <span>AES-256 PARAMS // OK</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
