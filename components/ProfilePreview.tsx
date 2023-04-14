import React, { FC } from 'react';
import { ProfileType } from '@/types/model';
import { skills } from '@/utils/constants';
import { useRouter } from 'next/router';
import restClient from '@/rest-client';

const ProfilePreview: FC<{ profile: ProfileType }> = ({ profile }) => {
  const router = useRouter();

  const handleMatch = async (liked: boolean) => {
    const { data } = await restClient.profiles.processProfile({
      targetId: profile.id,
      liked,
    });
    redirectNextStep(data.nextProfile);
  };

  const redirectNextStep = (nextProfile: ProfileType) => {
    if (nextProfile) {
      router.push(`/profiles/${nextProfile.id}`);
    } else {
      window.location.replace('/profiles/browse');
    }
  };
  return (
    <div className="bg-base-500 max-w-[40%] mx-auto p-4 rounded-md  text-base-50">
      <div className="flex justify-start gap-5">
        <img src={profile.image} className="block min-w-[150px] self-start" alt={profile.name} />
        <div className="flex-auto">
          <h5 className="font-bold text-xl">{profile.name}</h5>
          <p className="mt-0.5 mb-1 font-bold">{skills[profile.skill!]}</p>
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
