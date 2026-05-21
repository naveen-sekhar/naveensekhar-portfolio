import { motion } from 'framer-motion';
import { GitBranch, GitPullRequest, GitCommit, Star, ExternalLink, Code2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import contributions from '../data/contributions';

/* ---------- computed summary stats ---------- */
const totalPRs = contributions.reduce((sum, c) => sum + (c.stats?.prs || 0), 0);
const totalCommits = contributions.reduce((sum, c) => sum + (c.stats?.commits || 0), 0);
const totalStars = contributions.reduce((sum, c) => sum + (c.stats?.stars || 0), 0);
const totalProjects = contributions.length;

const summaryStats = [
  { label: 'Pull Requests', value: totalPRs, icon: GitPullRequest, color: 'text-blue-400' },
  { label: 'Commits', value: totalCommits, icon: GitCommit, color: 'text-blue-400' },
  { label: 'Total Stars', value: totalStars >= 1000 ? `${(totalStars / 1000).toFixed(0)}K+` : totalStars, icon: Star, color: 'text-yellow-400' },
  { label: 'Projects', value: totalProjects, icon: Code2, color: 'text-cyan-400' },
];

/* ---------- animation variants ---------- */
const chipContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 240, damping: 22 },
  },
};

/* ---------- helpers ---------- */
const roleBadgeColor = (role) => {
  if (/core/i.test(role)) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  if (/maintainer/i.test(role)) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  if (/ecosystem/i.test(role)) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  if (/documentation/i.test(role)) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  return 'bg-white/10 text-gray-300 border-white/10';
};

function AnimatedNumber({ value }) {
  // Simple display — actual count-up would need useEffect / useMotionValue
  return <span>{typeof value === 'number' ? value.toLocaleString() : value}</span>;
}

export default function Contributions() {
  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <SectionHeader
          title="Open Source Contributions"
          subtitle="Giving back to the community through code, documentation, and collaboration."
        />

        {/* ─── Summary Chips ─── */}
        <motion.div
          variants={chipContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {summaryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={chipVariants}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
              >
                <Icon size={24} className={stat.color} />
                <span className={`text-2xl md:text-3xl font-bold text-white`}>
                  <AnimatedNumber value={stat.value} />
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── Contributions Grid ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {contributions.map((contrib) => (
            <motion.div key={contrib.id} variants={cardVariants}>
              <Card hover3D glowColor="blue" className="h-full flex flex-col group">
                {/* Top row: name + role */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, type: 'spring' }}
                      className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 shrink-0"
                    >
                      <GitBranch size={20} className="text-blue-400" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white leading-snug">{contrib.project}</h3>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full border whitespace-nowrap ${roleBadgeColor(contrib.role)}`}
                  >
                    {contrib.role}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{contrib.description}</p>

                {/* Impact highlight */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/15 text-yellow-300 text-sm font-medium mb-5 w-fit"
                >
                  <Star size={14} className="text-yellow-400 shrink-0" />
                  {contrib.impact}
                </motion.div>

                {/* Stats row */}
                <div className="flex items-center gap-5 text-xs text-gray-500 mb-5">
                  <span className="flex items-center gap-1.5">
                    <GitPullRequest size={14} className="text-blue-400" />
                    <span className="text-gray-300 font-medium">{contrib.stats.prs}</span> PRs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GitCommit size={14} className="text-blue-400" />
                    <span className="text-gray-300 font-medium">{contrib.stats.commits}</span> Commits
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star size={14} className="text-yellow-400" />
                    <span className="text-gray-300 font-medium">
                      {contrib.stats.stars >= 1000
                        ? `${(contrib.stats.stars / 1000).toFixed(0)}K`
                        : contrib.stats.stars}
                    </span>{' '}
                    Stars
                  </span>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {contrib.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-2">
                  <motion.a
                    href={contrib.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-colors"
                  >
                    <ExternalLink size={15} />
                    View Project
                  </motion.a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}
