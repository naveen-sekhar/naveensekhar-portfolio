import { motion } from "framer-motion";

function TimelineItem({ item, index, isLeft }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      className={`relative flex items-start gap-6 w-full min-w-0 ml-10 md:ml-0 ${
        isLeft
          ? "md:self-start md:flex-row-reverse md:text-right"
          : "md:self-end md:flex-row md:text-left"
      }`}
    >
      {/* Card */}
      <motion.div
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(59, 130, 246, 0.3)",
          boxShadow: "0 0 24px rgba(59, 130, 246, 0.08)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 min-w-0"
      >
        {/* Duration badge */}
        <span className="inline-block text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg mb-3">
          {item.duration}
        </span>

        <h3 className="text-white font-semibold text-base mb-1">{item.title}</h3>

        {item.subtitle && (
          <p className="text-blue-300/80 text-sm mb-2">{item.subtitle}</p>
        )}

        {item.description && (
          <p className="text-gray-400 text-sm leading-relaxed mb-2 break-words">
            {item.description}
          </p>
        )}

        {item.details && (
          <ul className="space-y-1">
            {(Array.isArray(item.details) ? item.details : [item.details]).map(
              (detail, i) => (
                <li
                  key={i}
                  className="text-gray-500 text-xs flex items-start gap-1.5"
                >
                  <span className="text-blue-500 mt-1 shrink-0">▸</span>
                  {detail}
                </li>
              )
            )}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Timeline({ items = [] }) {
  return (
    <div className="relative">
      {/* Animated vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-blue-500 via-cyan-400 to-sky-500 left-4 md:left-1/2 md:-translate-x-1/2"
      />

      {/* Items container */}
      <div className="flex flex-col gap-10 md:gap-12">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div key={item.id ?? index} className="relative flex items-start md:justify-center">
              {/* Timeline dot — absolute positioned on the line */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: index * 0.2,
                }}
                className="absolute z-10 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#0f1117] left-4 md:left-1/2 md:-translate-x-1/2 top-5 shadow-lg shadow-blue-500/30"
              />

              {/* Mobile spacer for dot */}
              <div className="w-10 shrink-0 md:hidden" />

              {/* Desktop layout: alternate sides */}
              <div className="hidden md:flex w-full">
                {isLeft ? (
                  <>
                    <div className="w-1/2 pr-10 flex justify-end">
                      <TimelineItem item={item} index={index} isLeft={true} />
                    </div>
                    <div className="w-1/2" />
                  </>
                ) : (
                  <>
                    <div className="w-1/2" />
                    <div className="w-1/2 pl-10 flex justify-start">
                      <TimelineItem item={item} index={index} isLeft={false} />
                    </div>
                  </>
                )}
              </div>

              {/* Mobile layout: all items on right */}
              <div className="md:hidden flex-1">
                <TimelineItem item={item} index={index} isLeft={false} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
