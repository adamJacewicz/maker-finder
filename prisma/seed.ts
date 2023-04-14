import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { skills, timezones } from '../utils/constants';
import axios from 'axios';

const prisma = new PrismaClient();

const createUser = async (image: string) => {
  try {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(firstName, lastName),
        image,
        emailVerified: new Date(),
        timezone: faker.helpers.arrayElement(timezones),
        skill: faker.helpers.objectKey(skills),
        description: faker.lorem.paragraph(5),
        filter: {
          create: {
            timezone: faker.helpers.arrayElement(timezones),
            skill: faker.helpers.objectKey(skills),
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const createLikes = async () => {
  const users = await prisma.user.findMany({ take: 20, select: { id: true, filter: true } });
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const targets = users.filter(({ id, filter }) => id !== user.id);
    try {
      await prisma.like.create({
        data: {
          userId: user.id,
          targetId: faker.helpers.arrayElement(targets).id,
          liked: faker.datatype.boolean(),
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
};

const cleanTables = () => {
  return Promise.all([prisma.conversation.deleteMany(), prisma.user.deleteMany()]);
};

const invoke = async (fun: () => Promise<void> | void, times: number = 1) => {
  return Promise.all(Array.from({ length: times }, () => fun()));
};

const main = async () => {
  const { data } = await axios<{
    results: [
      {
        picture: { large: string };
      },
    ];
  }>('https://randomuser.me/api/?results=50');
  await Promise.all(data.results.map((user) => createUser(user.picture.large)));
  await createLikes();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
