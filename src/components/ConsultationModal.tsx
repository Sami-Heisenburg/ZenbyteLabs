/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Calendar, ArrowRight, MessageSquare, Briefcase, Zap } from 'lucide-react';
import { useToast } from './Toast';
import { useLanguage } from './LanguageContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
}

export default function ConsultationModal({ isOpen, onClose, isLightMode = false }: ConsultationModalProps) {
  const { success, info, warning } = useToast();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [budget, setBudget] = useState<string>('$10k - $25k');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const services = [
    'Full Stack Web Development',
    'SaaS Development',
    'Custom Software',
    'Mobile App Development',
    'UI/UX Engineering',
    'Cloud Solutions'
  ];

  const budgets = [
    '< $10k',
    '$10k - $25k',
    '$25k - $50k',
    '$50k - $100k',
    '$100k+'
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    // Simulate luxury api response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      success(
        t("Proposal Transmitted", "Proposal Transmitted"),
        `${t("A secure virtual briefing was generated for", "A secure virtual briefing was generated for")} ${name}. ${t("Our architect group is reviewing your target outline!", "Our architect group is reviewing your target outline!")}`,
        4500
      );
    }, 1200);
  };

  const handleContinueToStep2 = () => {
    if (!selectedService) return;
    setStep(2);
    info(
      t("Service Profile Mapped", "Service Profile Mapped"),
      `${t("Active tracker set to", "Active tracker set to")} ${t(selectedService, selectedService)} ${t("within", "within")} ${budget} ${t("threshold limits.", "threshold limits.")}`,
      3500
    );
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService('');
    setBudget('$10k - $25k');
    setName('');
    setEmail('');
    setMessage('');
    setIsSuccess(false);
    info(
      t("State Recycled", "State Recycled"),
      t("Workspace inputs cleared. Ready for fresh request inputs.", "Workspace inputs cleared. Ready for fresh request inputs."),
      3000
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm z-0"
          />

          {/* Consultation Drawer Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`relative w-full max-w-2xl border rounded-2xl overflow-hidden shadow-2xl z-10 ${
              isLightMode 
                ? 'bg-[#FAFAFA] border-neutral-200' 
                : 'bg-zinc-950/90 border border-white/10 glass-panel'
            }`}
          >
            {/* Background glowing decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className={`flex items-center justify-between mb-6 pb-4 border-b ${
                isLightMode ? 'border-neutral-200' : 'border-white/10'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center justify-center w-8.5 h-8.5 rounded-lg border transition-colors ${
                    isLightMode ? 'bg-neutral-100 border-neutral-200' : 'bg-white/5 border border-white/10'
                  }`}>
                    <svg viewBox="0 0 200 200" fill="none" className="w-5.5 h-5.5 select-none">
                      <defs>
                        <linearGradient id="modalLeftPill" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#E599F7" />
                          <stop offset="100%" stopColor="#9C78F7" />
                        </linearGradient>
                        <linearGradient id="modalRightPill" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#9C78F7" />
                          <stop offset="100%" stopColor="#5F3DC4" />
                        </linearGradient>
                        <linearGradient id="modalDot" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#7048E8" />
                          <stop offset="100%" stopColor="#5F3DC4" />
                        </linearGradient>
                      </defs>
                      <rect x="52" y="62" width="28" height="85" rx="14" transform="rotate(-30 66 104.5)" fill="url(#modalLeftPill)" />
                      <rect x="94" y="52" width="28" height="85" rx="14" transform="rotate(-30 108 94.5)" fill="url(#modalRightPill)" />
                      <circle cx="140" cy="100" r="14" fill="url(#modalDot)" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-display font-medium text-lg leading-tight transition-colors ${
                      isLightMode ? 'text-neutral-900 font-bold' : 'text-white'
                    }`}>ZenbyteLabs</h3>
                    <p className={`text-xs transition-colors ${
                      isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>{t("Project Consultation Workspace", "Project Consultation Workspace")}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`p-1 px-1.5 rounded-lg border transition-colors ${
                    isLightMode 
                      ? 'border-neutral-200 bg-neutral-100 hover:text-neutral-950 hover:bg-neutral-200' 
                      : 'border border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSuccess ? (
                /* Success Slate */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-brand-blue animate-bounce" />
                  </div>
                  <h4 className={`font-display font-semibold text-2xl mb-2 transition-colors ${
                    isLightMode ? 'text-neutral-900' : 'text-white'
                  }`}>{t("Proposal Received!", "Proposal Received!")}</h4>
                  <p className={`max-w-md mx-auto mb-8 text-sm leading-relaxed transition-colors ${
                    isLightMode ? 'text-neutral-650' : 'text-neutral-400'
                  }`}>
                    {t("Thank you", "Thank you")} {name}. {t("Our enterprise solutions architects have been notified. We will reach out to you within **2 business hours** at", "Our enterprise solutions architects have been notified. We will reach out to you within **2 business hours** at")} <span className="text-brand-blue font-medium">{email}</span> {t("to select an onboarding slot.", "to select an onboarding slot.")}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={onClose}
                      className={`px-6 py-2.5 rounded-lg border font-medium text-sm transition-all ${
                        isLightMode 
                          ? 'border-neutral-200 bg-neutral-100 hover:bg-neutral-200 text-neutral-800' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                      }`}
                    >
                      {t("Close Window", "Close Window")}
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-brand-blue to-brand-purple text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg"
                    >
                      {t("Submit Another Query", "Submit Another Query")}
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Main Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Phase Indicator */}
                  <div className="flex items-center space-x-2">
                    <span className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'w-8 bg-brand-blue' : 'w-2 bg-neutral-800'}`} />
                    <span className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'w-8 bg-brand-purple' : 'w-2 bg-neutral-800'}`} />
                  </div>

                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className={`block text-sm font-medium mb-3 flex items-center transition-colors ${
                          isLightMode ? 'text-neutral-800 font-bold' : 'text-neutral-300'
                        }`}>
                          <Briefcase className="w-4 h-4 mr-2 text-brand-blue" />
                          {t("What service vertical are you looking for?", "What service vertical are you looking for?")}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {services.map((svc) => (
                            <button
                              key={svc}
                              type="button"
                              onClick={() => setSelectedService(svc)}
                              className={`p-3 text-left text-xs md:text-sm rounded-xl border transition-all ${
                                selectedService === svc
                                  ? 'bg-brand-blue/15 border-brand-blue text-brand-blue font-bold shadow-md shadow-brand-blue/5'
                                  : isLightMode
                                    ? 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:text-neutral-900 shadow-xs'
                                    : 'bg-white/5 border-white/5 hover:border-white/25 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {t(svc, svc)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-3 flex items-center transition-colors ${
                          isLightMode ? 'text-neutral-800 font-bold' : 'text-neutral-300'
                        }`}>
                          <Calendar className="w-4 h-4 mr-2 text-brand-purple" />
                          {t("Estimate Project Budget Scale", "Estimate Project Budget Scale")}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {budgets.map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setBudget(b)}
                              className={`px-4 py-2 text-xs font-mono rounded-lg border transition-all ${
                                budget === b
                                  ? 'bg-brand-purple/15 border-brand-purple text-brand-purple font-bold'
                                  : isLightMode
                                    ? 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-xs'
                                    : 'bg-white/5 border-white/5 hover:border-white/20 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={handleContinueToStep2}
                          disabled={!selectedService}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white font-medium text-sm flex items-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group transition-all"
                        >
                          {t("Continue Details", "Continue Details")}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider transition-colors ${
                            isLightMode ? 'text-neutral-700' : 'text-neutral-400'
                          }`}>
                            {t("Full Name", "Full Name")}
                          </label>
                          <input
                            type="text"
                            required
                            placeholder={t("John Doe", "John Doe")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all text-sm ${
                              isLightMode 
                                ? 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 shadow-xs' 
                                : 'bg-white/5 border-white/10 text-white placeholder-neutral-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider transition-colors ${
                            isLightMode ? 'text-neutral-700' : 'text-neutral-400'
                          }`}>
                            {t("Work Email Address", "Work Email Address")}
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="john@workspace.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all text-sm ${
                              isLightMode 
                                ? 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 shadow-xs' 
                                : 'bg-white/5 border-white/10 text-white placeholder-neutral-500'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider flex items-center justify-between transition-colors ${
                          isLightMode ? 'text-neutral-700' : 'text-neutral-400'
                        }`}>
                          <span>{t("Tell us about your project vertical / objectives", "Tell us about your project vertical / objectives")}</span>
                          <span className="text-[10px] text-neutral-500 lowercase">{t("(Optional)", "(Optional)")}</span>
                        </label>
                        <textarea
                          rows={4}
                          placeholder={t("Provide a short outline of what you're building, target audience or custom tech expectations...", "Provide a short outline of what you're building, target audience or custom tech expectations...")}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all text-sm resize-none ${
                            isLightMode 
                              ? 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 shadow-xs' 
                              : 'bg-white/5 border-white/10 text-white placeholder-neutral-500'
                          }`}
                        />
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className={`px-5 py-2.5 rounded-xl border text-sm transition-all ${
                            isLightMode 
                              ? 'border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900' 
                              : 'border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10'
                          }`}
                        >
                          {t("Back", "Back")}
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting || !name || !email}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white font-medium text-sm flex items-center justify-center min-w-[140px] shadow-lg disabled:opacity-50 transition-all cursor-pointer"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              {t("Processing...", "Processing...")}
                            </span>
                          ) : (
                            <span className="flex items-center">
                              {t("Book Consultation", "Book Consultation")}
                              <MessageSquare className="w-4 h-4 ml-2" />
                            </span>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
