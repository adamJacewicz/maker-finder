import prisma from '@/prisma';
import { asyncFilter } from '@/utils/helpers';

export const checkIfMatchExists = async (userId: string, targetId: string) => {
  const count = await prisma.like.count({
    where: {
      liked: true,
      userId,
      targetId,
    },
  });

  return count > 0;
};

const getCheckedIds = async (userId: string) => {
  const profiles = await prisma.like.findMany({
    where: {
      userId,
    },
    select: {
      targetId: true,
    },
  });

  return profiles.map(({ targetId }) => targetId);
};

export const findMatch = async (userId: string) => {
  const filter = await prisma.profileFilter.findUnique({
    where: {
      userId,
    },
  });
  if (!filter) return null;
  const checkedIds = await getCheckedIds(userId);
  return await prisma.user.findFirst({
    where: {
      skill: filter.skill,
      timezone: filter.timezone,
      NOT: {
        id: { in: [...checkedIds, userId] },
      },
    },
    select: {
      id: true,
      name: true,
      skill: true,
      image: true,
      description: true,
    },
  });
};

export const getMatched = async (userId: string) => {
  const likedTargets = await prisma.like.findMany({
    where: {
      liked: true,
      userId,
    },
  });

  const matchedProfiles = await asyncFilter(
    likedTargets,
    async ({ targetId }) => await checkIfMatchExists(targetId, userId),
  );

  return await Promise.all(
    matchedProfiles.map((x) =>
      prisma.user.findUnique({
        where: { id: x.targetId },
        select: {
          id: true,
          name: true,
          image: true,
          skill: true,
          timezone: true,
          description: true,
        },
      }),
    ),
  );
};
