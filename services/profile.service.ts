import { Filter } from '@/types/model';
import prisma from '@/prisma';
import { checkIfMatchExists } from '@/services/match.service';
import {initConversation} from "@/services/conversation.service";

export const updateProfile = async (
  userId: string,
  payload: Partial<Filter & { name: string; image: string }>,
) =>
  prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...payload,
      updatedAt: new Date(),
    },
  });

const alreadyProcessed = async (where: { userId: string; targetId: string; liked: boolean }) =>
  !!(await prisma.like.count({
    where,
  }));

export const processProfile = async ({
  userId,
  targetId,
  liked,
}: {
  userId: string;
  targetId: string;
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

  await prisma.like.create({
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
  if (hasMatch) {
    await initConversation([userId, targetId]);
  }

  const targetUser = await prisma.user.findUnique({
    where: {
      id: targetId,
    },
  });

  return { targetUser, hasMatch };
};
