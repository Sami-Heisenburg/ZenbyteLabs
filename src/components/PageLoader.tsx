/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageLoaderProps {
  isLightMode?: boolean;
  onComplete: () => void;
}

export default function PageLoader({ isLightMode = false, onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const statusLogs = [
    'Synthesizing asset variables...',
    'Initializing WebGL 3D context...',
    'Compiling ambient shader pipelines...',
    'Mapping tech sphere interactive nodes...',
    'Orchestrating responsive layout overlays...',
    'Hydrating client state containers...',
    'System status nominal. Injecting views...'
  ];

  // Simulated rapid & beautiful loader progress
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Fast progress up to 100
      const increment = Math.floor(Math.random() * 8) + 6;
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      // Map status log indices progressively
      if (currentProgress < 15) setStatusIndex(0);
      else if (currentProgress < 30) setStatusIndex(1);
      else if (currentProgress < 48) setStatusIndex(2);
      else if (currentProgress < 68) setStatusIndex(3);
      else if (currentProgress < 85) setStatusIndex(4);
      else if (currentProgress < 96) setStatusIndex(5);
      else setStatusIndex(6);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Let it stay at 100% for a short, premium beat
        const timeout = setTimeout(() => {
          setIsDone(true);
          const finalTimeout = setTimeout(() => {
            onComplete();
          }, 600); // Wait for the fade-out exit motion
          return () => clearTimeout(finalTimeout);
        }, 400);
        return () => clearTimeout(timeout);
      }
    }, 110);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="page-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
          }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center select-none ${
            isLightMode ? 'bg-[#FAFAFA]' : 'bg-[#050505]'
          }`}
        >
          {/* Subtle grid pattern background to match SaaS platform theme */}
          <div 
            className={`absolute inset-0 pointer-events-none opacity-[0.03] ${
              isLightMode 
                ? 'bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]' 
                : 'bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]'
            }`} 
            style={{ size: '40px', backgroundSize: '40px 40px' }}
          />

          <div className="relative flex flex-col items-center max-w-sm w-full px-8 text-center">
            {/* Animated Logo Ring Precursor (simulates the 1st orbit state of Tech Sphere) */}
            <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <motion.div 
                className={`absolute border rounded-full ${
                  isLightMode ? 'border-neutral-900/10' : 'border-white/10'
                }`}
                style={{ width: '100%', height: '100%' }}
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  ease: "linear",
                  repeat: Infinity
                }}
              />

              {/* Glowing inner orbital trail representing technical nodes */}
              <motion.div
                className="absolute rounded-full border border-t-[#16A4FB] border-r-transparent border-b-[#8643F5] border-l-transparent"
                style={{ width: '85%', height: '85%' }}
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />

              {/* Center solid core logo node */}
              <motion.div
                className={`relative flex items-center justify-center w-12 h-12 rounded-2xl overflow-hidden shadow-2xl border transition-colors ${
                  isLightMode 
                    ? 'bg-neutral-900 border-neutral-900/20' 
                    : 'bg-white/5 border-white/10'
                }`}
                animate={{
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              >
                <svg viewBox="0 0 200 200" fill="none" className="w-7 h-7 select-none">
                  <defs>
                    <linearGradient id="loadLeftPill" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E599F7" />
                      <stop offset="100%" stopColor="#9C78F7" />
                    </linearGradient>
                    <linearGradient id="loadRightPill" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9C78F7" />
                      <stop offset="100%" stopColor="#5F3DC4" />
                    </linearGradient>
                    <linearGradient id="loadDot" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7048E8" />
                      <stop offset="100%" stopColor="#5F3DC4" />
                    </linearGradient>
                  </defs>
                  <rect x="52" y="62" width="28" height="85" rx="14" transform="rotate(-30 66 104.5)" fill="url(#loadLeftPill)" />
                  <rect x="94" y="52" width="28" height="85" rx="14" transform="rotate(-30 108 94.5)" fill="url(#loadRightPill)" />
                  <circle cx="140" cy="100" r="14" fill="url(#loadDot)" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-[#8643F5]/10" />
              </motion.div>
            </div>

            {/* Brand Title with elegant track-out typography */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-1"
            >
              <h1 className={`font-display text-lg font-bold tracking-[0.25em] uppercase ${
                isLightMode ? 'text-neutral-900' : 'text-white'
              }`}>
                ZenByte Labs
              </h1>
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#16A4FB] font-semibold mt-1">
                Engineering Studio
              </p>
            </motion.div>

            {/* Modern visual progress wrapper */}
            <div className="w-full mt-8 mb-4">
              {/* Numeric indicator */}
              <div className="flex items-center justify-between font-mono text-[10px] mb-2">
                <span className={isLightMode ? 'text-neutral-500' : 'text-neutral-400'}>
                  {progress}% INDEXING
                </span>
                <span className="text-[#16A4FB] font-semibold">
                  {progress === 100 ? 'SUCCESS' : 'ONLINE'}
                </span>
              </div>

              {/* Simple elegant light line progress bar */}
              <div className={`w-full h-[3px] rounded-full overflow-hidden ${
                isLightMode ? 'bg-neutral-200' : 'bg-neutral-900'
              }`}>
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand-blue via-violet-500 to-brand-purple"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Text Logs - Scannable human metrics and technical status logs */}
            <div className="h-6 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={statusIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 0.65, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={`font-mono text-[9px] tracking-wider uppercase ${
                    isLightMode ? 'text-[#050505]' : 'text-[#FFFFFF]'
                  }`}
                >
                  {statusLogs[statusIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
