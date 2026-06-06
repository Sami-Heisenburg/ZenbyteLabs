/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Code2, ArrowRight, Play, Database, Server, Cpu, Layers } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface HeroProps {
  onOpenConsultation: () => void;
  isLightMode?: boolean;
}

export default function Hero({ onOpenConsultation, isLightMode = false }: HeroProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const isLightModeRef = useRef(isLightMode);
  useEffect(() => {
    isLightModeRef.current = isLightMode;
  }, [isLightMode]);

  // Adjust/disable scroll transformations on mobile/tablets to prevent premature disappearance
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add scroll-triggered scale out for hero section
  const { scrollY } = useScroll();
  const opacityTransform = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleTransform = useTransform(scrollY, [0, 600], [1, 0.96]);
  const yTransform = useTransform(scrollY, [0, 600], [0, 80]);

  const opacity = isMobile ? 1 : opacityTransform;
  const scale = isMobile ? 1 : scaleTransform;
  const y = isMobile ? 0 : yTransform;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate normalized mouse coordinates (-1 to 1)
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = (e.clientY - rect.top) / rect.height * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Background Particle Web Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    // Create particles
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: i % 2 === 0 ? 'rgba(22, 164, 251, 0.4)' : 'rgba(134, 67, 245, 0.4)',
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const lightModeActive = isLightModeRef.current;

      // Web connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce borders
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw particle representation
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        // Draw connect lines if close
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = lightModeActive ? `rgba(0, 0, 0, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale, y }}
      className={`relative min-h-screen flex items-center justify-center pt-24 overflow-hidden transition-colors duration-500 ${
        isLightMode ? 'bg-neutral-50' : 'bg-[#050505]'
      }`}
    >
      {/* Dynamic Background Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Cyber Grid Overlay */}
      <div className={`absolute inset-0 pointer-events-none z-0 opacity-80 ${
        isLightMode 
          ? 'bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:24px_24px]' 
          : 'bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px]'
      }`} />

      {/* Gradient Orbs */}
      <div 
        className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full bg-brand-blue/10 blur-3xl pointer-events-none animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      />
      <div 
        className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] rounded-full bg-brand-purple/10 blur-3xl pointer-events-none animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Headline Copy */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`inline-flex self-start items-center space-x-2 border px-4.5 py-1.5 rounded-full backdrop-blur-md transition-colors ${
              isLightMode 
                ? 'bg-neutral-900/5 border-neutral-900/10' 
                : 'bg-white/5 border-white/10'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className={`text-xs font-mono tracking-wider uppercase font-medium transition-colors ${
              isLightMode ? 'text-neutral-700' : 'text-neutral-300'
            }`}>
              {t('NEXT-GEN INFRASTRUCTURE & DEV', 'NEXT-GEN INFRASTRUCTURE & DEV')}
            </span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight transition-colors ${
                isLightMode ? 'text-[#0a0a0a]' : 'text-white'
              }`}
            >
              {t('Building Future-Ready', 'Building Future-Ready')}
              <span className="block mt-1 bg-gradient-to-r from-brand-blue via-brand-navy to-brand-purple bg-clip-text text-transparent">
                {t('Software Experiences', 'Software Experiences')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-base md:text-lg max-w-xl font-sans leading-relaxed pt-2 transition-colors ${
                isLightMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}
            >
              {t('ZenbyteLabs engineering squad crafts performant, full-stack web architectures, secure enterprise cloud platforms, and custom software pipelines designed to scale infinitely. We build for the digital core.', 'ZenbyteLabs engineering squad crafts performant, full-stack web architectures, secure enterprise cloud platforms, and custom software pipelines designed to scale infinitely. We build for the digital core.')}
            </motion.p>
          </div>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <button
              onClick={onOpenConsultation}
              className={`px-8 py-4 rounded-full font-semibold text-sm transition-all flex items-center justify-center space-x-2 select-none cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 interactive ${
                isLightMode 
                  ? 'bg-neutral-950 text-white hover:bg-neutral-800 shadow-lg shadow-neutral-950/10' 
                  : 'bg-white text-zinc-950 hover:bg-neutral-100 shadow-lg shadow-white/10'
              }`}
            >
              <span>{t('Start Your Project', 'Start Your Project')}</span>
              <ArrowRight className={`w-4 h-4 ${isLightMode ? 'text-white' : 'text-zinc-950'}`} />
            </button>
            <a
              href="#projects"
              className={`px-8 py-4 rounded-full border text-sm flex items-center justify-center space-x-2 transition-all select-none cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 interactive ${
                isLightMode 
                  ? 'bg-neutral-900/5 border-neutral-900/10 hover:bg-neutral-900/10 hover:border-neutral-900/20 text-neutral-900' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white'
              }`}
            >
              <span>{t('View Our Work', 'View Our Work')}</span>
              <Play className={`w-3.5 h-3.5 ${isLightMode ? 'text-neutral-700 fill-neutral-700' : 'text-neutral-400 fill-neutral-400'} border-none`} />
            </a>
          </motion.div>
        </div>

        {/* Right Interactive Visual Graphic Block */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-[500px]">
          {/* Main Floating Neon Core Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
            className="relative w-full max-w-md h-full flex items-center justify-center"
            style={{
              x: mousePosition.x * 25,
              y: mousePosition.y * 25,
              rotateX: mousePosition.y * -15,
              rotateY: mousePosition.x * 15,
              perspective: 1200,
            }}
          >
            {/* Holographic Glowing Base Sphere */}
            <div className={`absolute w-72 h-72 rounded-full border border-dashed animate-[spin_40s_linear_infinite] ${
              isLightMode ? 'border-neutral-300' : 'border-white/10'
            }`} />
            <div className={`absolute w-56 h-56 rounded-full border animate-[spin_20s_linear_infinite_reverse] ${
              isLightMode ? 'border-neutral-200' : 'border-neutral-800'
            }`} />

            {/* Central Node */}
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center opacity-85 shadow-[0_0_50px_rgba(22,164,251,0.5)] z-20">
              <Cpu className="w-10 h-10 text-white" />
            </div>

            {/* Orbital Glassmorphic Platform cards */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className={`absolute top-10 left-4 w-44 p-3.5 rounded-xl flex items-center space-x-2 z-10 shadow-lg border ${
                isLightMode 
                  ? 'border-neutral-200 bg-white/80' 
                  : 'glass-panel border-white/10'
              }`}
              style={{
                transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
              }}
            >
              <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-mono text-neutral-400">Main Process</p>
                <p className={`text-xs font-semibold ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>Fullstack.tsx</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
              className={`absolute bottom-12 right-0 w-48 p-3.5 rounded-xl flex items-center space-x-2 z-10 shadow-lg border ${
                isLightMode 
                  ? 'border-neutral-200 bg-white/80' 
                  : 'glass-panel border-white/10'
              }`}
              style={{
                transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
              }}
            >
              <div className="p-2 rounded-lg bg-brand-purple/10 text-brand-purple">
                <Database className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-mono text-neutral-400">Live Database</p>
                <p className={`text-xs font-semibold ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>Multi-Region</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
              className={`absolute top-1/2 -right-4 w-36 p-3.5 rounded-xl flex items-center space-x-2 z-10 shadow-lg border ${
                isLightMode 
                  ? 'border-neutral-200 bg-white/80' 
                  : 'glass-panel border-white/10'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Server className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[9px] uppercase font-mono text-neutral-400">Cloud Host</p>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className={`text-xs font-semibold ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>99.9% Up</span>
                </div>
              </div>
            </motion.div>

            {/* Orbit paths */}
            <svg className="absolute w-[360px] h-[360px] pointer-events-none opacity-25" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#gradient)" strokeWidth="0.5" strokeDasharray="3 3" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#16A4FB" />
                  <stop offset="100%" stopColor="#8643F5" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
