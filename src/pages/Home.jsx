import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  Code2,
  Star,
  User,
  Briefcase,
  Trophy,
  Award,
  GitBranch,
  Mail,
} from 'lucide-react';

import PageTransition from '../components/PageTransition';
import ParticleBackground from '../components/ParticleBackground';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/SectionHeader';
import profile from '../data/profile';
import useTypingEffect from '../hooks/useTypingEffect';

/* ───────── animation variants ───────── */
const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const heroChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 14 },
  },
};

const floatAnimation = (delay = 0) => ({
  y: [0, -14, 0, 10, 0],
  rotate: [0, 8, -6, 4, 0],
  transition: {
    duration: 6,
    delay,
    repeat: Infinity,
    ease: 'easeInOut',
  },
});

const quickLinks = [
  {
    title: 'About Me',
    description: 'Learn about my background, skills, and passions.',
    icon: User,
    to: '/about',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Experience',
    description: 'Explore my professional journey and roles.',
    icon: Briefcase,
    to: '/experience',
    color: 'from-cyan-500 to-sky-600',
  },
  {
    title: 'Competitions',
    description: 'Hackathons, contests, and achievements.',
    icon: Trophy,
    to: '/competitions',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Certifications',
    description: 'Professional certifications I have earned.',
    icon: Award,
    to: '/certifications',
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Contributions',
    description: 'Open-source work and community impact.',
    icon: GitBranch,
    to: '/contributions',
    color: 'from-emerald-500 to-green-600',
  },
  {
    title: 'Contact',
    description: 'Get in touch — let\'s build something great.',
    icon: Mail,
    to: '/contact',
    color: 'from-indigo-500 to-blue-600',
  },
];

export default function Home() {
  const { displayText } = useTypingEffect(profile.typingTexts, 90, 45, 2200);

  return (
    <PageTransition>
      {/* ════════════════════  HERO  ════════════════════ */}
      <section className="relative min-h-screen overflow-hidden -mt-20 pt-20">
        <ParticleBackground count={40} />

        {/* Gradient blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-10 items-center"
          >
            {/* Left: story */}
            <div className="space-y-8 max-w-4xl">
              <motion.div variants={heroChild} className="inline-flex">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-mono shadow-lg shadow-blue-500/5">
                  <Code2 size={14} className="text-blue-400" />
                  Portfolio / Live Experience
                </span>
              </motion.div>

              <div className="space-y-5 max-w-3xl">
                <motion.h1
                  variants={heroChild}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
                >
                  <span className="block text-white">Hi, I'm</span>
                  <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                    {profile.name}
                  </span>
                </motion.h1>

                <motion.div
                  variants={heroChild}
                  className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-gray-300"
                >
                  <span className="bg-gradient-to-r from-blue-200 to-cyan-300 bg-clip-text text-transparent">
                    {displayText}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                    className="text-blue-400 font-light"
                  >
                    |
                  </motion.span>
                </motion.div>

                <motion.p
                  variants={heroChild}
                  className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl"
                >
                  {profile.subtitle}. I design and build focused web products with
                  a sharp visual rhythm, clean motion, and practical engineering.
                </motion.p>
              </div>

              <motion.div
                variants={heroChild}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <Link to="/experience">
                  <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                    View My Work
                  </Button>
                </Link>
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" icon={<Download size={18} />}>
                    Download CV
                  </Button>
                </a>
              </motion.div>

              <motion.div
                variants={heroChild}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl"
              >
                {[
                  'Frontend craft',
                  'Backend logic',
                  'Motion-driven UI',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-gray-300"
                  >
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>

          </motion.div>

          {/* Floating decorative icons */}
          <motion.div
            className="absolute top-[18%] left-[6%] text-blue-500/20 hidden lg:block"
            animate={floatAnimation(0)}
          >
            <Code2 size={32} />
          </motion.div>
          <motion.div
            className="absolute top-[24%] right-[5%] text-cyan-500/20 hidden lg:block"
            animate={floatAnimation(2)}
          >
            <Star size={24} />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════  QUICK LINKS  ════════════════════ */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Where To Go Next"
            subtitle="A quick path into the parts of the portfolio people usually care about first"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.title}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: 'spring', stiffness: 100, damping: 14 },
                    },
                  }}
                >
                  <Link to={link.to} className="block group h-full">
                    <Card className="h-full group-hover:border-blue-500/30 transition-all duration-300 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-start justify-between mb-6">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg`}
                        >
                          <Icon size={22} className="text-white" />
                        </div>
                        <motion.div
                          className="text-gray-500 group-hover:text-blue-400 transition-colors duration-300"
                          whileHover={{ x: 4 }}
                        >
                          <ArrowRight
                            size={20}
                            className="transform group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </motion.div>
                      </div>

                      <div className="relative space-y-3">
                        <h3 className="text-white font-semibold text-xl group-hover:text-blue-300 transition-colors duration-300">
                          {link.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                          {link.description}
                        </p>
                      </div>

                      <div className="relative mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gray-500 group-hover:text-blue-300 transition-colors">
                        <span className="w-8 h-px bg-current" />
                        Open section
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
