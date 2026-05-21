import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useScrollReveal
 * ───────────────
 * Uses IntersectionObserver to detect when an element scrolls into view.
 * Perfect for triggering framer-motion entrance animations on scroll.
 *
 * @param {Object}  options
 * @param {number}  options.threshold   – Visibility ratio to trigger (0-1, default 0.1)
 * @param {boolean} options.triggerOnce  – If true, stops observing after first reveal (default true)
 * @param {string}  options.rootMargin  – CSS margin around the root (default '0px')
 *
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
const useScrollReveal = ({
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '0px',
} = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Track whether we've already triggered (avoids stale closure issues)
  const hasTriggeredRef = useRef(false);

  // Memoised callback for the observer
  const handleIntersect = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (triggerOnce) {
            hasTriggeredRef.current = true;
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          // Re-hide so the animation can replay on next scroll-in
          setIsVisible(false);
        }
      });
    },
    [triggerOnce]
  );

  useEffect(() => {
    // SSR safety — IntersectionObserver only exists in the browser
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Graceful fallback: treat everything as visible
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // If we already triggered once, don't re-observe
    if (hasTriggeredRef.current && triggerOnce) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, handleIntersect]);

  return { ref, isVisible };
};

export default useScrollReveal;
