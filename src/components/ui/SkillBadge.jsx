import { motion } from "framer-motion";

export default function SkillBadge({ name, level = 0, icon = null, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(168, 85, 247, 0.4)",
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)",
      }}
      className="bg-white/5 border border-white/10 rounded-xl p-4 transition-all duration-300 cursor-default"
    >
      {/* Top row: icon + name | level */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <span className="text-blue-400 shrink-0 flex items-center text-lg">
              {icon}
            </span>
          )}
          <span className="text-white font-medium text-sm">{name}</span>
        </div>
        <span className="text-xs font-mono text-blue-400">{level}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: index * 0.1 + 0.3,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
}
