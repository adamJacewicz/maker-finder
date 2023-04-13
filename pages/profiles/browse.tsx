import React, { FC } from 'react';
import Layout from '@/components/Layout';
import SelectInput from '@/components/SelectInput';
import { skills } from '@/utils/constants';
import prisma from '@/prisma';
import { getSession } from 'next-auth/react';
import { User } from '@/types/model';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      id: true,
      skill: true,
      timezone: true,
      filter: {
        select: {
          skill: true,
          timezone: true,
        },
      },
    },
  });

  return {
    props: { currentUser },
  };
};

const Browse: FC<{ currentUser: User }> = ({ currentUser }) => {
  const skillsList = Object.entries(skills).map(([value, label]) => ({ label, value }));
  return (
    <Layout>
      <SelectInput
        values={skillsList}
        defaultValue={{ value: currentUser.skill, label: skills[currentUser.skill] }}
      ></SelectInput>
      <p className="text-center mt-10 text-2xl">
        Unfortunately we do not have more profiles at the moment. <br />
        Please change your filter and try again...
      </p>
    </Layout>
  );
};

export default Browse;
