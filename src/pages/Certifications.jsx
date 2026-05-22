import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ExternalLink, Filter, Shield, BookOpen } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import certifications from '../data/certifications';

const categories = ['all', 'security', 'data', 'systems'];

const categoryLabels = {
  all: 'All',
  security: 'Security',
  data: 'Data',
  systems: 'Systems',
};

const categoryColors = {
  security: 'bg-red-500/20 text-red-300 border-red-500/30',
  data: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  systems: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

const categoryIcons = {
  security: Shield,
  data: BookOpen,
  systems: Award,
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

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);

  const filtered =
    activeFilter === 'all'
      ? certifications
      : certifications.filter((c) => c.category === activeFilter);

  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <SectionHeader
          title="Certifications"
          subtitle="Credentials and learning paths aligned with security, data, and enterprise systems."
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
                  layoutId="certFilterPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{categoryLabels[cat]}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Certification Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((cert) => {
              const IconComp = categoryIcons[cert.category] || Award;
              return (
                <motion.div key={cert.id} variants={cardVariants} layout>
                  <Card
                    hover3D
                    glowColor={cert.category === 'web' ? 'blue' : cert.category === 'cloud' ? 'blue' : 'blue'}
                    className="h-full flex flex-col justify-between group"
                  >
                    {/* Icon & category */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20"
                      >
                        <IconComp size={22} className="text-blue-400" />
                      </motion.div>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full border capitalize ${
                          categoryColors[cert.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                        }`}
                      >
                        {cert.category}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-white mb-1 leading-snug">
                      {cert.name}
                    </h3>

                    {/* Issuer — gradient text */}
                    <p className="text-sm font-medium bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent mb-4">
                      {cert.issuer}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
                      <Calendar size={13} />
                      {cert.date}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto pt-2 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<ExternalLink size={14} />}
                        onClick={() => setSelectedCert(cert)}
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      {cert.credentialUrl && (
                        <motion.a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-colors"
                        >
                          <Award size={14} />
                          Credential
                        </motion.a>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
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
              <Award size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No certifications found in this category.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detail Modal */}
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title={selectedCert?.name || ''}
        >
          {selectedCert && (
            <div className="space-y-6">
              {/* Issuer & date */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Award size={14} className="text-blue-400" />
                  <span className="font-medium bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                    {selectedCert.issuer}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {selectedCert.date}
                </span>
              </div>

              {/* Category badge */}
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border capitalize ${
                  categoryColors[selectedCert.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                }`}
              >
                <Shield size={12} />
                {selectedCert.category}
              </span>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">{selectedCert.description}</p>

              {/* Credential link */}
              {selectedCert.credentialUrl && (
                <motion.a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 transition-shadow hover:shadow-blue-500/40"
                >
                  <ExternalLink size={15} />
                  View Credential
                </motion.a>
              )}
            </div>
          )}
        </Modal>
      </section>
    </PageTransition>
  );
}
