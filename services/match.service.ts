import prisma from '@/prisma';
const alreadyProcessed = async (where: { userId: number; targetId: number; liked: boolean }) =>
  !!(await prisma.match.count({
    where,
  }));

export const processProfile = async ({
  userId,
  targetId,
  liked,
}: {
  userId: number;
  targetId: number;
  liked: boolean;
}) => {
  if (
    await alreadyProcessed({
      liked,
      userId,
      targetId,
    })
  ) {
    throw new Error(liked ? 'profile_already_liked' : 'profile_already_skipped');
  }

  await prisma.match.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      targetUser: {
        connect: {
          id: targetId,
        },
      },
      liked,
    },
  });

  const hasMatch = liked ? await checkIfMatchExists(targetId, userId) : false;


  const targetUser = await prisma.user.findUnique({
    where: {
      id: targetId,
    },
  });

  return { targetUser, hasMatch };
};

export const checkIfMatchExists = async (userId: number, targetId: number) => {
  const count = await prisma.match.count({
    where: {
      liked: true,
      userId,
      targetId,
    },
  });

  return count > 0;
};

const getCheckedIds = async (userId: number): Promise<number[]> => {
  const profiles = await prisma.match.findMany({
    where: {
      userId,
    },
    select: {
      targetId: true,
    },
  });

  return profiles.map(({ targetId }) => targetId);
};

export const findMatch = async (userId: number) => {
  const filter = await prisma.filter.findUnique({
    where: {
      userId,
    },
  });
  if (!filter) return null;
  const checkedIds = await getCheckedIds(userId);
  return await prisma.user.findFirst({
    where: {
      profession: filter.profession,
      timezone: filter.timezone,
      NOT: {
        id: { in: [...checkedIds, userId] },
      },
    },
    select: {
      timezone: true,
      id: true,
      name: true,
      profession: true,
      image: true,
      description: true,
    },
  });
};
