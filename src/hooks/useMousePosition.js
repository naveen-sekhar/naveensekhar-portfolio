import { useState, useEffect } from 'react';

/**
 * useMousePosition
 * ────────────────
 * Tracks the current mouse cursor position (clientX / clientY).
 * Useful for parallax effects, custom cursors, and interactive backgrounds.
 *
 * The hook is SSR-safe — it returns { x: 0, y: 0 } on the server and only
 * attaches the mousemove listener in the browser.
 *
 * @returns {{ x: number, y: number }}
 */
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // SSR safety — bail out if running on the server
    if (typeof window === 'undefined') return;

    /**
     * Update state with the latest cursor coordinates.
     * We use clientX/clientY so the values are relative to the viewport,
     * making them easy to use for visual effects without scroll offsets.
     */
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    // Use passive: true for better scroll/move performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};

export default useMousePosition;
