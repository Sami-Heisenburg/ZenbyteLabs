/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Zap, CheckCircle, Flame } from 'lucide-react';
import { useToast } from './Toast';
import { useLanguage } from './LanguageContext';

interface CTASectionProps {
  onOpenConsultation: () => void;
  isLightMode?: boolean;
}

export default function CTASection({ onOpenConsultation, isLightMode = false }: CTASectionProps) {
  const { t } = useLanguage();
  const { success, info } = useToast();
  const [emailInput, setEmailInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      success(
        t("Secure Channel Verified", "Secure Channel Verified"), 
        `${t("Workspace key registered for", "Workspace key registered for")} ${emailInput}.`,
        4000
      );
      
      info(
        t("Workspace Hydrated", "Workspace Hydrated"), 
        t("Loading detailed project configuration flow...", "Loading detailed project configuration flow..."),
        3500
      );

      // Auto open detailed workspace overlay after small delay
      setTimeout(() => {
        onOpenConsultation();
      }, 1000);
    }, 1000);
  };

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      isLightMode ? 'bg-[#FAFAFA]' : 'bg-dark-bg'
    }`}>
      {/* Decorative absolute glowing gradient grids resembling mesh backdrop */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-blue/10 via-brand-purple/5 to-transparent z-0" />
      <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className={`border rounded-3xl p-8 md:p-16 text-center relative overflow-hidden transition-colors duration-300 ${
            isLightMode 
              ? 'border-neutral-200 bg-white shadow-xl' 
              : 'glass-panel border border-white/10 rounded-3xl bg-white/[0.01]'
          }`}
        >
          {/* Animated Mesh Overlays inside card */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-brand-blue/10 via-transparent to-brand-purple/10 pointer-events-none z-0" />

          {/* Floating graphic bubbles */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className={`absolute top-8 left-8 p-2 rounded-xl border hidden md:flex items-center space-x-2 text-xs font-mono transition-colors ${
              isLightMode 
                ? 'bg-neutral-50 border-neutral-200 text-neutral-600' 
                : 'bg-white/5 border border-white/5 text-neutral-400'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-brand-blue" />
            <span>{t('Core Active', 'Core Active')}</span>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            {/* Status indicators */}
            <div className="inline-flex items-center space-x-2 bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full text-[10px] text-brand-blue font-mono font-bold uppercase">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-ping" />
              <span>{t('ONBOARDING SLOTS OPEN NEXT WEEK', 'ONBOARDING SLOTS OPEN NEXT WEEK')}</span>
            </div>

            {/* Headline */}
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-tight pt-2 transition-colors ${
              isLightMode ? 'text-neutral-900' : 'text-white'
            }`}>
              {t("Let's Build Something", "Let's Build Something")} <br />
              <span className="bg-gradient-to-r from-[#16A4FB] via-[#486EF4] to-[#8643F5] bg-clip-text text-transparent">
                {t('Extraordinary Together.', 'Extraordinary Together.')}
              </span>
            </h2>

            <p className={`text-sm md:text-base leading-relaxed font-sans max-w-lg mx-auto transition-colors ${
              isLightMode ? 'text-neutral-650 font-normal' : 'text-neutral-400'
            }`}>
              {t(
                'Ready to initiate your custom engineering pipeline? Enter your business email below to lock an architecture advisory session with our lead engineers.',
                'Ready to initiate your custom engineering pipeline? Enter your business email below to lock an architecture advisory session with our lead engineers.'
              )}
            </p>

            {/* Intake Email Box Form */}
            <div className="max-w-md mx-auto pt-4 relative">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0 animate-bounce" />
                  <span className="text-xs font-mono">{t('Routing email... Opening Secure Consultation workspace', 'Routing email... Opening Secure Consultation workspace')}</span>
                </motion.div>
              ) : (
                <form onSubmit={handleInquirySubmit} className={`flex flex-col sm:flex-row gap-2 relative p-1.5 border rounded-2xl transition-colors ${
                  isLightMode 
                    ? 'bg-neutral-50/50 border-neutral-250 hover:border-neutral-300 shadow-xs' 
                    : 'bg-white/5 border border-white/10'
                }`}>
                  <div className="flex items-center px-3.5 flex-1 text-neutral-500">
                    <Mail className="w-4 h-4 mr-2 text-neutral-400" />
                    <input
                      type="email"
                      required
                      placeholder={t('Enter your work email', 'Enter your work email')}
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className={`w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm transition-colors ${
                        isLightMode 
                          ? 'text-neutral-900 placeholder-neutral-400' 
                          : 'text-white placeholder-neutral-500'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !emailInput}
                    className={`px-6 py-3 rounded-xl font-semibold text-xs md:text-sm flex items-center justify-center space-x-2 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.02] active:scale-[0.98] transition-all duration-250 ease-out transform relative overflow-hidden group ${
                      isLightMode 
                        ? 'bg-gradient-to-r from-brand-blue to-brand-navy text-white shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/25' 
                        : 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg shadow-brand-purple/15 hover:shadow-brand-purple/25 hover:brightness-115'
                    }`}
                  >
                    <span>{t('Get Started', 'Get Started')}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>

            <p className="text-[10px] text-zinc-500 font-mono">
              {t('Pure Technical Delivery • No spam guarantees • Privacy Safe', 'Pure Technical Delivery • No spam guarantees • Privacy Safe')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
