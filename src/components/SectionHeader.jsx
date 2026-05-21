import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle, align = 'center' }) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mb-12 md:mb-16 ${isCenter ? 'text-center' : 'text-left'}`}
    >
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent pb-2`}
      >
        {title}
      </h2>

      {/* Animated decorative bar */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: isCenter ? 80 : 64 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className={`h-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-500 mt-3 ${
          isCenter ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed"
          style={isCenter ? { marginInline: 'auto' } : undefined}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
