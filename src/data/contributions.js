const contributions = [
  {
    id: 1,
    project: 'Next.js',
    description:
      'Contributed to the Next.js framework by fixing hydration mismatch bugs in the App Router and improving the developer experience for server components. Also authored documentation for the new caching APIs.',
    role: 'Contributor',
    impact: '2.5K+ stars on related discussion',
    technologies: ['React', 'TypeScript', 'Node.js', 'Webpack'],
    url: 'https://github.com/vercel/next.js',
    stats: { prs: 8, commits: 23, stars: 128000 },
  },
  {
    id: 2,
    project: 'Shadcn/UI',
    description:
      'Built and maintained multiple accessible UI components including a date range picker, a command palette, and a multi-select combobox. Focused on WAI-ARIA compliance and keyboard navigation.',
    role: 'Core Contributor',
    impact: '1.2K+ GitHub stars gained during contribution period',
    technologies: ['React', 'TypeScript', 'Radix UI', 'Tailwind CSS'],
    url: 'https://github.com/shadcn-ui/ui',
    stats: { prs: 15, commits: 42, stars: 75000 },
  },
  {
    id: 3,
    project: 'Fastify',
    description:
      'Optimized the JSON schema validation pipeline, resulting in a measurable throughput improvement for high-traffic endpoints. Also contributed plugin compatibility patches for the v5 migration.',
    role: 'Contributor',
    impact: '15% throughput improvement merged',
    technologies: ['Node.js', 'TypeScript', 'JSON Schema', 'Benchmarking'],
    url: 'https://github.com/fastify/fastify',
    stats: { prs: 5, commits: 14, stars: 33000 },
  },
  {
    id: 4,
    project: 'React Query (TanStack Query)',
    description:
      'Authored the "Paginated & Infinite Queries" guide in the official documentation, which became one of the most-visited pages. Also submitted bug fixes for race conditions in the devtools panel.',
    role: 'Documentation & Bug Fixes',
    impact: '500+ stars, top 5 viewed docs page',
    technologies: ['React', 'TypeScript', 'Documentation', 'Testing'],
    url: 'https://github.com/TanStack/query',
    stats: { prs: 6, commits: 18, stars: 43000 },
  },
  {
    id: 5,
    project: 'Prisma ORM',
    description:
      'Contributed PostgreSQL-specific edge case fixes for the Prisma Client query engine and added integration tests for JSON column operations. Participated actively in GitHub discussions to help triage issues.',
    role: 'Contributor',
    impact: '300+ issues triaged',
    technologies: ['TypeScript', 'Rust', 'PostgreSQL', 'Testing'],
    url: 'https://github.com/prisma/prisma',
    stats: { prs: 4, commits: 11, stars: 40000 },
  },
  {
    id: 6,
    project: 'react-three-fiber',
    description:
      'Created a set of reusable 3D component abstractions (particle systems, post-processing pipelines, and camera rigs) and published them as a community package with 800+ weekly npm downloads.',
    role: 'Ecosystem Contributor',
    impact: '800+ weekly npm downloads',
    technologies: ['React', 'Three.js', 'TypeScript', 'WebGL', 'GLSL'],
    url: 'https://github.com/pmndrs/react-three-fiber',
    stats: { prs: 10, commits: 35, stars: 28000 },
  },
];

export default contributions;
