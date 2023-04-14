import React, { FC } from 'react';
import Layout from '@/components/Layout';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getMatched } from '@/services/match.service';
import { User } from '@/types/model';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const matches = await getMatched(session.user.id);

  return {
    props: {
      matches,
    },
  };
};

const Matches: FC<{ matches: User[] }> = ({ matches }) => {
  return (
    <Layout>
      <h1>matches</h1>
      <ul>
        {matches.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </Layout>
  );
};

export default Matches;
