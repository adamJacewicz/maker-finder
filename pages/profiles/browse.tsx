import React, { FC } from 'react';
import Layout from '@/components/Layout';
import prisma from '@/prisma';
import { getSession } from 'next-auth/react';
import { Filter } from '@/types/model';
import { GetServerSideProps } from 'next';
import { findMatch } from '@/services/match.service';
import ProfileFilter from '@/components/ProfileFilter';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
  const filter = await prisma.profileFilter.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      timezone: true,
      skill: true,
    },
  });

  const profile = await findMatch(session.user.id);

  if (profile) {
    return {
      redirect: {
        destination: `/profiles/${profile.id}`,
        permanent: false,
      },
    };
  }
  return {
    props: { filter },
  };
};

const Browse: FC<{ filter: Filter }> = ({ filter }) => {
  return (
    <Layout>
      <ProfileFilter filter={filter} />

      <p className="text-center mt-20 text-2xl">
        Unfortunately we do not have more profiles at the moment. <br />
        Please change your filter and try again...
      </p>
    </Layout>
  );
};

export default Browse;
