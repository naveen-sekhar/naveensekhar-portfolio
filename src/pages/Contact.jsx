import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  GitBranch,
  Code2,
  Link,
  Globe,
  Clock,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/ui/Card';
import profile from '../data/profile';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const socialIconMap = {
  Github: GitBranch,
  Linkedin: Link,
  Twitter: Globe,
};

const contactInfo = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: MapPin, label: 'Location', value: profile.location, href: null },
  { icon: GitBranch, label: 'GitHub Profile', value: 'github.com/alexmorgan', href: 'https://github.com/alexmorgan' },
  { icon: Code2, label: 'LeetCode Profile', value: 'leetcode.com/u/alexmorgan', href: 'https://leetcode.com/u/alexmorgan' },
];

export default function Contact() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeader
          title="Get In Touch"
          subtitle="I'd love to hear from you. Let's build something great together."
          align="center"
        />

        <div className="mt-12">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <Card hover3D={false} className="p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-white mb-5">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <div className="p-2 rounded-lg bg-blue-500/15 shrink-0">
                        <info.icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-gray-200 hover:text-blue-400 transition-colors text-sm break-all"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-200 text-sm">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <Card hover3D={false} className="p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-white mb-4">Connect With Me</h3>
                <div className="flex gap-3">
                  {profile.socialLinks.map((social, index) => {
                    const IconComponent = socialIconMap[social.icon];
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        title={social.name}
                      >
                        {IconComponent && <IconComponent className="w-5 h-5" />}
                      </motion.a>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
