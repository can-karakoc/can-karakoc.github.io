import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Custom hook for scroll-triggered animations.
 * Returns a ref and whether the element is in view.
 * Optimized to only trigger once for performance.
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // Only trigger animation once
    margin: "-100px", // Trigger slightly before element enters viewport
    ...options,
  });

  return { ref, isInView };
}

/**
 * Reusable animation variants for consistency
 */
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    }
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    }
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  },
};
