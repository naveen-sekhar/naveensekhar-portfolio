const competitions = [
  {
    id: 1,
    name: 'HackMIT 2024',
    organizer: 'Massachusetts Institute of Technology',
    date: 'Oct 2024',
    category: 'hackathon',
    description:
      'Built "MedFlow," an AI-powered patient triage system that uses NLP to analyze patient symptoms in real-time, prioritize cases, and route them to the appropriate specialist. The platform processed natural language input and provided risk scores with 92% accuracy.',
    outcome: '1st Place — Healthcare Track',
    technologies: ['React', 'Python', 'FastAPI', 'OpenAI API', 'TailwindCSS', 'PostgreSQL'],
    teamSize: 4,
  },
  {
    id: 2,
    name: 'Google Code Jam 2024',
    organizer: 'Google',
    date: 'Apr 2024',
    category: 'coding',
    description:
      'Competed in Google\'s prestigious global algorithmic programming competition. Solved complex problems involving dynamic programming, graph theory, and computational geometry under strict time constraints across three elimination rounds.',
    outcome: 'Advanced to Round 3 — Top 3,000 globally',
    technologies: ['Python', 'C++', 'Algorithms', 'Data Structures'],
    teamSize: 1,
  },
  {
    id: 3,
    name: 'AWS GameDay Championship',
    organizer: 'Amazon Web Services',
    date: 'Sep 2023',
    category: 'hackathon',
    description:
      'Participated in a competitive, team-based learning exercise designed to test skills in architecting solutions on the AWS cloud. Managed live infrastructure under simulated real-world failure scenarios including DDoS attacks and cascading service outages.',
    outcome: '2nd Place — Western Region',
    technologies: ['AWS Lambda', 'DynamoDB', 'CloudFormation', 'S3', 'API Gateway'],
    teamSize: 3,
  },
  {
    id: 4,
    name: 'Figma Config Design Challenge',
    organizer: 'Figma',
    date: 'Jun 2023',
    category: 'design',
    description:
      'Designed a complete mobile-first design system and companion app concept for a sustainable fashion marketplace. Focused on accessibility (WCAG 2.1 AA compliance), micro-interactions, and a cohesive visual language.',
    outcome: 'Finalist — Top 10',
    technologies: ['Figma', 'Prototyping', 'Design Systems', 'UI/UX'],
    teamSize: 2,
  },
  {
    id: 5,
    name: 'TensorFlow Dev Challenge',
    organizer: 'Google Developers',
    date: 'Mar 2023',
    category: 'ai',
    description:
      'Developed "EcoLens," a real-time image classification web app that identifies recyclable materials from a camera feed. Trained a custom TensorFlow.js model on a dataset of 50K+ labeled images and deployed it for client-side inference in the browser.',
    outcome: '3rd Place — Web Category',
    technologies: ['TensorFlow.js', 'React', 'Python', 'Google Cloud', 'Computer Vision'],
    teamSize: 2,
  },
  {
    id: 6,
    name: 'Cal Hacks 10.0',
    organizer: 'UC Berkeley',
    date: 'Oct 2022',
    category: 'hackathon',
    description:
      'Created "StudySync," a collaborative real-time study platform with an AI-powered flashcard generator, shared whiteboards using WebRTC, and spaced repetition scheduling. Built from scratch in 36 hours during the largest collegiate hackathon on the West Coast.',
    outcome: 'Best Use of AI — Sponsor Prize (OpenAI)',
    technologies: ['Next.js', 'Socket.io', 'OpenAI API', 'MongoDB', 'WebRTC', 'Tailwind CSS'],
    teamSize: 4,
  },
];

export default competitions;
