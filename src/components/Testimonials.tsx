/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';
import { useLanguage } from './LanguageContext';

interface TestimonialsProps {
  isLightMode?: boolean;
}

export default function Testimonials({ isLightMode = false }: TestimonialsProps) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 'test-1',
      name: 'Alexander Volkov',
      role: t('Director of Platform Engineering', 'Director of Platform Engineering'),
      company: 'Aether Industries',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop&q=80',
      content: t(
        'ZenbyteLabs turned our monolithic backend code into a distributed, multi-region API serverless grid. Their Rust core speeds are unmatched, cutting our deployment cloud waste by over 40% and accelerating API response averages to 12ms.',
        'ZenbyteLabs turned our monolithic backend code into a distributed, multi-region API serverless grid. Their Rust core speeds are unmatched, cutting our deployment cloud waste by over 40% and accelerating API response averages to 12ms.'
      ),
      rating: 5,
    },
    {
      id: 'test-2',
      name: 'Clara Jenkins',
      role: t('Chief Technology Officer', 'Chief Technology Officer'),
      company: 'NovaPay Global',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&fit=crop&q=80',
      content: t(
        'Outstanding technical precision. The double-entry settlement ledger system ZenbyteLabs engineered for us is rock solid, completely complying with SOC2 security requirements right at build stage. Our system maintains atomic locks safely under high load peaks.',
        'Outstanding technical precision. The double-entry settlement ledger system ZenbyteLabs engineered for us is rock solid, completely complying with SOC2 security requirements right at build stage. Our system maintains atomic locks safely under high load peaks.'
      ),
      rating: 5,
    },
    {
      id: 'test-3',
      name: 'Sarah Chen',
      role: t('Head of Engineering', 'Head of Engineering'),
      company: 'Retool SRE',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop&q=80',
      content: t(
        'We expected simple front-end support but received a fully automated, cloud-native DevOps container cluster mapping strategy. The team behaves like top-level enterprise systems architects. Flawless communication, clean code standard, highly recommended.',
        'We expected simple front-end support but received a fully automated, cloud-native DevOps container cluster mapping strategy. The team behaves like top-level enterprise systems architects. Flawless communication, clean code standard, highly recommended.'
      ),
      rating: 5,
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Safe reference path
  const currentTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      isLightMode ? 'bg-[#FAFAFA] border-t border-b border-neutral-200' : 'bg-zinc-950 border-t border-b border-white/5'
    }`}>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Quote graphic */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-brand-blue">
            <Quote className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Carousel Slider */}
        <div className="relative min-h-[350px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              className={`border p-8 md:p-12 rounded-3xl transition-colors ${
                isLightMode 
                  ? 'border-neutral-200 bg-white shadow-sm' 
                  : 'glass-panel border border-white/10 p-8 md:p-12 rounded-3xl bg-white/[0.01]'
              }`}
            >
              <div className="flex flex-col items-center space-y-6">
                
                {/* Visual Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Body Content */}
                <p className={`text-sm md:text-base font-sans leading-relaxed italic max-w-2xl transition-colors ${
                  isLightMode ? 'text-neutral-800' : 'text-neutral-200'
                }`}>
                  "{currentTestimonial.content}"
                </p>

                {/* Avatar Meta Info */}
                <div className="flex items-center space-x-3.5 pt-4">
                  <img
                    referrerPolicy="no-referrer"
                    src={currentTestimonial.avatarUrl}
                    alt={currentTestimonial.name}
                    className={`w-12 h-12 rounded-full border object-cover shadow-md transition-colors ${
                      isLightMode ? 'border-neutral-300' : 'border-white/20'
                    }`}
                  />
                  <div className="text-left">
                    <h4 className={`text-xs md:text-sm font-display font-semibold transition-colors ${
                      isLightMode ? 'text-neutral-900 font-bold' : 'text-white'
                    }`}>
                      {currentTestimonial.name}
                    </h4>
                    <p className={`text-[10px] md:text-xs font-mono transition-colors ${
                      isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      {currentTestimonial.role} • <span className="text-brand-blue">{currentTestimonial.company}</span>
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Interface Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrev}
              className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                isLightMode 
                  ? 'border-neutral-250 bg-[#F5F5F5] hover:bg-neutral-200 text-neutral-800' 
                  : 'border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slider Dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex 
                      ? 'w-6 bg-brand-blue' 
                      : isLightMode 
                        ? 'w-1.5 bg-neutral-300' 
                        : 'w-1.5 bg-neutral-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                isLightMode 
                  ? 'border-neutral-250 bg-[#F5F5F5] hover:bg-neutral-200 text-neutral-800' 
                  : 'border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
