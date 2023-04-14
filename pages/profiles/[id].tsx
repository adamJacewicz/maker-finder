import Layout from '@/components/Layout';
import prisma from '@/prisma';
import React, { FC, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import ProfileFilter from '@/components/ProfileFilter';
import useAuth from '@/hooks/use-auth';
import restClient from '@/rest-client';
import { Filter, ProfileType } from '@/types/model';
import { useRouter } from 'next/router';
import ProfilePreview from '@/components/ProfilePreview';

export const getStaticPaths = async () => {
  const profiles = await prisma.user.findMany();

  return {
    paths: profiles.map(({ id }) => ({ params: { id } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const profile = await prisma.user.findUnique({
    where: {
      id: params?.id as string,
    },
    select: {
      id: true,
      name: true,
      skill: true,
      description: true,
      timezone: true,
      image: true,
    },
  });

  return {
    props: {
      profile,
    },
  };
};

export const ProfilePage: FC<{ profile: ProfileType }> = ({ profile }) => {
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<Filter | undefined>();



  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await restClient.user.filter.get();
      setFilter(data.filter);
    };
    if (isAuthenticated) fetchUser();
  }, [isAuthenticated]);


  return (
    <Layout>
      {filter && <ProfileFilter filter={filter} />}
      {!profile ? <>Loading...</> : <ProfilePreview profile={profile} />}
    </Layout>
  );
};
export default ProfilePage;
