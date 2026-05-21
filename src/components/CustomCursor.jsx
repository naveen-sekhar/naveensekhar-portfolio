import { useState, useEffect, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Spring physics for the ring (trailing with delay)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(-100, springConfig);
  const ringY = useSpring(-100, springConfig);

  // Check if mobile / touch device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          'ontouchstart' in window ||
          navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    },
    [ringX, ringY]
  );

  const handleMouseEnterInteractive = useCallback(() => setHovering(true), []);
  const handleMouseLeaveInteractive = useCallback(() => setHovering(false), []);

  const handleMouseEnterWindow = useCallback(() => setVisible(true), []);
  const handleMouseLeaveWindow = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    // Observe interactive elements
    const interactiveSelectors = 'a, button, [data-hover], input, textarea, select, [role="button"]';

    const addListeners = () => {
      const elements = document.querySelectorAll(interactiveSelectors);
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      return elements;
    };

    let currentElements = addListeners();

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      currentElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      currentElements = addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      currentElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [
    isMobile,
    handleMouseMove,
    handleMouseEnterInteractive,
    handleMouseLeaveInteractive,
    handleMouseEnterWindow,
    handleMouseLeaveWindow,
  ]);

  // Don't render on mobile / touch
  if (isMobile) return null;

  return (
    <>
      {/* Dot — follows mouse instantly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white mix-blend-difference"
        style={{
          width: 8,
          height: 8,
        }}
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: visible ? 1 : 0,
          scale: hovering ? 0.5 : 1,
        }}
        transition={{
          x: { duration: 0 },
          y: { duration: 0 },
          opacity: { duration: 0.2 },
          scale: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      />

      {/* Ring — follows with spring delay */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          width: 40,
          height: 40,
          x: ringX,
          y: ringY,
          translateX: -20,
          translateY: -20,
          border: hovering
            ? '1.5px solid rgba(168, 85, 247, 0.8)'
            : '1px solid rgba(255, 255, 255, 0.3)',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.5 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      />
    </>
  );
}
