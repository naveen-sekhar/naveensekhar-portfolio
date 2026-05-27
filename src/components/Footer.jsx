import { motion } from 'framer-motion';
import { Heart, ArrowUp, GitBranch, Link as LinkIcon, Globe, Code2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import profile from '../data/profile';

const socialIconMap = { Github: GitBranch, Linkedin: LinkIcon, LeetCode: Code2, Email: Mail, Twitter: Globe };

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Project Works', path: '/project-works' },
  { name: 'Responsibilities', path: '/responsibilities' },
  { name: 'Experience', path: '/experience' },
  { name: 'Contact', path: '/contact' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-auto">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      <div className="bg-[#0f1117]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand / Tagline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20">
                NS
              </span>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                {profile.subtitle}. Building secure systems, thoughtful interfaces,
                and practical digital experiences.
              </p>
              <p className="text-gray-500 text-xs flex items-center gap-1.5">
                Made with{' '}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <Heart size={12} className="text-cyan-400 fill-cyan-400" />
                </motion.span>{' '}
                by {profile.name}
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-blue-400 group-hover:w-3 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Connect
              </h3>
              <div className="flex gap-3">
                {profile.socialLinks.map((social) => {
                  const Icon = socialIconMap[social.icon];
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition-colors duration-300"
                      aria-label={social.name}
                    >
                      {Icon && <Icon size={18} />}
                    </motion.a>
                  );
                })}
              </div>
              <p className="text-gray-500 text-xs">{profile.email}</p>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-end gap-4"
          >
            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-blue-400 transition-colors duration-200 group cursor-pointer"
            >
              <span>Back to top</span>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
              >
                <ArrowUp size={14} />
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
