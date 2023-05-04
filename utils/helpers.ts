import { professions } from './constants';
import crypto from 'crypto';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ConversationMessage, ConversationMessageExtended } from '@/types/model';
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

export const toHour = (date: string | Date) => dayjs(date).format('HH:mm A');

export const toDate = (date: string | Date) => dayjs(date).format('DD MMMM YYYY');
export const isBeforeDay = (beforeDate: string | Date, afterDate: string | Date) =>
  dayjs(beforeDate).isBefore(afterDate, 'day');

