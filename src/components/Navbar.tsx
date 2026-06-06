/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Sun, Moon, ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';
import { useToast } from './Toast';
import { useLanguage } from './LanguageContext';

interface NavbarProps {
  onOpenConsultation: () => void;
  isLightMode: boolean;
  onToggleLightMode: () => void;
}

export default function Navbar({ onOpenConsultation, isLightMode, onToggleLightMode }: NavbarProps) {
  const { info } = useToast();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleModeSwitch = () => {
    onToggleLightMode();
    const targetModeName = isLightMode ? "Cosmic Dark Theme" : "Aurora Light Theme";
    const targetModeDesc = isLightMode 
      ? "Atmospheric deep-slate backdrops and interactive node-flows loaded." 
      : "Crisp white canvas configurations and sharp contrast layers enabled.";
    info(`${targetModeName} Active`, targetModeDesc, 3500);
  };

  const navLinks = [
    { name: t('Services', 'Services'), href: '#services' },
    { name: t('Portfolio', 'Portfolio'), href: '#portfolio' },
    { name: t('Testimonials', 'Testimonials'), href: '#testimonials' },
    { name: t('Why Us', 'Why Us'), href: '#why-us' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-305 ${
        isScrolled 
          ? isLightMode
            ? 'py-4 bg-white/70 backdrop-blur-md border-b border-neutral-200'
            : 'py-4 bg-[#050505]/45 backdrop-blur-md border-b border-white/5' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Animated Brand Logo */}
        <a href="#" className="flex items-center space-x-2 group">
          <div className={`relative flex items-center justify-center w-9 h-9 rounded-xl overflow-hidden border transition-colors ${
            isLightMode ? 'bg-neutral-900/5 border-neutral-900/10' : 'bg-white/5 border-white/10 group-hover:border-brand-blue/50'
          }`}>
            <span className="font-display font-bold text-base bg-gradient-to-tr from-brand-blue via-brand-navy to-brand-purple bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              Z
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className={`font-display font-bold text-lg tracking-tight transition-colors duration-300 ${isLightMode ? 'text-neutral-950' : 'text-white'}`}>
            Zenbyte<span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">Labs</span>
          </span>
        </a>

        {/* Desktop Anchor Options */}
        <nav className={`hidden md:flex items-center space-x-8 border px-6 py-2 rounded-full backdrop-blur-md transition-colors duration-300 ${
          isLightMode 
            ? 'bg-neutral-900/5 border-neutral-900/10' 
            : 'bg-white/5 border-white/5'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm transition-colors relative group py-1 ${
                isLightMode ? 'text-neutral-600 hover:text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Control Cluster & CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Selector Pill */}
          <div className={`relative flex items-center p-1 rounded-full border transition-all ${
            isLightMode 
              ? 'border-neutral-200 bg-neutral-100/50' 
              : 'border-white/10 bg-white/5'
          }`}>
            <button
              onClick={() => {
                setLanguage('en');
                info('Language Set', 'Workspace operating parameters synchronized in English.', 3000);
              }}
              className={`relative px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider rounded-full transition-all cursor-pointer z-10 ${
                language === 'en'
                  ? 'text-white'
                  : isLightMode ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
              {language === 'en' && (
                <motion.span
                  layoutId="activeLangDesktop"
                  className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full -z-10 shadow-md shadow-brand-blue/15"
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                />
              )}
            </button>
            <button
              onClick={() => {
                setLanguage('bn');
                info('ভাষা পরিবর্তন', 'কার্যকরী সিস্টেম প্যারামিটার বাংলায় লোড করা হয়েছে।', 3000);
              }}
              className={`relative px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider rounded-full transition-all cursor-pointer z-10 ${
                language === 'bn'
                  ? 'text-white'
                  : isLightMode ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
              }`}
            >
              BN
              {language === 'bn' && (
                <motion.span
                  layoutId="activeLangDesktop"
                  className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full -z-10 shadow-md shadow-brand-blue/15"
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                />
              )}
            </button>
          </div>

          {/* Simulation Toggle */}
          <button
            onClick={handleModeSwitch}
            title={t('Toggle Cosmic Dark Theme', 'Toggle Cosmic Dark Theme')}
            className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${
              isLightMode 
                ? 'border-neutral-200 bg-neutral-100/80 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900' 
                : 'border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white'
            }`}
          >
            {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenConsultation}
            className="magnetic px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-semibold hover:opacity-90 shadow-lg shadow-brand-blue/20 flex items-center space-x-1.5 transition-all text-sm hover:scale-105 active:scale-95"
          >
            <span>{t('Book Consultation', 'Book Consultation')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* Language Selector Pill - Compact for Mobile */}
          <div className={`relative flex items-center p-0.5 rounded-full border transition-all ${
            isLightMode 
              ? 'border-neutral-200 bg-neutral-150/50' 
              : 'border-white/10 bg-white/5'
          }`}>
            <button
              onClick={() => {
                setLanguage('en');
                info('Language: English', 'Workspace set to English.', 2500);
              }}
              className={`relative px-2.5 py-1 text-[9px] font-mono font-bold rounded-full transition-all cursor-pointer z-10 ${
                language === 'en'
                  ? 'text-white font-extrabold'
                  : isLightMode ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
              {language === 'en' && (
                <motion.span
                  layoutId="activeLangMobile"
                  className="absolute inset-0 bg-brand-blue rounded-full -z-10 shadow-sm shadow-brand-blue/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
            </button>
            <button
              onClick={() => {
                setLanguage('bn');
                info('ভাষা: বাংলা', 'সিস্টেম ভাষা পরিবর্তন করে বাংলা করা হয়েছে।', 2500);
              }}
              className={`relative px-2.5 py-1 text-[9px] font-mono font-bold rounded-full transition-all cursor-pointer z-10 ${
                language === 'bn'
                  ? 'text-white font-extrabold'
                  : isLightMode ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
              }`}
            >
              BN
              {language === 'bn' && (
                <motion.span
                  layoutId="activeLangMobile"
                  className="absolute inset-0 bg-brand-blue rounded-full -z-10 shadow-sm shadow-brand-blue/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
            </button>
          </div>

          <button
            onClick={handleModeSwitch}
            className={`p-2 rounded-lg border transition-colors ${
              isLightMode 
                ? 'border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200' 
                : 'border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border transition-colors ${
              isLightMode 
                ? 'border-neutral-200 bg-neutral-100 text-neutral-750 hover:bg-neutral-200' 
                : 'border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
 
      {/* Immersive Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 md:hidden flex flex-col justify-between"
          >
            {/* Backdrop Blur Overlay */}
            <div 
              className={`absolute inset-0 -z-10 ${
                isLightMode 
                  ? 'bg-white/90' 
                  : 'bg-[#050505]/94'
              } backdrop-blur-2xl`}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Aesthetic Ambient Blur effects consistent with desktop glow */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header Area */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-white/5">
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2">
                <div className={`relative flex items-center justify-center w-9 h-9 rounded-xl overflow-hidden border ${
                  isLightMode ? 'bg-neutral-900/5 border-neutral-900/10' : 'bg-white/5 border border-white/10'
                }`}>
                  <span className="font-display font-bold text-base bg-gradient-to-tr from-brand-blue via-brand-navy to-brand-purple bg-clip-text text-transparent">
                    Z
                  </span>
                </div>
                <span className={`font-display font-bold text-lg tracking-tight ${isLightMode ? 'text-neutral-950' : 'text-white'}`}>
                  Zenbyte<span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">Labs</span>
                </span>
              </a>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-xl border transition-all active:scale-90 ${
                  isLightMode 
                    ? 'border-neutral-250 bg-neutral-150 text-neutral-850 hover:bg-neutral-200' 
                    : 'border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links with Staggered Slide In Animation */}
            <div className="flex-1 px-8 py-10 flex flex-col justify-center space-y-6 text-left relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-brand-blue/80 uppercase font-bold">
                  {t('Navigation Menu', 'NAVIGATION MENU')}
                </span>
                <div className="h-px w-8 bg-brand-blue/40" />
              </div>

              <div className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 280, 
                      damping: 24, 
                      delay: idx * 0.08 
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-baseline space-x-3 text-2xl sm:text-3xl font-display font-medium tracking-tight py-2.5 transition-all ${
                        isLightMode 
                          ? 'text-neutral-800 hover:text-brand-blue' 
                          : 'text-neutral-100 hover:text-brand-blue'
                      }`}
                    >
                      <span className="text-[11px] font-mono font-bold text-zinc-550 group-hover:text-brand-blue transition-colors">
                        /0{idx + 1}
                      </span>
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-purple transition-all group-hover:w-full" />
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all text-brand-purple shrink-0 self-center" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Actions Area */}
            <div className={`p-6 space-y-5 border-t ${
              isLightMode ? 'border-neutral-200 bg-neutral-50/55' : 'border-white/5 bg-black/45'
            }`}>
              
              {/* Language + Theme toggles in grid */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Language Select */}
                <div className="flex flex-col space-y-1.5 text-left">
                  <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest">{t('Select Language', 'SELECT LANGUAGE')}</span>
                  <div className={`p-0.5 rounded-xl border flex items-center ${
                    isLightMode ? 'border-neutral-250 bg-white shadow-xs' : 'border-white/10 bg-white/5'
                  }`}>
                    <button
                      onClick={() => {
                        setLanguage('en');
                        info('Selected English', 'System guidelines set to English.', 2000);
                      }}
                      className={`flex-1 py-1 text-[10px] font-mono font-bold tracking-wider rounded-lg transition-all ${
                        language === 'en'
                          ? isLightMode ? 'bg-neutral-850 text-white' : 'bg-white text-black'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('bn');
                        info('ভাষা পরিবর্তন', 'সিস্টেম ম্যাপ বাংলায় আপডেট করা হয়েছে।', 2000);
                      }}
                      className={`flex-1 py-1 text-[10px] font-mono font-bold tracking-wider rounded-lg transition-all ${
                        language === 'bn'
                          ? isLightMode ? 'bg-neutral-850 text-white' : 'bg-white text-black'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      BN
                    </button>
                  </div>
                </div>

                {/* Theme Mode Toggle */}
                <div className="flex flex-col space-y-1.5 text-left">
                  <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest">{t('Vibe Theme Mode', 'VIBE THEME MODE')}</span>
                  <button
                    onClick={handleModeSwitch}
                    className={`w-full py-1 rounded-xl border text-[10px] font-mono font-bold tracking-wider cursor-pointer flex items-center justify-center space-x-2 transition-all active:scale-95 ${
                      isLightMode 
                        ? 'border-neutral-250 bg-white text-neutral-800 shadow-xs' 
                        : 'border-white/10 bg-white/5 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {isLightMode ? (
                      <>
                        <Moon className="w-3.5 h-3.5 text-brand-purple" />
                        <span>{t('COSMIC DARK', 'COSMIC DARK')}</span>
                      </>
                    ) : (
                      <>
                        <Sun className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                        <span>{t('AURORA LIGHT', 'AURORA LIGHT')}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Consultation Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-brand-blue/15 text-center flex items-center justify-center space-x-2 cursor-pointer transition-transform active:scale-98"
              >
                <span>{t('Book Consultation', 'Book Consultation')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Social Channels Row */}
              <div className="flex items-center justify-center space-x-6 pt-1">
                <a href="https://github.com/zenbytelabs" target="_blank" rel="noreferrer" className={`transition-all p-2 rounded-lg border ${
                  isLightMode ? 'text-neutral-500 hover:text-neutral-900 hover:shadow-xs bg-white border-neutral-200' : 'text-neutral-400 hover:text-white bg-white/5 border border-white/5'
                }`}>
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com/company/zenbytelabs" target="_blank" rel="noreferrer" className={`transition-all p-2 rounded-lg border ${
                  isLightMode ? 'text-neutral-500 hover:text-neutral-900 hover:shadow-xs bg-white border-neutral-200' : 'text-neutral-400 hover:text-white bg-white/5 border border-white/5'
                }`}>
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://twitter.com/zenbytelabs" target="_blank" rel="noreferrer" className={`transition-all p-2 rounded-lg border ${
                  isLightMode ? 'text-neutral-500 hover:text-neutral-900 hover:shadow-xs bg-white border-neutral-200' : 'text-neutral-400 hover:text-white bg-white/5 border border-white/5'
                }`}>
                  <Twitter className="w-4 h-4" />
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
