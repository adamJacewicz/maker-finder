import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { professions, timezones } from '../utils/constants';
import { encrypt, getRandomSalt } from '../utils/helpers';
import { Credentials } from '../types/common';

const prisma = new PrismaClient();

const getRandomImage = (sex: 'female' | 'male') => {
  const id = faker.datatype.number({ max: 99 });
  const gender = sex === 'male' ? 'men' : 'women';
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
};

const createUser = async (credentials?: Credentials) => {
  const sex = faker.name.sexType();
  const lastName = faker.name.lastName(sex);
  const firstName = faker.name.firstName(sex);

  const user: Prisma.UserCreateInput = {
    name: `${firstName} ${lastName}`,
    email: credentials?.email ?? faker.internet.email(firstName, lastName).toLowerCase(),
    image: getRandomImage(sex),
    timezone: faker.helpers.arrayElement(timezones),
    profession: faker.helpers.objectKey(professions),
    description: faker.lorem.paragraph(10),
    filter: {
      create: {
        timezone: faker.helpers.arrayElement(timezones),
        profession: faker.helpers.objectKey(professions),
      },
    },
  };

  if (credentials) {
    const passwordSalt = getRandomSalt();
    const passwordHash = encrypt(credentials.password, passwordSalt);
    user.passwordSalt = passwordSalt;
    user.passwordHash = passwordHash;
  }

  try {
    return await prisma.user.create({
      data: user,
    });
  } catch (err) {
    console.error(err);
  }
};

const createConversation = async (userIds: number[]) =>
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

const createMatches = async (userId: number, count: number) => {
  const users = await prisma.user.findMany({
    take: count,
    where: { NOT: { id: userId } },
    select: { id: true },
  });

  try {
    await prisma.match.createMany({
      data: users.reduce<Prisma.MatchCreateManyInput[]>((res, target) => {
        return [
          ...res,
          {
            targetId: target.id,
            userId,
            liked: true,
          },
          {
            targetId: userId,
            userId: target.id,
            liked: true,
          },
        ];
      }, []),
    });
    await Promise.all(users.map((target) => createConversation([userId, target.id])));
  } catch (err) {
    console.error(err);
  }
};

const cleanTables = () => {
  return Promise.all([prisma.conversation.deleteMany(), prisma.user.deleteMany()]);
};

const invoke = async (fun: () => Promise<any> | void, times: number = 1) => {
  return Promise.all(Array.from({ length: times }, () => fun()));
};

const main = async () => {
  await cleanTables();
  await invoke(createUser, 50);
  const exampleUser = await createUser({
    email: 'example@makerfinder.com',
    password: 'makerfinder20',
  });
  if (exampleUser) {
    await createMatches(exampleUser.id, 30);
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
