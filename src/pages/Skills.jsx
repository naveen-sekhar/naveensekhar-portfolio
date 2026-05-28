import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import SkillBadge from '../components/ui/SkillBadge';
import skills from '../data/skills';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 14 },
  },
};

export default function Skills() {
  return (
    <PageTransition>
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Technical Skills" subtitle="Technologies I work with" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {skills.map((category, catIdx) => (
              <motion.div key={category.name} variants={staggerItem} custom={catIdx}>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.1, duration: 0.4 }}
                  className="text-xl font-semibold text-white mb-5 flex items-center gap-3"
                >
                  <span className="w-8 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                  {category.name}
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIdx) => (
                    <SkillBadge key={skill.name} name={skill.name} level={skill.level} index={skillIdx} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
