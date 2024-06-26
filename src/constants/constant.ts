export const API_URL = 'https://toiec-test-be-production.up.railway.app/';
// export const API_URL = 'http://localhost:5000/';

export const NAV_LINKS = [
  {
    id: 1,
    title: 'Online Exam Questions',
    link: '/learner/tests'
  },
  {
    id: 2,
    title: 'Flashcards',
    link: '/learner/flashcards'
  }
];

export const FOOTER_INFOS = [
  {
    id: 1,
    title: 'Explore',
    links: ['About', 'Contact', 'What We Do']
  },
  {
    id: 2,
    title: 'Legal',
    links: ['Join Us', 'Blog', 'Privacy & Policy']
  }
];

export const RESULTS = [
  {
    id: 1,
    userId: 1,
    testId: 1,
    type: 'Practice',
    practicePart: '1,2,3',
    date: '25/04/2024',
    totalCorrect: 18,
    totalQuestion: 30,
    time: '0:08:14'
  },
  {
    id: 2,
    userId: 1,
    testId: 1,
    type: 'Practice',
    partName: '1,2,3',
    date: '25/04/2024',
    totalCorrect: 18,
    totalQuestion: 30,
    time: '0:08:14'
  },
  {
    id: 3,
    userId: 1,
    testId: 1,
    type: 'Full Test',
    partName: '1,2,3,4,5,6,7',
    date: '25/04/2024',
    totalCorrect: 18,
    totalQuestion: 30,
    time: '0:08:14'
  },
  {
    id: 4,
    userId: 1,
    testId: 1,
    type: 'Practice',
    partName: '5,6',
    date: '25/04/2024',
    totalCorrect: 18,
    totalQuestion: 30,
    time: '0:08:14'
  },
  {
    id: 5,
    userId: 1,
    testId: 1,
    type: 'Practice',
    partName: '7',
    date: '25/04/2024',
    totalCorrect: 18,
    totalQuestion: 30,
    time: '0:08:14'
  }
];
