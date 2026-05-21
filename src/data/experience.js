const experience = [
  {
    id: 1,
    company: 'Nexora Technologies',
    role: 'Senior Full Stack Developer',
    duration: 'Jan 2025 - Present',
    location: 'San Francisco, CA',
    description:
      'Leading the frontend architecture for a Series-B fintech startup. Spearheading the migration from a legacy monolith to a modern micro-frontend architecture, resulting in a 40% improvement in page load times and a significantly better developer experience.',
    highlights: [
      'Architected a micro-frontend system serving 200K+ monthly active users with 99.9% uptime',
      'Built a real-time transaction dashboard using React, WebSockets, and D3.js',
      'Reduced CI/CD pipeline times by 60% by implementing parallel builds and smart caching',
      'Mentored a team of 4 junior developers through code reviews and pair programming sessions',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Docker', 'GraphQL'],
  },
  {
    id: 2,
    company: 'CloudScale Solutions',
    role: 'Full Stack Developer',
    duration: 'Jun 2023 - Dec 2024',
    location: 'Austin, TX (Remote)',
    description:
      'Developed and maintained multiple customer-facing SaaS products in an agile team of 12. Owned the full product lifecycle from technical design to deployment for key platform features, collaborating closely with product and design.',
    highlights: [
      'Designed and shipped a multi-tenant analytics dashboard used by 50+ enterprise clients',
      'Implemented an event-driven microservices architecture using Kafka and Node.js',
      'Improved API response times by 35% through query optimization and Redis caching layers',
      'Contributed to a shared component library adopted across 3 product teams',
    ],
    technologies: ['React', 'Next.js', 'Express', 'MongoDB', 'Redis', 'Kafka', 'Tailwind CSS'],
  },
  {
    id: 3,
    company: 'Pixel & Code Agency',
    role: 'Frontend Developer',
    duration: 'Aug 2022 - May 2023',
    location: 'New York, NY',
    description:
      'Built high-fidelity, responsive web experiences for a diverse portfolio of agency clients ranging from e-commerce brands to media companies. Worked closely with designers to translate complex Figma mockups into pixel-perfect, accessible interfaces.',
    highlights: [
      'Delivered 12+ client projects on time and within budget across various industries',
      'Built a custom headless CMS-powered storefront that increased client conversion rate by 22%',
      'Developed reusable animation components with Framer Motion adopted as an agency standard',
    ],
    technologies: ['React', 'Next.js', 'GSAP', 'Framer Motion', 'Sanity CMS', 'Shopify', 'SCSS'],
  },
  {
    id: 4,
    company: 'InnovateTech Labs',
    role: 'Software Engineering Intern',
    duration: 'Jan 2022 - Jul 2022',
    location: 'Seattle, WA',
    description:
      'Contributed to the core platform team at an AI-powered logistics startup. Gained hands-on experience with production systems handling millions of daily API requests while working alongside experienced senior engineers.',
    highlights: [
      'Developed RESTful API endpoints consumed by mobile and web clients processing 1M+ daily requests',
      'Built an internal admin tool using React and Material UI that reduced manual ops work by 15 hours/week',
      'Wrote comprehensive unit and integration tests, achieving 90%+ code coverage for owned modules',
    ],
    technologies: ['React', 'Python', 'Django', 'PostgreSQL', 'Docker', 'Material UI', 'Jest'],
  },
];

export default experience;
