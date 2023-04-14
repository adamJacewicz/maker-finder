import prisma from '@/prisma';
import { Filter } from '@/types/model';

export const upsertFilter = async (userId: string, { skill, timezone }: Partial<Filter>) =>
  await prisma.profileFilter.upsert({
    where: {
      userId,
    },
    update: {
      skill,
      timezone,
      updatedAt: new Date(),
    },
    create: {
      skill,
      timezone,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

export const getFilter = async (userId: string) =>
  await prisma.profileFilter.findUnique({
    where: {
      userId,
    },
    select: {
      timezone: true,
      skill: true,
    },
  });
