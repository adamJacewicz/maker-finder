import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import ProfileSettings from '@/components/ProfileSettings';
import { getSession } from 'next-auth/react';
import { CurrentUser, Filter, UserData } from '@/types/model';
import { getUserById } from '@/services/user.service';
import { Option } from '@/components/SelectInput';
import restClient from '@/rest-client';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const user = session?.user as CurrentUser;
  const userData = await getUserById(user.id);
  return {
    props: {
      userData,
    },
  };
};
const Profile: FC<{ userData: UserData }> = ({ userData }) => {
  const onChange = async (payload: Option, name: string) => {
    await restClient.user.profile.update({ [name]: payload.value });
  };
  return (
    <div className="mx-auto">
      <ProfileSettings
        onChange={onChange}
        settings={{ profession: userData.profession, timezone: userData.timezone }}
      />
    </div>
  );
};

export default Profile;
