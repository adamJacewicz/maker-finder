import React, { FC } from 'react';
import { getSession } from 'next-auth/react';
import { CurrentUser, Filter, UserData } from '@/types/model';
import { GetServerSideProps } from 'next';
import { findMatch } from '@/services/match.service';
import ProfileSettings from '@/components/ProfileSettings';
import { getFilter } from '@/services/filter.service';
import ProfilePreview from '@/components/ProfilePreview';
import { useRouter } from 'next/router';
import { Option } from '@/components/SelectInput';
import restClient from '@/rest-client';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const user = session?.user as CurrentUser;
  const [profile, filter] = await Promise.all([findMatch(user.id), getFilter(user.id)]);
  return {
    props: {
      profile,
      filter,
    },
  };
};

const Browse: FC<{ filter: Filter; profile: UserData }> = ({ filter, profile }) => {
  const router = useRouter();
  const onChange = async (payload: Option, name: string) => {
    await restClient.user.filter.update({ [name]: payload.value });
    router.push('/browse');
  };
  return (
    <section className="flex flex-col mx-auto gap-6 mt-44">
      <h4 className="text-center text-2xl font-semibold">Select who you are looking for</h4>
      <ProfileSettings onChange={onChange} settings={filter} />
      {profile ? (
        <ProfilePreview profile={profile} />
      ) : (
        <p className="mx-auto text-center mt-10 text-2xl max-w-[600px]">
          Unfortunately we do not have more profiles at the moment. Please change your filter and
          try again...
        </p>
      )}
    </section>
  );
};

export default Browse;
