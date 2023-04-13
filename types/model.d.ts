import { skills, timezones } from '@/utils/constants';

export type Filter = {
  skill: keyof typeof skills;
  timezone: (typeof timezones)[number];
};

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  timezone: (typeof timezones)[number];
  skill: keyof typeof skills;
  filter: Filter;
};

export type CurrentUser = {
  name: string;
  email: string;
  image: string;
  id: string;
};

