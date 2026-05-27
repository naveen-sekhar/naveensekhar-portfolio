import { motion } from 'framer-motion';
import { GitBranch, Award, Calendar } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/ui/Card';
import projectWorks from '../data/projectWorks';

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

export default function ProjectWorks() {
  return (
    <PageTransition>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionHeader
          title="Project Works"
          subtitle="A focused view of project outcomes, notable achievements, and source links."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectWorks.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card hover3D glowColor="blue" className="h-full flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white leading-snug">{project.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{project.category}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5">
                    <Calendar size={12} />
                    {project.duration}
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">{project.summary}</p>

                <div className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg w-fit bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/20">
                  <Award size={14} />
                  {project.achievement}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {hasExternalLink(project.githubUrl) && (
                  <div className="pt-1">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-colors duration-300"
                      aria-label={`Open ${project.title} on GitHub`}
                    >
                      <GitHubIcon />
                      View on GitHub
                    </a>
                  </div>
                )}

                {!hasExternalLink(project.githubUrl) && (
                  <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                    <GitBranch size={13} />
                    GitHub link will be added soon
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