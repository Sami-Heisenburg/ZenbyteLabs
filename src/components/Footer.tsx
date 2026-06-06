/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Twitter, Linkedin, MapPin, X, FileText, ShieldCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface FooterProps {
  isLightMode?: boolean;
}

export default function Footer({ isLightMode = false }: FooterProps) {
  const { t, language } = useLanguage();
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);

  const footerNavigation: {
    services: { name: string; href: string }[];
    agency: { name: string; href: string }[];
    corporate: { name: string; href?: string; onClick?: () => void }[];
  } = {
    services: [
      { name: t('Full Stack Web Development', 'Full Stack Web Development'), href: '#services' },
      { name: t('Web Application Development', 'Web Application Development'), href: '#services' },
      { name: t('Mobile App Engineering', 'Mobile App Engineering'), href: '#services' },
      { name: t('SaaS Architecture & Dev', 'SaaS Architecture & Dev'), href: '#services' },
      { name: t('UI/UX Craftsmanship', 'UI/UX Craftsmanship'), href: '#services' },
    ],
    agency: [
      { name: t('Services', 'Services'), href: '#services' },
      { name: t('Portfolio', 'Portfolio'), href: '#portfolio' },
      { name: t('Testimonials', 'Testimonials'), href: '#testimonials' },
      { name: t('Why Us', 'Why Us'), href: '#why-us' },
    ],
    corporate: [
      { name: t('Terms & Conditions', 'Terms & Conditions'), onClick: () => setActiveModal('terms') },
      { name: t('Privacy Policy', 'Privacy Policy'), onClick: () => setActiveModal('privacy') },
    ],
  };

  return (
    <footer className={`pt-20 pb-10 relative overflow-hidden text-left transition-colors duration-500 ${
      isLightMode ? 'bg-[#FAFAFA] border-t border-neutral-200' : 'bg-zinc-950 border-t border-white/5'
    }`}>
      {/* Visual glowing bottom accents */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[150px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid wrapper with exact alignment values */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Brand Block Column (4/12 width) */}
        <div className="lg:col-span-4 md:col-span-1 space-y-6">
          <a href="#" className="flex items-center space-x-2 group">
            <div className={`flex items-center justify-center w-8.5 h-8.5 rounded-lg border transition-all ${
              isLightMode ? 'bg-neutral-100 border-neutral-200 group-hover:bg-neutral-200' : 'bg-white/5 border border-white/10 group-hover:border-brand-blue/50'
            }`}>
              <svg viewBox="0 0 200 200" fill="none" className="w-5.5 h-5.5 select-none transition-transform group-hover:scale-110 duration-300">
                <defs>
                  <linearGradient id="footLeftPill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E599F7" />
                    <stop offset="100%" stopColor="#9C78F7" />
                  </linearGradient>
                  <linearGradient id="footRightPill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9C78F7" />
                    <stop offset="100%" stopColor="#5F3DC4" />
                  </linearGradient>
                  <linearGradient id="footDot" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7048E8" />
                    <stop offset="100%" stopColor="#5F3DC4" />
                  </linearGradient>
                </defs>
                <rect x="52" y="62" width="28" height="85" rx="14" transform="rotate(-30 66 104.5)" fill="url(#footLeftPill)" />
                <rect x="94" y="52" width="28" height="85" rx="14" transform="rotate(-30 108 94.5)" fill="url(#footRightPill)" />
                <circle cx="140" cy="100" r="14" fill="url(#footDot)" />
              </svg>
            </div>
            <span className={`font-display font-bold text-lg tracking-tight transition-colors ${
              isLightMode ? 'text-neutral-900' : 'text-white'
            }`}>ZenbyteLabs</span>
          </a>

          <p className={`text-xs font-sans leading-relaxed max-w-sm transition-colors ${
            isLightMode ? 'text-neutral-650' : 'text-neutral-400'
          }`}>
            {t(
              'ZenbyteLabs is an elite software engineering boutique crafting high-performance, full-stack web platforms and native mobile applications. Designed for reliability, scaled for modern workloads.',
              'ZenbyteLabs is an elite software engineering boutique crafting high-performance, full-stack web platforms and native mobile applications. Designed for reliability, scaled for modern workloads.'
            )}
          </p>

          <div className="space-y-2 pt-2">
            <div className={`flex items-center space-x-2 text-[11px] font-mono transition-colors ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
              <span>{t('SF Bay Area Workspace • Remote Labs', 'SF Bay Area Workspace • Remote Labs')}</span>
            </div>
            <div className={`flex items-center space-x-2 text-[11px] font-mono transition-colors ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              <Mail className="w-3.5 h-3.5 text-brand-purple shrink-0" />
              <span>engineering@zenbytelabs.dev</span>
            </div>
          </div>

          {/* Social Handles Icons */}
          <div className="flex items-center space-x-3 pt-2">
            <a
              href="https://github.com/zenbytelabs"
              target="_blank"
              rel="noreferrer"
              className={`p-2.5 rounded-lg border transition-all ${
                isLightMode 
                  ? 'border-neutral-200 bg-white hover:bg-neutral-150 text-neutral-600 hover:text-neutral-900 shadow-xs' 
                  : 'border border-white/5 bg-white/[0.02] hover:bg-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/zenbytelabs"
              target="_blank"
              rel="noreferrer"
              className={`p-2.5 rounded-lg border transition-all ${
                isLightMode 
                  ? 'border-neutral-200 bg-white hover:bg-neutral-150 text-neutral-600 hover:text-neutral-900 shadow-xs' 
                  : 'border border-white/5 bg-white/[0.02] hover:bg-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/zenbytelabs"
              target="_blank"
              rel="noreferrer"
              className={`p-2.5 rounded-lg border transition-all ${
                isLightMode 
                  ? 'border-neutral-200 bg-white hover:bg-neutral-150 text-neutral-600 hover:text-neutral-900 shadow-xs' 
                  : 'border border-white/5 bg-white/[0.02] hover:bg-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Footer Navigation (Services List) */}
        <div className="lg:col-span-3 md:col-span-1 space-y-4">
          <h4 className={`text-xs font-mono uppercase tracking-widest font-bold transition-colors ${
            isLightMode ? 'text-neutral-800' : 'text-white'
          }`}>{t('Services', 'Services')}</h4>
          <ul className="space-y-2.5">
            {footerNavigation.services.map((item) => (
              <li key={item.name}>
                <a href={item.href} className={`text-xs transition-colors block ${
                  isLightMode ? 'text-neutral-650 hover:text-neutral-900 font-medium' : 'text-neutral-400 hover:text-white'
                }`}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Navigation (Agency List) */}
        <div className="lg:col-span-2 md:col-span-1 space-y-4">
          <h4 className={`text-xs font-mono uppercase tracking-widest font-bold transition-colors ${
            isLightMode ? 'text-neutral-800' : 'text-white'
          }`}>{t('Agency Map', 'Agency Map')}</h4>
          <ul className="space-y-2.5">
            {footerNavigation.agency.map((item) => (
              <li key={item.name}>
                <a href={item.href} className={`text-xs transition-colors block ${
                  isLightMode ? 'text-neutral-650 hover:text-neutral-900 font-medium' : 'text-neutral-400 hover:text-white'
                }`}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Navigation (Corporate info) */}
        <div className="lg:col-span-3 md:col-span-1 space-y-4">
          <h4 className={`text-xs font-mono uppercase tracking-widest font-bold transition-colors ${
            isLightMode ? 'text-neutral-800' : 'text-white'
          }`}>{t('Corporate', 'Corporate')}</h4>
          <ul className="space-y-2.5">
            {footerNavigation.corporate.map((item) => (
              <li key={item.name}>
                {item.onClick ? (
                  <button 
                    onClick={item.onClick}
                    className={`text-xs transition-colors block text-left cursor-pointer ${
                      isLightMode ? 'text-neutral-650 hover:text-brand-purple font-medium' : 'text-[#A0A0A0] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <a href={item.href} className={`text-xs transition-colors block ${
                    isLightMode ? 'text-neutral-650 hover:text-brand-purple font-medium' : 'text-[#A0A0A0] hover:text-[#FFFFFF]'
                  }`}>
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className={`p-3 border rounded-xl flex items-center space-x-2 pt-4 transition-colors ${
            isLightMode ? 'bg-white border-neutral-200 shadow-xs' : 'bg-white/[0.01] border border-white/5'
          }`}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span className="text-[10px] font-mono text-zinc-500">{t('STUDIO ACTIVE: LIVE', 'STUDIO ACTIVE: LIVE')}</span>
          </div>
        </div>

      </div>

      {/* Bottom Fine Copyright Block */}
      <div className={`max-w-7xl mx-auto px-6 mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-[11px] md:text-xs gap-4 transition-colors ${
        isLightMode ? 'border-neutral-200 text-neutral-500' : 'border-t border-white/5 text-neutral-500'
      }`}>
        <p className="font-sans font-medium text-center md:text-left">
          {t('© 2026 ZenbyteLabs Inc. All rights reserved. Built with pride using modern web standards.', `© ${new Date().getFullYear()} ZenbyteLabs Inc. All rights reserved. Built with pride using modern web standards.`)}
        </p>
        <div className="flex items-center justify-center space-x-4 font-mono">
          <button 
            onClick={() => setActiveModal('terms')} 
            className={`transition-colors cursor-pointer text-[11px] font-medium ${isLightMode ? 'text-neutral-600 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'}`}
          >
            {t('Terms & Conditions', 'Terms & Conditions')}
          </button>
          <span>•</span>
          <button 
            onClick={() => setActiveModal('privacy')} 
            className={`transition-colors cursor-pointer text-[11px] font-medium ${isLightMode ? 'text-neutral-600 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'}`}
          >
            {t('Privacy Policy', 'Privacy Policy')}
          </button>
        </div>
      </div>

      {/* Modal Overlay for Terms and Privacy */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 selection:bg-brand-purple/40"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 355, damping: 28 }}
              className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6 md:p-8 border shadow-2xl relative text-left ${
                isLightMode ? 'bg-white border-neutral-200 text-neutral-800' : 'bg-neutral-900 border-white/10 text-zinc-300'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveModal(null)}
                className={`absolute top-4 right-4 p-2 rounded-lg border transition-colors ${
                  isLightMode 
                    ? 'border-neutral-200 hover:bg-neutral-100 text-neutral-700' 
                    : 'border-white/5 hover:bg-white/5 text-zinc-400'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              {activeModal === 'terms' ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b border-white/5">
                    <FileText className="w-5 h-5 text-brand-blue" />
                    <h3 className={`text-xl font-display font-medium ${isLightMode ? 'text-neutral-950 font-bold' : 'text-white'}`}>
                      {t('Terms & Conditions', 'Terms & Conditions')}
                    </h3>
                  </div>
                  <div className="font-sans text-xs sm:text-sm leading-relaxed space-y-4">
                    <p>
                      {t(
                        'Welcome to ZenbyteLabs. By scoping or partnering with our agency, you agree to comply with standard software delivery benchmarks and intellectual ownership transfers documented in your service level statements.',
                        'Welcome to ZenbyteLabs. By scoping or partnering with our agency, you agree to comply with standard software delivery benchmarks and intellectual ownership transfers documented in your service level statements.'
                      )}
                    </p>
                    <h4 className={`text-sm font-display font-bold ${isLightMode ? 'text-neutral-950' : 'text-white'}`}>{t('1. Intellectual Sovereignty', '1. Intellectual Sovereignty')}</h4>
                    <p>
                      {t(
                        'Upon matching full client milestones deliverables and payment releases, 100% of the repository logic, designs, wireframes, and deployment scripts is transferred legally to our client and their technical representatives under active license indexes.',
                        'Upon matching full client milestones deliverables and payment releases, 100% of the repository logic, designs, wireframes, and deployment scripts is transferred legally to our client and their technical representatives under active license indexes.'
                      )}
                    </p>
                    <h4 className={`text-sm font-display font-bold ${isLightMode ? 'text-neutral-950' : 'text-white'}`}>{t('2. Quality Verification', '2. Quality Verification')}</h4>
                    <p>
                      {t(
                        'We execute incremental verification sprints. Clients hold open telemetry windows to view codebase structure, user interactions, and performance scores live before public pushes.',
                        'We execute incremental verification sprints. Clients hold open telemetry windows to view codebase structure, user interactions, and performance scores live before public pushes.'
                      )}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-6">
                      {t('LAST REVISED: JUNE 2026 • ZENBYTELABS OPERATIONS', 'LAST REVISED: JUNE 2026 • ZENBYTELABS OPERATIONS')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b border-white/5">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h3 className={`text-xl font-display font-medium ${isLightMode ? 'text-neutral-950 font-semibold' : 'text-white'}`}>
                      {t('Privacy Policy', 'Privacy Policy')}
                    </h3>
                  </div>
                  <div className="font-sans text-xs sm:text-sm leading-relaxed space-y-4">
                    <p>
                      {t(
                        'At ZenbyteLabs, we consider code security and intellectual discretion our core values. We do not host, sell, or index proprietary data structures belonging to your workspaces, SaaS models, or mobile users.',
                        'At ZenbyteLabs, we consider code security and intellectual discretion our core values. We do not host, sell, or index proprietary data structures belonging to your workspaces, SaaS models, or mobile users.'
                      )}
                    </p>
                    <h4 className={`text-sm font-display font-bold ${isLightMode ? 'text-neutral-950' : 'text-white'}`}>{t('1. Data Discretion', '1. Data Discretion')}</h4>
                    <p>
                      {t(
                        'All API tokens, JWT security scopes, customer databases, and payment streams are proxied server-side to guarantee client privacy from browser inspectors and crawler scripts.',
                        'All API tokens, JWT security scopes, customer databases, and payment streams are proxied server-side to guarantee client privacy from browser inspectors and crawler scripts.'
                      )}
                    </p>
                    <h4 className={`text-sm font-display font-bold ${isLightMode ? 'text-neutral-950' : 'text-white'}`}>{t('2. Cookie & Tracking Parameters', '2. Cookie & Tracking Parameters')}</h4>
                    <p>
                      {t(
                        'We only use functional browser storage key-value parameters to record client language toggles or active workspace presets. No third-party marketing payloads or trackers are included.',
                        'We only use functional browser storage key-value parameters to record client language toggles or active workspace presets. No third-party marketing payloads or trackers are included.'
                      )}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-6">
                      {t('LAST UPDATED: JUNE 2026 • ZENBYTELABS SECURITY GROUP', 'LAST UPDATED: JUNE 2026 • ZENBYTELABS SECURITY GROUP')}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
