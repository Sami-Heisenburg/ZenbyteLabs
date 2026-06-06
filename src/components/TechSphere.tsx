/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, memo } from 'react';
import { motion } from 'motion/react';
import { Globe, Server, Database as DbIcon, Cloud as CloudIcon } from 'lucide-react';
import { Technology } from '../types';
import { useLanguage } from './LanguageContext';

interface TechSphereProps {
  isLightMode?: boolean;
}

const TECHNOLOGIES: Technology[] = [
  // Frontend
  { name: 'React', category: 'frontend', color: '#16A4FB' },
  { name: 'Next.js', category: 'frontend', color: '#FFFFFF' },
  { name: 'Vue.js', category: 'frontend', color: '#42B883' },
  { name: 'Angular', category: 'frontend', color: '#DD0031' },
  { name: 'TypeScript', category: 'frontend', color: '#3178C6' },
  { name: 'Tailwind CSS', category: 'frontend', color: '#38BDF8' },

  // Backend
  { name: 'Node.js', category: 'backend', color: '#339933' },
  { name: 'Laravel', category: 'backend', color: '#FF2D20' },
  { name: 'Django', category: 'backend', color: '#092E20' },
  { name: 'Express', category: 'backend', color: '#A0A0A0' },
  { name: 'Go / Golang', category: 'backend', color: '#00ADD8' },
  { name: 'Python', category: 'backend', color: '#3776AB' },

  // Database
  { name: 'PostgreSQL', category: 'database', color: '#4169E1' },
  { name: 'MySQL', category: 'database', color: '#00758F' },
  { name: 'MongoDB', category: 'database', color: '#47A248' },
  { name: 'Redis', category: 'database', color: '#DC382D' },

  // Cloud
  { name: 'AWS', category: 'cloud', color: '#FF9900' },
  { name: 'Azure', category: 'cloud', color: '#0089D6' },
  { name: 'Google Cloud', category: 'cloud', color: '#4285F4' },
  { name: 'Docker / K8s', category: 'cloud', color: '#2496ED' },
];

const CATEGORIES = [
  { id: 'all', label: 'Complete Stack', icon: null },
  { id: 'frontend', label: 'Frontend', icon: Globe },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'database', label: 'Database', icon: DbIcon },
  { id: 'cloud', label: 'Cloud Info', icon: CloudIcon },
];

function TechSphere({ isLightMode = false }: TechSphereProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'database' | 'cloud'>('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const hoveredTechRef = useRef<string | null>(null);

  const isLightModeRef = useRef(isLightMode);
  useEffect(() => {
    isLightModeRef.current = isLightMode;
  }, [isLightMode]);

  // 3D Engine Constants
  const angleXRef = useRef(0.003); // Auto orbit speeds
  const angleYRef = useRef(0.003);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let dpr = window.devicePixelRatio || 1;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Build 3D sphere point coordinates
    const radius = Math.min(width, height) * 0.35;
    
    // Filtered techs
    const filteredTechs = TECHNOLOGIES.filter(
      (tech) => activeCategory === 'all' || tech.category === activeCategory
    );

    const count = filteredTechs.length;

    // Distribute nodes evenly on 3D Sphere using Golden Ratio spiral algorithm
    const nodes = filteredTechs.map((tech, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      return {
        tech,
        x3d: radius * Math.sin(phi) * Math.cos(theta),
        y3d: radius * Math.sin(phi) * Math.sin(theta),
        z3d: radius * Math.cos(phi),
        x2d: 0,
        y2d: 0,
        scale: 1,
        alpha: 1,
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const newCtx = canvas.getContext('2d');
      if (newCtx) {
        newCtx.scale(dpr, dpr);
      }
    };

    window.addEventListener('resize', handleResize);

    // Mouse interactions for dragging rotation
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;
        
        // Update rotational speed based on mouse drag vector
        angleYRef.current = deltaX * 0.005;
        angleXRef.current = deltaY * -0.005;

        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      } else {
        // Subtle mouse hovering inertia
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        // Check if mouse is near any node to trigger UI hover info
        let foundHover: string | null = null;
        for (const node of nodes) {
          const dx = mouseX - node.x2d;
          const dy = mouseY - node.y2d;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 40 && node.z3d > 0) {
            foundHover = node.tech.name;
            break;
          }
        }
        
        if (hoveredTechRef.current !== foundHover) {
          hoveredTechRef.current = foundHover;
          setHoveredTech(foundHover);
        }
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch interactions for dragging rotation on mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches.length > 0) {
        const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
        const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;
        
        angleYRef.current = deltaX * 0.005;
        angleXRef.current = deltaY * -0.005;

        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Core Canvas render loop
    const tick = () => {
      // Re-get context to make sure scale scales are accurate
      const currentCtx = canvas.getContext('2d');
      if (!currentCtx) return;

      currentCtx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Smooth physics damping / continuous decay of rotation velocity back to a slow, regular orbit
      if (!isDraggingRef.current) {
        const targetSpeed = 0.002;
        angleXRef.current += (targetSpeed - angleXRef.current) * 0.05;
        angleYRef.current += (targetSpeed - angleYRef.current) * 0.05;
      }

      // Rotate around X & Y axis based on angles
      const cosX = Math.cos(angleXRef.current);
      const sinX = Math.sin(angleXRef.current);
      const cosY = Math.cos(angleYRef.current);
      const sinY = Math.sin(angleYRef.current);

      // Perspective Depth
      const focalLength = radius * 2.2;

      // Update and rotate each point
      nodes.forEach((node) => {
        // Rotate Y axis
        const xRotY = node.x3d * cosY - node.z3d * sinY;
        const zRotY = node.z3d * cosY + node.x3d * sinY;

        // Rotate X axis
        const yRotX = node.y3d * cosX - zRotY * sinX;
        const zRotX = zRotY * cosX + node.y3d * sinX;

        node.x3d = xRotY;
        node.y3d = yRotX;
        node.z3d = zRotX;

        // Projected standard perspective points
        const scaleVal = focalLength / (focalLength + zRotX);
        node.scale = scaleVal;
        node.x2d = xRotY * scaleVal;
        node.y2d = yRotX * scaleVal;

        // Map depth to alpha (further back = more faded)
        node.alpha = (zRotX + radius) / (radius * 2);
        node.alpha = Math.max(0.12, Math.min(1, node.alpha));
      });

      // Draw light orbital background lines
      const lightModeActive = isLightModeRef.current;
      currentCtx.strokeStyle = lightModeActive ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.02)';
      currentCtx.beginPath();
      currentCtx.arc(cx, cy, radius * 0.9, 0, Math.PI * 2);
      currentCtx.stroke();

      // Render connectors (web structures between close nodes in space)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist3D = Math.sqrt(
            Math.pow(n1.x3d - n2.x3d, 2) + Math.pow(n1.y3d - n2.y3d, 2) + Math.pow(n1.z3d - n2.z3d, 2)
          );

          if (dist3D < radius * 0.75) {
            const avgZ = (n1.z3d + n2.z3d) / 2;
            const linkAlpha = (1 - dist3D / (radius * 0.75)) * 0.06 * ((avgZ + radius) / (radius * 2));
            currentCtx.strokeStyle = `rgba(22, 164, 251, ${linkAlpha})`;
            currentCtx.lineWidth = 0.5;
            currentCtx.beginPath();
            currentCtx.moveTo(cx + n1.x2d, cy + n1.y2d);
            currentCtx.lineTo(cx + n2.x2d, cy + n2.y2d);
            currentCtx.stroke();
          }
        }
      }

      // Draw central Core sphere
      const gradient = currentCtx.createRadialGradient(cx, cy, 10, cx, cy, radius * 0.18);
      gradient.addColorStop(0, 'rgba(134, 67, 245, 0.35)');
      gradient.addColorStop(1, 'rgba(22, 164, 251, 0.03)');
      currentCtx.fillStyle = gradient;
      currentCtx.beginPath();
      currentCtx.arc(cx, cy, radius * 0.18, 0, Math.PI * 2);
      currentCtx.fill();

      // Render Nodes (Sort to draw background nodes before foreground nodes for correct Z-ordering!)
      const sortedNodes = [...nodes].sort((a, b) => b.z3d - a.z3d);

      sortedNodes.forEach((node) => {
        const textX = cx + node.x2d;
        const textY = cy + node.y2d;
        
        currentCtx.save();
        currentCtx.globalAlpha = node.alpha;

        const isCurrentlyHovered = hoveredTechRef.current === node.tech.name;

        // Visual circle node glow check for Next.js in white background
        let nodeColor = node.tech.color;
        if (node.tech.name === 'Next.js' && lightModeActive) {
          nodeColor = '#0b0b0b';
        }

        currentCtx.fillStyle = isCurrentlyHovered ? '#16A4FB' : nodeColor;
        currentCtx.beginPath();
        currentCtx.arc(textX, textY, isCurrentlyHovered ? 6 : 4, 0, Math.PI * 2);
        currentCtx.fill();

        // Node Title Text
        const fontSize = Math.max(10, Math.round(11 * node.scale));
        currentCtx.font = `${isCurrentlyHovered ? '600' : '500'} ${fontSize}px var(--font-mono)`;
        currentCtx.fillStyle = isCurrentlyHovered 
          ? (lightModeActive ? '#000000' : '#FFFFFF') 
          : (lightModeActive ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.75)');

        // Draw text centered below node
        const textWidth = currentCtx.measureText(node.tech.name).width;
        currentCtx.fillText(node.tech.name, textX - textWidth / 2, textY + 16);

        currentCtx.restore();
      });

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      cancelAnimationFrame(animationId);
    };
  }, [activeCategory]);

  return (
    <section id="stack" ref={containerRef} className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      isLightMode ? 'bg-[#FAFAFA] border-t border-b border-neutral-200' : 'bg-zinc-950 border-t border-b border-white/5'
    }`}>
      {/* Dynamic Background Mesh */}
      <div className={`absolute inset-0 pointer-events-none ${
        isLightMode 
          ? 'bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:32px_32px]' 
          : 'bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:32px_32px]'
      }`} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column descriptions */}
        <div className="lg:col-span-5 text-left space-y-8">
          <div>
            <span className="text-xs font-mono text-brand-purple font-bold tracking-[0.2em] uppercase">
              {t('Integrated Capabilities', 'Integrated Capabilities')}
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight mt-3 transition-colors ${
              isLightMode ? 'text-neutral-900' : 'text-white'
            }`}>
              {t('Future-Proof Technologies.', 'Future-Proof Technologies.')}
            </h2>
            <p className={`text-sm font-sans leading-relaxed mt-4 transition-colors ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              {t('Our engineering standards dictate running modern frameworks that optimize performance, memory allocations, and network responses. Drag the 3D model to explore our selected technology stacks.', 'Our engineering standards dictate running modern frameworks that optimize performance, memory allocations, and network responses. Drag the 3D model to explore our selected technology stacks.')}
            </p>
          </div>

          {/* Action categories switcher */}
          <div className="flex flex-col space-y-2 max-w-sm">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`p-3.5 rounded-xl border text-left text-xs md:text-sm font-display flex items-center justify-between transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-brand-blue/15 to-brand-purple/15 border-brand-blue text-brand-blue font-bold shadow-sm'
                      : isLightMode
                        ? 'bg-white border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 text-neutral-650 hover:text-neutral-900 shadow-xs'
                        : 'bg-white/5 border border-white/5 hover:bg-white/[0.08] hover:border-white/20 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="font-semibold">{t(cat.label, cat.label)}</span>
                  {Icon && <Icon className="w-4.5 h-4.5 text-neutral-400" />}
                </button>
              );
            })}
          </div>

          {/* Holograded status */}
          <div className={`p-4 rounded-xl border flex items-center space-x-3 max-w-sm ${
            isLightMode ? 'border-neutral-200 bg-white shadow-xs' : 'border border-white/5 bg-white/[0.02]'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            <p className={`text-[11px] font-mono transition-colors ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              {hoveredTech ? (
                <span>{t('Focus Node:', 'Focus Node:')} <span className="text-brand-blue font-bold">{hoveredTech}</span> {t('Core Enabled', 'Core Enabled')}</span>
              ) : (
                <span>{t('Interactive mode active — Drag/hover sphere to orbit', 'Interactive mode active — Drag/hover sphere to orbit')}</span>
              )}
            </p>
          </div>
        </div>

        {/* Right column with interactive 3D Sphere Canvas */}
        <div className="lg:col-span-7 flex justify-center items-center h-[520px] relative">
          
          {/* Radial visual overlay */}
          <div className={`absolute inset-0 pointer-events-none z-10 ${
            isLightMode 
              ? 'bg-radial-gradient from-transparent via-[#FAFAFA] to-[#FAFAFA]/20' 
              : 'bg-radial-gradient from-transparent via-zinc-950 to-zinc-950/20'
          }`} />

          {/* Glow lights behind sphere */}
          <div className="absolute w-80 h-80 rounded-full bg-brand-purple/10 blur-3xl opacity-50 select-none pointer-events-none animate-pulse-slow" />
          <div className="absolute w-80 h-80 rounded-full bg-brand-blue/5 blur-3xl opacity-50 select-none pointer-events-none animate-custom-orbit" />

          {/* Core Interactive Canvas Sphere */}
          <canvas
            ref={canvasRef}
            className="w-full max-w-[500px] h-full max-h-[500px] cursor-grab active:cursor-grabbing z-20"
          />
        </div>
      </div>
    </section>
  );
}

export default memo(TechSphere);
