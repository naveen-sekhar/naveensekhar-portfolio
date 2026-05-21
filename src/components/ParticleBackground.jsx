import { useMemo } from 'react';
import { motion } from 'framer-motion';

const PARTICLE_COLORS = [
  'rgba(59, 130, 246, ',   // blue-500
  'rgba(34, 211, 238, ',   // cyan-500
  'rgba(59, 130, 246, ',   // blue-500
  'rgba(96, 165, 250, ',   // blue-400
  'rgba(14, 165, 233, ',   // sky-500
];

function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => {
    const size = 2 + Math.random() * 4; // 2-6px
    const opacity = 0.1 + Math.random() * 0.3; // 0.1-0.4
    const colorBase =
      PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

    return {
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100,
      size,
      color: `${colorBase}${opacity})`,
      shadow: `${colorBase}0.6)`,
      duration: 10 + Math.random() * 15, // 10-25s
      delay: Math.random() * 8,
      driftX: (Math.random() - 0.5) * 30, // horizontal drift
      driftY: 20 + Math.random() * 40, // vertical float range
    };
  });
}

export default function ParticleBackground({ count = 35 }) {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.shadow}`,
          }}
          animate={{
            y: [0, -p.driftY, 0, p.driftY * 0.5, 0],
            x: [0, p.driftX * 0.5, -p.driftX * 0.3, p.driftX * 0.2, 0],
            opacity: [p.size > 4 ? 0.35 : 0.2, 0.4, 0.15, 0.3, p.size > 4 ? 0.35 : 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
