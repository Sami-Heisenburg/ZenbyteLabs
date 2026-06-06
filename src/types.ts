/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  accent: string;
  features: string[];
}

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud';
  color: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  link: string;
  details: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  content: string;
  rating: number;
}

export interface ProcessStep {
  id: number;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export interface WhyUsFeature {
  id: string;
  title: string;
  iconName: string;
  description: string;
  glowColor: string;
}
