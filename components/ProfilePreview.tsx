import React, { FC } from 'react';
import { UserData } from '@/types/model';
import UserIcon from '@/public/user.svg';
import restClient from '@/rest-client';
import { parseProfession } from '@/utils/helpers';
import { useRouter } from 'next/router';

const ProfilePreview: FC<{ profile: UserData }> = ({ profile }) => {
  const router = useRouter();
  const handleMatch = async (liked: boolean) => {
    const { data } = await restClient.profiles.processProfile({
      targetId: profile.id,
      liked,
    });
    redirectNextStep(data.nextProfile);
  };

  const redirectNextStep = (nextProfile: UserData) => {
    router.push(`/browse`);

  };
  return (
    <div className="bg-theme-primary shadow max-w-[40%] mx-auto p-4 rounded-md  text-base-50">
      <div className="flex justify-start gap-5">
        {profile.image ? (
          <img src={profile.image} className="block min-w-[150px] self-start" alt={profile.name} />
        ) : (
          <UserIcon />
        )}
        <div className="flex-auto">
          <h5 className="font-bold text-xl">{profile.name}</h5>
          <p className="mt-0.5 mb-1 font-bold">{parseProfession(profile.profession)}</p>
          <p>{profile.description}</p>
        </div>
      </div>
      <div className="flex justify-center mt-7 items-center gap-3">
        <button onClick={() => handleMatch(false)} className="px-2 py-1 border rounded-md">
          Skip
        </button>
        <button onClick={() => handleMatch(true)} className="px-2 py-1 border rounded-md">
          Like
        </button>
      </div>
    </div>
  );
};

export default ProfilePreview;
