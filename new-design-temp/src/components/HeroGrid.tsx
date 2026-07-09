import { motion, useReducedMotion } from "framer-motion";

/**
 * Optimized grid background with fine lines and GPU-accelerated animated blobs.
 */
export default function HeroGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Fine grid lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245, 244, 239, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245, 244, 239, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          willChange: 'auto',
        }}
      />

      {/* Blob container - only animate if motion is not reduced */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Blob 1: Lime + Cobalt */}
        <motion.div
          className="absolute"
          style={{
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(198, 241, 53, 0.6) 0%, rgba(43, 52, 255, 0.5) 25%, rgba(148, 173, 255, 0.4) 45%, transparent 65%)',
            filter: 'blur(100px)',
            left: '-200px',
            top: '-200px',
            willChange: shouldReduceMotion ? 'auto' : 'transform',
          }}
          animate={shouldReduceMotion ? {} : {
            x: ['0%', '50%', '20%', '0%'],
            y: ['0%', '40%', '20%', '0%'],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 2: Periwinkle + Lilac */}
        <motion.div
          className="absolute"
          style={{
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(148, 173, 255, 0.55) 0%, rgba(197, 182, 241, 0.45) 35%, transparent 65%)',
            filter: 'blur(90px)',
            right: '-150px',
            top: '10%',
            willChange: shouldReduceMotion ? 'auto' : 'transform',
          }}
          animate={shouldReduceMotion ? {} : {
            x: ['0%', '-40%', '-20%', '0%'],
            y: ['0%', '30%', '15%', '0%'],
            scale: [0.9, 1.2, 1, 0.9],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Blob 3: Cobalt accent */}
        <motion.div
          className="absolute"
          style={{
            width: '650px',
            height: '650px',
            background: 'radial-gradient(circle, rgba(43, 52, 255, 0.65) 0%, rgba(85, 97, 255, 0.4) 40%, transparent 65%)',
            filter: 'blur(85px)',
            left: '30%',
            bottom: '-100px',
            willChange: shouldReduceMotion ? 'auto' : 'transform',
          }}
          animate={shouldReduceMotion ? {} : {
            x: ['0%', '30%', '-10%', '0%'],
            y: ['0%', '-30%', '-15%', '0%'],
            scale: [1, 0.85, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Blob 4: Lime accent */}
        <motion.div
          className="absolute"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(198, 241, 53, 0.5) 0%, rgba(197, 182, 241, 0.35) 40%, transparent 65%)',
            filter: 'blur(80px)',
            right: '20%',
            bottom: '20%',
            willChange: shouldReduceMotion ? 'auto' : 'transform',
          }}
          animate={shouldReduceMotion ? {} : {
            x: ['0%', '-25%', '15%', '0%'],
            y: ['0%', '-20%', '10%', '0%'],
            scale: [1.1, 0.95, 1.1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />
      </div>

    </>
  );
}
