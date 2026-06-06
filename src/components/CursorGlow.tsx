/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Motion physics springs for smooth trailing delay
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Add custom class to body so default pointer is hidden where supported
    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track when hovering interactive nodes
    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        const isClickable = 
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') !== null || 
          target.closest('a') !== null ||
          target.classList.contains('interactive') ||
          target.closest('.interactive') !== null;
        
        setIsHovered(isClickable);

        // Optional Magnetic effect for magnetic elements
        const magneticEl = target.closest('.magnetic') as HTMLElement;
        if (magneticEl) {
          const rect = magneticEl.getBoundingClientRect();
          const elX = rect.left + rect.width / 2;
          const elY = rect.top + rect.height / 2;
          const distanceX = e.clientX - elX;
          const distanceY = e.clientY - elY;
          
          // Pull element slightly towards mouse coordinates
          magneticEl.style.transform = `translate(${distanceX * 0.2}px, ${distanceY * 0.2}px)`;
          magneticEl.style.transition = 'none';
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticEl = target?.closest('.magnetic') as HTMLElement;
      if (magneticEl) {
        magneticEl.style.transform = '';
        magneticEl.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null; // Don't show custom cursor on touch devices
  }

  return (
    <>
      {/* Outer ambient glow trail */}
      <motion.div
        id="cursor-ambient-glow"
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9998] mix-blend-screen opacity-40 blur-2xl"
        style={{
          x: trailX,
          y: trailY,
          background: isHovered 
            ? 'radial-gradient(circle, rgba(134,67,245,0.4) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(22,164,251,0.3) 0%, transparent 70%)',
          scale: isHovered ? 1.5 : 1,
        }}
      />

      {/* Main cursor head */}
      <motion.div
        ref={cursorRef}
        id="cursor-main-pointer"
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] border flex items-center justify-center mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          width: isHovered ? 48 : 12,
          height: isHovered ? 48 : 12,
          backgroundColor: isClicking 
            ? 'rgba(255, 255, 255, 0.9)' 
            : isHovered 
              ? 'rgba(255, 255, 255, 0.15)' 
              : 'rgb(255, 255, 255)',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0)',
        }}
        animate={{
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {isHovered && (
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-white"
            layoutId="active-cursor-dot" 
          />
        )}
      </motion.div>
    </>
  );
}
