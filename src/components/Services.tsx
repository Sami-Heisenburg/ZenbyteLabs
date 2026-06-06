/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from 'react';
import { motion } from 'motion/react';
import { Globe, Cpu, Layers, Laptop, Smartphone, Palette, Terminal, Cloud, Check } from 'lucide-react';
import { Service } from '../types';
import { useLanguage } from './LanguageContext';

interface ServicesProps {
  isLightMode?: boolean;
}

const SERVICES_LIST: Service[] = [
  {
    id: 'svc-fullstack',
    title: 'Full Stack Web Development',
    description: 'End-to-end modern web systems built with state-of-the-art frameworks, ensuring seamless data flow, state hydration, and high SEO search index scores.',
    iconName: 'Globe',
    accent: 'from-brand-blue to-brand-navy',
    features: ['SSR & Static Generation', 'Hydrated State Managers', 'Universal Router Systems'],
  },
  {
    id: 'svc-custom',
    title: 'Custom Software Development',
    description: 'Architecting custom system modules, high frequency worker daemons, and microservices crafted with strict memory layouts and low execution overhead.',
    iconName: 'Cpu',
    accent: 'from-brand-blue to-brand-purple',
    features: ['Rust / Go / Node Engines', 'Asynchronous Queues', 'Custom Dev Pipelines'],
  },
  {
    id: 'svc-saas',
    title: 'SaaS Architecture & Dev',
    description: 'Creating multi-tenant multi-region SaaS systems featuring structured subscription tiers, dynamic usage metrics, and multi-currency billing rails.',
    iconName: 'Layers',
    accent: 'from-brand-purple to-[#FF007A]',
    features: ['Stripes Subscription Integration', 'Multi-tenant Schemas', 'Audit Trail Logging'],
  },
  {
    id: 'svc-webapps',
    title: 'Web Application Development',
    description: 'Building dense browser workspace portals, collaborative vector canvases, real-time message rooms, and client portfolios with beautiful layouts.',
    iconName: 'Laptop',
    accent: 'from-brand-navy to-brand-purple',
    features: ['Reactive Rich UX States', 'Offline State Syncing', 'Real-time WebSockets'],
  },
  {
    id: 'svc-mobile',
    title: 'Mobile App Engineering',
    description: 'Cross-platform reactive native layouts and high performance build configurations for iOS and Android, leveraging platform hardware acceleration.',
    iconName: 'Smartphone',
    accent: 'from-brand-blue to-emerald-400',
    features: ['React Native & Flutter', 'Direct Device Bluetooth/Sensors', 'Push Workspace Systems'],
  },
  {
    id: 'svc-uiux',
    title: 'UI/UX Craftsmanship',
    description: 'Interactive wireframing, fluid digital design, typographic hierarchy maps, and custom motion definitions that bridge brand identities with actual code.',
    iconName: 'Palette',
    accent: 'from-[#FF007A] to-brand-purple',
    features: ['Framer Design Prototyping', 'Typographic Scale Alignment', 'High-Fidelity Wireframes'],
  },
  {
    id: 'svc-api',
    title: 'Secure API Infrastructure',
    description: 'Designing typed GraphQL services, hyper-fast RPC microservice boundaries, or RESTful API resources designed with robust token scopes.',
    iconName: 'Terminal',
    accent: 'from-zinc-400 to-zinc-200',
    features: ['REST / GraphQL / gRPC', 'JWT / OAuth Validation', 'Built-in Rate Limiting'],
  },
  {
    id: 'svc-cloud',
    title: 'Cloud & DevOps Engineering',
    description: 'Deploying robust cloud resources, terraformed infrastructure as code, container schedules, automated health alerts, and CDN distribution profiles.',
    iconName: 'Cloud',
    accent: 'from-brand-blue to-cyan-400',
    features: ['Docker & Kubernetes', 'CI/CD Automated Runners', 'Global CDN Distribution'],
  },
];

const iconMap: Record<string, any> = {
  Globe,
  Cpu,
  Layers,
  Laptop,
  Smartphone,
  Palette,
  Terminal,
  Cloud,
};

function Services({ isLightMode = false }: ServicesProps) {
  const { t } = useLanguage();

  const translatedServices = SERVICES_LIST.map((svc) => ({
    ...svc,
    title: t(svc.title, svc.title),
    description: t(svc.description, svc.description),
  }));

  return (
    <section id="services" className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      isLightMode ? 'bg-neutral-50' : 'bg-dark-bg'
    }`}>
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-16 space-y-4">
          <span className="text-xs font-mono text-brand-blue font-bold tracking-[0.2em] uppercase">
            {t('Core Service Offerings', 'Core Service Offerings')}
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight transition-colors ${
            isLightMode ? 'text-neutral-900' : 'text-white'
          }`}>
            {t('We engineer high-performance systems for growth.', 'We engineer high-performance systems for growth.')}
          </h2>
          <p className={`font-sans max-w-xl text-sm leading-relaxed transition-colors ${
            isLightMode ? 'text-neutral-650' : 'text-neutral-400'
          }`}>
            {t('From fluid responsive front-ends to scalable microservice networks, we focus on technical precision and design mastery to build products that deliver business impact.', 'From fluid responsive front-ends to scalable microservice networks, we focus on technical precision and design mastery to build products that deliver business impact.')}
          </p>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {translatedServices.map((svc, index) => {
            const IconComponent = iconMap[svc.iconName] || Globe;
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group relative p-6.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isLightMode 
                    ? 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/20 shadow-sm' 
                    : 'border border-white/5 bg-white/[0.02] hover:border-white/10 glass-panel hover:bg-white/[0.05]'
                }`}
              >
                {/* Accent neon gradient glow background behind card boundary on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${svc.accent} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-300 pointer-events-none`} />

                <div>
                  {/* Icon Block */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${svc.accent} bg-opacity-20 flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="text-left space-y-3">
                    <h3 className={`font-display font-bold text-lg group-hover:text-brand-blue transition-colors ${
                      isLightMode ? 'text-neutral-900' : 'text-white'
                    }`}>
                      {svc.title}
                    </h3>
                    <p className={`text-xs font-sans leading-relaxed transition-colors ${
                      isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      {svc.description}
                    </p>
                  </div>
                </div>

                {/* Bullets List */}
                <div className={`mt-6 pt-4 text-left border-t ${
                  isLightMode ? 'border-neutral-100' : 'border-t border-white/5'
                }`}>
                  <ul className="space-y-2">
                    {svc.features.map((feature, fIdx) => (
                      <li key={fIdx} className={`flex items-center space-x-2 text-[11px] ${
                        isLightMode ? 'text-neutral-500 font-medium' : 'text-neutral-400'
                      }`}>
                        <Check className="w-3 h-3 text-brand-blue shrink-0 animate-pulse" />
                        <span className="font-sans">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Aesthetic Gradient Accent Bar */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-brand-blue to-brand-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(Services);
