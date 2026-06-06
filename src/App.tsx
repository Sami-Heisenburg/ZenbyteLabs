/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Services from './components/Services';
import TechSphere from './components/TechSphere';
import Portfolio from './components/Portfolio';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import ConsultationModal from './components/ConsultationModal';
import Footer from './components/Footer';

import TranslationOverlay from './components/TranslationOverlay';
import { ToastProvider } from './components/Toast';
import { LanguageProvider } from './components/LanguageContext';

export default function App() {
  const [isOpenConsultation, setIsOpenConsultation] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLoaderFinished, setIsLoaderFinished] = useState(true);
  const [showMainLayout, setShowMainLayout] = useState(true);

  // Sync simulated mode classes with body
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode-active');
    } else {
      document.documentElement.classList.remove('light-mode-active');
    }
  }, [isLightMode]);

  const handleOpenConsultation = () => {
    setIsOpenConsultation(true);
  };

  const handleCloseConsultation = () => {
    setIsOpenConsultation(false);
  };

  const handleToggleLightMode = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <LanguageProvider>
      <ToastProvider isLightMode={isLightMode}>
        <div className={`relative min-h-screen select-text antialiased transition-colors duration-500 overflow-x-hidden ${
          isLightMode 
            ? 'bg-neutral-50 text-neutral-900 selection:bg-neutral-200 selection:text-neutral-900' 
            : 'bg-[#050505] text-[#FFFFFF]'
        }`}>


        {/* Immersive Interactive Cursor trail & Ambient Glow */}
        <CursorGlow />

        {/* Ambient Immersive Orbs for Atmospheric Media theme */}
        {!isLightMode && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-32 -right-32 orb orb-1 animate-float-slow opacity-40" />
            <div className="absolute -bottom-32 -left-32 orb orb-2 animate-float-slower opacity-40" />
          </div>
        )}

        {/* Persistent Page-wide glow effects */}
        <div className="fixed top-0 inset-x-0 h-[45vh] bg-gradient-to-b from-[#16A4FB]/5 via-transparent to-transparent pointer-events-none z-0" />

        {/* Core Layout Panels with Smooth Fade-in once loaded */}
        <motion.div 
          className="relative z-10 font-sans"
          initial={{ opacity: 0, y: 15 }}
          animate={{ 
            opacity: showMainLayout ? 1 : 0, 
            y: showMainLayout ? 0 : 15 
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          
          {/* Navigation bar */}
          <Navbar 
            onOpenConsultation={handleOpenConsultation}
            isLightMode={isLightMode}
            onToggleLightMode={handleToggleLightMode}
          />

          {/* Hero Section Banner */}
          <Hero onOpenConsultation={handleOpenConsultation} isLightMode={isLightMode} />

          {/* Client Logotypes & Statistics Section */}
          <Trust isLightMode={isLightMode} />

          {/* Service Cards Grid List */}
          <Services isLightMode={isLightMode} />

          {/* Interactive 3D Sphere Orbit Stack - Defer mounting until load complete */}
          {isLoaderFinished && (
            <TechSphere isLightMode={isLightMode} />
          )}

          {/* Bento Grid Featured Project Portfolio Showcase */}
          <Portfolio isLightMode={isLightMode} />

          {/* Why Choose Us 3D Tilt columns */}
          <WhyChooseUs isLightMode={isLightMode} />

          {/* Testimonial slider carousel */}
          <Testimonials isLightMode={isLightMode} />

          {/* Dynamic inquiry intake CTA section */}
          <CTASection onOpenConsultation={handleOpenConsultation} isLightMode={isLightMode} />

          {/* Footer Navigation Index */}
          <Footer isLightMode={isLightMode} />

        </motion.div>

        {/* Multi-step Project Booking Workspace Modal Overlay */}
        <ConsultationModal 
          isOpen={isOpenConsultation}
          onClose={handleCloseConsultation}
          isLightMode={isLightMode}
        />

        {/* Elite Holographic Systems Multi-Layer Translation Sync Overlay */}
        <TranslationOverlay isLightMode={isLightMode} />
      </div>
      </ToastProvider>
    </LanguageProvider>
  );
}
