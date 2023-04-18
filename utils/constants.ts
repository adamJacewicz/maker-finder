export const professions = {
  FRONTEND_DEVELOPER: 'Frontend Developer',
  BACKEND_DEVELOPER: 'Backend Developer',
  MOBILE_DEVELOPER: 'Mobile Developer',
  DATA_SCIENTIST: 'Data Scientist',
  UI_DESIGNER: 'UI Designer',
  UX_DESIGNER: 'UX Designer',
  TESTER: 'Tester',
  FULLSTACK_DEVELOPER: 'Fullstack Developer',
  SCRUM_MASTER: 'Scrum Master',
  PROJECT_MANAGER: 'Project Manager',
  PRODUCT_OWNER: 'Product Owner',
  BUSINESS_ANALYST: 'Business Analyst',
  CYBER_SECURITY_ENGINEER: 'Cyber Security Engineer',
} as const;

export const timezones = [
  'GMT+12:00',
  'GMT+11:00',
  'GMT+10:00',
  'GMT+9:00',
  'GMT+8:00',
  'GMT+7:00',
  'GMT+6:00',
  'GMT+5:00',
  'GMT+4:00',
  'GMT+3:00',
  'GMT+2:00',
  'GMT+1:00',
  'GMT',
  'GMT-1:00',
  'GMT-2:00',
  'GMT-3:00',
  'GMT-4:00',
  'GMT-5:00',
  'GMT-6:00',
  'GMT-7:00',
  'GMT-8:00',
  'GMT-9:00',
  'GMT-10:00',
  'GMT-11:00',
] as const;


export const introSteps = [
  {
    title: 'Create profile',
    label: 'Describe who you are, what are your skills, and what would you like to build.',
  },
  {
    title: 'Meet creators',
    label:
      'Setup filters and start looking through other profiles. Interested in talking to someone? Like their profile.',
  },
  {
    title: 'Perfect match',
    label:
      'If somebody liked back your profile you have a match! Now you may instantly jump into conversion and start building!',
  },
] as const;

export const HttpMethod = {
  PUT: 'PUT',
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
} as const;
