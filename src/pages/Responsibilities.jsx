import { motion } from 'framer-motion';
import { Briefcase, Building2, Calendar, CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/ui/Card';
import responsibilities from '../data/responsibilities';

function hasExternalLink(value) {
  if (!value) {
    return false;
  }

  return String(value).trim().toUpperCase() !== 'NULL';
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  );
}

export default function Responsibilities() {
  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionHeader
          title="Positions of Responsibility"
          subtitle="Leadership, event coordination, competition facilitation, and symposium contributions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {responsibilities.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card hover3D glowColor="cyan" className="h-full flex flex-col gap-5">
                <div className="space-y-2">
                  {item.eventName && (
                    <p className="text-xs uppercase tracking-wider text-cyan-300/90 font-semibold">
                      {item.eventName}
                    </p>
                  )}
                  <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 size={14} />
                      {item.organization}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} />
                      {item.duration}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">{item.scope}</p>

                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                    Key Contributions
                  </h4>
                  <ul className="space-y-2">
                    {item.highlights.map((point) => (
                      <li key={point} className="text-sm text-gray-300 flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {hasExternalLink(item.linkedinUrl) && (
                  <div className="pt-1">
                    <a
                      href={item.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-colors duration-300"
                      aria-label={`Open LinkedIn post for ${item.role}`}
                    >
                      <LinkedInIcon />
                      View LinkedIn Post
                    </a>
                  </div>
                )}

                {!hasExternalLink(item.linkedinUrl) && (
                  <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                    <Briefcase size={13} />
                    LinkedIn post will be added soon
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}