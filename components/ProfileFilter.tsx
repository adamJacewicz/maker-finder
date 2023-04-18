import React, { FC } from 'react';
import SelectInput, { Option } from '@/components/SelectInput';
import { professions, timezones } from '@/utils/constants';
import restClient from '@/rest-client';
import { Filter } from '@/types/model';
import { useRouter } from 'next/router';
import { parseProfession } from '@/utils/helpers';

const professionList = Object.entries(professions).map(([value, label]) => ({ value, label }));
const timezoneList = timezones.map((timezone) => ({ value: timezone, label: timezone }));

const ProfileFilter: FC<{ filter: Filter }> = ({ filter }) => {
  const router = useRouter();
  const onChange = async (payload: Option, name: string) => {
    await restClient.user.filter.update({ [name]: payload.value });
    router.push('/browse');
  };

  return (
    <div className="flex items-center gap-5 justify-center my-5">
      <SelectInput
        name="profession"
        onChange={onChange}
        options={professionList}
        defaultValue={{ value: filter?.profession, label: parseProfession(filter?.profession) }}
      />
      <SelectInput
        name="timezone"
        onChange={onChange}
        options={timezoneList}
        defaultValue={{ value: filter?.timezone, label: filter?.timezone }}
      />
    </div>
  );
};

export default ProfileFilter;
