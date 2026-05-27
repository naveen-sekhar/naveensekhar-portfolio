import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Users, Filter, ExternalLink, Award } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import competitions from '../data/competitions';

const categories = ['all', 'hackathon', 'coding', 'design', 'ai'];

const categoryColors = {
  hackathon: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  coding: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  design: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  ai: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
};

const categoryLabels = {
  all: 'All',
  hackathon: 'Hackathon',
  coding: 'Coding',
  design: 'Design',
  ai: 'AI',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

function isWinningOutcome(outcome) {
  return /1st|winner|first|best/i.test(outcome);
}

function hasExternalLink(value) {
  if (!value) {
    return false;
  }

  return String(value).trim().toUpperCase() !== 'NULL';
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  );
}

export default function Competitions() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  const filtered =
    activeFilter === 'all'
      ? competitions
      : competitions.filter((c) => c.category === activeFilter);

  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <SectionHeader
          title="Competitions"
          subtitle="Battle-tested across hackathons, coding contests, and design challenges worldwide."
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <Filter size={16} className="text-gray-500 mr-1" />
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer capitalize ${
                activeFilter === cat
                  ? 'text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {activeFilter === cat && (
                <motion.span
                  layoutId="competitionFilterPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{categoryLabels[cat]}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Competition Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((comp) => (
              <motion.div key={comp.id} variants={cardVariants} layout>
                <Card hover3D glowColor="blue" className="h-full flex flex-col justify-between">
                  {/* Category badge */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20"
                    >
                      <Trophy size={22} className="text-blue-400" />
                    </motion.div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full border capitalize ${
                        categoryColors[comp.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                      }`}
                    >
                      {comp.category}
                    </span>
                  </div>

                  {/* Name & organizer */}
                  <h3 className="text-lg font-semibold text-white mb-1 leading-snug">{comp.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{comp.organizer}</p>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {comp.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={13} />
                      {comp.teamSize === 1 ? 'Solo' : `Team of ${comp.teamSize}`}
                    </span>
                  </div>

                  {/* Outcome badge */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg mb-5 w-fit ${
                      isWinningOutcome(comp.outcome)
                        ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/20'
                        : 'bg-white/5 text-gray-300 border border-white/10'
                    }`}
                  >
                    <Award size={14} />
                    {comp.outcome}
                  </motion.div>

                  {hasExternalLink(comp.linkedinUrl) && (
                    <div className="mb-5">
                      <a
                        href={comp.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-colors duration-300"
                        aria-label={`Open ${comp.name} LinkedIn post`}
                      >
                        <LinkedInIcon />
                      </a>
                    </div>
                  )}

                  {/* Action */}
                  <div className="mt-auto pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<ExternalLink size={14} />}
                      onClick={() => setSelectedCompetition(comp)}
                      className="w-full"
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <Trophy size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No competitions found in this category.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detail Modal */}
        <Modal
          isOpen={!!selectedCompetition}
          onClose={() => setSelectedCompetition(null)}
          title={selectedCompetition?.name || ''}
        >
          {selectedCompetition && (
            <div className="space-y-6">
              {/* Organizer & meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Trophy size={14} className="text-blue-400" />
                  {selectedCompetition.organizer}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {selectedCompetition.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} />
                  {selectedCompetition.teamSize === 1
                    ? 'Solo'
                    : `Team of ${selectedCompetition.teamSize}`}
                </span>
              </div>

              {/* Outcome */}
              <div
                className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg ${
                  isWinningOutcome(selectedCompetition.outcome)
                    ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/20'
                    : 'bg-white/5 text-gray-300 border border-white/10'
                }`}
              >
                <Award size={16} />
                {selectedCompetition.outcome}
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">{selectedCompetition.description}</p>

              {/* LinkedIn Post */}
              {hasExternalLink(selectedCompetition.linkedinUrl) && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    LinkedIn Post
                  </h4>
                  <a
                    href={selectedCompetition.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-colors duration-300"
                    aria-label={`Open ${selectedCompetition.name} LinkedIn post`}
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </div>
              )}

              {/* Project Links */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Project Links
                </h4>
                <div className="flex flex-wrap gap-3">
                  {hasExternalLink(selectedCompetition.githubUrl) && (
                    <a
                      href={selectedCompetition.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-colors duration-300"
                      aria-label={`Open ${selectedCompetition.name} GitHub repository`}
                    >
                      <GitHubIcon />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCompetition.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </section>
    </PageTransition>
  );
}
