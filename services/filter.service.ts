import prisma from '@/prisma';
import { Filter } from '@/types/model';

export const upsertFilter = async (userId: number, { profession, timezone }: Filter) =>
  await prisma.filter.upsert({
    where: {
      userId,
    },
    update: {
      profession,
      timezone,
      updatedAt: new Date(),
    },
    create: {
      profession,
      timezone,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

export const getFilter = async (userId: number) =>
  await prisma.filter.findUnique({
    where: {
      userId,
    },
    select: {
      timezone: true,
      profession: true,
    },
  });
