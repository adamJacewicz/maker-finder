import prisma from '@/prisma';

export const initConversation = (userIds: string[]) =>
  prisma.conversation.create({
    data: {
      users: {
        create: userIds.map((id) => ({
          user: {
            connect: {
              id,
            },
          },
        })),
      },
    },
  });

export const getAllConversations = async ({ userId, page = 0, perPage = 7, searchTerm }: any) => {
  let filters = {};

  return  await prisma.conversation.findMany({
    where: {
      users: {
        some: {
          userId,
        },
      },
    },
    include: {
      users: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              skill: true,
              image: true,
            },
          },
        },
      },
      messages: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              skill: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });
};

export const getConversation = async (id: string, userId: string) => {
  // await markAsRead({ conversationId: id, userId });

  return prisma.conversation.findFirst({
    where: {
      id,
      users: {
        some: {
          userId,
        },
      },
    },
    include: {
      users: {
        include: {
          user: true,
        },
      },
      messages: {
        include: {
          user: true,
        },
      },
    },
  });
};

export const createConversation = async (
  userId: string,
  conversationId: string,
  content: string,
) => {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      users: {
        some: {
          userId,
        },
      },
    },
  });

  if (!conversation) {
    throw new Error('conversation_not_found');
  }

  return  await prisma.conversationMessage.create({
    data: {
      conversation: {
        connect: {
          id: conversation.id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

};
