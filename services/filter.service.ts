import prisma from '@/prisma';
import { Filter } from '@/types/model';

export const upsertFilter = async (userId: string, { skill, timezone }: Filter) =>
  await prisma.filter.upsert({
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
