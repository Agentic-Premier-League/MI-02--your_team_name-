export const candidatesData = [
  {
    id: 'CAND-001',
    name: 'Sarah Jenkins',
    role: 'Senior Frontend Engineer',
    matchScore: 94,
    status: 'Interview Pending',
    appliedDate: '2026-05-08',
    experience: '6 years',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    summary: 'Strong frontend architecture skills. Excellent performance in technical screening. Culture fit appears highly positive.',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    communicationScore: 92,
    cultureFitScore: 95
  },
  {
    id: 'CAND-002',
    name: 'Michael Chang',
    role: 'Backend Developer',
    matchScore: 88,
    status: 'Screening',
    appliedDate: '2026-05-09',
    experience: '4 years',
    location: 'Austin, TX',
    skills: ['Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    summary: 'Solid backend fundamentals. Needs further evaluation on system design capabilities.',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    communicationScore: 85,
    cultureFitScore: 90
  },
  {
    id: 'CAND-003',
    name: 'Emily Rivera',
    role: 'Product Designer',
    matchScore: 96,
    status: 'Technical',
    appliedDate: '2026-05-07',
    experience: '5 years',
    location: 'Remote',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
    summary: 'Exceptional portfolio. Demonstrated great user empathy in the initial HR round.',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    communicationScore: 95,
    cultureFitScore: 98
  },
  {
    id: 'CAND-004',
    name: 'David Okafor',
    role: 'Senior Frontend Engineer',
    matchScore: 78,
    status: 'Rejected',
    appliedDate: '2026-05-05',
    experience: '3 years',
    location: 'New York, NY',
    skills: ['React', 'CSS', 'HTML', 'Redux'],
    summary: 'Good attitude but technical depth is not currently at the senior level required for the role.',
    avatar: 'https://i.pravatar.cc/150?u=david',
    communicationScore: 80,
    cultureFitScore: 85
  },
  {
    id: 'CAND-005',
    name: 'Jessica Thorne',
    role: 'DevOps Engineer',
    matchScore: 91,
    status: 'Hired',
    appliedDate: '2026-04-15',
    experience: '7 years',
    location: 'Seattle, WA',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Python'],
    summary: 'Outstanding technical skills and leadership potential. Accepted offer.',
    avatar: 'https://i.pravatar.cc/150?u=jessica',
    communicationScore: 88,
    cultureFitScore: 92
  }
];

export const pipelineMetrics = {
  totalCandidates: 248,
  interviewsScheduled: 42,
  hiringSuccessRate: 18.5,
  timeToHire: '14 days'
};

export const departmentStats = [
  { name: 'Engineering', applied: 120, hired: 15 },
  { name: 'Design', applied: 45, hired: 4 },
  { name: 'Marketing', applied: 60, hired: 6 },
  { name: 'Sales', applied: 23, hired: 2 }
];

export const funnelData = [
  { stage: 'Applied', count: 248 },
  { stage: 'Screening', count: 145 },
  { stage: 'Technical', count: 86 },
  { stage: 'HR Round', count: 42 },
  { stage: 'Offer', count: 18 },
  { stage: 'Hired', count: 12 }
];
