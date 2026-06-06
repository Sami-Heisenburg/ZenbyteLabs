/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, MouseEvent, memo } from 'react';
import { motion } from 'motion/react';
import { Zap, Activity, Shield, Kanban, Compass, LifeBuoy } from 'lucide-react';
import { WhyUsFeature } from '../types';
import { useLanguage } from './LanguageContext';

interface TiltCardProps {
  feature: WhyUsFeature;
  isLightMode?: boolean;
}

// Interactive Custom 3D Tilt Card Component - Wrapped in memo for scroll optimization
const TiltCard = memo(function TiltCard({ feature, isLightMode = false }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse position relative to card boundaries
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculations for rotations
    const rotateX = ((height / 2 - mouseY) / (height / 2)) * 12; // Max 12deg
    const rotateY = ((mouseX - width / 2) / (width / 2)) * 12;

    setCoords({ rotateX, rotateY, x: mouseX, y: mouseY });
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ rotateX: 0, rotateY: 0, x: 0, y: 0 });
  };

  const IconMap: Record<string, any> = {
    Zap,
    Activity,
    Shield,
    Kanban,
    Compass,
    LifeBuoy,
  };

  const FeatureIcon = IconMap[feature.iconName] || Zap;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={`relative p-6 rounded-2xl border transition-all duration-300 text-left cursor-pointer h-full ${
        isLightMode 
          ? 'border-neutral-200 bg-white hover:border-neutral-300 shadow-sm' 
          : 'border border-white/5 bg-white/[0.02] hover:border-white/10 glass-panel'
      }`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
      }}
    >
      {/* Dynamic Cursor spot neon glow overlay */}
      {isHovered && (
        <div
          className={`absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full w-48 h-48 bg-gradient-to-tr ${feature.glowColor} z-0 opacity-20 blur-2xl`}
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        <div>
          <div className={`p-3 border rounded-xl inline-block mb-4 ${
            isLightMode ? 'bg-neutral-100 border-neutral-200 text-brand-blue' : 'bg-white/5 border border-white/10 text-brand-blue'
          }`}>
            <FeatureIcon className="w-5 h-5 text-brand-blue" />
          </div>
          <h3 className={`font-display font-semibold text-lg mb-2 transition-colors ${
            isLightMode ? 'text-neutral-900' : 'text-white'
          }`}>
            {feature.title}
          </h3>
          <p className={`text-xs font-sans leading-relaxed transition-colors ${
            isLightMode ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            {feature.description}
          </p>
        </div>

        <div className={`text-[10px] uppercase font-mono tracking-wider font-bold transition-colors ${
          isLightMode ? 'text-neutral-500' : 'text-neutral-500'
        }`}>
          Pillar Checked • Approved
        </div>
      </div>
    </div>
  );
});

interface WhyChooseUsProps {
  isLightMode?: boolean;
}

const PILLARS: WhyUsFeature[] = [
  {
    id: 'why-perf',
    title: 'Performance-First Runtime',
    iconName: 'Zap',
    description: 'We code with optimal memory scopes, avoiding heavy execution patterns to guarantee instantaneous web loading and high Google Core Web Vitals.',
    glowColor: 'from-[#16A4FB] to-transparent',
  },
  {
    id: 'why-scale',
    title: 'Elastic Infrastructure',
    iconName: 'Activity',
    description: 'Our system architectures employ serverless boundaries and autoscaling orchestration engines that expand automatically to sustain traffic spikes.',
    glowColor: 'from-[#486EF4] to-transparent',
  },
  {
    id: 'why-secure',
    title: 'Vault-Grade Security',
    iconName: 'Shield',
    description: 'Providing bulletproof threat management. We integrate authenticated scopes, secure cookies, CORS parameters, and automated TLS validation.',
    glowColor: 'from-[#8643F5] to-transparent',
  },
  {
    id: 'why-arch',
    title: 'Architectural Transparency',
    iconName: 'Kanban',
    description: 'Writing documented, clean SOLID classes with typed boundaries. You retain 100% intellectual property and flawless source code control.',
    glowColor: 'from-[#FF007A] to-transparent',
  },
  {
    id: 'why-tech',
    title: 'Next-Gen Stacks Only',
    iconName: 'Compass',
    description: 'No bloated legacy technology curves. We run Vite builds, server-side React hooks, Tailwind styles, and microservices geared for longevity.',
    glowColor: 'from-emerald-400 to-transparent',
  },
  {
    id: 'why-support',
    title: 'Enterprise Operations Support',
    iconName: 'LifeBuoy',
    description: 'Beyond launch, our operations team guarantees server health checks, security patches, system maintenance logs, and feature development.',
    glowColor: 'from-amber-400 to-transparent',
  },
];

function WhyChooseUs({ isLightMode = false }: WhyChooseUsProps) {
  const { t } = useLanguage();

  const translatedPillars = PILLARS.map((feature) => ({
    ...feature,
    title: t(feature.title, feature.title),
    description: t(feature.description, feature.description),
  }));

  return (
    <section id="why-us" className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      isLightMode ? 'bg-[#FAFAFA]' : 'bg-dark-bg'
    }`}>
      {/* Background neon visual grids */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-16 space-y-4">
          <span className="text-xs font-mono text-brand-blue font-bold tracking-[0.2em] uppercase">
            {t('Core Agency Valuables', 'Core Agency Valuables')}
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-none transition-colors ${
            isLightMode ? 'text-neutral-900' : 'text-white'
          }`}>
            {t('Built for High-Level Growth.', 'Built for High-Level Growth.')}
          </h2>
          <p className={`font-sans max-w-lg text-sm leading-relaxed pt-1 transition-colors ${
            isLightMode ? 'text-neutral-650' : 'text-neutral-400'
          }`}>
            {t(
              'We don’t cut corners or rely on rigid legacy builders. ZenbyteLabs engineers products designed to scale, load instantly, and remain secure eternally.',
              'We don’t cut corners or rely on rigid legacy builders. ZenbyteLabs engineers products designed to scale, load instantly, and remain secure eternally.'
            )}
          </p>
        </div>

        {/* Coordinated Interactive Tilt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translatedPillars.map((feature) => (
            <TiltCard key={feature.id} feature={feature} isLightMode={isLightMode} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default memo(WhyChooseUs);
