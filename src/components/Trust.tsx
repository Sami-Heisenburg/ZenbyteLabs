/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Target, Trophy, Award, Landmark } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface TrustProps {
  isLightMode?: boolean;
}

export default function Trust({ isLightMode = false }: TrustProps) {
  const { t } = useLanguage();

  const localBrands = [
    { name: 'Vercel', icon: '▲' },
    { name: 'Linear', icon: '⧉' },
    { name: 'Stripe', icon: '💳' },
    { name: 'Retool', icon: '❖' },
    { name: 'Supabase', icon: '⚡' },
    { name: 'Prisma', icon: '▲' },
    { name: 'Framer', icon: '𝔽' },
    { name: 'PlanetScale', icon: '☁' },
  ];

  const stats = [
    {
      id: 'stat-1',
      value: t('140+', '140+'),
      label: t('Delivered Deployments', 'Delivered Deployments'),
      description: t('Production-ready cloud webs, custom APIs & native platforms.', 'Production-ready cloud webs, custom APIs & native platforms.'),
      icon: Trophy,
      glow: 'from-brand-blue/20 to-brand-blue/0',
    },
    {
      id: 'stat-2',
      value: t('99.4%', '99.4%'),
      label: t('On-Time Client CSAT', 'On-Time Client CSAT'),
      description: t('Delivered to scope following strict agile verification sprints.', 'Delivered to scope following strict agile verification sprints.'),
      icon: Target,
      glow: 'from-brand-purple/20 to-brand-purple/0',
    },
    {
      id: 'stat-3',
      value: t('35M+', '35M+'),
      label: t('API Requests Routed', 'API Requests Routed'),
      description: t('High-throughput requests orchestrated through serverless APIs.', 'High-throughput requests orchestrated through serverless APIs.'),
      icon: Award,
      glow: 'from-red-500/10 to-red-500/0',
    },
    {
      id: 'stat-4',
      value: t('22+', '22+'),
      label: t('Enterprise Stack Integrations', 'Enterprise Stack Integrations'),
      description: t('Vetted integrations crossing multiple SQL engines, modern caches & clouds.', 'Vetted integrations crossing multiple SQL engines, modern caches & clouds.'),
      icon: Landmark,
      glow: 'from-emerald-500/10 to-emerald-500/0',
    },
  ];

  return (
    <section id="trust" className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      isLightMode ? 'bg-neutral-100/50 border-t border-b border-neutral-200' : 'bg-zinc-950 border-t border-b border-white/5'
    }`}>
      {/* Absolute Glow Spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Animated Infinite Marquee Container */}
        <div className="mb-20 text-center">
          <p className={`text-xs uppercase tracking-[0.25em] font-mono mb-6 font-semibold ${
            isLightMode ? 'text-neutral-500' : 'text-neutral-500'
          }`}>
            {t('ENGINEERING AND COLLABORATING WITH GLOBAL INNOVATORS', 'ENGINEERING AND COLLABORATING WITH GLOBAL INNOVATORS')}
          </p>
          
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <div className="flex w-max animate-infinite-scroll space-x-16 py-4">
              {/* Combine twice to enable seamless infinite wrapping */}
              {[...localBrands, ...localBrands, ...localBrands].map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className={`flex items-center space-x-3.5 transition-colors select-none ${
                    isLightMode ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg md:text-xl opacity-75">{brand.icon}</span>
                  <span className="font-display font-semibold text-lg md:text-xl tracking-tight">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Numerical Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border transition-all group overflow-hidden ${
                  isLightMode 
                    ? 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50 shadow-sm' 
                    : 'border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                {/* Floating Glow Arc */}
                <div className={`absolute -bottom-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-tr ${stat.glow} blur-2xl group-hover:scale-125 transition-transform duration-500`} />

                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    isLightMode 
                      ? 'bg-neutral-100 border-neutral-200 text-neutral-700' 
                      : 'bg-white/5 border border-white/10 text-neutral-300 group-hover:text-white'
                  }`}>
                    <Icon className="w-5 h-5 text-brand-blue" />
                  </div>
                </div>

                <div className="space-y-1.5 relative z-10 text-left">
                  <h4 className={`text-3xl font-bold font-mono tracking-tight transition-colors ${
                    isLightMode ? 'text-neutral-950 font-bold' : 'text-white'
                  }`}>
                    {stat.value}
                  </h4>
                  <p className={`text-sm font-display font-medium transition-colors ${
                    isLightMode ? 'text-neutral-800' : 'text-neutral-200'
                  }`}>
                    {stat.label}
                  </p>
                  <p className={`text-xs leading-relaxed pt-1.5 transition-colors ${
                    isLightMode ? 'text-neutral-600' : 'text-neutral-500'
                  }`}>
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
