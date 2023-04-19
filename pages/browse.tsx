import React, { FC } from 'react';
import Layout from '@/components/Layout';
import { getSession } from 'next-auth/react';
import { Filter, UserData } from '@/types/model';
import { GetServerSideProps } from 'next';
import { findMatch } from '@/services/match.service';
import ProfileFilter from '@/components/ProfileFilter';
import { getFilter } from '@/services/filter.service';
import ProfilePreview from '@/components/ProfilePreview';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const user = session?.user;
  if (!user) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
  const [profile, filter] = await Promise.all([findMatch(user.id), getFilter(user.id)]);
  return {
    props: {
      profile,
      filter,
    },
  };
};

const Browse: FC<{ filter: Filter; profile: UserData }> = ({ filter, profile }) => {
  return (
    <Layout>
      <section className="mt-52 flex flex-col m-auto gap-6">
        <ProfileFilter filter={filter} />
        {profile ? (
          <ProfilePreview profile={profile} />
        ) : (
          <p className="mx-auto text-center mt-20 text-2xl max-w-[600px]">
            Unfortunately we do not have more profiles at the moment. Please change your filter and
            try again...
          </p>
        )}
      </section>
    </Layout>
  );
};

export default Browse;
