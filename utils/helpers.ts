import { professions } from './constants';
import crypto from 'crypto';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const asyncFilter = async <T>(arr: Array<T>, predicate: (value: T) => Promise<boolean>) =>
  await Promise.all(arr.map(predicate)).then((res) => arr.filter((_v, i) => res[i]));

export const parseProfession = (professionValue?: keyof typeof professions) => {
  if (!professionValue) return '';
  return professions[professionValue];
};

export const encrypt = (password: string, salt: string) =>
  crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString(`hex`);

export const getRandomSalt = () => crypto.randomBytes(16).toString('hex');

export const toHour = (date: string | Date) => (date ? dayjs(date).format('HH:mm A') : null);
