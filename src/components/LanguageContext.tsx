/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, enDefault?: string) => string;
  isTranslating: boolean;
  pendingLanguage: Language | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {}, // Fallback will use the provided default or key itself
  bn: {
    // --- Navigation ---
    'Services': 'সার্ভিস সমূহ',
    'Portfolio': 'পোর্টফোলিও',
    'Testimonials': 'প্রশংসাপত্র',
    'Why Us': 'কেন আমরা',
    'Book Consultation': 'কনসাল্টেশন বুক করুন',
    'Toggle Cosmic Dark Theme': 'কসমিক ডার্ক থিম চালু করুন',
    'Toggle Aurora Light Theme': 'অরোরা লাইট থিম চালু করুন',
    'Our Stack': 'আমাদের টেক স্ট্যাক',
    'Privacy Policy': 'প্রাইভেসি পলিসি',
    'Terms & Conditions': 'ব্যবহারের শর্তাবলী',

    // --- Hero Section ---
    'NEXT-GEN INFRASTRUCTURE & DEV': 'NEXT-GEN INFRASTRUCTURE & DEV',
    'Building Future-Ready': 'তৈরি করছি Future-Ready',
    'Software Experiences': 'Software Experiences',
    'ZenbyteLabs engineering squad crafts performant, full-stack web architectures, secure enterprise cloud platforms, and custom software pipelines designed to scale infinitely. We build for the digital core.': 'ZenbyteLabs ইঞ্জিনিয়ারিং স্কোয়াড তৈরি করে উচ্চ-ক্ষমতাসম্পন্ন full-stack web architectures, সুরক্ষিত enterprise cloud platforms, এবং কাস্টম সফটওয়্যার পাইপলাইন যা সীমাহীনভাবে স্কেল করতে বাড়ে। আমরা ডিজিটাল কোরের জন্য কাজ করি।',
    'Start Your Project': 'প্রজেক্ট শুরু করুন',
    'View Our Work': 'আমাদের কাজ দেখুন',

    // --- Trust Section ---
    'ENGINEERING AND COLLABORATING WITH GLOBAL INNOVATORS': 'গ্লোবাল উদ্ভাবকদের সাথে প্রকৌশল ও সহযোগিতা',
    'Delivered Deployments': 'সফল ডিপ্লয়মেন্ট',
    'Production-ready cloud webs, custom APIs & native platforms.': 'উৎপাদন-প্রস্তুত ক্লাউড ওয়েব, কাস্টম এপিআই এবং নেটিভ প্ল্যাটফর্ম।',
    'On-Time Client CSAT': 'নির্ধারিত সময়ে ক্লায়েন্ট ফিডব্যাক (CSAT)',
    'Delivered to scope following strict agile verification sprints.': 'কঠোর কর্মতৎপর যাচাইকরণ স্প্রিন্টের মাধ্যমে স্কোপ অনুযায়ী ডেলিভারিকৃত।',
    'API Requests Routed': 'রাউটেড এপিআই রিকোয়েস্ট',
    'High-throughput requests orchestrated through serverless APIs.': 'সার্ভারলেস এপিআইয়ের মাধ্যমে উচ্চ-ক্ষমতাসম্পন্ন রিকোয়েস্ট পরিচালনা।',
    'Enterprise Stack Integrations': 'এন্টারপ্রাইজ স্ট্যাক ইন্টিগ্রেশন',
    'Vetted integrations crossing multiple SQL engines, modern caches & clouds.': 'একাধিক SQL ইঞ্জিন, আধুনিক ক্যাশ এবং ক্লাউড জুড়ে পরীক্ষিত ইন্টিগ্রেশন।',

    // --- Services Section ---
    'Core Service Offerings': 'প্রধান সার্ভিসসমূহ',
    'We engineer high-performance systems for growth.': 'আমরা প্রবৃদ্ধির জন্য উচ্চ-ক্ষমতাসম্পন্ন সিস্টেম তৈরি করি।',
    'From fluid responsive front-ends to scalable microservice networks, we focus on technical precision and design mastery to build products that deliver business impact.': 'সুললিত স্পর্শকাতর ফ্রন্ট-এন্ড থেকে শুরু করে স্কেলেবল মাইক্রোসার্ভিস নেটওয়ার্ক পর্যন্ত, আমরা ব্যবসায়িক প্রভাব বিস্তারের উদ্দেশ্যে টেকনিক্যাল নির্ভুলতা এবং ডিজাইনের উপর ফোকাস করি।',
    'Full Stack Web Development': 'Full Stack ওয়েব ডেভেলপমেন্ট',
    'End-to-end modern web systems built with state-of-the-art frameworks, ensuring seamless data flow, state hydration, and high SEO search index scores.': 'সর্বাধুনিক ফ্রেমওয়ার্ক দিয়ে তৈরি এন্ড-টু-এন্ড আধুনিক ওয়েব সিস্টেম, যা নিরবচ্ছিন্ন ডেটা প্রবাহ, স্টেট হাইড্রেশন এবং চমৎকার এসইও স্কোর নিশ্চিত করে।',
    'Custom Software Development': 'কাস্টম সফটওয়্যার ডেভেলপমেন্ট',
    'Architecting custom system modules, high frequency worker daemons, and microservices crafted with strict memory layouts and low execution overhead.': 'কাস্টম সিস্টেম মডিউল, হাই-ফ্রিকোয়েন্সি ওয়ার্কার ডেমন এবং মাইক্রোসার্ভিস ডিজাইন যা কঠোর মেমরি লেআউট এবং সর্বনিম্ন এক্সিকিউশন ওভারহেডে তৈরি।',
    'SaaS Architecture & Dev': 'SaaS আর্কিটেকচার ও ডেভেলপমেন্ট',
    'Creating multi-tenant multi-region SaaS systems featuring structured subscription tiers, dynamic usage metrics, and multi-currency billing rails.': 'মাল্টি-ট্যানেন্ট মাল্টি-রিজন SaaS সিস্টেম তৈরি করা যার মধ্যে রয়েছে সাবস্ক্রিপশন পর্যায়, ডায়নামিক ব্যবহার মেট্রিক্স এবং মাল্টি-কারেন্সি বিলিং রেল।',
    'Web Application Development': 'ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট',
    'Building dense browser workspace portals, collaborative vector canvases, real-time message rooms, and client portfolios with beautiful layouts.': 'ঘন ব্রাউজার ওয়ার্কস্পেস পোর্টাল, কোলাবোরেティブ ভেক্টর ক্যানভাস, রিয়েল-টাইম মেসেজ রুম এবং চমৎকার লেআউট সহ ক্লায়েন্ট পোর্টফোলিও তৈরি করা।',
    'Mobile App Engineering': 'মোবাইল অ্যাপ ইঞ্জিনিয়ারিং',
    'Cross-platform reactive native layouts and high performance build configurations for iOS and Android, leveraging platform hardware acceleration.': 'আইওএস (iOS) এবং অ্যান্ড্রয়েড (Android)-এর জন্য ক্রস-প্ল্যাটফর্ম রিঅ্যাক্টিভ নেটিভ লেআউট এবং উচ্চ-ক্ষমতাসম্পন্ন বিল্ড কনফিগারেশন।',
    'UI/UX Craftsmanship': 'UI/UX ক্রাফটসম্যানশিপ',
    'Interactive wireframing, fluid digital design, typographic hierarchy maps, and custom motion definitions that bridge brand identities with actual code.': 'ইন্টারেক্টিভ ওয়্যারফ্রেমিং, আকর্ষক ডিজিটাল ডিজাইন, টাইপোগ্রাফিক হায়ারার্কি ম্যাপ এবং কাস্টম মোশন ডেফিনিশন যা ব্র্যান্ডের পরিচয় কাজের রূপান্তরণ করে।',
    'Secure API Infrastructure': 'সুরক্ষিত API অবকাঠামো',
    'Designing typed GraphQL services, hyper-fast RPC microservice boundaries, or RESTful API resources designed with robust token scopes.': 'টাইপড গ্রাফকিউএল (GraphQL) সার্ভিস, হাইপার-ফাস্ট RPC মাইক্রোসার্ভিস সীমানা বা শক্তিশালী টোকেন স্কোপ সহ রেস্টফুল এপিআই (RESTful API)।',
    'Cloud & DevOps Engineering': 'ক্লাউড ও ডেভঅপস ইঞ্জিনিয়ারিং',
    'Deploying robust cloud resources, terraformed infrastructure as code, container schedules, automated health alerts, and CDN distribution profiles.': 'শক্তিশালী ক্লাউড রিসোর্স ডিপ্লয়মেন্ট, কোড হিসেবে কাস্টম টেরাফর্মড অবকাঠামো, কন্টেইনার শিডিউল, অটোমেটেড হেলথ অ্যালার্ট এবং গ্লোবাল সিডিএন বিতরণ।',
    
    // --- TechSphere / Future-Proof Section ---
    'Integrated Capabilities': 'সমন্বিত প্রযুক্তি সক্ষমতা',
    'Future-Proof Technologies.': 'ভবিষ্যত-উপযোগী প্রযুক্তি।',
    'Our engineering standards dictate running modern frameworks that optimize performance, memory allocations, and network responses. Drag the 3D model to explore our selected technology stacks.': 'আমাদের ইঞ্জিনিয়ারিং স্ট্যান্ডার্ডের লক্ষ্য আধুনিক ফ্রেমওয়ার্ক চালানো যা পারফরম্যান্স, মেমরি অ্যালোকেশন এবং নেটওয়ার্ক রেসপন্স অপ্টিমাইজ করে। আমাদের নির্বাচিত টেক স্ট্যাকগুলো দেখতে থ্রিডি মডেলটি ড্র্যাগ করে এক্সপ্লোর করুন।',
    'Complete Stack': 'সম্পূর্ণ স্ট্যাক',
    'Frontend': 'ফ্রন্টএন্ড',
    'Backend': 'ব্যাকএন্ড',
    'Database': 'ডেটাবেস',
    'Cloud Info': 'ক্লাউড ইনফো',
    'Interactive mode active — Drag/hover sphere to orbit': 'ইন্টারেক্টিভ মোড সক্রিয় — অরবিট করতে ড্র্যাগ/হোভার করুন',
    'Focus Node:': 'ফোকাস নোড:',
    'Core Enabled': 'সক্রিয় করা হয়েছে',
    
    // --- Portfolio Section ---
    'PORTFOLIO SHOWCASE': 'পোর্টফোলিও চমৎকার',
    'Our Vetted Production': 'আমাদের পরীক্ষিত প্রোডাকশন',
    'Client Deliveries': 'ক্লায়েন্ট ডেলিভারি',
    'We design & hand-craft premium, production-grade applications that load instantly, scale flawlessly, and elevate user experience across websites, portals, and native mobile apps.': 'আমরা প্রিমিয়াম, প্রোডাকশন-গ্রেড অ্যাপ্লিকেশন ডিজাইন ও হ্যান্ড-ক্রাফ্ট করি যা তাত্ক্ষণিকভাবে লোড হয়, নিখুঁতভাবে স্কেল করে এবং ওয়েবসাইট বা মোবাইল প্ল্যাটফর্ম জুড়ে চমৎকার অভিজ্ঞতা প্রদান করে।',
    'All Apps': 'সকল অ্যাপস',
    'Full Stack Web': 'ফুল স্ট্যাক ওয়েব',
    'Mobile Apps': 'মোবাইল অ্যাপস',
    'Enterprise SaaS': 'এন্টারপ্রাইজ SaaS',
    'EXPLORE STACK': 'স্ট্যাক এক্সপ্লোর করুন',
    'Conversion Speed': 'কনভার্সন স্পিড',
    'Operational Uptime': 'অপারেশনাল আপটাইম',
    'Platform Speed': 'প্ল্যাটফর্ম স্পিড',
    'Sub-tenants Active': 'সক্রিয় সাব-ট্যানেন্ট',
    'Web Application / Portal': 'ওয়েব অ্যাপ্লিকেশন / পোর্টাল',
    'SaaS Platform App': 'SaaS প্ল্যাটফর্ম অ্যাপ',
    '98+ Mobile Speed Rating': '৯৮+ মোবাইল স্পিড রেটিং',
    'Instant Checkout Processing': 'তাত্ক্ষণিক চেকআউট প্রসেসিং',
    'Dynamic SEO Hydration': 'ডায়নামিক এসইও হাইড্রেশন',
    'Real-time Operational Sync': 'রিয়েল-টাইম অপারেশনাল সিঙ্ক',
    'Offline State Hydration': 'অফলাইন স্টেট হাইড্রেশন',
    'Structured Role Permissions': 'সুরক্ষিত রোল পারমিশন',
    'Biometric Hardened Safety': 'বায়োমেট্রিক সিকিউরিটি সেফটি',
    'Hardware Accelerated UI': 'হার্ডওয়্যার এক্সিলারেটেড ইউআই',
    'Immediate Push Services': 'পুশ নোটিফিকেশন সার্ভিস',
    'Adaptive Video Quality Engine': 'ডায়নামিক ভিডিও কোয়ালিটি ইঞ্জিন',
    'Multi-tenant Subscription Tiers': 'মাল্টি-ট্যানেন্ট সাবস্ক্রিপশন পর্যায়',
    'Automatic Report Builders': 'অটোমেটিক রিপোর্ট বিল্ডার',

    // --- Why Choose Us Section ---
    'Core Agency Valuables': 'আমাদের মূল শক্তি',
    'Built for High-Level Growth.': 'উচ্চ-স্তরের প্রবৃদ্ধির জন্য নির্মিত।',
    'We don’t cut corners or rely on rigid legacy builders. ZenbyteLabs engineers products designed to scale, load instantly, and remain secure eternally.': 'আমরা কাজের মান বজায় রাখার ব্যাপারে আপোষ করি না। ZenbyteLabs এমন প্রোডাক্ট তৈরি করে যা সহজেই স্কেল করা যায়, দ্রুত লোড হয় এবং চিরকাল সুরক্ষিত থাকে।',
    'Performance-First Runtime': 'Performance-First রানটাইম',
    'We code with optimal memory scopes, avoiding heavy execution patterns to guarantee instantaneous web loading and high Google Core Web Vitals.': 'আমরা সর্বোত্তম মেমরি স্কোপ দিয়ে কোড করি, যাতে দ্রুততম ওয়েব লোডিং এবং গুগল কোর ওয়েব ভাইটাল স্কোর চমৎকার থাকে।',
    'Elastic Infrastructure': 'ইলাস্টিক অবকাঠামো',
    'Our system architectures employ serverless boundaries and autoscaling orchestration engines that expand automatically to sustain traffic spikes.': 'আমাদের সিস্টেম আর্কিটেকচার সার্ভারলেস বাউন্ডারি এবং অটোস্কেলিং অর্কেস্ট্রেশন ইঞ্জিন ব্যবহার করে যা ট্রাফিকের চাপ অনুযায়ী সয়ংক্রিয়ভাবে বৃদ্ধি পায়।',
    'Vault-Grade Security': 'সবোচ্চ-স্তরের নিরাপত্তা',
    'Providing bulletproof threat management. We integrate authenticated scopes, secure cookies, CORS parameters, and automated TLS validation.': 'বুলেটপ্রুফ হুমকি ব্যবস্থাপনা প্রদান। আমরা অথেনটিকেটেড স্কোপ, সুরক্ষিত কুকিজ, CORS প্যারামিটার এবং অটোমেটেড TLS ভ্যালিডেশন যুক্ত করি।',
    'Architectural Transparency': 'স্বচ্ছ স্থাপত্য পরিকল্পনা',
    'Writing documented, clean SOLID classes with typed boundaries. You retain 100% intellectual property and flawless source code control.': 'ডকুমেন্টেড, পরিষ্কার SOLID ক্লাস এবং টাইপ সীমানা দিয়ে কোড লেখা। কাস্টমার ১০০% মেধা সম্পত্তির অধিকার এবং সোর্স কোড কন্ট্রোল লাভ করে।',
    'Next-Gen Stacks Only': 'শুধুমাত্র Next-Gen স্ট্যাক্স',
    'No bloated legacy technology curves. We run Vite builds, server-side React hooks, Tailwind styles, and microservices geared for longevity.': 'কোনো ব্যাকডেটেড প্রযুক্তি ব্যবহার করা হয় না। আমরা Vite বিল্ডস, সার্ভার-সাইড রিঅ্যাক্ট হুকস, Tailwind স্টাইলস এবং মাইক্রোসার্ভিস ব্যবহার করি।',
    'Enterprise Operations Support': 'এন্টারপ্রাইজ অপারেশনাল সাপোর্ট',
    'Beyond launch, our operations team guarantees server health checks, security patches, system maintenance logs, and feature development.': 'লঞ্চের পরেও আমাদের অপারেশন টিম সার্ভার হেলথ চেক, সিকিউরিটি প্যাচ, সিস্টেম রক্ষণাবেক্ষণ লগ এবং ফিচার ডেভেলপমেন্ট অপ্টিমাইজড রাখে।',

    // --- Testimonials Section ---
    'Client Verification Records': 'ক্লায়েন্ট ভেরিফিকেশন রেকর্ড',
    'Vetted Industry Reviews.': 'পরীক্ষিত ইন্ডাস্ট্রি রিভিউ।',
    'Read real technical reviews submitted by engineering directories, lead developers, and CTOs from companies trusting ZenbyteLabs with their code.': 'ZenbyteLabs-এর ওপর আস্থা রাখা কোম্পানিগুলোর টেকনিক্যাল ডিরেক্টর, লিড ডেভেলপার এবং CTO-দের বাস্তব রিভিউ দেখে নিন।',

    // --- CTA Section ---
    'HAVE A PROJECT OUTLINE IN MIND?': 'আপনার মাথায় কি কোনো প্রজেক্টের পরিকল্পনা আছে?',
    'Secure A Virtual Blueprint Session': 'একটি সিকিউর ভার্চুয়াল ব্লুপ্রিন্ট সেশন বুক করুন',
    'Connect with an expert systems architect to detail software scopes, infrastructure budgets, database designs, and technical sprint gates.': 'সফটওয়্যার স্কোপ, অবকাঠামো বাজেট, ডেটাবেস ডিজাইন এবং টেকনিক্যাল স্প্রিন্ট প্ল্যানিংয়ের জন্য আমাদের বিশেষজ্ঞ সিস্টেম আর্কিটেক্টের সাথে যোগাযোগ করুন।',
    'Initialize Project Briefing': 'প্রজেক্ট ব্রিফিং শুরু করুন',
    'Deploying Consultation Suite Overlay...': 'কনসাল্টেশন সুইট লোড হচ্ছে...',
    'Secure Channel Verified': 'সুরক্ষিত চ্যানেল যাচাই করা হয়েছে',
    'Workspace Hydrated': 'ওয়ার্কস্পেস হাইড্রেট করা হয়েছে',
    'Loading detailed project configuration flow...': 'বিস্তারিত প্রজেক্ট কনফিগারেশন ফ্লো লোড করা হচ্ছে...',
    'ONBOARDING SLOTS OPEN NEXT WEEK': 'অনবোর্ডিং স্লট আগামী সপ্তাহে উন্মুক্ত',
    'Let\'s Build Something': 'আসুন তৈরি করি নতুন কিছু',
    'Extraordinary Together.': 'একসাথে অসাধারণ কিছু।',
    'Ready to initiate your custom engineering pipeline? Enter your business email below to lock an architecture advisory session with our lead engineers.': 'আপনার কাস্টম ইঞ্জিনিয়ারিং পাইপলাইন শুরু করতে প্রস্তুত? আমাদের লিড ইঞ্জিনিয়ারদের সাথে একটি আর্কিটেকচার উপদেষ্টা সেশন বুক করতে নীচে আপনার কাজের ইমেলটি লিখুন।',
    'Enter your work email': 'আপনার কাজের ইমেল লিখুন',
    'Get Started': 'শুরু করুন',
    'Routing email... Opening Secure Consultation workspace': 'ইমেল রাউট করা হচ্ছে... নিরাপদ কনসাল্টেশন ওয়ার্কস্পেস ওপেন করা হচ্ছে',
    'Pure Technical Delivery • No spam guarantees • Privacy Safe': 'বিশুদ্ধ টেকনিক্যাল ডেলিভারি • নো স্প্যাম গ্যারান্টি • সম্পূর্ণ নিরাপদ ও প্রাইভেট',
    'Core Active': 'কোর সক্রিয়',
    'Sprints Live': 'সরাসরি স্প্রিন্টস',

    // --- Footer Section ---
    'ZenbyteLabs is an elite software engineering boutique crafting high-performance, full-stack web platforms and mission-critical enterprise systems. Designed for reliability, scaled for modern workloads.': 'ZenbyteLabs হলো একটি অভিজাত সফটওয়্যার ইঞ্জিনিয়ারিং বুটিক যা উচ্চ-ক্ষমতাসম্পন্ন ফুল-স্ট্যাক ওয়েব প্ল্যাটফর্ম এবং মিশন-ক্রিটিকাল এন্টারপ্রাইজ সিস্টেম তৈরি করে।',
    'Services Catalog': 'সার্ভিস ক্যাটালগ',
    'Strategic Solutions': 'কৌশলগত সমাধান',
    'Core Architecture': 'কোর আর্কার্টেকচার',
    'Licensing Terms': 'লাইসেন্সিং নীতিমালা',
    'Intellectual Control': 'ইন্টেলেকচুয়াল কন্ট্রোল',
    'Standard SRE SLAs': 'স্ট্যান্ডার্ড SRE SLAs',
    'System Stat Status': 'সিস্টেম স্ট্যাটাস',
    '© 2026 ZenbyteLabs. All rights reserved. Intellectual control and code properties remain under global Client parameters.': '© ২০২৬ ZenbyteLabs. সর্বস্বত্ব সংরক্ষিত। মেধা সম্পত্তি ও কোড প্রপার্টিস গ্লোবাল ক্লায়েন্ট প্যারামিটারের অধীনে থাকবে।',
    'SF Bay Area Workspace • Remote Labs': 'সান ফ্রান্সিসকো বে এরিয়া ওয়ার্কস্পেস • রিমোট ল্যাবস',
    'Full Stack Development': 'ফুল স্ট্যাক ডেভেলপমেন্ট',
    'Custom Software Modules': 'কাস্টম সফটওয়্যার মডিউল',
    'Strategic Stack': 'কৌশলগত স্ট্যাক',
    'Case Studies': 'কেস স্টাডিজ',
    'Interactive SRE Lab': 'ইন্টারেক্টিভ ইনফ্রা ল্যাব',
    'Core Principles': 'কোর নীতিমালা',
    'Client Feedback': 'ক্লায়েন্ট মতামত',
    'SYSTEM HEALTH: ONLINE': 'সিস্টেম হেলথ: অনলাইন',
    'Agency Map': 'এজেন্সি ম্যাপ',
    'Workspace System': 'ওয়ার্কস্পেস সিস্টেম',
    '© 2026 ZenbyteLabs Inc. All rights reserved. Built with pride using modern web standards.': '© ২০২৬ ZenbyteLabs Inc. সর্বস্বত্ব সংরক্ষিত। আধুনিক ওয়েব স্ট্যান্ডার্ডের সাথে অত্যন্ত গর্বে তৈরি।',

    // --- Consultation Modal ---
    'Define Workspace Parameters': 'কাজের প্যারামিটার নির্ধারণ করুন',
    'Step': 'ধাপ',
    'Step 1: Select Core Objective Target': 'ধাপ ১: কোর অবজেক্টিভ টার্গেট সিলেক্ট করুন',
    'Step 2: Define Project Constraints': 'ধাপ ২: প্রজেক্ট কনস্ট্রেইন্টস নির্ধারণ করুন',
    'Select the target area requiring specialized architecture': 'বিশেষায়িত আর্কিটেকচারের প্রয়োজন এমন লক্ষ্য ক্ষেত্রটি নির্বাচন করুন',
    'Select a service profile to proceed': 'এগিয়ে যেতে একটি সার্ভিস প্রোফাইল নির্বাচন করুন',
    'Define budgetary scope and timeline limits': 'বাজেট স্কোপ এবং সময়সীমা নির্ধারণ করুন',
    'Estimated Launch Boundary': 'আনুমানিক লঞ্চ সীমানা',
    'Target Budget limit': 'টার্গেট বাজেট সীমা',
    'Describe Project Target Briefing': 'প্রজেক্ট টার্গেট ব্রিফিং বিস্তারিত লিখুন',
    'Specify legacy frameworks, external APIs, scale targets, or specific SLA dependencies...': 'পূর্ববর্তী ফ্রেমওয়ার্ক, এক্সটার্নাল এপিআই, স্কেল টার্গেট, বা নির্দিষ্ট SLA ডিপেন্ডেন্সি উল্লেখ করুন...',
    'Provide target workspace coordinates': 'টার্গেট ওয়ার্কস্পেস কোঅর্ডিনেট প্রদান করুন',
    'Workspace Contact Name': 'যোগাযোগের নাম',
    'Security Email Channel': 'নিরাপদ ইমেইল চ্যানেল',
    'Workspace State Hydrated': 'কাজের স্টেট হাইড্রেট করা হয়েছে',
    'Transmission Complete': 'প্রেরণ সম্পন্ন হয়েছে',
    'Secure virtual pipeline created successfully. Check your email for authentication key details.': 'সুরক্ষিত ভার্চুয়াল পাইপলাইন সফলভাবে তৈরি হয়েছে। অথেনটিকেশন কী-র জন্য আপনার ইমেল চেক করুন।',
    'Recycle Workspace': 'রিসাইকেল ওয়ার্কস্পেস',
    'Close Window': 'উইন্ডো বন্ধ করুন',
    'Transmit Proposal Specs': 'প্রস্তাবনা স্পেস প্রেরণ করুন',
    'Workspace Inputs Cleared': 'ওয়ার্কস্পেস ইনপুটগুলো রিসেট করা হয়েছে',
    'Proposal Transmitted': 'প্রস্তাবনা প্রেরিত হয়েছে',
    'Active tracker set to': 'সক্রিয় ট্র্যাকার সেট করা হয়েছে',
    'State Recycled': 'স্টেট রিসাইকেল করা হয়েছে',
    'Workspace inputs cleared. Ready for fresh request inputs.': 'ইনপুট ক্লিয়ার করা হয়েছে। নতুন রিকোয়েস্টের জন্য প্রস্তুত।',
    'SaaS Development': 'SaaS ডেভেলপমেন্ট',
    'Custom Software': 'কাস্টম সফ্টওয়্যার',
    'Mobile App Development': 'মোবাইল অ্যাপ ডেভেলপমেন্ট',
    'UI/UX Engineering': 'UI/UX ইঞ্জিনিয়ারিং',
    'Cloud Solutions': 'ক্লাউড সমাধান',
    'Project Consultation Workspace': 'প্রজেক্ট কনসাল্টেশন ওয়ার্কস্পেস',
    'Proposal Received!': 'প্রস্তাবনা গৃহীত হয়েছে!',
    'Submit Another Query': 'অন্য একটি তথ্য জমা দিন',
    'What service vertical are you looking for?': 'আপনি কোন ধরণের সার্ভিস খুঁজছেন?',
    'Estimate Project Budget Scale': 'প্রজেক্টের আনুমানিক বাজেট নির্ধারণ করুন',
    'Continue Details': 'এগিয়ে যান',
    'Full Name': 'নাম',
    'Work Email Address': 'কাজের ইমেইল',
    'Tell us about your project vertical / objectives': 'আপনার প্রজেক্টের কাজের পরিধি / উদ্দেশ্য বিস্তারিত বলুন',
    "Provide a short outline of what you're building, target audience or custom tech expectations...": 'আপনি কি তৈরি করছেন, টার্গেট অডিয়েন্স বা কাস্টম টেকনোলজি এক্সপেক্টেশন সম্পর্কে একটি সংক্ষিপ্ত রূপরেখা দিন...',
    '(Optional)': '(ঐচ্ছিক)',
    'Back': 'পেছনে যান',
    'Processing...': 'প্রসেসিং হচ্ছে...',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage if browser hydrated
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zenbyte_lang') as Language;
      if (saved === 'en' || saved === 'bn') return saved;
    }
    return 'en';
  });

  const [isTranslating, setIsTranslating] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);

  const setLanguage = useCallback((lang: Language) => {
    if (lang === language) return;
    setIsTranslating(true);
    setPendingLanguage(lang);

    // Timed step updates for smooth experience
    setTimeout(() => {
      setLanguageState(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('zenbyte_lang', lang);
      }
    }, 450);

    setTimeout(() => {
      setIsTranslating(false);
      setPendingLanguage(null);
    }, 1000);
  }, [language]);

  const t = useCallback((key: string, enDefault?: string): string => {
    const value = TRANSLATIONS[language]?.[key];
    if (value !== undefined) {
      return value;
    }
    return enDefault !== undefined ? enDefault : key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTranslating, pendingLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
