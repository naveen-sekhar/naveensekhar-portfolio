import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useTypingEffect
 * ───────────────
 * A custom hook that creates a realistic typewriter effect, cycling through
 * an array of strings — typing each one out character-by-character, pausing,
 * then deleting before moving to the next.
 *
 * @param {string[]}  texts          – Array of strings to cycle through
 * @param {number}    typingSpeed    – Milliseconds per character when typing   (default 100)
 * @param {number}    deletingSpeed  – Milliseconds per character when deleting (default 50)
 * @param {number}    pauseDuration  – Milliseconds to pause after full text    (default 2000)
 *
 * @returns {{ displayText: string, isTyping: boolean }}
 */
const useTypingEffect = (
  texts = [],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000
) => {
  // ── State ────────────────────────────────────────────────────────────
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  // Refs keep mutable values accessible inside the interval without
  // triggering re-renders or stale-closure issues.
  const waitTimeoutRef = useRef(null);

  // Safely resolve the current target string (guards empty arrays)
  const currentText = texts.length > 0 ? texts[currentIndex % texts.length] : '';

  // ── Core tick logic ──────────────────────────────────────────────────
  const tick = useCallback(() => {
    if (isWaiting) return; // Paused between type ↔ delete — do nothing

    if (!isDeleting) {
      // ▸ TYPING phase
      if (displayText.length < currentText.length) {
        // Add the next character
        setDisplayText((prev) => currentText.slice(0, prev.length + 1));
      } else {
        // Reached end of text → pause, then start deleting
        setIsWaiting(true);
        waitTimeoutRef.current = setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // ▸ DELETING phase
      if (displayText.length > 0) {
        // Remove the last character
        setDisplayText((prev) => prev.slice(0, -1));
      } else {
        // Fully deleted → advance to next string and begin typing
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, currentText, isDeleting, isWaiting, pauseDuration, texts.length]);

  // ── Interval driver ──────────────────────────────────────────────────
  useEffect(() => {
    // SSR safety — bail if window is undefined
    if (typeof window === 'undefined') return;

    // Nothing to type
    if (texts.length === 0) return;

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const intervalId = setInterval(tick, speed);

    return () => clearInterval(intervalId);
  }, [tick, isDeleting, typingSpeed, deletingSpeed, texts.length]);

  // ── Cleanup pause timeout on unmount ─────────────────────────────────
  useEffect(() => {
    return () => {
      if (waitTimeoutRef.current) {
        clearTimeout(waitTimeoutRef.current);
      }
    };
  }, []);

  return { displayText, isTyping: !isWaiting };
};

export default useTypingEffect;
