export const siteConfig = {
  name: 'Verification-First Portfolio',
  description:
    'A portfolio showcasing verification-first development practices with cryptographic provenance and live evaluation results.',
  url: 'https://verification-first-portfolio.vercel.app',
  author: {
    name: 'Bryce Seefieldt',
    title: 'Verification-First Engineer',
    bio: 'Building systems with cryptographic provenance, real-time evaluation, and disaster recovery mindset.',
    location: 'Remote',
  },
  social: {
    github: 'https://github.com/bryce-seefieldt',
    twitter: 'https://twitter.com/bryceseefieldt',
    linkedin: 'https://linkedin.com/in/bryceseefieldt',
    email: 'bryce@example.com',
  },
  repo: {
    owner: 'bryce-seefieldt',
    name: 'verification-first-portfolio',
    url: 'https://github.com/bryce-seefieldt/verification-first-portfolio',
  },
  network: {
    label: 'Ethereum Sepolia Testnet',
    chainId: 11155111,
    explorer: 'https://sepolia.etherscan.io',
  },
  nav: [
    { href: '/', label: 'Home' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/work-trials', label: 'Work Trials' },
    { href: '/evals', label: 'Evaluations' },
    { href: '/provenance', label: 'Provenance' },
    { href: '/about', label: 'About' },
    { href: '/changelog', label: 'Changelog' },
  ],
  features: [
    {
      title: 'Verification-First',
      description:
        'Every feature starts with success criteria. Evaluation harnesses validate implementations before deployment.',
      icon: '✅',
    },
    {
      title: 'Cryptographic Provenance',
      description:
        'Track every decision, implementation, and deployment with immutable audit trails anchored on-chain.',
      icon: '🔐',
    },
    {
      title: 'Live Evaluations',
      description:
        'Real-time test results published as JSON. See exactly what works, what doesn\'t, and why.',
      icon: '📊',
    },
    {
      title: 'Disaster Recovery Ready',
      description:
        'Built with DR/BCP mindset. Documentation, ADRs, and runbooks ensure business continuity.',
      icon: '🛡️',
    },
  ],
}

export type SiteConfig = typeof siteConfig
