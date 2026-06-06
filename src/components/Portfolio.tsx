/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  ArrowUpRight, 
  Smartphone, 
  Globe, 
  Layers, 
  Laptop, 
  CheckCircle2, 
  Code2, 
  Zap, 
  ShieldCheck, 
  Target 
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  categoryKey: 'web' | 'mobile' | 'saas';
  descriptionKey: string;
  enDescription: string;
  bnDescription: string;
  techStack: string[];
  features: string[];
  icon: any;
  metric: { label: string; value: string };
}

export default function Portfolio({ isLightMode = false }: { isLightMode?: boolean }) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'mobile' | 'saas'>('all');

  const portfolioItems: PortfolioItem[] = useMemo(() => [
    {
      id: 'port-ecom',
      title: 'ZenMart Headless Commerce',
      category: 'Full Stack Web Development',
      categoryKey: 'web',
      descriptionKey: 'ecom_desc',
      enDescription: 'A high-converting headless e-commerce store designed with sub-second page transitions, dynamic server-side catalog caching, and fully secured Stripe checkout pipeline.',
      bnDescription: 'সাব-সেকেন্ড পেজ ট্রানজিশন, ডায়নামিক সার্ভার-সাইড ক্যাটালগ ক্যাশিং এবং নিরাপদ স্ট্রাইপ চেকআউট সহ একটি হাই-কনভার্টিং হেডলেস ই-কমার্স স্টোর।',
      techStack: ['Next.js', 'React', 'Tailwind CSS', 'GraphQL', 'Stripe'],
      features: ['98+ Mobile Speed Rating', 'Instant Checkout Processing', 'Dynamic SEO Hydration'],
      icon: Globe,
      metric: { label: 'Conversion Speed', value: '0.4s load' }
    },
    {
      id: 'port-saas',
      title: 'Apex Workspace Matrix',
      category: 'Web Application / Portal',
      categoryKey: 'saas',
      descriptionKey: 'saas_desc',
      enDescription: 'A real-time workspace collaboration portal featuring shared vector whiteboards, automated task checklists, drag-and-drop kanban boards, and direct secure messaging rooms.',
      bnDescription: 'কোলাবোরেটিভ ভেক্টর ক্যানভাস, ড্র্যাগ-এন্ড-ড্রপ কানবান বোর্ড এবং রিয়েল-টাইম টিম চ্যাট সহ একটি সুরক্ষিত ওয়ার্কস্পেস পোর্টাল।',
      techStack: ['React', 'Node.js', 'Express', 'WebSockets', 'PostgreSQL'],
      features: ['Real-time Operational Sync', 'Offline State Hydration', 'Structured Role Permissions'],
      icon: Laptop,
      metric: { label: 'Operational Uptime', value: '99.99%' }
    },
    {
      id: 'port-mobile',
      title: 'NovaPay Crypto Wallet',
      category: 'Mobile App Engineering',
      categoryKey: 'mobile',
      descriptionKey: 'mobile_desc',
      enDescription: 'A gorgeous iOS & Android native payment wallet app. Features bio-metric thumb/face unlock verification, dynamic currency routing maps, and instant push notification systems.',
      bnDescription: 'আইওএস এবং অ্যান্ড্রয়েডের জন্য একটি ক্লাসিক নেটিভ ওয়ালেট অ্যাপ। এতে রয়েছে বায়োমেট্রিক সিকিউরিটি আনলক এবং রিয়েল-টাইম পেমেন্ট নোটিফিকেশন।',
      techStack: ['React Native', 'Expo', 'JWT Auth', 'Node.js API', 'Redis'],
      features: ['Biometric Hardened Safety', 'Hardware Accelerated UI', 'Immediate Push Services'],
      icon: Smartphone,
      metric: { label: 'Platform Speed', value: '60 FPS Native' }
    },
    {
      id: 'port-learning',
      title: 'EduSphere Learning Stream',
      category: 'SaaS Platform App',
      categoryKey: 'saas',
      descriptionKey: 'edu_desc',
      enDescription: 'A robust multi-tenant learning management system with dynamic video streaming compression, automated quiz grading workflows, and Stripe payment billing plans.',
      bnDescription: 'ডায়নামিক ভিডিও স্ট্রিমিং কম্প্রেশন, অটোমেটেড কুইজ এবং সাবস্ক্রিপশন বিলিং প্ল্যান সহ একটি শক্তিশালী মাল্টি-ট্যানেন্ট লার্নিং প্ল্যাটফর্ম।',
      techStack: ['Next.js', 'Express', 'Postgres', 'AWS S3', 'Stripe API'],
      features: ['Adaptive Video Quality Engine', 'Multi-tenant Subscription Tiers', 'Automatic Report Builders'],
      icon: Layers,
      metric: { label: 'Sub-tenants Active', value: '1,500+ portals' }
    }
  ], []);

  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return portfolioItems;
    return portfolioItems.filter(item => item.categoryKey === activeTab);
  }, [activeTab, portfolioItems]);

  return (
    <section id="portfolio" className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      isLightMode ? 'bg-[#FAFAFA]' : 'bg-zinc-950'
    }`}>
      {/* Aesthetic mesh overlay backdrops */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent pointer-events-none" />
      <div className="absolute -left-92 top-1/3 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-92 bottom-1/3 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="text-left space-y-4">
            <div className="inline-flex items-center space-x-2 bg-brand-blue/15 border border-brand-blue/30 px-3.5 py-1.5 rounded-full text-[10px] text-brand-blue font-mono font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
              <span>{t('PORTFOLIO SHOWCASE', 'PORTFOLIO SHOWCASE')}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight transition-colors ${
              isLightMode ? 'text-neutral-900 font-semibold' : 'text-white'
            }`}>
              {t('Our Vetted Production', 'Our Vetted Production')}<br />
              <span className="bg-gradient-to-r from-brand-blue via-brand-navy to-brand-purple bg-clip-text text-transparent font-bold">
                {t('Client Deliveries', 'Client Deliveries')}
              </span>
            </h2>
          </div>

          <div className="space-y-4 lg:max-w-md text-left">
            <p className={`font-sans text-xs sm:text-sm leading-relaxed transition-colors ${
              isLightMode ? 'text-neutral-650' : 'text-neutral-400'
            }`}>
              {t(
                'We design & hand-craft premium, production-grade applications that load instantly, scale flawlessly, and elevate user experience across websites, portals, and native mobile apps.',
                'We design & hand-craft premium, production-grade applications that load instantly, scale flawlessly, and elevate user experience across websites, portals, and native mobile apps.'
              )}
            </p>

            {/* Tab selections */}
            <div className={`p-1 border rounded-xl flex flex-wrap gap-1 ${
              isLightMode ? 'bg-neutral-100 border-neutral-200' : 'bg-white/5 border-white/10'
            }`}>
              {(['all', 'web', 'mobile', 'saas'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3.5 py-1.5 text-[10px] font-mono tracking-wider uppercase font-bold rounded-lg transition-all cursor-pointer z-10 ${
                    activeTab === tab 
                      ? 'text-white' 
                      : isLightMode 
                        ? 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/50' 
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab === 'all' ? t('All Apps', 'All Apps') : 
                   tab === 'web' ? t('Full Stack Web', 'Full Stack Web') :
                   tab === 'mobile' ? t('Mobile Apps', 'Mobile Apps') : 
                   t('Enterprise SaaS', 'Enterprise SaaS')}
                  
                  {activeTab === tab && (
                    <motion.span
                      layoutId="activePortfolioTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-purple rounded-lg -z-10 shadow-md shadow-brand-blue/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.97, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`group relative rounded-2xl border p-6.5 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                    isLightMode
                      ? 'bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-md'
                      : 'bg-white/[0.01] border-white/5 hover:border-brand-blue/30 backdrop-blur-md hover:bg-white/[0.03]'
                  }`}
                >
                  {/* Accent Neon Background glow overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Header content and Category */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl border ${
                        isLightMode 
                          ? 'bg-neutral-50 text-neutral-800 border-neutral-200' 
                          : 'bg-black/40 text-brand-blue border-white/5 group-hover:border-brand-blue/50'
                      } transition-colors`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                          {t(item.category, item.category)}
                        </span>
                        <span className={`text-[10px] font-mono leading-none ${
                          isLightMode ? 'text-neutral-700 font-semibold' : 'text-emerald-400 font-bold'
                        }`}>
                          {item.metric.value}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <h3 className={`text-xl font-display font-bold tracking-tight transition-colors ${
                        isLightMode ? 'text-[#0f172a]' : 'text-white'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs sm:text-sm font-sans leading-relaxed transition-colors ${
                        isLightMode ? 'text-neutral-650' : 'text-neutral-400'
                      }`}>
                        {language === 'bn' ? item.bnDescription : item.enDescription}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="pt-2 space-y-1.5 border-t border-white/5">
                      {item.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-center space-x-2 text-[11px] text-left">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                          <span className={isLightMode ? 'text-neutral-700' : 'text-zinc-300'}>
                            {t(feature, feature)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer tags */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-white/5 relative z-10">
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className={`text-[9px] font-mono font-bold tracking-tight px-2 py-1 rounded ${
                            isLightMode 
                              ? 'bg-neutral-100 text-neutral-700 border border-neutral-200' 
                              : 'bg-white/5 text-zinc-400 border border-white/5'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-brand-blue group-hover:text-brand-purple transition-colors font-bold uppercase tracking-wider">
                      <span>{t('EXPLORE STACK', 'EXPLORE STACK')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
