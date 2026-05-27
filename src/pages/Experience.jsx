import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronRight, ChevronDown, Building2, TrendingUp } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import experience from '../data/experience';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// const summaryData = [
//   { icon: Calendar, label: 'Years of Study', value: '3+', color: 'from-blue-500 to-cyan-500' },
//   { icon: Building2, label: 'Work Placements', value: '3', color: 'from-blue-500 to-cyan-500' },
//   { icon: TrendingUp, label: 'Security Focus Areas', value: '4+', color: 'from-cyan-500 to-sky-500' },
// ];

function ExperienceCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="relative pl-12 md:pl-16 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Timeline line */}
      {index < experience.length - 1 && (
        <div className="absolute left-[18px] md:left-[22px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/60 to-transparent" />
      )}

      {/* Timeline dot */}
      <motion.div
        className="absolute left-2.5 md:left-3 top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#0f1117] z-10 shadow-lg shadow-blue-500/30"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: index * 0.15 + 0.2 }}
      />

      {/* Card */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 group cursor-pointer"
        whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(59, 130, 246, 0.1)' }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {item.company}
            </h3>
            <p className="gradient-text font-semibold text-lg">{item.role}</p>
          </div>
          <div className="flex flex-col gap-1 text-sm text-gray-400 md:text-right shrink-0">
            <span className="flex items-center gap-1.5 md:justify-end">
              <Calendar className="w-3.5 h-3.5" />
              {item.duration}
            </span>
            <span className="flex items-center gap-1.5 md:justify-end">
              <MapPin className="w-3.5 h-3.5" />
              {item.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-4">{item.description}</p>

        {/* Expand toggle */}
        <button
          className="flex items-center gap-1.5 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors mb-4"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? 'Show less' : 'Show highlights'}
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        {/* Expandable highlights */}
        <motion.div
          initial={false}
          animate={{
            height: expanded ? 'auto' : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <ul className="space-y-2 mb-4">
            {item.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2 text-gray-300 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={expanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: i * 0.08 }}
              >
                <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                {highlight}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              className="bg-blue-500/15 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.25)' }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Page Header */}
        <SectionHeader
          title="Experience"
          subtitle="Hands-on security work, internships, and practical learning experiences"
          align="center"
        />

        {/* Summary Chips */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* {summaryData.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all duration-300"
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <motion.p
                className="text-3xl font-bold text-white mb-1"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))} */}
        </motion.div>

        {/* Experience Timeline */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-blue-500/20">
              <Briefcase className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Work Experience</h2>
          </div>

          <div className="relative">
            {experience.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
