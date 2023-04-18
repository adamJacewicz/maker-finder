import prisma from '@/prisma';

export const initConversation = async (userIds: number[]) =>
  await prisma.conversation.create({
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

export const getAllConversations = async (userId: number, searchTerm?: string | string[]) => {
  let filters = {};
  if (searchTerm) {
    filters = {
      messages: {
        some: {
          content: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      },
    };
  }
  return await prisma.conversation.findMany({
    where: {
      users: {
        some: {
          userId,
        },
      },
      ...filters,
    },
    include: {
      users: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              profession: true,
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
              profession: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });
};

export const markAsRead = (userId: number, conversationId: number) =>
  prisma.conversationUser.updateMany({
    where: {
      conversationId,
      userId,
    },
    data: {
      read: true,
    },
  });

export const getConversation = async (id: number, userId: number, searchTerm?:string | string[]) => {
  await markAsRead(userId, id);
  let filters = {};
  if (searchTerm) {
    filters = {
      messages: {
        some: {
          content: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      },
    };
  }
  return await prisma.conversation.findFirst({
    where: {
      id,
      users: {
        some: {
          userId,
        },
      },
      ...filters
    },
    include: {
      users: {
        include: { user: true },
      },
      messages: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profession: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
        take: 50,
      },
    },
  });
};

export const createMessage = async ({
  userId,
  conversationId,
  content,
}: {
  userId: number;
  conversationId: number;
  content: string;
}) => {
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

  return await prisma.message.create({
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
    },
  });
};

