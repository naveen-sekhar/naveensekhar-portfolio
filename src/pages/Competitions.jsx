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
