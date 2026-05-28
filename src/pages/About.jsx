import { motion } from 'framer-motion';
import { MapPin, Mail, Calendar, Link as LinkIcon, Code2 } from 'lucide-react';
import GitHubIcon from '../components/icons/GitHubIcon';

import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import SkillBadge from '../components/ui/SkillBadge';
import Timeline from '../components/ui/Timeline';
import profile from '../data/profile';
import skills from '../data/skills';
import education from '../data/education';

/* ───────── animation variants ───────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 14,
      delay: i * 0.15,
    },
  }),
};

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

/* Map education data to Timeline-compatible shape */
const educationItems = education.map((e) => ({
  id: e.id,
  duration: e.duration,
  title: e.institution,
  subtitle: e.degree,
  description: e.description,
  details: e.achievements,
}));

const socialIconMap = {
  Github: GitHubIcon,
  Linkedin: LinkIcon,
  LeetCode: Code2,
};

export default function About() {
  return (
    <PageTransition>
      {/* ════════════════════  BIO SECTION  ════════════════════ */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="About Me"
            subtitle="A little more about my journey"
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left column — text content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="lg:col-span-3 space-y-6"
            >
              {/* Name & Title */}
              <motion.div variants={staggerItem}>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {profile.name}
                </h3>
                <p className="text-lg bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent font-semibold">
                  {profile.title}
                </p>
              </motion.div>

              {/* Info chips */}
              <motion.div
                variants={staggerItem}
                className="flex flex-wrap gap-4 text-sm text-gray-400"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <MapPin size={14} className="text-blue-400" />
                  {profile.location}
                </span>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors duration-300"
                >
                  <Mail size={14} className="text-blue-400" />
                  {profile.email}
                </a>
              </motion.div>

              {/* Bio */}
              <motion.p
                variants={staggerItem}
                className="text-gray-400 text-base leading-relaxed"
              >
                {profile.bio}
              </motion.p>

              {/* Personal details */}
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-2 gap-3"
              >
                {profile.stats.map((detail) => (
                  <div
                    key={detail.label}
                    className="bg-white/5 border border-white/10 rounded-xl p-3"
                  >
                    <span className="block text-xs text-gray-500 mb-0.5 uppercase tracking-wider">
                      {detail.label}
                    </span>
                    <span className="text-sm text-white font-medium">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Social links */}
              <motion.div
                variants={staggerItem}
                className="flex gap-3 pt-2"
              >
                {profile.socialLinks.map((social) => {
                  const IconComponent = socialIconMap[social.icon];
                  return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300"
                  >
                    {IconComponent ? <IconComponent size={16} /> : <Mail size={16} />}
                  </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right column — decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 14,
                delay: 0.3,
              }}
              className="lg:col-span-2 flex justify-center"
            >
              <div className="relative w-full max-w-xs aspect-square">
                {/* Outer glow ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-3xl border-2 border-dashed border-blue-500/20"
                />
                {/* Gradient bordered box */}
                <div className="absolute inset-3 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-sky-500/20 border border-white/10 backdrop-blur-sm overflow-hidden">
                  {/* Inner decorative elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 blur-xl"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                          {profile.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Floating code snippets */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-4 left-4 px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300"
                  >
                    {'<IoT />'}
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-300"
                  >
                    {'Linux'}
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute top-4 right-4 px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300"
                  >
                    {'Security'}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills section moved to its own page */}

      {/* ════════════════════  EDUCATION SECTION  ════════════════════ */}
      <section className="relative py-20 px-4">
        {/* Background accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Education"
            subtitle="My academic journey"
          />

          <Timeline items={educationItems} />
        </div>
      </section>
    </PageTransition>
  );
}
