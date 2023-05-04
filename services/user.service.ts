import prisma from '@/prisma';
import { Credentials } from '@/types/common';
import { credentialsSchema } from '@/utils/schemas';
import { encrypt } from '@/utils/helpers';
import {Filter} from "@/types/model";

export const getUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: {
      email: email,
    },
  });

export const authorize = async (credentials?: Credentials) => {
  if(!credentials) return null
  try {
    credentialsSchema.parse(credentials)
    const user = await getUserByEmail(credentials.email);
    if (!user?.passwordSalt) return null;
    const passwordHash = encrypt(credentials.password, user.passwordSalt);
    if (passwordHash !== user.passwordHash) return null;
    return {
      name: user.name,
      email: user.email,
      id: user.id ,
      image: user.image,
    };
  } catch (err) {
    return null
  }
};

export const getUserById = async (id: number) => await prisma.user.findUnique({
  where: {
    id,
  },
  include: {
    filter: true,
  },
})

export const updateUser = async (
  userId: number,
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
